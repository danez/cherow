import * as ESTree from '../estree';
import { ParserState, ScopeState } from '../types';
import { nextToken } from '../lexer/scan';
import { expect, optional } from './common';
import { parseAssignmentExpression } from './expressions';
import { Errors, report } from '../errors';
import { Token, KeywordDescTable } from '../token';
import { createChildScope, ScopeFlags } from '../scope';
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
    case Token.TryKeyword:
        return parseTryStatement(state, context, scope);
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
* Parses block statement
*
* @see [Link](https://tc39.github.io/ecma262/#prod-BlockStatement)
* @see [Link](https://tc39.github.io/ecma262/#prod-Block)
*
* @param state  state object
* @param context Context masks
*/
export function parseBlockStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.BlockStatement {
  const body: ESTree.Statement[] = [];
  nextToken(state, context);
  while (state.currentToken !== Token.RightBrace) {
      body.push(parseStatementListItem(state, context, scope));
  }
  expect(state, context | Context.ExpressionStart, Token.RightBrace);

  return {
      type: 'BlockStatement',
      body
  };
}

/**
 * Parses try statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-TryStatement)
 *
 * @param state  parser instance
 * @param context Context masks
 */
export function parseTryStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.TryStatement {
  nextToken(state, context);
  const block = parseBlockStatement(state, context, createChildScope(scope, ScopeFlags.Block));
  const handler = state.currentToken === Token.CatchKeyword ? parseCatchBlock(state, context, scope) : null;
  const finalizer = optional(state, context, Token.FinallyKeyword) ? parseBlockStatement(state, context, scope) : null;
  if (!handler && !finalizer)  report(state, Errors.Unexpected);
  return {
      type: 'TryStatement',
      block,
      handler,
      finalizer
  };
}

/**
 * Parses catch block
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Catch)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
export function parseCatchBlock(state: ParserState, context: Context, scope: ScopeState): ESTree.CatchClause {
   // TryStatement ::
  //   'try' Block Catch
  //   'try' Block Finally
  //   'try' Block Catch Finally
  //
  // Catch ::
  //   'catch' '(' Identifier ')' Block
  //
  // Finally ::
  //   'finally' Block
  nextToken(state, context);

  let param: any = null;
  if (optional(state, context, Token.LeftParen)) {
      if (state.currentToken === Token.RightParen) report(state, Errors.Unexpected);
      //param = {}; parseBindingIdentifierOrPattern(state, context);
      if (state.currentToken === Token.Assign)  report(state, Errors.Unexpected);
      expect(state, context, Token.RightParen);
  }
  const body = parseBlockStatement(state, context, scope);

  return {
      type: 'CatchClause',
      param,
      body
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
