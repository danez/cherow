import { nextChar, nextUnicodeChar, fromCodePoint } from './common';
import { ParserState } from '../types';
import { Token } from '../token';
import { Chars } from '../chars';
import { report, Errors } from '../errors';
import { Context, Flags } from '../common';

export const table = new Array < (state: ParserState, context: Context) => number > (128).fill(nextUnicodeChar);

table[Chars.LowerB] = () => Chars.Backspace;
table[Chars.LowerF] = () => Chars.FormFeed;
table[Chars.LowerR] = () => Chars.CarriageReturn;
table[Chars.LowerN] = () => Chars.LineFeed;
table[Chars.LowerT] = () => Chars.Tab;
table[Chars.LowerV] = () => Chars.VerticalTab;
table[Chars.DoubleQuote] = () => Chars.DoubleQuote;
table[Chars.SingleQuote] = () => Chars.SingleQuote;
table[Chars.Backslash] = () => Chars.Backslash;

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

let code = 0;
let start = state.index;
let ret: any = '';

while (state.currentChar !== quote) {
  if (state.currentChar === Chars.Backslash) {
    ret += state.source.slice(start, state.index);
    nextChar(state);
    if (state.currentChar >= 0x80) {
     ret += fromCodePoint(state.currentChar);
    } else {
       code = table[state.currentChar](state, context);
       nextChar(state);
       ret += String.fromCharCode(code)
       start = state.index;
    }
  } else if ((state.currentChar & 0x53) < 3 && (state.currentChar === Chars.CarriageReturn || state.currentChar === Chars.LineFeed)) {
    report(state, Errors.Unexpected);
  } else {
    nextChar(state);
  }
}
  state.tokenValue = state.source.slice(start, state.index);
  nextChar(state);
  return Token.StringLiteral;
}
