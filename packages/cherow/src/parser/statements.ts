import * as ESTree from '../estree';
import { Token, tokenDesc } from '../token';
import { Errors, tolerant } from '../errors';
import { parseBindingIdentifierOrPattern } from './pattern';
import { Location, ForStatementType, Parser } from '../types';
import {
  parseFunctionDeclaration,
  parseVariableDeclarationList,
  parseClassDeclaration,
  parseAsyncFunctionOrAsyncGeneratorDeclaration
} from './declarations';
import { parseExpression, parseIdentifier, parseAssignmentExpression, parseSequenceExpression } from './expressions';
import {
  expect,
  Context,
  finishNode,
  Flags,
  nextToken,
  consume,
  getLocation,
  consumeSemicolon,
  lookahead,
  isLexical,
  reinterpret,
  validateBreakOrContinueLabel,
  isEndOfCaseOrDefaultClauses,
  nextTokenIsFuncKeywordOnSameLine,
  nextTokenIsLeftParenOrPeriod,
  hasLabel,
  addLabel,
  popLabel,
  restoreExpressionCoverGrammar,
  validateParams
} from '../utilities';

// Statements

/**
 * Parses statement list items
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-StatementListItem)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseStatementListItem(parser: Parser, context: Context): ESTree.Statement {
  switch (parser.token) {
    case Token.FunctionKeyword:
      return parseFunctionDeclaration(parser, context);
    case Token.At:
    case Token.ClassKeyword:
      return parseClassDeclaration(parser, context);
    case Token.LetKeyword:
      return parseLetOrExpressionStatement(parser, context | Context.AllowIn);
    case Token.ConstKeyword:
      return parseVariableStatement(parser, context | Context.BlockScope | Context.AllowIn);
    case Token.AsyncKeyword:
      return parseAsyncFunctionDeclarationOrStatement(parser, context);
    case Token.ImportKeyword: {
      if (context & Context.OptionsNext && lookahead(parser, context, nextTokenIsLeftParenOrPeriod)) {
        return parseExpressionStatement(parser, context | Context.AllowIn);
      }
    }
    case Token.ExportKeyword:
      if (context & Context.Module) {
        tolerant(parser, context, Errors.ImportExportDeclAtTopLevel, tokenDesc(parser.token));
      }
    default:
      return parseStatement(parser, context | Context.AllowSingleStatement);
  }
}

/**
 * Parses statements
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Statement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseStatement(parser: Parser, context: Context): ESTree.Statement {
  switch (parser.token) {
    case Token.VarKeyword:
      return parseVariableStatement(parser, context | Context.AllowIn);
    case Token.Semicolon:
      return parseEmptyStatement(parser, context);
    case Token.SwitchKeyword:
      return parseSwitchStatement(parser, context);
    case Token.LeftBrace:
      return parseBlockStatement(parser, context);
    case Token.ReturnKeyword:
      return parseReturnStatement(parser, context);
    case Token.IfKeyword:
      return parseIfStatement(parser, context);
    case Token.DoKeyword:
      return parseDoWhileStatement(parser, context);
    case Token.WhileKeyword:
      return parseWhileStatement(parser, context);
    case Token.WithKeyword:
      return parseWithStatement(parser, context);
    case Token.BreakKeyword:
      return parseBreakStatement(parser, context);
    case Token.ContinueKeyword:
      return parseContinueStatement(parser, context);
    case Token.DebuggerKeyword:
      return parseDebuggerStatement(parser, context);
    case Token.ThrowKeyword:
      return parseThrowStatement(parser, context);
    case Token.TryKeyword:
      return parseTryStatement(parser, context | Context.DisallowEscapedKeyword);
    case Token.ForKeyword:
      return parseForStatement(parser, context | Context.ForStatement);
    case Token.AsyncKeyword:
      if (lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine)) {
        tolerant(parser, context, Errors.AsyncFunctionInSingleStatementContext);
      }
      return parseExpressionOrLabelledStatement(parser, context | Context.AllowSingleStatement);
    case Token.FunctionKeyword:
      // V8
      tolerant(parser, context, context & Context.Strict ? Errors.StrictFunction : Errors.SloppyFunction);
    case Token.ClassKeyword:
      tolerant(parser, context, Errors.ForbiddenAsStatement, tokenDesc(parser.token));
    default:
      return parseExpressionOrLabelledStatement(parser, context);
  }
}

/**
 * Parses empty statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-EmptyStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseEmptyStatement(parser: Parser, context: Context): ESTree.EmptyStatement {
  const pos = getLocation(parser);
  nextToken(parser, context);
  return finishNode(context, parser, pos, {
    type: 'EmptyStatement'
  });
}

/**
 * Parses the continue statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ContinueStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseContinueStatement(parser: Parser, context: Context): ESTree.ContinueStatement {
  const pos = getLocation(parser);
  nextToken(parser, context);
  // Appearing of continue without an IterationStatement leads to syntax error
  if (!(parser.flags & (Flags.InSwitchStatement | Flags.InIterationStatement))) {
    tolerant(parser, context, Errors.InvalidNestedStatement, tokenDesc(parser.token));
  }
  let label: ESTree.Identifier | undefined | null = null;
  if (!(parser.flags & Flags.NewLine) && parser.token & (Token.IsIdentifier | Token.Keyword)) {
    const { tokenValue } = parser;
    label = parseIdentifier(parser, context);
    validateBreakOrContinueLabel(parser, context, tokenValue, true);
  }
  consumeSemicolon(parser, context);
  return finishNode(context, parser, pos, {
    type: 'ContinueStatement',
    label
  });
}

/**
 * Parses the break statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BreakStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseBreakStatement(parser: Parser, context: Context): ESTree.BreakStatement {
  const pos = getLocation(parser);
  nextToken(parser, context);
  let label: ESTree.Identifier | undefined | null = null;
  if (!(parser.flags & Flags.NewLine) && parser.token & (Token.IsIdentifier | Token.Keyword)) {
      const { tokenValue } = parser;
      label = parseIdentifier(parser, context);
      validateBreakOrContinueLabel(parser, context, tokenValue, false);
  } else if (!(parser.flags & (Flags.InSwitchStatement | Flags.InIterationStatement))) {
      tolerant(parser, context, Errors.InvalidNestedStatement, 'break');
  }

  consumeSemicolon(parser, context);
  return finishNode(context, parser, pos, {
      type: 'BreakStatement',
      label
  });
}

/**
 * Parses the if statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-if-statement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseIfStatement(parser: Parser, context: Context): ESTree.IfStatement {
  const pos = getLocation(parser);
  nextToken(parser, context);
  expect(parser, context, Token.LeftParen);
  const test = parseExpression(parser, (context & ~Context.AllowDecorator) | Context.AllowIn);
  expect(parser, context, Token.RightParen);
  const consequent = parseConsequentOrAlternate(parser, context | Context.DisallowEscapedKeyword);
  const alternate = consume(parser, context, Token.ElseKeyword) ? parseConsequentOrAlternate(parser, context) : null;
  return finishNode(context, parser, pos, {
    type: 'IfStatement',
    test,
    consequent,
    alternate
  });
}

/**
 * Parse either consequent or alternate. Supports AnnexB.
 * @param parser  Parser object
 * @param context Context masks
 */
