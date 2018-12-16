import * as ESTree from '../estree';
import { ParserState, Scope } from '../types';
import { nextToken } from '../lexer/scan';
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

export function parseStatementList(state: ParserState, context: Context, scope: Scope): ESTree.Statement[] {
  nextToken(state, context);
  const statements: ESTree.Statement[] = [];
  const isStrict = !!(context & Context.Strict);
  while (state.token !== Token.EndOfSource) {
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
function parseStatementListItem(state: ParserState, context: Context, scope: Scope): any {
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
export function parseStatement(state: ParserState, context: Context, scope: Scope): any {
  const s = state;
  const c = context;
  const sc = scope;

  return ['TODO!'];
}
