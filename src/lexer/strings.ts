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
  if (state.currentChar === Chars.Backslash) {
    start = state.index;
  } else if (state.currentChar === 0) {
      report(state, Errors.Unexpected);
  } else {
    nextChar(state);
  }
}
  state.tokenValue = state.source.slice(start, state.index);
  nextChar(state);
  return Token.StringLiteral;
}
