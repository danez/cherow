import * as ESTree from '../estree';
import { ParserState, Location } from '../types';
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

export function parseModuleItemList(state: ParserState, context: Context): ESTree.Statement[] {
  nextToken(state, context);
  const statements: ESTree.Statement[] = [];
  while (state.token !== Token.EndOfSource) {
      statements.push(parseModuleItem());
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
function parseModuleItem(): any {
  return ['TODO!'];
}
