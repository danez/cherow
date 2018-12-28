import { Chars } from '../chars';
import { Context, Flags } from '../common';
import { Errors, report } from '../errors';
import { Token } from '../token';
import { ParserState } from '../types';
import { fromCodePoint, nextChar, nextUnicodeChar, toHex } from './common';

export const enum InvalidEscapeType {
  Empty = -1,
  StrictOctal = -2,
  EightOrNine = -3,
  InvalidHex = -4,
  OutOfRange = -5
}

const enum Constants {
  Size = 128
}

export const table = new Array<(state: ParserState, context: Context) => number>(128).fill(nextUnicodeChar);

table[Chars.LowerB] = () => Chars.Backspace;
table[Chars.LowerF] = () => Chars.FormFeed;
table[Chars.LowerR] = () => Chars.CarriageReturn;
table[Chars.LowerN] = () => Chars.LineFeed;
table[Chars.LowerT] = () => Chars.Tab;
table[Chars.LowerV] = () => Chars.VerticalTab;
table[Chars.DoubleQuote] = () => Chars.DoubleQuote;
table[Chars.SingleQuote] = () => Chars.SingleQuote;
table[Chars.Backslash] = () => Chars.Backslash;

// Line continuations
table[Chars.CarriageReturn] = state => {
  if (state.index < state.source.length) {
    if (nextChar(state) === Chars.LineFeed) {
      state.index = state.index + 1;
    }
  }

  return InvalidEscapeType.Empty;
};

table[Chars.LineFeed] = table[Chars.LineSeparator] = table[Chars.ParagraphSeparator] = state => {
  state.column = -1;
  state.line++;
  return InvalidEscapeType.Empty;
};

// Null character, octals specification.
table[Chars.Zero] = table[Chars.One] = table[Chars.Two] = table[Chars.Three] = (state, context) => {
  // 1 to 3 octal digits
  let code = state.currentChar - Chars.Zero;
  let index = state.index + 1;
  let column = state.column + 1;
  if (index < state.source.length) {
    let next = state.source.charCodeAt(index);
    if (next < Chars.Zero || next > Chars.Seven) {
      // Strict mode code allows only \0, then a non-digit.
      if (code !== 0 || next === Chars.Eight || next === Chars.Nine) {
        if (context & Context.Strict) return InvalidEscapeType.StrictOctal;
        // If not in strict mode, we mark the 'octal' as found and continue
        // parsing until we parse out the literal AST node
        //  state.flags = state.flags | Flags.HasOctal;
      }
    } else if (context & Context.Strict) {
      return InvalidEscapeType.StrictOctal;
    } else {
      // state.flags = state.flags | Flags.HasOctal;
      state.currentChar = next;
      code = code * 8 + (next - Chars.Zero);
      index++;
      column++;

      if (index < state.source.length) {
        next = state.source.charCodeAt(index);

        if (next >= Chars.Zero && next <= Chars.Seven) {
          state.currentChar = next;
          code = code * 8 + (next - Chars.Zero);
          index++;
          column++;
        }
      }

      state.index = index - 1;
      state.column = column - 1;
    }
  }

  return code;
};

// Octal character specification.
table[Chars.Four] = table[Chars.Five] = table[Chars.Six] = table[Chars.Seven] = (state, context) => {
  if (context & Context.Strict) return InvalidEscapeType.StrictOctal;
  let code = state.currentChar - Chars.Zero;
  const index = state.index + 1;
  const column = state.column + 1;

  if (index < state.source.length) {
    const next = state.source.charCodeAt(index);
    if (next >= Chars.Zero && next <= Chars.Seven) {
      code = code * 8 + (next - Chars.Zero);
      state.currentChar = next;
      state.index = index;
      state.column = column;
    }
  }

  return code;
};

table[Chars.Eight] = table[Chars.Nine] = () => InvalidEscapeType.EightOrNine;

// Hexadecimal character specification
table[Chars.LowerX] = state => {
  // 2 hex digits
  const ch1 = nextChar(state);
  const hi = toHex(ch1);
  if (hi < 0 || state.index >= state.length) return InvalidEscapeType.InvalidHex;
  const ch2 = nextChar(state);
  const lo = toHex(ch2);
  if (lo < 0) return InvalidEscapeType.InvalidHex;
  return hi * 16 + lo;
};

// Unicode character specification.
table[Chars.LowerU] = state => {
  if (nextChar(state) === Chars.LeftBrace) {
    // \u{N}
    let code = toHex(nextChar(state));
    if (code < 0) return InvalidEscapeType.InvalidHex;

    nextChar(state);
    while (state.currentChar !== Chars.RightBrace) {
      const digit = toHex(state.currentChar);
      if (digit < 0) return InvalidEscapeType.InvalidHex;
      code = (code << 4) | digit;
      // Code point out of bounds
      if (code > 0x10ffff) return InvalidEscapeType.OutOfRange;
      nextChar(state);
    }

    return code;
  } else {
    // \uNNNN
    let code = toHex(state.currentChar);
    if (code < 0) return InvalidEscapeType.InvalidHex;
    for (let i = 0; i < 3; i++) {
      const digit = toHex(nextChar(state));
      if (digit < 0) return InvalidEscapeType.InvalidHex;
      code = (code << 4) | digit;
    }
    return code;
  }
};

/**
 * Scan a string literal
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-literals-string-literals)
 *
 * @param state Parser instance
 * @param context Context masks
 */
export function scanString(state: ParserState, context: Context): Token {
  const quote = state.currentChar;
  nextChar(state);
  let start = state.index;
  let ret = '';

  while (state.index < state.length) {
    if (state.currentChar === Chars.Backslash) {
      ret += state.source.slice(start, state.index);
      nextChar(state);
      if (state.currentChar >= Constants.Size) {
        ret += fromCodePoint(state.currentChar);
      } else {
        const code = table[state.currentChar](state, context);
        nextChar(state);
        if (code >= 0) ret += fromCodePoint(code);
        else reportInvalidEscapeError(state, code as InvalidEscapeType);
        start = state.index;
      }
    } else if (state.currentChar === quote) {
      if (start < state.index) ret += state.source.slice(start, state.index);
      break;
    } else if (
      (state.currentChar & 0x53) < 3 &&
      (state.currentChar === Chars.CarriageReturn || state.currentChar === Chars.LineFeed)
    ) {
      report(state, Errors.Unexpected);
    } else {
      nextChar(state);
    }
  }
  if (state.currentChar !== quote) report(state, Errors.Unexpected);
  nextChar(state); // Consume terminating quote.
  state.tokenValue = ret;
  return Token.StringLiteral;
}

/**
 * Throws a string error for either string or template literal
 *
 * @param state state object
 * @param context Context masks
 */
export function reportInvalidEscapeError(state: ParserState, type: InvalidEscapeType): void {
  switch (type) {
    case InvalidEscapeType.StrictOctal:
      report(state, Errors.Unexpected); // falls through
    case InvalidEscapeType.EightOrNine:
      report(state, Errors.Unexpected); // falls through
    case InvalidEscapeType.InvalidHex:
      report(state, Errors.Unexpected); // falls through
    case InvalidEscapeType.OutOfRange:
      report(state, Errors.Unexpected); // falls through
    default:
      return;
  }
}
