import { Context, Flags } from '../common';
import { ParserState } from '../types';
import { report, Errors } from '../errors';
import { nextChar, fromCodePoint, toHex } from './common';
import { Chars, isIdentifierPart, AsciiLookup, CharType } from '../chars';
import { Token, descKeywordTable } from '../token';
import { unicodeLookup } from '../unicode';

/**
 * Scans identifier
 *
 * @param state ParserState instance
 * @param context Context masks
 */
export function scanIdentifier(state: ParserState): Token {
  while ((AsciiLookup[nextChar(state)] & (CharType.IDContinue | CharType.Decimal)) > 0) {}
  state.tokenValue = state.source.slice(state.startIndex, state.index);
  return descKeywordTable[state.tokenValue] || Token.Identifier;
}
