import { Context, Flags } from '../common';
import { ParserState } from '../types';
import { Token } from '../token';
import { Chars } from '../chars';

/**
 * Scans and return the next token in the stream.,
 *
 * @param state Parserstate instance
 * @param context Context masks
 */
export function nextToken(state: ParserState): Token {
  return state.token = Token.EndOfSource;
}
