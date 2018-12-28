import { Errors, report } from '../errors';
import * as ESTree from '../estree';
import { nextToken } from '../lexer/scan';
import { createChildScope } from '../scope';
import { KeywordDescTable, Token } from '../token';
import { ParserState, ScopeState } from '../types';
import {
  Context,
  Flags,
  ScopeFlags,
  consumeSemicolon,
  expect,
  optional,
  reinterpret,
  validateBindingIdentifier,
  lookAheadOrScan,
  checkIfExistInLexicalBindings,
  BindingOrigin,
  BindingType
} from './common';
import { parseFunctionDeclaration, parseVariableDeclarationList } from './declarations';
import { parseAssignmentExpression, parseExpression, parseIdentifier } from './expressions';
import { parseBindingIdentifierOrPattern } from './pattern';

export const enum LabelledFunctionState {
  Allow,
  Disallow
}

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
  while (state.currentToken & Token.StringLiteral) {
    if (state.tokenValue.length === 10 && state.tokenValue === 'use strict') {
      context |= Context.Strict;
    }
    statements.push(parseStatementListItem(state, context, scope));
  }
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
      return parseLetOrExpressionStatement(state, context, scope);
    case Token.AsyncKeyword:
      return parseAsyncFunctionOrExpressionStatement(state, context, scope);
    default:
      return parseStatement(state, context, scope, LabelledFunctionState.Allow);
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
export function parseStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  label: LabelledFunctionState
): any {
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
      return parseBlockStatement(
        state,
        (context | Context.ScopeRoot) ^ Context.ScopeRoot,
        createChildScope(scope, ScopeFlags.Block)
      );
    case Token.ForKeyword:
      return parseForStatement(state, context, scope);
    case Token.FunctionKeyword:
      report(state, context & Context.Strict ? Errors.StrictFunction : Errors.SloppyFunction);
    case Token.ClassKeyword:
      report(state, Errors.Unexpected);
    default:
      return parseExpressionOrLabelledStatement(state, context, scope, label);
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
  const alternate = optional(state, context, Token.ElseKeyword)
    ? parseConsequentOrAlternate(state, context, scope)
    : null;
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
    context & Context.Strict ||
    state.currentToken !== Token.FunctionKeyword
    ? parseStatement(state, (context | Context.ScopeRoot) ^ Context.ScopeRoot, scope, LabelledFunctionState.Disallow)
    : parseFunctionDeclaration(state, context | Context.DisallowGenerator, scope, true);
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
  if (!(context & (Context.OptionsGlobalReturn | Context.InFunctionBody))) report(state, Errors.Unexpected);
  nextToken(state, context | Context.ExpressionStart);
  const argument =
    (state.currentToken & Token.ASI) < 1 && (state.flags & Flags.LineTerminator) < 1
      ? parseExpression(state, (context | Context.InFunctionBody) ^ Context.InFunctionBody)
      : null;
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
  const body = parseStatement(
    state,
    (context | Context.ScopeRoot) ^ Context.ScopeRoot,
    scope,
    LabelledFunctionState.Disallow
  );
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
  const object = parseExpression(state, context);
  expect(state, context, Token.RightParen);
  const body = parseStatement(
    state,
    (context | Context.ScopeRoot) ^ Context.ScopeRoot,
    scope,
    LabelledFunctionState.Disallow
  );
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
  const body = parseStatement(
    state,
    (context | Context.ScopeRoot) ^ Context.ScopeRoot,
    scope,
    LabelledFunctionState.Disallow
  );
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
  expect(state, context, Token.LeftBrace);
  while (state.currentToken !== Token.RightBrace) {
    body.push(parseStatementListItem(state, context, scope));
  }
  expect(state, context, Token.RightBrace);

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
  while (
    state.currentToken !== Token.CaseKeyword &&
    state.currentToken !== Token.RightBrace &&
    state.currentToken !== Token.DefaultKeyword
  ) {
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
  if (state.flags & Flags.LineTerminator) report(state, Errors.Unexpected);
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
  const handler = optional(state, context, Token.CatchKeyword) ? parseCatchBlock(state, context, scope) : null;
  const finalizer = optional(state, context, Token.FinallyKeyword)
    ? parseBlockStatement(
        state,
        (context | Context.ScopeRoot) ^ Context.ScopeRoot,
        createChildScope(scope, ScopeFlags.Block)
      )
    : null;
  if (!handler && !finalizer) report(state, Errors.Unexpected);
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
    const catchScope = createChildScope(scope, ScopeFlags.CatchClause);
    if (state.currentToken === Token.RightParen) report(state, Errors.Unexpected);
    param = parseBindingIdentifierOrPattern(
      state,
      context,
      BindingType.Arguments,
      BindingOrigin.Catch,
      false,
      catchScope
    );
    if (state.currentToken === Token.Assign) report(state, Errors.Unexpected);
    if (checkIfExistInLexicalBindings(state, context, catchScope, true)) report(state, Errors.Unexpected);
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
  context: Context,
  scope: ScopeState,
  label: LabelledFunctionState
): any {
  const token = state.currentToken;
  const tokenValue = state.tokenValue;
  const expr: ESTree.Expression = parseExpression(state, context);
  if (token & Token.Keyword && state.currentToken === Token.Colon) {
    nextToken(state, context | Context.ExpressionStart);
    validateBindingIdentifier(state, context, BindingType.Empty, token);
    let body: any = null;
    if (
      (context & Context.OptionDisablesWebCompat) === 0 &&
      (state.currentToken === Token.FunctionKeyword &&
        !(context & Context.Strict) &&
        label === LabelledFunctionState.Allow)
    ) {
      body = parseFunctionDeclaration(state, context | Context.DisallowGenerator, scope, false);
    } else body = parseStatement(state, (context | Context.ScopeRoot) ^ Context.ScopeRoot, scope, label);
    return {
      type: 'LabeledStatement',
      label: expr as ESTree.Identifier,
      body
    };
  }

  consumeSemicolon(state, context);
  return {
    type: 'ExpressionStatement',
    expression: expr
  };
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
  if (checkIfExistInLexicalBindings(state, context, scope)) report(state, Errors.Unexpected);
  consumeSemicolon(state, context);
  return {
    type: 'VariableDeclaration',
    kind: KeywordDescTable[currentToken & Token.Type],
    declarations
  } as any;
}

/**
 * Parses either For, ForIn or ForOf statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-for-statement)
 * @see [Link](https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements)
 *
 * @param parser  Parser object
 * @param context Context masks
 */

function parseForStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState
): ESTree.ForStatement | ESTree.ForInStatement | ESTree.ForOfStatement {
  nextToken(state, context);

  const forAwait = optional(state, context, Token.AwaitKeyword);

  scope = createChildScope(scope, ScopeFlags.ForStatement);

  expect(state, context, Token.LeftParen);

  let init: any = null;
  let declarations: any = null;
  let test: ESTree.Expression | null = null;
  let update: ESTree.Expression | null = null;
  let right;
  let isPattern = false;

  if (state.currentToken !== Token.Semicolon) {
    if (optional(state, context, Token.VarKeyword)) {
      declarations = parseVariableDeclarationList(
        state,
        context,
        BindingType.Variable,
        BindingOrigin.For,
        false,
        scope
      );
      init = { type: 'VariableDeclaration', kind: 'var', declarations };
    } else if (state.currentToken === Token.LetKeyword) {
      let tokenValue = state.tokenValue;
      nextToken(state, context);
      if (state.currentToken === Token.InKeyword) {
        if (context & Context.Strict) report(state, Errors.Unexpected);
        init = { type: 'Identifier', name: tokenValue };
      } else {
        declarations = parseVariableDeclarationList(state, context, BindingType.Let, BindingOrigin.For, true, scope);
        init = { type: 'VariableDeclaration', kind: 'let', declarations };
      }
    } else if (optional(state, context, Token.ConstKeyword)) {
      declarations = parseVariableDeclarationList(state, context, BindingType.Const, BindingOrigin.For, false, scope);
      init = { type: 'VariableDeclaration', kind: 'const', declarations };
    } else {
      isPattern = state.currentToken === Token.LeftBracket || state.currentToken === Token.LeftBrace;
      init = parseExpression(state, context | Context.DisallowIn);
    }
  }

  /**
   * ForStatement
   *
   * https://tc39.github.io/ecma262/#sec-for-statement
   */

  if (forAwait ? expect(state, context, Token.OfKeyword) : optional(state, context, Token.OfKeyword)) {
    if (state.inCatch) report(state, Errors.Unexpected);
    if (isPattern) reinterpret(init);
    right = parseAssignmentExpression(state, context);
    expect(state, context, Token.RightParen);
    const body = parseStatement(
      state,
      (context | Context.ScopeRoot) ^ Context.ScopeRoot,
      scope,
      LabelledFunctionState.Disallow
    );
    return {
      type: 'ForOfStatement',
      body,
      left: init,
      right,
      await: forAwait
    };
  }

  /**
   * ForIn statement
   *
   * https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements
   *
   */

  if (optional(state, context, Token.InKeyword)) {
    if (isPattern) reinterpret(init);
    right = parseExpression(state, context);
    expect(state, context, Token.RightParen);
    const body = parseStatement(
      state,
      (context | Context.ScopeRoot) ^ Context.ScopeRoot,
      scope,
      LabelledFunctionState.Disallow
    );
    return {
      type: 'ForInStatement',
      body,
      left: init,
      right
    };
  }

  expect(state, context, Token.Semicolon);

  if (state.currentToken !== Token.Semicolon) {
    test = parseExpression(state, context);
  }

  expect(state, context, Token.Semicolon);

  if (state.currentToken !== Token.RightParen) update = parseExpression(state, context);

  expect(state, context, Token.RightParen);

  const body = parseStatement(
    state,
    (context | Context.ScopeRoot) ^ Context.ScopeRoot,
    scope,
    LabelledFunctionState.Disallow
  );

  return {
    type: 'ForStatement',
    body,
    init,
    test,
    update
  };
}

