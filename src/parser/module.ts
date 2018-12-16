import * as ESTree from '../estree';
import { ParserState, Scope, Location } from '../types';
import { nextToken } from '../lexer/scan';
import { Token, KeywordDescTable } from '../token';
import {
  Context,
  Flags,
} from '../common';

/**
 * Parse module item list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ModuleItemList)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */

export function parseModuleItemList(state: ParserState, context: Context, scope: Scope): ESTree.Statement[] {
  nextToken(state, context);
  const statements: ESTree.Statement[] = [];
  while (state.token !== Token.EndOfSource) {
      statements.push(parseModuleItem(state, context, scope));
  }

  return statements;
}

/**
 * Parse module item
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ModuleItem)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseModuleItem(state: ParserState, context: Context, scope: Scope): any {
  const s = state;
  const c = context;
  const sc = scope;
  return ['TODO!'];
}
