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
    return (currentToken.type & Token.ASI) === Token.ASI || currentToken.new
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
      if (!(context & Context.Strict) && tokenValue.length === 10 && tokenValue === 'use strict') {
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

  function parseExpression(context: Context): any {
    return parseIdentifier(context);
  }

  function parseExpressionOrLabelledStatement(context: Context): any {
    let expr = parseExpression(context);
    console.log(expr);
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

  function parseIdentifier(context: Context) {
    updateToken(getToken(context));
    return {
      type: 'Identifier',
      value: previousToken.tokenValue
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
