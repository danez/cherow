import { nextChar } from './common';
import { ParserState } from '../types';
import { Token } from '../token';
import { Chars } from '../chars';
import { report, Errors } from '../errors';

export function scanString(state: ParserState): Token {
const quote = state.currentChar;
nextChar(state);

let start = state.index;

while (state.currentChar !== quote) {

  switch (state.currentChar) {
    case Chars.CarriageReturn:
    if (nextChar(state) === Chars.LineFeed) {
      nextChar(state);
      state.index++;
      break;
  }
    case Chars.LineFeed:
        report(state, Errors.Unexpected);
    case Chars.Backslash:
          start = state.index;
        break;
     default:
    nextChar(state);
}

}
  state.tokenValue = state.source.slice(start, state.index);
  nextChar(state);
  return Token.StringLiteral;
}
