import * as ESTree from '../estree';
import { ParserState, ScopeState } from '../types';
import { nextToken } from '../lexer/scan';
import { updateToken, optional } from './common';
import { Token, KeywordDescTable } from '../token';
import {
  Context,
  Flags,
} from '../common';

export function parseExpression(state: ParserState, context: Context): any {
  const expr = parseAssignmentExpression(state, context);
  if (state.currentToken !== Token.Comma) return expr;
  return parseSequenceExpression(state, context, expr);
}

/**
* Parse secuence expression
*
* @param parser Parser object
* @param context Context masks
*/

export function parseSequenceExpression(
  state: ParserState,
  context: Context,
  left: ESTree.Expression,
): ESTree.SequenceExpression {
  const expressions: ESTree.Expression[] = [left];
  while (optional(state, context, Token.Comma)) {
      expressions.push(parseAssignmentExpression(state, context));
  }
  return {
      type: 'SequenceExpression',
      expressions,
  };
}

export function parseAssignmentExpression(state: ParserState, context: Context): any {
  let c = context;
  if (state.assignable && state.currentToken & Token.IsAssignOp) {}
  nextToken(state, context);
  return ['TODO!'];
}
