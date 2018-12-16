import * as ESTree from '../estree';
import { ParserState, Location } from '../types';
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

export function parseStatementList(state: ParserState, context: Context): ESTree.Statement[] {
  nextToken(state, context);
  const statements: ESTree.Statement[] = [];
  while (state.token !== Token.EndOfSource) {
      statements.push(parseStatementListItem());
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
function parseStatementListItem(): any {
  return ['TODO!'];
}
