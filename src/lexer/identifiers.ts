import { AsciiLookup, Chars, CharType, isIdentifierPart } from '../chars';
import { Context, Flags } from '../common';
import { Errors, report } from '../errors';
import { descKeywordTable, Token } from '../token';
import { ParserState } from '../types';
import { unicodeLookup } from '../unicode';
import { fromCodePoint, nextChar, toHex } from './common';

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