/**
 * Parses either an async function declaration or an expression statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-let-and-const-declarations)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseAsyncFunctionOrExpressionStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState
): ReturnType<typeof parseFunctionDeclaration | typeof parseExpressionOrLabelledStatement> {
  return lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)
    ? parseFunctionDeclaration(state, context, scope, false)
    : parseExpressionOrLabelledStatement(state, context, scope, LabelledFunctionState.Disallow);
}

/**
 * Parses either an lexical declaration (let) or an expression statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-let-and-const-declarations)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseLetOrExpressionStatement(
  state: ParserState,
  context: Context,
  scope: ScopeState
): ReturnType<typeof parseVariableStatement | typeof parseExpressionOrLabelledStatement> {
  return lookAheadOrScan(state, context, isLexical, true)
    ? parseLexicalDeclaration(state, context, BindingType.Let, BindingOrigin.Statement, scope)
    : parseExpressionOrLabelledStatement(state, context, scope, LabelledFunctionState.Disallow);
}

export function nextTokenIsFuncKeywordOnSameLine(state: ParserState, context: Context): boolean {
  const line = state.line;
  nextToken(state, context);
  return state.currentToken === Token.FunctionKeyword && state.line === line;
}

/**
 * Returns true if this an valid lexical binding and not an identifier
 *
 * @param parser Parser object
 * @param context  Context masks
 */
export function isLexical(state: ParserState, context: Context): boolean {
  nextToken(state, context);
  return (
    (state.currentToken & Token.IdentifierOrContextual) > 0 ||
    state.currentToken === Token.LeftBrace ||
    state.currentToken === Token.LeftBracket ||
    state.currentToken === Token.YieldKeyword ||
    state.currentToken === Token.AwaitKeyword
  );
}
