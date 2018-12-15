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
export function scanIdentifier(state: ParserState, context: Context): Token {
  state.column++;
  if (state.index < state.length) {
    while ((AsciiLookup[state.currentChar] & (CharType.IDContinue | CharType.Decimal)) > 0) nextChar(state)
    state.tokenValue = state.source.slice(state.start, state.index);
    if (state.currentChar <= Chars.MaxAsciiCharacter || state.currentChar !== Chars.Backslash) {
      if (context & Context.OptionsRaw) state.tokenRaw = state.tokenValue;
      return descKeywordTable[state.tokenValue] || Token.Identifier;
    }
    return scanIdentifierRest(state, context);
  }
  state.tokenValue = state.source.slice(state.start, state.index);
  return Token.Identifier;
}

/**
 * Scans the rest of the identifiers. It's the slow path that has to deal with multi unit encoding
 *
 * @param state ParserState instance
 * @param context Context masks
 */
export function scanIdentifierRest(state: ParserState, context: Context): Token {
  let start = state.index;
  let c = context;
  if (start < state.index) state.tokenValue += state.source.slice(start, state.index)
  return Token.Identifier;
}
