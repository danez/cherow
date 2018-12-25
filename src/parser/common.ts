import { Token } from '../token';
import { ParserState } from '../types';
import { Context } from '../common';
import { nextToken } from '../lexer/scan';
import { Errors, report } from '../errors';

/**
 * Update token
 *
 * @export
 * @param ParserState state
 * @param Token token
 */
export function updateToken(state: ParserState, token: Token) {
  state.previousToken = state.currentToken;
  state.currentToken = token;
}

export function optional(
  state: ParserState,
  context: Context,
  token: Token
): boolean {
  if (state.currentToken !== token) return false;
  nextToken(state, context);
  return true;
}

export function expect(
  state: ParserState,
  context: Context,
  t: Token
): boolean {
  if (state.currentToken !== t) {
    report(state, Errors.Unexpected);
    return false;
  }
  updateToken(state, nextToken(state, context));
  return true;
}
