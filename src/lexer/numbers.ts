import { Context, Flags } from '../common';
import { nextChar, toHex, fromCodePoint } from './common';
import { ParserState } from '../types';
import { Token } from '../token';
import { Chars, AsciiLookup, CharType } from '../chars';
import { report, Errors } from '../errors';
import { unicodeLookup } from '../unicode';

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
    let digit = maxDigits - 1;
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
    }
    const start = state.index;
    let value = state.currentChar - Chars.Zero;
    while (nextChar(state) <= Chars.Nine && state.currentChar >= Chars.Zero) {
      value = value * 10 + state.currentChar  - Chars.Zero;
    }
    state.tokenValue = state.tokenValue + value / 10 ** (state.index - start);
  }

  let isBigInt = false;

  if (context & Context.OptionsNext && state.currentChar === Chars.LowerN) {
      if (isFloat) report(state, Errors.Unexpected);
      isBigInt = true;
      nextChar(state);
  }

  return isBigInt ? Token.BigInt : Token.NumericLiteral;
}


