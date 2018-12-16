import { AsciiLookup, Chars, CharType } from '../chars';
import { Context, Flags } from '../common';
import { Errors, report } from '../errors';
import { Token } from '../token';
import { ParserState } from '../types';
import { unicodeLookup } from '../unicode';
import { fromCodePoint, nextChar, toHex } from './common';

/**
 *  Scans numeric and decimal literal literal
 *
 * @see [https://tc39.github.io/ecma262/#prod-DecimalLiteral)
 * @see [https://tc39.github.io/ecma262/#prod-NumericLiteral)
 *
 * @param state Parser instance
 * @param context Context masks
 */
export function scanNumber(
  state: ParserState,
  context: Context, isFloat: boolean): Token {

  if (isFloat) {
    state.tokenValue = 0;
  } else {

    // Hot path - fast path for decimal digits that fits into 4 bytes
    const maxDigits = 10;
    const digit = maxDigits - 1;
    state.tokenValue = state.currentChar - Chars.Zero;
    while (digit >= 0 && nextChar(state) <= Chars.Nine && state.currentChar >= Chars.Zero) {
      state.tokenValue = state.tokenValue * 10 + state.currentChar  - Chars.Zero;
    }

    if (digit >= 0 && state.currentChar !== Chars.Period && ((AsciiLookup[state.currentChar] & CharType.IDStart) < 0 ||
       (unicodeLookup[(state.currentChar >>> 5) + 34816] >>> state.currentChar & 31 & 1) < 1)) {
        return Token.NumericLiteral;
    }
  }

  if (isFloat || state.currentChar === Chars.Period) {
    if (!isFloat) {
      nextChar(state);
      isFloat = true;
    }
    while (nextChar(state) <= Chars.Nine && state.currentChar >= Chars.Zero) {}
  }

  let isBigInt = false;

  if (context & Context.OptionsNext && state.currentChar === Chars.LowerN) {
      if (isFloat) report(state, Errors.Unexpected);
      isBigInt = true;
      nextChar(state);
  }

  // Consume any exponential notation
  if (state.currentChar === Chars.UpperE || state.currentChar === Chars.LowerE) {
    nextChar(state);
    if (state.currentChar === Chars.Plus || state.currentChar === Chars.Hyphen) {
        nextChar(state);
    }

    // Exponential notation must contain at least one digit
    if (!(state.currentChar >= Chars.Zero && state.currentChar <= Chars.Nine)) {
        report(state, Errors.Unexpected);
    }

    // Consume exponential digits.
    while (nextChar(state) <= Chars.Nine && state.currentChar >= Chars.Zero) {}
}

// Numbers can't be followed by  an identifier start
  if ((AsciiLookup[state.currentChar] & CharType.IDStart) > 0 ||
    (unicodeLookup[(state.currentChar >>> 5) + 34816] >>> state.currentChar & 31 & 1) > 0) {
    report(state, Errors.Unexpected);
}

  state.tokenValue = state.source.slice(state.startIndex, state.index);
  return isBigInt ? Token.BigInt : Token.NumericLiteral;
}
