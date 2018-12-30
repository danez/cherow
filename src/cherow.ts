import * as ESTree from './estree';
import { scan } from './lexer';
import { Options, EcmaVersion } from './types';
import { Context } from './common';
import { Token, KeywordDescTable } from './token';
import { report, Errors } from './errors';

function parseSource(
  source: string,
  options: Options | void,
  /*@internal*/
  context: Context
): any {
  let sourceFile = '';

  if (options !== undefined) {
    // The option to specify ecamVersion
    const ecmaVersion = options.ecmaVersion || 10;
    options.ecmaVersion = <EcmaVersion>(ecmaVersion > 2009 ? ecmaVersion - 2009 : ecmaVersion);

    // The flag to enable module syntax support
    if (options.module) context |= Context.Module;
    // The flag to enable stage 3 support (ESNext)
    if (options.next) context |= Context.OptionsNext;
    // The flag to enable React JSX parsing
    if (options.jsx) context |= Context.OptionsJSX;
    // The flag to enable start and end offsets to each node
    if (options.ranges) context |= Context.OptionsRanges;
    // The flag to enable line/column location information to each node
    if (options.loc) context |= Context.OptionsLoc;
    // The flag to attach raw property to each literal and identifier node
    if (options.raw) context |= Context.OptionsRaw;
    // The flag to allow return in the global scope
    if (options.globalReturn) context |= Context.OptionsGlobalReturn;
    // Set to true to record the source file in every node's loc object when the loc option is set.
    if (!!options.source) sourceFile = options.source;
    // The flag to enable implied strict mode
    if (options.impliedStrict) context |= Context.Strict;
    // The flag to enable experimental features
    if (options.experimental) context |= Context.OptionsExperimental;
    // The flag to enable "native" NodeJS / V8 features
    if (options.native) context |= Context.OptionsNative;
    // The flag to enable tokenizing
    if (options.tokenize) context |= Context.OptionsTokenize;
    // The flag to disable web compability (AnnexB)
    if (options.disableWebCompat) context |= Context.OptionDisablesWebCompat;
  }

  const getToken = scan(source);

  let previousToken: any | null = null;
  let currentToken = getToken(context);

  // See: https://www.ecma-international.org/ecma-262/9.0/index.html#sec-exports-static-semantics-exportednames
  let exportedNames = {};
  // See: https://www.ecma-international.org/ecma-262/9.0/index.html#sec-exports-static-semantics-exportedbindings
  let exportedBindings = {};

  const scope = {};

  function updateToken(t: any) {
    previousToken = currentToken;
    currentToken = t;
  }

  function optional(context: Context, token: Token): boolean {
    if (currentToken.type !== token) return false;
    updateToken(getToken(context));
    return true;
  }

  function expect(context: Context, t: any): boolean {
    if (currentToken.type !== t) {
      report(t.end, t.line, t.column, Errors.Unexpected, KeywordDescTable[t & Token.Type]);
      return false;
    }
    updateToken(getToken(context));
    return true;
  }

  /**
   * Automatic Semicolon Insertion
   *
   * @see [Link](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion)
   *
   * @param parser Parser object
   * @param context Context masks
   */
  function consumeSemicolon(context: Context): void | boolean {
    return (currentToken.type & Token.ASI) === Token.ASI || currentToken.newline
      ? optional(context, Token.Semicolon)
      : report(currentToken.end, currentToken.line, currentToken.column, Errors.Unexpected);
  }

  const body = parseModuleItemOrStatementList(context);

  /**
   * Parse module item or statement list
   *
   * @see [Link](https://tc39.github.io/ecma262/#prod-ModuleItemList)
   * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
   *
   * @param context Context masks
   */
  function parseModuleItemOrStatementList(context: Context): any {
    const statements: ESTree.Statement[] = [];
    while (currentToken.type & Token.StringLiteral) {
      const tokenValue = currentToken.tokenValue;
      if (!(context & Context.Strict) && (tokenValue as string).length === 10 && tokenValue === 'use strict') {
        context |= Context.Strict;
      }
      statements.push(parseStatement(context));
    }

    while (currentToken.type !== Token.EndOfSource) {
      statements.push(parseStatementListItem(context));
    }

    return statements;
  }

  function parseStatementListItem(context: Context): any {
    switch (currentToken.type) {
      case Token.FunctionKeyword:
      case Token.ConstKeyword:
      case Token.LetKeyword:
      case Token.AsyncKeyword:
      default:
        return parseStatement(context);
    }
  }

  function parseStatement(context: Context): any {
    switch (currentToken.type) {
      case Token.VarKeyword:
      case Token.TryKeyword:
      case Token.SwitchKeyword:
      case Token.DoKeyword:
      case Token.ReturnKeyword:
      case Token.IfKeyword:
      case Token.WhileKeyword:
      case Token.WithKeyword:
      case Token.BreakKeyword:
      case Token.ContinueKeyword:
      case Token.DebuggerKeyword:
      case Token.ThrowKeyword:
      case Token.Semicolon:
      case Token.LeftBrace:
      case Token.ForKeyword:
      case Token.FunctionKeyword:
      case Token.ClassKeyword:
      default:
        return parseExpressionOrLabelledStatement(context);
    }
  }

  function parseExpressionOrLabelledStatement(context: Context): any {
    let expr = parseExpression(context);
    if (previousToken.type & Token.Keyword && currentToken.type === Token.Colon) {
      return {
        type: 'LabeledStatement',
        label: expr as ESTree.Identifier,
        body: parseStatement(context)
      };
    }
    consumeSemicolon(context);
    return {
      type: 'ExpressionStatement',
      expression: expr
    };
  }

  function parseExpression(context: Context): any {
    const expr = parseAssignmentExpression(context);
    if (currentToken.type !== Token.Comma) return expr;
    return parseSequenceExpression(context, expr);
    return parseIdentifier(context);
  }

  /**
   * Parse secuence expression
   *
   * @param parser Parser object
   * @param context Context masks
   */

  function parseSequenceExpression(context: Context, left: ESTree.Expression): ESTree.SequenceExpression {
    const expressions: ESTree.Expression[] = [left];
    while (optional(context, Token.Comma)) {
      expressions.push(parseAssignmentExpression(context));
    }
    return {
      type: 'SequenceExpression',
      expressions
    };
  }

  function parseAssignmentExpression(context: Context): any {
    let expr: any = parseConditionalExpression(context);

    if (currentToken.type & Token.IsAssignOp) {
      //if (!state.assignable) report(Errors.Unexpected);
      if (currentToken.type === Token.Assign) {
        // reinterpret(context, expr);
      }
      updateToken(getToken(context));
      return {
        type: 'AssignmentExpression',
        left: expr,
        operator: KeywordDescTable[previousToken.type & Token.Type],
        right: parseAssignmentExpression(context)
      };
    }
    return expr;
  }

  /**
   * Parse conditional expression
   *
   * @see [Link](https://tc39.github.io/ecma262/#prod-ConditionalExpression)
   *
   * @param parser Parser object
   * @param context Context masks
   */

  function parseConditionalExpression(context: Context): ESTree.Expression | ESTree.ConditionalExpression {
    // ConditionalExpression ::
    // LogicalOrExpression
    // LogicalOrExpression '?' AssignmentExpression ':' AssignmentExpression
    const test = parseBinaryExpression(context, 0);
    if (!optional(context, Token.QuestionMark)) return test;
    const consequent = parseAssignmentExpression(context);
    expect(context, Token.Colon);
    const alternate = parseAssignmentExpression(context);
    return {
      type: 'ConditionalExpression',
      test,
      consequent,
      alternate
    };
  }

  /**
   * Parse binary expression.
   *
   * @see [Link](https://tc39.github.io/ecma262/#sec-exp-operator)
   * @see [Link](https://tc39.github.io/ecma262/#sec-binary-logical-operators)
   * @see [Link](https://tc39.github.io/ecma262/#sec-additive-operators)
   * @see [Link](https://tc39.github.io/ecma262/#sec-bitwise-shift-operators)
   * @see [Link](https://tc39.github.io/ecma262/#sec-equality-operators)
   * @see [Link](https://tc39.github.io/ecma262/#sec-binary-logical-operators)
   * @see [Link](https://tc39.github.io/ecma262/#sec-relational-operators)
   * @see [Link](https://tc39.github.io/ecma262/#sec-multiplicative-operators)
   *
   * @param parser Parser object
   * @param context Context masks
   * @param minPrec Minimum precedence value
   * @param pos Line / Column info
   * @param Left Left hand side of the binary expression
   */
  function parseBinaryExpression(
    context: Context,
    minPrec: number,
    left: any = parseUnaryExpression(context)
  ): ESTree.Expression {
    // Shift-reduce parser for the binary operator part of the JS expression
    // syntax.
    while (currentToken.type & Token.IsBinaryOp) {
      const t: Token = currentToken.type;
      const prec = t & Token.Precedence;
      const delta = ((t === Token.Exponentiate) as any) << Token.PrecStart;
      // When the next token is no longer a binary operator, it's potentially the
      // start of an expression, so we break the loop
      if (prec + delta <= minPrec) break;
      updateToken(getToken(context));
      left = {
        type: t & Token.IsLogical ? 'LogicalExpression' : 'BinaryExpression',
        left,
        right: parseBinaryExpression(context, prec),
        operator: KeywordDescTable[t & Token.Type]
      };
    }

    return left;
  }

  /**
   * Parses unary expression
   *
   * @see [Link](https://tc39.github.io/ecma262/#prod-UnaryExpression)
   *
   * @param parser Parser object
   * @param context Context masks
   */
  function parseUnaryExpression(context: Context): any {
    const t = currentToken.type;
    if (t & Token.IsUnaryOp) {
      updateToken(getToken(context));
      const argument: ESTree.Expression = parseUnaryExpression(context);
      return {
        type: 'UnaryExpression',
        operator: KeywordDescTable[t & Token.Type],
        argument,
        prefix: true
      };
    }
    return parseUpdateExpression(context);
  }

  /**
   * Parses update expression
   *
   * @see [Link](https://tc39.github.io/ecma262/#prod-UpdateExpression)
   *
   * @param parser Parser object
   * @param context Context masks
   */
  function parseUpdateExpression(context: Context): any {
    if (currentToken.type & Token.IsUpdateOp) {
      updateToken(getToken(context));
      const expr = parseLeftHandSideExpression(context);
      return {
        type: 'UpdateExpression',
        argument: expr,
        operator: KeywordDescTable[previousToken.type & Token.Type],
        prefix: true
      };
    }
    const expression = parseLeftHandSideExpression(context);

    if (currentToken.type & Token.IsUpdateOp && !currentToken.newline) {
      updateToken(getToken(context));
      return {
        type: 'UpdateExpression',
        argument: expression,
        operator: KeywordDescTable[previousToken.tyype & Token.Type],
        prefix: false
      };
    }

    return expression;
  }

  /**
   * Parse left hand side expression
   *
   * @see [Link](https://tc39.github.io/ecma262/#prod-LeftHandSideExpression)
   *
   * @param Parser Parer instance
   * @param Context Contextmasks
   * @param pos Location info
   */
  function parseLeftHandSideExpression(context: Context): any {
    // LeftHandSideExpression ::
    //   (NewExpression | MemberExpression) ...
    let expr = parseNewOrMemberExpression(context);

    while (true) {
      switch (currentToken.type) {
        case Token.Period:
          updateToken(getToken(context));
          expr = {
            type: 'MemberExpression',
            object: expr,
            computed: false,
            property: parseIdentifier(context)
          };
          continue;
        case Token.LeftBracket:
          updateToken(getToken(context));
          expr = {
            type: 'MemberExpression',
            object: expr,
            computed: true,
            property: parseExpression(context)
          };
          expect(context, Token.RightBracket);
          break;
        case Token.LeftParen:
          const args = parseArgumentList(context);
          expr = {
            type: 'CallExpression',
            callee: expr,
            arguments: args
          };
          break;
        default:
          return expr;
      }
    }
  }

  /**
   * Parse meta property
   *
   * @see [Link](https://tc39.github.io/ecma262/#prod-StatementList)
   *
   * @param parser Parser object
   * @param context Context masks
   * @param meta Identifier
   * @param pos Location
   */

  function parseMetaProperty(context: Context, meta: ESTree.Identifier): any {
    return {
      meta,
      type: 'MetaProperty',
      property: parseIdentifier(context)
    };
  }

  function parseNewTargetExpression(context: Context, id: ESTree.Identifier): any {
    return parseMetaProperty(context, id);
  }

  function parseNewOrMemberExpression(context: Context): any {
    if (currentToken.type === Token.NewKeyword) {
      let result: any;
      const id = parseIdentifier(context);
      if (currentToken.type === Token.SuperKeyword) {
        result = { type: 'Super' };
      } else if (optional(context, Token.Period)) {
        return parseNewTargetExpression(context, id as any);
      } else {
        result = parseNewOrMemberExpression(context);
      }

      return {
        type: 'NewExpression',
        callee: result,
        arguments: currentToken.type === Token.LeftParen ? parseArgumentList(context) : []
      };
    }

    return parseMemberExpression(context);
  }

  /**
   * Parse member expression
   *
   * @see [Link](https://tc39.github.io/ecma262/#prod-MemberExpression)
   *
   * @param parser Parser object
   * @param context Context masks
   * @param pos Location info
   * @param expr Expression
   */

  function parseMemberExpression(context: Context): ESTree.Expression {
    let result: any;
    if (currentToken.type === Token.SuperKeyword) {
      result = { type: 'super' };
    } else if (currentToken.type === Token.ImportKeyword) {
      result = parseImportExpressions(context);
    } else {
      result = parsePrimaryExpression(context);
    }

    return parseMemberExpressionContinuation(context, result);
  }

  /**
   * Parse Import() expressions. (Stage 3 proposal)
   *
   * @param parser Parser object
   * @param context Context masks
   * @param pos Location
   */
  function parseImportExpressions(context: Context): ESTree.Expression {
    const id = parseIdentifier(context);
    // Import.meta - Stage 3 proposal
    if (optional(context, Token.Period)) {
      return parseMetaProperty(context, id as any);
    }

    let expr: any = { type: 'Import' };
    expect(context, Token.LeftParen);
    const args = parseAssignmentExpression(context);
    expect(context, Token.RightParen);
    expr = {
      type: 'CallExpression',
      callee: expr,
      arguments: [args]
    };
    return expr;
  }

  /**
   * Parse member expression continuation
   *
   * @param parser Parser object
   * @param context Context masks
   * @param pos Location info
   * @param expr Expression
   */
  function parseMemberExpressionContinuation(context: Context, expr: any) {
    while (true) {
      switch (currentToken.type) {
        case Token.Period:
          updateToken(getToken(context));
          expr = {
            type: 'MemberExpression',
            object: expr,
            computed: false,
            property: parseIdentifier(context)
          };
          continue;
        case Token.LeftBracket:
          updateToken(getToken(context));
          expr = {
            type: 'MemberExpression',
            object: expr,
            computed: true,
            property: parseExpression(context)
          };
          expect(context, Token.RightBracket);
          break;
        default:
          return expr;
      }
    }
  }

  /**
   * Parse argument list
   *
   * @see [https://tc39.github.io/ecma262/#prod-ArgumentList)
   *
   * @param Parser Parser object
   * @param Context Context masks
   */
  function parseArgumentList(context: Context): (ESTree.Expression | ESTree.SpreadElement)[] {
    updateToken(getToken(context));
    const expressions: (ESTree.Expression | ESTree.SpreadElement)[] = [];
    while (currentToken.type !== Token.RightParen) {
      expressions.push(parseAssignmentExpression(context));
      if (currentToken.type !== Token.RightParen) expect(context, Token.Comma);
    }

    expect(context, Token.RightParen);
    return expressions;
  }

  function parsePrimaryExpression(context: Context) {
    return parseIdentifier(context);
  }

  function parseIdentifier(context: Context) {
    updateToken(getToken(context));
    return {
      type: 'Identifier',
      name: previousToken.tokenValue
    };
  }

  return {
    type: 'Program',
    sourceType: context & Context.Module ? 'module' : 'script',
    body: body
  };
}

/**
 * Parse either script code or module code
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-scripts)
 * @see [Link](https://tc39.github.io/ecma262/#sec-modules)
 *
 * @param source source code to parse
 * @param options parser options
 */
export function parse(source: string, options?: Options): ESTree.Program {
  return options && options.module ? parseModule(source, options) : parseScript(source, options);
}

/**
 * Parse script code
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-scripts)
 *
 * @param source source code to parse
 * @param options parser options
 */
export function parseScript(source: string, options?: Options): ESTree.Program {
  return parseSource(source, options, Context.None);
}

/**
 * Parse module code
 *
 * @see [Link](https://tc39.github.io/ecma262/#sec-modules)
 *
 * @param source source code to parse
 * @param options parser options
 */
export function parseModule(source: string, options?: Options): ESTree.Program {
  return parseSource(source, options, Context.Strict | Context.Module);
}