function parseConsequentOrAlternate(parser: Parser, context: Context): ESTree.Statement | ESTree.FunctionDeclaration {
  return context & Context.Strict || parser.token !== Token.FunctionKeyword
    ? parseStatement(parser, context & ~Context.AllowSingleStatement)
    : parseFunctionDeclaration(parser, context);
}

/**
 * Parses the debugger statement production
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-DebuggerStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseDebuggerStatement(parser: Parser, context: Context): ESTree.DebuggerStatement {
  const pos = getLocation(parser);
  nextToken(parser, context);
  consumeSemicolon(parser, context);
  return finishNode(context, parser, pos, {
    type: 'DebuggerStatement'
  });
}

/**
 * Parses try statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-TryStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseTryStatement(parser: Parser, context: Context): ESTree.TryStatement {
  const pos = getLocation(parser);
  nextToken(parser, context);
  const block = parseBlockStatement(parser, context);
  const handler = parser.token === Token.CatchKeyword ? parseCatchBlock(parser, context) : null;
  const finalizer = consume(parser, context, Token.FinallyKeyword) ? parseBlockStatement(parser, context) : null;
  if (!handler && !finalizer) tolerant(parser, context, Errors.NoCatchOrFinally);
  return finishNode(context, parser, pos, {
    type: 'TryStatement',
    block,
    handler,
    finalizer
  });
}

/**
 * Parses catch block
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-Catch)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseCatchBlock(parser: Parser, context: Context): ESTree.CatchClause {
  const pos = getLocation(parser);
  nextToken(parser, context);
  let param: ESTree.PatternTop | null = null;
  if (consume(parser, context, Token.LeftParen)) {
    const params: string[] = [];
    param = parseBindingIdentifierOrPattern(parser, context, params);
    validateParams(parser, context, params);
    expect(parser, context, Token.RightParen);
  }
  const body = parseBlockStatement(parser, context);

  return finishNode(context, parser, pos, {
    type: 'CatchClause',
    param,
    body
  });
}

/**
 * Parses throw statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ThrowStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseThrowStatement(parser: Parser, context: Context): ESTree.ThrowStatement {
  const pos = getLocation(parser);
  nextToken(parser, context);
  if (parser.flags & Flags.NewLine) tolerant(parser, context, Errors.NewlineAfterThrow);
  const argument: ESTree.Expression = parseExpression(parser, (context & ~Context.AllowDecorator) | Context.AllowIn);
  consumeSemicolon(parser, context);
  return finishNode(context, parser, pos, {
    type: 'ThrowStatement',
    argument
  });
}

/**
 * Parses expression statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseExpressionStatement(parser: Parser, context: Context): ESTree.ExpressionStatement {
  const pos = getLocation(parser);
  const expr: ESTree.Expression = parseExpression(parser, (context & ~Context.AllowDecorator) | Context.AllowIn);
  consumeSemicolon(parser, context);
  return finishNode(context, parser, pos, {
    type: 'ExpressionStatement',
    expression: expr
  });
}

/**
 * Parse directive node
 *
 * * @see [Link](https://tc39.github.io/ecma262/#sec-directive-prologues-and-the-use-strict-directive)
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function parseDirective(parser: Parser, context: Context): ESTree.ExpressionStatement {
  const pos = getLocation(parser);
  const directive = parser.tokenRaw.slice(1, -1);
  const expr = parseExpression(parser, (context & ~Context.AllowDecorator) | Context.AllowIn);
  consumeSemicolon(parser, context);
  return finishNode(context, parser, pos, {
    type: 'ExpressionStatement',
    expression: expr,
    directive
  });
}

/**
 * Parses either expression or labelled statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 * @see [Link](https://tc39.github.io/ecma262/#prod-LabelledStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseExpressionOrLabelledStatement(
  parser: Parser,
  context: Context
): ESTree.ExpressionStatement | ESTree.LabeledStatement {
  const pos = getLocation(parser);
  const { tokenValue, token } = parser;
  const expr: ESTree.Expression = parseExpression(parser, (context & ~(Context.AllowSingleStatement | Context.AllowDecorator)) | Context.AllowIn);
  if (token & (Token.IsIdentifier | Token.Keyword) && parser.token === Token.Colon) {
    // If within generator function bodies, we do it like this so we can throw an nice error message
    if (context & Context.Yield && token & Token.IsYield) tolerant(parser, context, Errors.YieldReservedKeyword);
    expect(parser, context, Token.Colon, Errors.LabelNoColon);
    if (hasLabel(parser, tokenValue)) tolerant(parser, context, Errors.LabelRedeclaration, tokenValue);
    addLabel(parser, tokenValue);
    const body = !(context & Context.Strict) &&
    context & Context.AllowSingleStatement &&
    parser.token === Token.FunctionKeyword
    ? parseFunctionDeclaration(parser, context)
    : parseStatement(parser, context);
    popLabel(parser, tokenValue);

    return finishNode(context, parser, pos, {
      type: 'LabeledStatement',
      label: expr as ESTree.Identifier,
      body
    });
  }

  consumeSemicolon(parser, context);

  return finishNode(context, parser, pos, {
    type: 'ExpressionStatement',
    expression: expr
  });
}

/**
 * Parses do while statement
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseDoWhileStatement(parser: Parser, context: Context): ESTree.DoWhileStatement {
  const pos = getLocation(parser);
  nextToken(parser, context);
  const body = parseIterationStatement(parser, context);
  expect(parser, context, Token.WhileKeyword);
  expect(parser, context, Token.LeftParen);
  const test = parseExpression(parser, (context & ~Context.AllowDecorator) | Context.AllowIn);
  expect(parser, context, Token.RightParen);
  consume(parser, context, Token.Semicolon);
  return finishNode(context, parser, pos, {
    type: 'DoWhileStatement',
    body,
    test
  });
}

/**
 * Parses while statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-grammar-notation-WhileStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseWhileStatement(parser: Parser, context: Context): ESTree.WhileStatement {
  const pos = getLocation(parser);
  nextToken(parser, context);
  expect(parser, context, Token.LeftParen);
  const test = parseExpression(parser, (context & ~Context.AllowDecorator) | Context.AllowIn);
  expect(parser, context, Token.RightParen);
  const body = parseIterationStatement(parser, context);
  return finishNode(context, parser, pos, {
    type: 'WhileStatement',
    test,
    body
  });
}

/**
 * Parses block statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-BlockStatement)
 * @see [Link](https://tc39.github.io/ecma262/#prod-Block)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseBlockStatement(parser: Parser, context: Context): ESTree.BlockStatement {
  const pos = getLocation(parser);
  const body: ESTree.Statement[] = [];
  expect(parser, context, Token.LeftBrace);
  while (parser.token !== Token.RightBrace) {
    body.push(parseStatementListItem(parser, context));
  }
  expect(parser, context, Token.RightBrace);

  return finishNode(context, parser, pos, {
    type: 'BlockStatement',
    body
  });
}

/**
 * Parses return statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ReturnStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseReturnStatement(parser: Parser, context: Context): ESTree.ReturnStatement {
  const pos = getLocation(parser);
  if (!(context & (Context.OptionsGlobalReturn | Context.InFunctionBody))) {
    tolerant(parser, context, Errors.IllegalReturn);
  }
  if (parser.flags & Flags.EscapedKeyword) tolerant(parser, context, Errors.InvalidEscapedReservedWord);
  nextToken(parser, context);
  const argument = !(parser.token & Token.ASI) && !(parser.flags & Flags.NewLine)
      ? parseExpression(parser, (context & ~(Context.InFunctionBody | Context.AllowDecorator)) | Context.AllowIn)
      : null;
  consumeSemicolon(parser, context);
  return finishNode(context, parser, pos, {
    type: 'ReturnStatement',
    argument
  });
}

/**
 * Sets the necessary mutable parser flags. The parser flags will
 * be unset after done parsing out the statements.
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-grammar-notation-IterationStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseIterationStatement(parser: Parser, context: Context): ESTree.Statement {
  // Note: We are deviating from the original grammar here beauce the original grammar says that the
  // 'iterationStatement' should return either'for', 'do' or 'while' statements. We are doing some
  // bitfiddling before and after to modify the parser state before we let the 'parseStatement'
  // return the mentioned statements (to match the original grammar).
  const savedFlags = parser.flags;
  parser.flags |= Flags.InIterationStatement | Flags.AllowDestructuring;
  const body = parseStatement(parser, (context & ~Context.AllowSingleStatement) | Context.DisallowEscapedKeyword);
  parser.flags = savedFlags;
  return body;
}

/**
 * Parses with statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-WithStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseWithStatement(parser: Parser, context: Context): ESTree.WithStatement {
  if (context & Context.Strict) tolerant(parser, context, Errors.StrictModeWith);
  const pos = getLocation(parser);
  nextToken(parser, context);
  expect(parser, context, Token.LeftParen);
  const object = parseExpression(parser, (context & ~Context.AllowDecorator) | Context.AllowIn);
  expect(parser, context, Token.RightParen);
  const body = parseStatement(parser, context & ~Context.AllowSingleStatement);
  return finishNode(context, parser, pos, {
    type: 'WithStatement',
    object,
    body
  });
}

/**
 * Parses switch statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-SwitchStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseSwitchStatement(parser: Parser, context: Context): ESTree.SwitchStatement {
  const pos = getLocation(parser);
  nextToken(parser, context);
  expect(parser, context, Token.LeftParen);
  const discriminant = parseExpression(parser, (context & ~Context.AllowDecorator) | Context.AllowIn);
  expect(parser, context, Token.RightParen);
  expect(parser, context | Context.DisallowEscapedKeyword, Token.LeftBrace);
  const cases: ESTree.SwitchCase[] = [];
  const savedFlags = parser.flags;
  parser.flags |= Flags.InSwitchStatement;
  let seenDefault = false;
  while (parser.token !== Token.RightBrace) {
    const clause = parseCaseOrDefaultClauses(parser, context);
    cases.push(clause);
    if (clause.test === null) {
      if (seenDefault) tolerant(parser, context, Errors.MultipleDefaultsInSwitch);
      seenDefault = true;
    }
  }
  parser.flags = savedFlags;
  expect(parser, context, Token.RightBrace);

  return finishNode(context, parser, pos, {
    type: 'SwitchStatement',
    discriminant,
    cases
  });
}

/**
 * Parses either default clause or case clauses
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-CaseClauses)
 * @see [Link](https://tc39.github.io/ecma262/#prod-DefaultClause)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseCaseOrDefaultClauses(parser: Parser, context: Context): ESTree.SwitchCase {
  const pos = getLocation(parser);
  let test: ESTree.Expression | null = null;
  if (consume(parser, context, Token.CaseKeyword)) {
    test = parseExpression(parser, (context & ~Context.AllowDecorator) | Context.AllowIn);
  } else {
    expect(parser, context, Token.DefaultKeyword);
  }
  expect(parser, context, Token.Colon);
  const consequent: ESTree.Statement[] = [];
  while (!isEndOfCaseOrDefaultClauses(parser)) {
    consequent.push(parseStatementListItem(parser, context | Context.AllowIn));
  }

  return finishNode(context, parser, pos, {
    type: 'SwitchCase',
    test,
    consequent
  });
}

/**
 * Parses variable statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-VariableStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseVariableStatement(
  parser: Parser,
  context: Context,
  shouldConsume: boolean = true
): ESTree.VariableDeclaration {
  const pos = getLocation(parser);
  const { token } = parser;
  const isConst = token === Token.ConstKeyword;
  nextToken(parser, context);
  const declarations = parseVariableDeclarationList(parser, context, isConst);
  // Only consume semicolons if not inside the 'ForStatement' production
  if (shouldConsume) consumeSemicolon(parser, context);
  return finishNode(context, parser, pos, {
    type: 'VariableDeclaration',
    kind: tokenDesc(token) as 'var' | 'let' | 'const',
    declarations
  });
}

/**
 * Parses either an lexical declaration (let) or an expression statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-let-and-const-declarations)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExpressionStatement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseLetOrExpressionStatement(
  parser: Parser,
  context: Context,
  shouldConsume: boolean = true
): ReturnType<typeof parseVariableStatement | typeof parseExpressionOrLabelledStatement> {
    return lookahead(parser, context, isLexical)
      ? parseVariableStatement(parser, context | Context.BlockScope, shouldConsume)
      : parseExpressionOrLabelledStatement(parser, context);
}

/**
 * Parses either async function declaration or statement
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-Statement)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseAsyncFunctionDeclarationOrStatement(
  parser: Parser,
  context: Context
): ReturnType<typeof parseAsyncFunctionOrAsyncGeneratorDeclaration | typeof parseStatement> {
  return lookahead(parser, context, nextTokenIsFuncKeywordOnSameLine)
    ? parseAsyncFunctionOrAsyncGeneratorDeclaration(parser, context)
    : parseStatement(parser, context);
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
  parser: Parser,
  context: Context
): ESTree.ForStatement | ESTree.ForInStatement | ESTree.ForOfStatement {
  const pos = getLocation(parser);

  expect(parser, context, Token.ForKeyword);

  const awaitToken = !!(context & Context.Async && consume(parser, context, Token.AwaitKeyword));

  expect(parser, context | Context.DisallowEscapedKeyword, Token.LeftParen);

  const { token } = parser;

  let init: ESTree.Expression | ESTree.VariableDeclaration | null = null;
  let sequencePos: Location | null = null;
  let variableStatement: ESTree.VariableDeclaration | null = null;
  let type: ForStatementType = 'ForStatement';
  let test: ESTree.Expression | null = null;
  let update: ESTree.Expression | null = null;
  let right;

  if (token === Token.ConstKeyword || (token === Token.LetKeyword && lookahead(parser, context, isLexical))) {
    variableStatement = parseVariableStatement(parser, (context & ~Context.AllowIn) | Context.BlockScope, false);
  } else if (token === Token.VarKeyword) {
    variableStatement = parseVariableStatement(parser, context & ~Context.AllowIn, false);
  } else if (token !== Token.Semicolon) {
    sequencePos = getLocation(parser);
    init = restoreExpressionCoverGrammar(
      parser,
      (context & ~Context.AllowIn) | Context.DisallowEscapedKeyword,
      parseAssignmentExpression
    );
  }

  if (consume(parser, context, Token.OfKeyword)) {
    type = 'ForOfStatement';
    if (init) {
      if (!(parser.flags & Flags.AllowDestructuring) || init.type === 'AssignmentExpression') {
        tolerant(parser, context, Errors.InvalidDestructuringTarget);
      }
      reinterpret(parser, context, init);
    } else init = variableStatement;

    right = parseAssignmentExpression(parser, context | Context.AllowIn);
  } else if (consume(parser, context, Token.InKeyword)) {
    if (init) {
      if (!(parser.flags & Flags.AllowDestructuring)) tolerant(parser, context, Errors.InvalidDestructuringTarget);
      reinterpret(parser, context, init);
    } else init = variableStatement;

    type = 'ForInStatement';
    right = parseExpression(parser, (context & ~Context.AllowDecorator) | Context.AllowIn);
  } else {
    if (parser.token === Token.Comma)
      init = parseSequenceExpression(parser, context, init as ESTree.Expression, sequencePos as Location);
    if (variableStatement) init = variableStatement;
    expect(parser, context, Token.Semicolon);

    test = parser.token !== Token.Semicolon
        ? parseExpression(parser, (context & ~Context.AllowDecorator) | Context.AllowIn)
        : null;

    expect(parser, context, Token.Semicolon);

    update = parser.token !== Token.RightParen
        ? parseExpression(parser, (context & ~Context.AllowDecorator) | Context.AllowIn)
        : null;
  }

  expect(parser, context, Token.RightParen);

  const body = parseIterationStatement(parser, context);
  return finishNode(
    context,
    parser,
    pos,
    type === 'ForOfStatement'
      ? {
          type,
          body,
          left: init as Exclude<null, typeof init>,
          right,
          await: awaitToken
        }
      : right
        ? {
            type: type as 'ForInStatement',
            body,
            left: init as Exclude<null, typeof init>,
            right
          }
        : {
            type: type as 'ForStatement',
            body,
            init,
            test,
            update
          }
  );
}
