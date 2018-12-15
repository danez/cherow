import { Context, Flags } from '../common';
import { ParserState } from '../types';
import { report, Errors } from '../errors';
import { nextChar, fromCodePoint, toHex } from './common';
import { Chars, isIdentifierPart, AsciiLookup, CharType } from '../chars';
import { Token, descKeywordTable } from '../token';

/**
 * Scans identifier
 *
 * @param state ParserState instance
 * @param context Context masks
 */
export function scanIdentifier(
  state: ParserState,
  context: Context,
  currentChar: number,
  start: number): Token {
  const c = context;
  const adfadsf = currentChar;
  state.column++;
  if (state.index < state.length) {
    let next = state.currentChar;
    while ((AsciiLookup[next] & (CharType.IDContinue | CharType.Decimal)) > 0) next = nextChar(state)
    state.tokenValue = state.source.slice(start, state.index);
    if (next === Chars.Backslash) {
      // TODO!
    }
    return descKeywordTable[state.tokenValue] || Token.Identifier;
  }
  state.tokenValue = state.source.slice(start, state.index);
  return Token.Identifier;
}
