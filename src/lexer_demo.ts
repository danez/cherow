import { Token, descKeywordTable } from './token';
import { Chars, AsciiLookup, CharType } from './chars';
import { unicodeLookup } from './unicode';

/** Example on alternative lexer code. */

export const enum Context {
  None = 0,
  Module = 1 << 0,
  Strict = 1 << 1,
  OptionsJSX = 1 << 2
}

const enum Constants {
  Size = 128
}

export const enum Escape {
  Empty = -1,
  StrictOctal = -2,
  EightOrNine = -3,
  InvalidHex = -4,
  OutOfRange = -5
}

/**
 * A set of flags for maintaining the internal state machine.
 */
const enum ScanState {
  None = 0,
  NewLine = 1 << 0,
  LastIsCR = 1 << 1
}

/*@internal*/
export const enum Errors {
  Unexpected
}

/*@internal*/
export const errorMessages: {
  [key: string]: string;
} = {
  [Errors.Unexpected]: 'Unexpected token'
};

export function constructError(index: number, line: number, column: number, description: string): void {
  const error: any = new SyntaxError(`Line ${line}, column ${column}: ${description}`);

  error.index = index;
  error.line = line;
  error.column = column;
  error.description = description;
  return error;
}

export function report(index: number, line: number, column: number, type: Errors, ...params: string[]): any {
  const message = errorMessages[type].replace(/%(\d+)/g, (_: string, i: number) => params[i]);
  const error = constructError(index, line, column, message);
  throw error;
}

function fromCodePoint(code: Chars): string {
  return code <= 0xffff
    ? String.fromCharCode(code)
    : String.fromCharCode(((code - 0x10000) >> 10) + 0xd800, ((code - 0x10000) & (1024 - 1)) + 0xdc00);
}
function toHex(code: number): number {
  code -= Chars.Zero;
  if (code <= 9) return code;
  code = (code | 0x20) - (Chars.LowerA - Chars.Zero);
  if (code <= 5) return code + 10;
  return -1;
}

