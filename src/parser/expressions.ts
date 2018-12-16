import * as ESTree from '../estree';
import { ParserState, ScopeState } from '../types';
import { nextToken } from '../lexer/scan';
import { updateToken } from './common';
import { Token, KeywordDescTable } from '../token';
import {
  Context,
  Flags,
} from '../common';

export function parseAssignmentExpression(state: ParserState, context: Context): any {
  let c = context;
  if (state.assignable && state.currentToken & Token.IsAssignOp) {}
  nextToken(state, context);
  return ['TODO!'];
}
