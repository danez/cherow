import * as ESTree from '../estree';
import { ParserState, ScopeState } from '../types';
import { nextToken } from '../lexer/scan';
import { expect, optional } from './common';
import { parseAssignmentExpression } from './expressions';

import { Token, KeywordDescTable } from '../token';
import {
  Context,
  Flags,
} from '../common';

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param Parser instance
 * @param Context masks
 */

export function parseStatementList(state: ParserState, context: Context, scope: ScopeState): ESTree.Statement[] {
  nextToken(state, context);
  const statements: ESTree.Statement[] = [];
  const isStrict = !!(context & Context.Strict);
  while (state.currentToken !== Token.EndOfSource) {
    statements.push(parseStatementListItem(state, context, scope));
  }

  return statements;
}

/**
 * Parses statement list items
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementListItem)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseStatementListItem(state: ParserState, context: Context, scope: ScopeState): any {
  return parseStatement(state, context, scope);
}

/**
 * Parses statements
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Statement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
export function parseStatement(state: ParserState, context: Context, scope: ScopeState): any {
  switch (state.currentToken) {
    case Token.DoKeyword:
        return parseDoWhileStatement(state, context, scope);
    default:
      return parseExpressionOrLabelledStatement(state, context);
  }
}

export function parseDoWhileStatement(state: ParserState, context: Context, scope: ScopeState): any {
  expect(state, context, Token.DoKeyword);
  const body = parseStatement(state, context, scope);
 /* expect(state, context, Token.WhileKeyword);
  expect(state, context, Token.LeftParen);
  //const test = parseExpression(state, context);
  expect(state, context, Token.RightParen);
  optional(state, context, Token.Semicolon);*/
  return {
      type: 'DoWhileStatement',
      body: [],
      test: {}
  };
}

/**
 * Parses either expression or labelled statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 * @see [Link](https://tc39.github.io/ecma262/#prod-LabelledStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
export function parseExpressionOrLabelledStatement(
  state: ParserState,
  context: Context): any {
    return parseAssignmentExpression(state, context);
  }