export function scan(source: string) {
  let index = 0;

  let startIndex = 0;

  let line = 1;

  let column = 0;

  let length = source.length;

  let token = Token.EndOfSource;

  let tokenValue: any = '';

  let newline = false;

  let state = ScanState.None;

  let currentChar = source.charCodeAt(index);

  function nextChar(): number {
    ++column;
    return (currentChar = source.charCodeAt(++index));
  }

  function consumeOpt(code: number) {
    if (source.charCodeAt(index) !== code) return false;
    currentChar = source.charCodeAt(++index);
    column++;
    return true;
  }

  function advanceNewline() {
    currentChar = source.charCodeAt(++index);
    column = 0;
    ++line;
  }

  /**
   * Use to consume a line feed instead of `advanceNewline`.
   */
  function consumeLineFeed(lastIsCR: boolean) {
    currentChar = source.charCodeAt(++index);
    if (!lastIsCR) {
      column = 0;
      line++;
    }
  }

  function nextUnicodeChar(): number {
    const hi = source.charCodeAt(index++);

    if (hi < 0xd800 || hi > 0xdbff) return hi;
    if (index === source.length) return hi;
    const lo = source.charCodeAt(index);

    if (lo < 0xdc00 || lo > 0xdfff) return hi;
    return ((hi & 0x3ff) << 10) | (lo & 0x3ff) | 0x10000;
  }

  /**
   * Skips single HTML comments. Same behavior as in V8.
   *
   * @param parser Parser instance
   * @param context Context masks.
   */
  function skipSingleHTMLComment(context: Context): Token {
    // ES 2015 B.1.3 - HTML comments are only allowed when parsing non-module code.
    if (context & Context.Module) report(index, line, column, Errors.Unexpected);
    state = skipSingleLineComment();
    return Token.SingleComment;
  }

  /**
   * Skips SingleLineComment, SingleLineHTMLCloseComment and SingleLineHTMLOpenComment
   *
   *  @see [Link](https://tc39.github.io/ecma262/#prod-SingleLineComment)
   *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLOpenComment)
   *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLCloseComment)
   *
   * @param state Parser instance
   * @param returnToken Token to be returned
   */

  function skipSingleLineComment(): ScanState {
    while (index < length) {
      switch (currentChar) {
        case Chars.CarriageReturn:
          advanceNewline();
          if (index < length && nextChar() === Chars.LineFeed) index++;
          return state | ScanState.NewLine;
        case Chars.LineFeed:
        case Chars.LineSeparator:
        case Chars.ParagraphSeparator:
          advanceNewline();
          return state | ScanState.NewLine;

        default:
          nextChar();
      }
    }

    return state;
  }
  /**
   * Skips multiline comment
   *
   * @see [Link](https://tc39.github.io/ecma262/#prod-annexB-MultiLineComment)
   *
   * @param state Parser instance
   */
  function skipMultilineComment(): any {
    while (index < length) {
      switch (nextChar()) {
        case Chars.Asterisk:
          nextChar();
          state &= ~ScanState.LastIsCR;
          if (consumeOpt(Chars.Slash)) return state;
          break;

        case Chars.CarriageReturn:
          state |= ScanState.NewLine | ScanState.LastIsCR;
          advanceNewline();
          break;

        case Chars.LineFeed:
          consumeLineFeed((state & ScanState.LastIsCR) !== 0);
          state = (state & ~ScanState.LastIsCR) | ScanState.NewLine;
          break;

        case Chars.LineSeparator:
        case Chars.ParagraphSeparator:
          state = (state & ~ScanState.LastIsCR) | ScanState.NewLine;
          advanceNewline();
          break;

        default:
          state &= ~ScanState.LastIsCR;
      }
    }
  }

  /**
   * Scans maybe identifier
   */

  function scanMaybeIdentifier(): Token {
    switch (currentChar) {
      /* line terminators */
      case Chars.LineSeparator:
      case Chars.ParagraphSeparator:
        state = (state & ~ScanState.LastIsCR) | ScanState.NewLine;
        advanceNewline();
        return Token.WhiteSpace;
      /* whitespace */
      case Chars.NonBreakingSpace:
      case Chars.Ogham:
      case Chars.EnQuad:
      case Chars.EmQuad:
      case Chars.EnSpace:
      case Chars.EmSpace:
      case Chars.ThreePerEmSpace:
      case Chars.FourPerEmSpace:
      case Chars.SixPerEmSpace:
      case Chars.FigureSpace:
      case Chars.PunctuationSpace:
      case Chars.ThinSpace:
      case Chars.HairSpace:
      case Chars.NarrowNoBreakSpace:
      case Chars.MathematicalSpace:
      case Chars.IdeographicSpace:
      case Chars.Zwj:
        nextChar();
        return Token.WhiteSpace;
      default:
        if (
          (AsciiLookup[currentChar] & CharType.IDStart) > 0 ||
          ((unicodeLookup[(currentChar >>> 5) + 34816] >>> currentChar) & 31 & 1) > 0
        ) {
          nextChar();
          // TODO
        }
        return Token.Invalid;
    }
  }

  /**
   * Scans identifier
   */
  function scanKnownIdentifier(): Token {
    while ((AsciiLookup[nextChar()] & (CharType.IDContinue | CharType.Decimal)) > 0) {}
    tokenValue = source.slice(startIndex, index);
    return descKeywordTable[tokenValue] || Token.Identifier;
  }

  /**
   *  Scans numeric and decimal literal literal
   *
   * @see [https://tc39.github.io/ecma262/#prod-DecimalLiteral)
   * @see [https://tc39.github.io/ecma262/#prod-NumericLiteral)
   *
   * @param state Parser instance
   * @param context Context masks
   */

  function scanNumeric(isFloat: boolean): Token {
    if (isFloat) {
      tokenValue = 0;
    } else {
      // Hot path - fast path for decimal digits that fits into 4 bytes
      const maxDigits = 10;
      const digit = maxDigits - 1;
      tokenValue = currentChar - Chars.Zero;
      while (digit >= 0 && nextChar() <= Chars.Nine && currentChar >= Chars.Zero) {
        tokenValue = tokenValue * 10 + currentChar - Chars.Zero;
      }
    }
    return Token.NumericLiteral;
  }

  function parseEscape(context: Context): number {
    switch (currentChar) {
      // Magic escapes
      case Chars.LowerB:
        return Chars.Backspace;
      case Chars.LowerF:
        return Chars.FormFeed;
      case Chars.LowerR:
        return Chars.CarriageReturn;
      case Chars.LowerN:
        return Chars.LineFeed;
      case Chars.LowerT:
        return Chars.Tab;
      case Chars.LowerV:
        return Chars.VerticalTab;

      // Line continuations
      case Chars.CarriageReturn: {
        if (index < source.length) {
          const ch = source.charCodeAt(index);

          if (ch === Chars.LineFeed) {
            index = index + 1;
          }
        }
      }
      // falls through

      case Chars.LineFeed:
      case Chars.LineSeparator:
      case Chars.ParagraphSeparator:
        column = -1;
        line++;
        return Escape.Empty;

      // Null character, octals
      case Chars.Zero:
      case Chars.One:
      case Chars.Two:
      case Chars.Three: {
        // 1 to 3 octal digits
        let code = currentChar - Chars.Zero;
        let idx = index + 1;
        let col = column + 1;
        if (idx < source.length) {
          let next = source.charCodeAt(idx);
          if (next < Chars.Zero || next > Chars.Seven) {
            // Strict mode code allows only \0, then a non-digit.
            if (code !== 0 || next === Chars.Eight || next === Chars.Nine) {
              if (context & Context.Strict) return Escape.StrictOctal;
              // If not in strict mode, we mark the 'octal' as found and continue
              // parsing until we parse out the literal AST node
              //  state.flags = state.flags | Flags.HasOctal;
            }
          } else if (context & Context.Strict) {
            return Escape.StrictOctal;
          } else {
            // state.flags = state.flags | Flags.HasOctal;
            currentChar = next;
            code = code * 8 + (next - Chars.Zero);
            idx++;
            col++;

            if (idx < source.length) {
              next = source.charCodeAt(idx);

              if (next >= Chars.Zero && next <= Chars.Seven) {
                currentChar = next;
                code = code * 8 + (next - Chars.Zero);
                idx++;
                col++;
              }
            }

            index = idx - 1;
            column = col - 1;
          }
        }

        return code;
      }

      case Chars.Four:
      case Chars.Five:
      case Chars.Six:
      case Chars.Seven: {
        if (context & Context.Strict) return Escape.StrictOctal;
        let code = currentChar - Chars.Zero;
        const idx = index + 1;
        const col = column + 1;

        if (idx < source.length) {
          const next = source.charCodeAt(idx);
          if (next >= Chars.Zero && next <= Chars.Seven) {
            code = code * 8 + (next - Chars.Zero);
            currentChar = next;
            index = idx;
            column = col;
          }
        }

        return code;
      }

      // `8`, `9` (invalid escapes)
      case Chars.Eight:
      case Chars.Nine:
        return Escape.EightOrNine;

      // ASCII escapes
      case Chars.LowerX: {
        // 2 hex digits
        const ch1 = nextChar();
        const hi = toHex(ch1);
        if (hi < 0 || index >= length) return Escape.InvalidHex;
        const ch2 = nextChar();
        const lo = toHex(ch2);
        if (lo < 0) return Escape.InvalidHex;
        return hi * 16 + lo;
      }

      // UCS-2/Unicode escapes
      case Chars.LowerU: {
        if (nextChar() === Chars.LeftBrace) {
          // \u{N}
          let code = toHex(nextChar());
          if (code < 0) return Escape.InvalidHex;

          nextChar();
          while (currentChar !== Chars.RightBrace) {
            const digit = toHex(currentChar);
            if (digit < 0) return Escape.InvalidHex;
            code = (code << 4) | digit;
            // Code point out of bounds
            if (code > 0x10ffff) return Escape.OutOfRange;
            nextChar();
          }

          return code;
        } else {
          // \uNNNN
          let code = toHex(currentChar);
          if (code < 0) return Escape.InvalidHex;
          for (let i = 0; i < 3; i++) {
            const digit = toHex(nextChar());
            if (digit < 0) return Escape.InvalidHex;
            code = (code << 4) | digit;
          }
          return code;
        }
      }

      default:
        return nextUnicodeChar();
    }
  }

  /**
   * Throws a string error for either string or template literal
   *
   * @param state state object
   * @param context Context masks
   */
  function reportInvalidEscapeError(code: Escape, index: number, line: number, column: number): void {
    switch (code) {
      case Escape.StrictOctal:
        report(index, line, column, Errors.Unexpected);
      case Escape.EightOrNine:
        report(index, line, column, Errors.Unexpected);
      case Escape.InvalidHex:
        report(index, line, column, Errors.Unexpected);
      case Escape.OutOfRange:
        report(index, line, column, Errors.Unexpected);
      default:
        return;
    }
  }

  /**
   * Scan a string literal
   *
   * @see [Link](https://tc39.github.io/ecma262/#sec-literals-string-literals)
   *
   * @param state Parser instance
   * @param context Context masks
   */
  function scanString(context: Context, quote: number): Token {
    nextChar();
    let start = index;
    let ret = '';
    while (index < length) {
      if (currentChar === Chars.Backslash) {
        ret += source.slice(start, index);
        nextChar();
        if (currentChar >= Constants.Size) {
          ret += String.fromCodePoint(currentChar);
        } else {
          const code = parseEscape(context);
          nextChar();
          if (code >= 0) ret += String.fromCodePoint(code);
          else reportInvalidEscapeError(code as Escape, index, line, column);
          start = index;
        }
      } else if (currentChar === quote) {
        if (start < index) tokenValue += source.slice(start, index);
        return Token.StringLiteral;
      } else if ((currentChar & 0x53) < 3 && (currentChar === Chars.CarriageReturn || currentChar === Chars.LineFeed)) {
        report(index, line, column, Errors.Unexpected);
      } else {
        nextChar();
      }
    }
    if (currentChar !== quote) report(index, line, column, Errors.Unexpected);
    nextChar(); //  // Consume the quote
    tokenValue = ret;
    return Token.StringLiteral;
  }

  /**
   * Scans punctuators
   *
   * @param context Context masks
   */
  function next(context: Context): any {
    if (currentChar >= Constants.Size) return scanMaybeIdentifier();

    switch (currentChar) {
      /* line terminators */
      case Chars.CarriageReturn:
        state |= ScanState.NewLine | ScanState.LastIsCR;
        advanceNewline();
        return Token.WhiteSpace;

      case Chars.LineFeed:
        consumeLineFeed((state & ScanState.LastIsCR) !== 0);
        state = (state & ~ScanState.LastIsCR) | ScanState.NewLine;
        return Token.WhiteSpace;

      /* general whitespace */
      case Chars.Space:
      case Chars.Tab:
      case Chars.FormFeed:
      case Chars.VerticalTab:
        nextChar();
        return Token.WhiteSpace;

      // `0`...`9`
      case Chars.Zero:
      case Chars.One:
      case Chars.Two:
      case Chars.Three:
      case Chars.Four:
      case Chars.Five:
      case Chars.Six:
      case Chars.Seven:
      case Chars.Eight:
      case Chars.Nine:
        return scanNumeric(false);

      // `'string'`, `"string"`
      case Chars.SingleQuote:
      case Chars.DoubleQuote:
        return scanString(context, currentChar);

      // `/`, `/=`, `/>`, '/*..*/'
      case Chars.Slash: {
        nextChar();
        if (index < length) {
          if (currentChar === Chars.Slash) {
            nextChar();
            state = skipSingleLineComment();
            return Token.SingleComment;
          } else if (currentChar === Chars.Asterisk) {
            nextChar();
            state = skipMultilineComment();
            return Token.MultiComment;
          } else if (currentChar === Chars.EqualSign) {
            nextChar();
            return Token.DivideAssign;
          } else if (currentChar === Chars.GreaterThan) {
            nextChar();
            return Token.JSXAutoClose;
          }
        }
        return Token.Divide;
      }

      // `=`, `==`, `===`, `=>`
      case Chars.EqualSign: {
        nextChar();
        if (index >= source.length) return Token.Assign;
        if (currentChar === Chars.EqualSign) {
          nextChar();
          if (consumeOpt(Chars.EqualSign)) {
            return Token.StrictEqual;
          } else {
            return Token.LooseEqual;
          }
        } else if (currentChar === Chars.GreaterThan) {
          nextChar();
          return Token.Arrow;
        }

        return Token.Assign;
      }

      // `<`, `<=`, `<<`, `<<=`, `</`,  <!--
      case Chars.LessThan: {
        switch (nextChar()) {
          case Chars.LessThan:
            nextChar();
            if (consumeOpt(Chars.EqualSign)) {
              return Token.ShiftLeftAssign;
            } else {
              return Token.ShiftLeft;
            }

          case Chars.EqualSign:
            nextChar();
            return Token.LessThanOrEqual;

          case Chars.Slash: {
            if (!(context & Context.OptionsJSX)) break;
            const idx = index + 1;

            // Check that it's not a comment start.
            if (idx < length) {
              const next = source.charCodeAt(idx);
              if (next === Chars.Asterisk || next === Chars.Slash) break;
            }

            nextChar();
            return Token.JSXClose;
          }

          default:
            // ignore
            return Token.LessThan;
        }
      }

      // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
      case Chars.GreaterThan: {
        if (nextChar() === Chars.EqualSign) {
          nextChar();
          return Token.GreaterThanOrEqual;
        }
        if (currentChar !== Chars.GreaterThan) return Token.GreaterThan;
        nextChar();
        if (currentChar === Chars.GreaterThan) {
          nextChar();
          if (currentChar === Chars.EqualSign) {
            nextChar();
            return Token.LogicalShiftRightAssign;
          } else {
            return Token.LogicalShiftRight;
          }
        } else if (currentChar === Chars.EqualSign) {
          nextChar();
          return Token.ShiftRightAssign;
        }

        return Token.ShiftRight;
      }

      // `!`, `!=`, `!==`
      case Chars.Exclamation: {
        nextChar();
        if (!consumeOpt(Chars.EqualSign)) return Token.Negate;
        if (!consumeOpt(Chars.EqualSign)) return Token.LooseNotEqual;
        return Token.StrictNotEqual;
      }

      // `*`, `**`, `*=`, `**=`
      case Chars.Asterisk: {
        nextChar();
        if (currentChar === Chars.EqualSign) {
          nextChar();
          return Token.MultiplyAssign;
        }
        if (currentChar !== Chars.Asterisk) return Token.Multiply;
        if (nextChar() !== Chars.EqualSign) return Token.Exponentiate;
        nextChar();
        return Token.ExponentiateAssign;
      }

      // `%`, `%=`
      case Chars.Percent: {
        nextChar();
        if (!consumeOpt(Chars.EqualSign)) return Token.Modulo;
        return Token.ModuloAssign;
      }

      // `^`, `^=`
      case Chars.Caret: {
        if (nextChar() !== Chars.EqualSign) return Token.BitwiseXor;
        nextChar();
        return Token.BitwiseXorAssign;
      }

      // `&`, `&&`, `&=`
      case Chars.Ampersand: {
        nextChar();
        if (index >= source.length) return Token.BitwiseAnd;
        if (currentChar === Chars.Ampersand) {
          nextChar();
          return Token.LogicalAnd;
        }

        if (currentChar === Chars.EqualSign) {
          nextChar();
          return Token.BitwiseAndAssign;
        }

        return Token.BitwiseAnd;
      }

      // `+`, `++`, `+=`
      case Chars.Plus: {
        nextChar();
        if (index >= source.length) return Token.Add;
        if (currentChar === Chars.Plus) {
          nextChar();
          return Token.Increment;
        }
        if (currentChar === Chars.EqualSign) {
          nextChar();
          return Token.AddAssign;
        }
        return Token.Add;
      }

      // `-`, `--`, `-=`
      case Chars.Hyphen: {
        nextChar();
        if (index >= source.length) return Token.Subtract;
        if (currentChar === Chars.Hyphen) {
          if ((context & Context.Module) === 0 && nextChar() === Chars.GreaterThan && state & ScanState.NewLine) {
            nextChar();
            return skipSingleHTMLComment(context);
          }
          return Token.Decrement;
        }

        if (currentChar !== Chars.EqualSign) return Token.Subtract;
        nextChar();
        return Token.SubtractAssign;
      }

      // `|`, `||`, `|=`
      case Chars.VerticalBar: {
        nextChar();
        if (currentChar === Chars.VerticalBar) {
          nextChar();
          return Token.LogicalOr;
        } else if (currentChar === Chars.EqualSign) {
          nextChar();
          return Token.BitwiseOrAssign;
        }
        return Token.BitwiseOr;
      }

      // `.`, `...`, `.123` (numeric literal)
      case Chars.Period: {
        let idx = index + 1;
        if (idx < length) {
          const next = source.charCodeAt(idx);
          if (next === Chars.Period) {
            idx++;
            if (idx < source.length && source.charCodeAt(idx) === Chars.Period) {
              index = idx + 1;
              column += 3;
              currentChar = source.charCodeAt(idx);
              return Token.Ellipsis;
            }
          } else if (next >= Chars.Zero && next <= Chars.Nine) {
            return scanNumeric(true);
          }
        }
        nextChar();
        return Token.Period;
      }

      // `,`, `~`, `?`, `[`, `]`, `{`, `}`, `:`, `;`, `(` ,`)`, `"`, `'`, `@`
      case Chars.Comma:
        nextChar();
        return Token.Comma;
      case Chars.Tilde:
        nextChar();
        return Token.Complement;
      case Chars.QuestionMark:
        nextChar();
        return Token.QuestionMark;
      case Chars.LeftBracket:
        nextChar();
        return Token.LeftBracket;
      case Chars.RightBracket:
        nextChar();
        return Token.RightBracket;
      case Chars.LeftBrace:
        nextChar();
        return Token.LeftBrace;
      case Chars.RightBrace:
        nextChar();
        return Token.RightBrace;
      case Chars.Colon:
        nextChar();
        return Token.Colon;
      case Chars.Semicolon:
        nextChar();
        return Token.Semicolon;
      case Chars.LeftParen:
        nextChar();
        return Token.LeftParen;
      case Chars.RightParen:
        nextChar();
        return Token.RightParen;
      case Chars.At:
        nextChar();
        return Token.At;

      // `a`...`z`, `A`...`Z`, `_var`, `$var`
      case Chars.UpperA:
      case Chars.UpperB:
      case Chars.UpperC:
      case Chars.UpperD:
      case Chars.UpperE:
      case Chars.UpperF:
      case Chars.UpperG:
      case Chars.UpperH:
      case Chars.UpperI:
      case Chars.UpperJ:
      case Chars.UpperK:
      case Chars.UpperL:
      case Chars.UpperM:
      case Chars.UpperN:
      case Chars.UpperO:
      case Chars.UpperP:
      case Chars.UpperQ:
      case Chars.UpperR:
      case Chars.UpperS:
      case Chars.UpperT:
      case Chars.UpperU:
      case Chars.UpperV:
      case Chars.UpperW:
      case Chars.UpperX:
      case Chars.UpperY:
      case Chars.UpperZ:
      case Chars.Dollar:
      case Chars.Underscore:
      case Chars.LowerA:
      case Chars.LowerB:
      case Chars.LowerC:
      case Chars.LowerD:
      case Chars.LowerE:
      case Chars.LowerF:
      case Chars.LowerG:
      case Chars.LowerH:
      case Chars.LowerI:
      case Chars.LowerJ:
      case Chars.LowerK:
      case Chars.LowerL:
      case Chars.LowerM:
      case Chars.LowerN:
      case Chars.LowerO:
      case Chars.LowerP:
      case Chars.LowerQ:
      case Chars.LowerR:
      case Chars.LowerS:
      case Chars.LowerT:
      case Chars.LowerU:
      case Chars.LowerV:
      case Chars.LowerW:
      case Chars.LowerX:
      case Chars.LowerY:
      case Chars.LowerZ:
        return scanKnownIdentifier();
      default:
        report(index, line, column, Errors.Unexpected, String.fromCharCode(currentChar));
    }
  }

  /**
   * Skip whitespace and comments to the next token start or the end of file, whichever comes
   * first.
   */
  return function(context: Context): any {
    state = ScanState.None;

    while (index < length) {
      startIndex = index;
      if (((token = next(context)) & Token.WhiteSpace) !== Token.WhiteSpace) {
        return {
          type: token,
          tokenValue,
          newline: ScanState.NewLine !== 0,
          startIndex,
          line,
          column,
          end: index
        };
      }
    }

    return {
      type: Token.EndOfSource,
      tokenValue: '',
      newline,
      line,
      column,
      startIndex,
      end: index
    };
  };
}

