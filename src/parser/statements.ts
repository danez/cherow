import { BindingOrigin, BindingType, Context, Flags } from '../common';
import { Errors, report } from '../errors';
import * as ESTree from '../estree';
import { nextToken } from '../lexer/scan';
import { createChildScope, verifyLexicalBindings, ScopeFlags } from '../scope';
import { KeywordDescTable, Token } from '../token';
import { ParserState, ScopeState } from '../types';
import { consumeSemicolon, expect, optional } from './common';
import { parseFunctionDeclaration, parseVariableDeclarationList } from './declarations';
import { parseAssignmentExpression, parseExpression, parseIdentifier } from './expressions';
import { parseBindingIdentifierOrPattern } from './pattern';

/**
 * Parse statement list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 */

export function parseStatementList(state: ParserState, context: Context, scope: ScopeState): ESTree.Statement[] {
  nextToken(state, context);
  const statements: ESTree.Statement[] = [];
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
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseStatementListItem(state: ParserState, context: Context, scope: ScopeState): any {
  switch (state.currentToken) {
    case Token.FunctionKeyword:
        return parseFunctionDeclaration(state, context, scope, false);
   /* case Token.ClassKeyword:
        return parseClassDeclaration(state, context);*/
    case Token.ConstKeyword:
        return parseLexicalDeclaration(state, context, BindingType.Const, BindingOrigin.Statement, scope);
    case Token.LetKeyword:
        return parseLexicalDeclaration(state, context, BindingType.Let, BindingOrigin.Statement, scope);
    /*case Token.LetKeyword:
        return parseLetOrExpressionStatement(state, context);
    case Token.AsyncKeyword:
        return parseAsyncFunctionOrExpressionStatement(state, context);*/
    default:
        return parseStatement(state, context, scope);
  }
}

/**
 * Parses statements
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Statement)
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseStatement(state: ParserState, context: Context, scope: ScopeState): any {
  switch (state.currentToken) {
    case Token.VarKeyword:
        return parseVariableStatement(state, context, BindingType.Variable, BindingOrigin.Statement, scope);
    case Token.TryKeyword:
        return parseTryStatement(state, context, scope);
     case Token.SwitchKeyword:
      return parseSwitchStatement(state, context, scope);
    case Token.DoKeyword:
        return parseDoWhileStatement(state, context, scope);
    case Token.ReturnKeyword:
        return parseReturnStatement(state, context);
    case Token.IfKeyword:
        return parseIfStatement(state, context, scope);
    case Token.WhileKeyword:
        return parseWhileStatement(state, context, scope);
    case Token.WithKeyword:
        return parseWithStatement(state, context, scope);
    case Token.BreakKeyword:
        return parseBreakStatement(state, context);
    case Token.ContinueKeyword:
         return parseContinueStatement(state, context);
    case Token.DebuggerKeyword:
        return parseDebuggerStatement(state, context);
    case Token.ThrowKeyword:
        return parseThrowStatement(state, context);
    case Token.Semicolon:
        return parseEmptyStatement(state, context);
    case Token.LeftBrace:
        return parseBlockStatement(state, context, createChildScope(scope, ScopeFlags.Block));
    case Token.FunctionKeyword:
        report(state, context & Context.Strict ? Errors.StrictFunction : Errors.SloppyFunction);
        // falls through
    case Token.ClassKeyword:
      report(state, Errors.Unexpected);
    default:
      return parseExpressionOrLabelledStatement(state, context);
  }
}

/**
* Parses the if statement production
*
* @see [Link](https://tc39.github.io/ecma262/#sec-if-statement)
*
* @param state Parser instance
* @param context Context masks
* @param scope Scope instance
*/
export function parseIfStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.IfStatement {
   nextToken(state, context);
   expect(state, context | Context.ExpressionStart, Token.LeftParen);
   const test = parseExpression(state, context);
   expect(state, context, Token.RightParen);
   const consequent = parseConsequentOrAlternate(state, context, scope);
   const alternate = optional(state, context, Token.ElseKeyword) ? parseConsequentOrAlternate(state, context, scope) : null;
   return {
      type: 'IfStatement',
      test,
      consequent,
      alternate
  };
}

/**
* Parse either consequent or alternate. Supports AnnexB.
*
* @param state Parser instance
* @param context Context masks
* @param scope Scope instance
*/

function parseConsequentOrAlternate(state: ParserState, context: Context, scope: ScopeState): any {
  return context & Context.OptionDisablesWebCompat ||
          context & Context.Strict || state.currentToken !== Token.FunctionKeyword ?
      parseStatement(state, (context | Context.ScopeRoot) ^ Context.ScopeRoot, scope) :
      parseFunctionDeclaration(state, context | Context.DisallowGenerator, scope, true);
}

/**
* Parses return statement
*
* @see [Link](https://tc39.github.io/ecma262/#prod-ReturnStatement)
*
* @param state  Parser instance
* @param context Context masks
*/
export function parseReturnStatement(state: ParserState, context: Context): ESTree.ReturnStatement {
  nextToken(state, context | Context.ExpressionStart);
  const argument = (state.currentToken & Token.ASI) < 1 && (state.flags & Flags.LineTerminator) < 1 ?
      parseExpression(state, context  & ~Context.InFunctionBody) :
      null;
  consumeSemicolon(state, context);
  return {
      type: 'ReturnStatement',
      argument
  };
}

/**
* Parses while statement
*
* @see [Link](https://tc39.github.io/ecma262/#prod-grammar-notation-WhileStatement)
*
* @param state Parser instance
* @param context Context masks
* @param scope Scope instance
*/
export function parseWhileStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.WhileStatement {
  nextToken(state, context);
  expect(state, context | Context.ExpressionStart, Token.LeftParen);
  const test = parseExpression(state, context);
  expect(state, context, Token.RightParen);
  const body = parseStatement(state, (context | Context.ScopeRoot) ^ Context.ScopeRoot, scope);
  return {
      type: 'WhileStatement',
      test,
      body
  };
}

/**
* Parses the continue statement production
*
* @see [Link](https://tc39.github.io/ecma262/#prod-ContinueStatement)
*
* @param state  Parser instance
* @param context Context masks
*/
export function parseContinueStatement(state: ParserState, context: Context): ESTree.ContinueStatement {
  nextToken(state, context);
  let label: ESTree.Identifier | undefined | null = null;
  if (!(state.flags & Flags.LineTerminator) && state.currentToken & Token.Keyword) {
      const tokenValue = state.tokenValue;
      label = parseIdentifier(state, context);
  }
  consumeSemicolon(state, context);

  return {
      type: 'ContinueStatement',
      label
  };
}

/**
* Parses the break statement production
*
* @see [Link](https://tc39.github.io/ecma262/#prod-BreakStatement)
*
* @param state  Parser instance
* @param context Context masks
*/
export function parseBreakStatement(state: ParserState, context: Context): ESTree.BreakStatement {
  nextToken(state, context);
  let label = null;
  if (!(state.flags & Flags.LineTerminator) && state.currentToken & Token.Keyword) {
      label = parseIdentifier(state, context);
  }
  consumeSemicolon(state, context);
  return {
      type: 'BreakStatement',
      label
  };
}

/**
* Parses with statement
*
* @see [Link](https://tc39.github.io/ecma262/#prod-WithStatement)
*
* @param state Parser instance
* @param context Context masks
* @param scope Scope instance
*/
export function parseWithStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.WithStatement {
  nextToken(state, context);
  expect(state, context | Context.ExpressionStart, Token.LeftParen);
  const object = parseAssignmentExpression(state, context);
  expect(state, context, Token.RightParen);
  const body = parseStatement(state, (context | Context.ScopeRoot) ^ Context.ScopeRoot, scope);
  return {
      type: 'WithStatement',
      object,
      body
  };
}

/**
 * Parses the debugger statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-DebuggerStatement)
 *
 * @param state  Parser instance
 * @param context Context masks
 */
export function parseDebuggerStatement(state: ParserState, context: Context): ESTree.DebuggerStatement {
  nextToken(state, context);
  consumeSemicolon(state, context);
  return {
      type: 'DebuggerStatement'
  };
}

/**
* Parses do while statement
*
* @param state Parser instance
* @param context Context masks
* @param scope Scope instance
*/
export function parseDoWhileStatement(state: ParserState, context: Context, scope: ScopeState): any {
  expect(state, context, Token.DoKeyword);
  const body = parseStatement(state, (context | Context.ScopeRoot) ^ Context.ScopeRoot, scope);
  expect(state, context, Token.WhileKeyword);
  expect(state, context, Token.LeftParen);
  const test = parseExpression(state, context);
  expect(state, context, Token.RightParen);
  optional(state, context, Token.Semicolon);
  return {
      type: 'DoWhileStatement',
      body,
      test
  };
}

/**
* Parses block statement
*
* @see [Link](https://tc39.github.io/ecma262/#prod-BlockStatement)
* @see [Link](https://tc39.github.io/ecma262/#prod-Block)
*
* @param state Parser instance
* @param context Context masks
* @param scope Scope instance
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
 * Parses switch statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-SwitchStatement)
 *
* @param state Parser instance
* @param context Context masks
* @param scope Scope instance
 */
function parseSwitchStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.SwitchStatement {
  nextToken(state, context);
  expect(state, context | Context.ExpressionStart, Token.LeftParen);
  const discriminant = parseExpression(state, context);
  expect(state, context, Token.RightParen);
  expect(state, context, Token.LeftBrace);
  const cases: ESTree.SwitchCase[] = [];
  let seenDefault = false;
  const switchScope = createChildScope(scope, ScopeFlags.Switch);
  while (state.currentToken !== Token.RightBrace) {
      let test: ESTree.Expression | null = null;
      if (optional(state, context, Token.CaseKeyword)) {
          test = parseExpression(state, context);
      } else {
          expect(state, context, Token.DefaultKeyword);
          if (seenDefault) report(state, Errors.Unexpected);
          seenDefault = true;
      }
      cases.push(parseCaseOrDefaultClauses(state, context, test, switchScope));
  }

  expect(state, context, Token.RightBrace);
  return {
      type: 'SwitchStatement',
      discriminant,
      cases
  };
}

/**
 * Parses either default clause or case clauses
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-CaseClauses)
 * @see [Link](https://tc39.github.io/ecma262/#prod-DefaultClause)
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseCaseOrDefaultClauses(
  state: ParserState,
  context: Context,
  test: ESTree.Expression | null,
  scope: ScopeState
): ESTree.SwitchCase {
  expect(state, context, Token.Colon);
  const consequent: ESTree.Statement[] = [];
  while (state.currentToken !== Token.CaseKeyword &&
         state.currentToken !== Token.RightBrace &&
         state.currentToken !== Token.DefaultKeyword) {
      consequent.push(parseStatementListItem(state, (context | Context.ScopeRoot) ^ Context.ScopeRoot, scope));
  }
  return {
      type: 'SwitchCase',
      test,
      consequent
  };
}

/**
* Parses throw statement
*
* @see [Link](https://tc39.github.io/ecma262/#prod-ThrowStatement)
*
* @param state  Parser instance
* @param context Context masks
*/
export function parseThrowStatement(state: ParserState, context: Context): ESTree.ThrowStatement {
  nextToken(state, context);
  const argument: ESTree.Expression = parseExpression(state, context);
  consumeSemicolon(state, context);
  return {
      type: 'ThrowStatement',
      argument
  };
}

/**
 * Parses empty statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-EmptyStatement)
 *
 * @param state  Parser instance
 * @param context Context masks
 */
export function parseEmptyStatement(state: ParserState, context: Context): ESTree.EmptyStatement {
  nextToken(state, context);
  return {
    type: 'EmptyStatement'
  };
}

/**
 * Parses try statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-TryStatement)
 *
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
 */
export function parseTryStatement(state: ParserState, context: Context, scope: ScopeState): ESTree.TryStatement {
  nextToken(state, context);
  const block = parseBlockStatement(state, context, createChildScope(scope, ScopeFlags.Block));
  const handler = optional(state, context, Token.CatchKeyword)  ? parseCatchBlock(state, context, scope) : null;
  const finalizer = optional(state, context, Token.FinallyKeyword) ? parseBlockStatement(state, context, createChildScope(scope, ScopeFlags.Block)) : null;
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
 * @param state Parser instance
 * @param context Context masks
 * @param scope Scope instance
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

  let param: any = null;
  // NOTE: The 'second scope' is set to the scope we passed in as a try / catch binding workaround.
  // It will only be overwritten if there exist a left parenthesis
  let secondScope: ScopeState = scope;
  if (optional(state, context, Token.LeftParen)) {
    const catchScope = createChildScope(scope, ScopeFlags.Catch);
    if (state.currentToken === Token.RightParen) report(state, Errors.Unexpected);
    param = parseBindingIdentifierOrPattern(state, context, BindingType.Arguments, BindingOrigin.Catch, false, catchScope);
    if (state.currentToken === Token.Assign)  report(state, Errors.Unexpected);
    if (verifyLexicalBindings(state, context, catchScope, true))  report(state, Errors.Unexpected);
    expect(state, context, Token.RightParen);
    secondScope = createChildScope(catchScope, ScopeFlags.Block);
  }

  const body = parseBlockStatement(state, context, secondScope);

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

  /**
 * Parses variable statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableStatement)
 *
 * @param state Parser instance
 * @param context Context masks
 * @param type Binding type
 * @param origin Binding origin
 * @param scope Scope instance
 */
export function parseVariableStatement(
  state: ParserState,
  context: Context,
  type: BindingType,
  origin: BindingOrigin,
  scope: ScopeState
): ESTree.VariableDeclaration {
  const { currentToken } = state;
  nextToken(state, context);
  const declarations = parseVariableDeclarationList(state, context, type, origin, false, scope);
  consumeSemicolon(state, context);
  return {
    type: 'VariableDeclaration',
    kind: KeywordDescTable[currentToken & Token.Type],
    declarations
  } as any;
}


  /**
 * Parses lexical declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableStatement)
 *
 * @param state Parser instance
 * @param context Context masks
 * @param type Binding type
 * @param origin Binding origin
 * @param scope Scope instance
 */
export function parseLexicalDeclaration(
  state: ParserState,
  context: Context,
  type: BindingType,
  origin: BindingOrigin,
  scope: ScopeState
): ESTree.VariableDeclaration {
  const { currentToken } = state;
  nextToken(state, context);
  const declarations = parseVariableDeclarationList(state, context, type, origin, false, scope);
  if (verifyLexicalBindings(state, context, scope)) report(state, Errors.Unexpected);
  consumeSemicolon(state, context);
  return {
    type: 'VariableDeclaration',
    kind: KeywordDescTable[currentToken & Token.Type],
    declarations
  } as any;
}