/** PARSER CODE **/

import * as ESTree from './estree';
import { scan } from './lexer';
import { Options, EcmaVersion } from './types';
import { Context } from './common';
import { Token, KeywordDescTable } from './token';

function parseSource(
  source: string,
  options: Options | void,
  /*@internal*/
  context: Context
): any {
  let sourceFile = '';

  if (options !== undefined) {
    // The option to specify ecamVersion
    const ecmaVersion = options.ecmaVersion || 10;
    options.ecmaVersion = <EcmaVersion>(ecmaVersion > 2009 ? ecmaVersion - 2009 : ecmaVersion);

    // The flag to enable module syntax support
    if (options.module) context |= Context.Module;
    // The flag to enable stage 3 support (ESNext)
    if (options.next) context |= Context.OptionsNext;
    // The flag to enable React JSX parsing
    if (options.jsx) context |= Context.OptionsJSX;
    // The flag to enable start and end offsets to each node
    if (options.ranges) context |= Context.OptionsRanges;
    // The flag to enable line/column location information to each node
    if (options.loc) context |= Context.OptionsLoc;
    // The flag to attach raw property to each literal and identifier node
    if (options.raw) context |= Context.OptionsRaw;
    // The flag to allow return in the global scope
    if (options.globalReturn) context |= Context.OptionsGlobalReturn;
    // Set to true to record the source file in every node's loc object when the loc option is set.
    if (!!options.source) sourceFile = options.source;
    // The flag to enable implied strict mode
    if (options.impliedStrict) context |= Context.Strict;
    // The flag to enable experimental features
    if (options.experimental) context |= Context.OptionsExperimental;
    // The flag to enable "native" NodeJS / V8 features
    if (options.native) context |= Context.OptionsNative;
    // The flag to enable tokenizing
    if (options.tokenize) context |= Context.OptionsTokenize;
    // The flag to disable web compability (AnnexB)
    if (options.disableWebCompat) context |= Context.OptionDisablesWebCompat;
  }

  const getToken = scan(source);

  let currentToken = getToken(context);
  let nextToken = getToken(context);

  // See: https://www.ecma-international.org/ecma-262/9.0/index.html#sec-exports-static-semantics-exportednames
  let exportedNames = {};
  // See: https://www.ecma-international.org/ecma-262/9.0/index.html#sec-exports-static-semantics-exportedbindings
  let exportedBindings = {};

  const scope = {};

  const body = parseModuleItemOrStatementList(context);

  /**
   * Parse module item or statement list
   *
   * @see [Link](https://tc39.github.io/ecma262/#prod-ModuleItemList)
   * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
   *
   * @param context Context masks
   */
  function parseModuleItemOrStatementList(context: Context): any[] {
    while (currentToken.type !== Token.EndOfSource) {
      currentToken = getToken(context);
    }

    return ['fkleuver'];
  }

  return {
    type: 'Program',
    sourceType: context & Context.Module ? 'module' : 'script',
    body: body
  };
}

/**
 * Parse either script code or module code
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-scripts)
 * @see [Link](https://tc39.github.io/ecma262/#sec-modules)
 *
 * @param source source code to parse
 * @param options parser options
 */
export function parse(source: string, options?: Options): ESTree.Program {
  return options && options.module ? parseModule(source, options) : parseScript(source, options);
}

/**
 * Parse script code
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-scripts)
 *
 * @param source source code to parse
 * @param options parser options
 */
export function parseScript(source: string, options?: Options): ESTree.Program {
  return parseSource(source, options, Context.None);
}

/**
 * Parse module code
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-modules)
 *
 * @param source source code to parse
 * @param options parser options
 */
export function parseModule(source: string, options?: Options): ESTree.Program {
  return parseSource(source, options, Context.Strict | Context.Module);
}
