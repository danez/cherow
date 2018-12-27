import { Context, Flags, BindingType, BindingOrigin } from '../common';
import * as ESTree from '../estree';
import { nextToken } from '../lexer/scan';
import {
  validateExpression,
  lookAheadOrScan,
  nextTokenIsLeftParenOrPeriod,
  nextTokenIsFuncKeywordOnSameLine
} from './common';
import { Token } from '../token';
import { ParserState, ScopeState } from '../types';
import { parseStatementListItem, parseVariableStatement, parseLexicalDeclaration } from './statements';
import { expect, optional, consumeSemicolon } from './common';
import { parseHoistableFunctionDeclaration } from './declarations';
import { parseAssignmentExpression, parseLiteral, parseIdentifier } from './expressions';
import {
  addToExportedNamesAndCheckForDuplicates,
  addToExportedBindings,
  addVarOrLexicalNameAndDeduplicate,
  checkIfExistInLexicalBindings
} from '../scope';
import { Errors, report } from '../errors';

/**
 * Parse module item list
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ModuleItemList)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */

export function parseModuleItemList(state: ParserState, context: Context, scope: ScopeState): ESTree.Statement[] {
  nextToken(state, context);
  const statements: ESTree.Statement[] = [];
  while (state.currentToken !== Token.EndOfSource) {
    statements.push(parseModuleItem(state, context, scope));
  }

  return statements;
}

/**
 * Parse module item
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ModuleItem)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseModuleItem(state: ParserState, context: Context, scope: ScopeState): any {
  switch (state.currentToken) {
    // ExportDeclaration
    case Token.ExportKeyword:
      return parseExportDeclaration(state, context, scope);

    // ImportDeclaration
    case Token.ImportKeyword:
      //  // `import("...")` call or `import.meta` meta property disallowed here
      if ((context & Context.OptionsNext) < 1 && !lookAheadOrScan(state, context, nextTokenIsLeftParenOrPeriod, true)) {
        return parseImportDeclaration(state, context, scope);
      }
    // falls through
    default:
      return parseStatementListItem(state, context, scope);
  }
}

/**
 * Parse export declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ExportDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-HoistableDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ClassDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-HoistableDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
function parseExportDeclaration(state: ParserState, context: Context, scope: ScopeState) {
  expect(state, context, Token.ExportKeyword);

  const specifiers: ESTree.ExportSpecifier[] = [];

  let declaration: any = null;
  let source: ESTree.Literal | null = null;

  if (optional(state, context, Token.DefaultKeyword)) {
    switch (state.currentToken) {
      // export default HoistableDeclaration[Default]
      case Token.FunctionKeyword: {
        declaration = parseHoistableFunctionDeclaration(state, context, scope, true);
        break;
      }

      // export default ClassDeclaration[Default]
      case Token.ClassKeyword:
        // declaration = parseClassDeclaration(state, context | Context.RequireIdentifier);
        break;

      // export default HoistableDeclaration[Default]
      case Token.AsyncKeyword:
        declaration = parseAsyncFunctionOrAssignmentExpression(state, context, scope);
        break;

      default:
        // export default [lookahead ∉ {function, class}] AssignmentExpression[In] ;
        declaration = parseAssignmentExpression(state, context);
        consumeSemicolon(state, context);
    }

    // See: https://www.ecma-international.org/ecma-262/9.0/index.html#sec-exports-static-semantics-exportednames
    addToExportedNamesAndCheckForDuplicates(state, 'default');

    // See: https://www.ecma-international.org/ecma-262/9.0/index.html#sec-exports-static-semantics-exportedbindings
    addToExportedBindings(state, '*default*');

    addVarOrLexicalNameAndDeduplicate(state, context, scope, BindingType.Empty, false, '*default*');

    return {
      type: 'ExportDefaultDeclaration',
      declaration
    };
  }

  switch (state.currentToken) {
    case Token.Multiply: {
      nextToken(state, context);
      expect(state, context, Token.FromKeyword);
      if ((state.currentToken & Token.StringLiteral) !== Token.StringLiteral) report(state, Errors.Unexpected);
      source = parseLiteral(state, context);
      consumeSemicolon(state, context);
      return {
        type: 'ExportAllDeclaration',
        source
      };
    }
    case Token.LeftBrace: {
      let exportedNames: string[] = [];
      let exportedBindings: string[] = [];

      expect(state, context, Token.LeftBrace);
      while (state.currentToken !== Token.RightBrace) {
        let tokenValue = state.tokenValue;
        const local = parseIdentifier(state, context);
        let exported: any;
        if (state.currentToken === Token.AsKeyword) {
          nextToken(state, context);
          if (!(state.currentToken & (Token.Identifier | Token.Keyword))) report(state, Errors.Unexpected);
          exportedNames.push(state.tokenValue);
          exportedBindings.push(tokenValue);
          exported = parseIdentifier(state, context);
        } else {
          exportedNames.push(state.tokenValue);
          exportedBindings.push(state.tokenValue);
          exported = local;
        }

        specifiers.push({
          type: 'ExportSpecifier',
          local,
          exported
        });

        if (state.currentToken !== Token.RightBrace) expect(state, context, Token.Comma);
      }

      expect(state, context, Token.RightBrace);

      if (state.currentToken === Token.FromKeyword) {
        nextToken(state, context);
        //  The left hand side can't be a keyword where there is no
        // 'from' keyword since it references a local binding.
        if ((state.currentToken & Token.StringLiteral) !== Token.StringLiteral) report(state, Errors.Unexpected);
        source = parseLiteral(state, context);
      } else {
        for (let i = 0, l = exportedNames.length; i < l; ++i)
          addToExportedNamesAndCheckForDuplicates(state, exportedNames[i]);
        for (let i = 0, l = exportedBindings.length; i < l; ++i) addToExportedBindings(state, exportedBindings[i]);
      }

      consumeSemicolon(state, context);

      break;
    }

    case Token.ClassKeyword:
    case Token.LetKeyword:
      declaration = parseLexicalDeclaration(state, context, BindingType.Let, BindingOrigin.Export, scope);
      if (checkIfExistInLexicalBindings(state, context, scope)) report(state, Errors.Unexpected);
      break;
    case Token.ConstKeyword:
      declaration = parseLexicalDeclaration(state, context, BindingType.Const, BindingOrigin.Export, scope);
      if (checkIfExistInLexicalBindings(state, context, scope)) report(state, Errors.Unexpected);
      break;
    case Token.VarKeyword:
      declaration = parseVariableStatement(state, context, BindingType.Variable, BindingOrigin.Export, scope);
      break;
    case Token.FunctionKeyword:
      declaration = parseHoistableFunctionDeclaration(state, context, scope, false);
      break;
    case Token.AsyncKeyword:
    default:
      report(state, Errors.Unexpected);
  }

  return {
    type: 'ExportNamedDeclaration',
    source,
    specifiers,
    declaration
  };
}

/**
 * Parse import declaration
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ImportDeclaration)
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseImportDeclaration(state: ParserState, context: Context, scope: ScopeState): any {
  expect(state, context, Token.ImportKeyword);

  let source: ESTree.Literal;
  const specifiers: ESTree.Specifiers[] = [];

  // 'import' ModuleSpecifier ';'
  if (state.currentToken & Token.Identifier) {
    specifiers.push({
      type: 'ImportDefaultSpecifier',
      local: parseIdentifier(state, context)
    });

    if (optional(state, context, Token.Comma)) {
      if (state.currentToken === Token.Multiply) {
        parseImportNamespace(state, context, scope, specifiers);
      } else if (state.currentToken === Token.LeftBrace) {
        parseImportSpecifierOrNamedImports(state, context, scope, specifiers);
      } else report(state, Errors.Unexpected);
    }

    source = parseModuleSpecifier(state, context);

    // 'import' ModuleSpecifier ';'
  } else if (state.currentToken & Token.StringLiteral) {
    source = parseLiteral(state, context);
  } else {
    if (state.currentToken === Token.Multiply) {
      parseImportNamespace(state, context, scope, specifiers);
    } else if (state.currentToken === Token.LeftBrace) {
      parseImportSpecifierOrNamedImports(state, context, scope, specifiers);
    } else report(state, Errors.Unexpected);

    source = parseModuleSpecifier(state, context);
  }

  consumeSemicolon(state, context);

  return {
    type: 'ImportDeclaration',
    specifiers,
    source
  };
}

/**
 * Parse named imports or import specifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NamedImports)
 * @see [Link](https://tc39.github.io/ecma262/#prod-ImportSpecifier)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */

function parseImportSpecifierOrNamedImports(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  specifiers: ESTree.Specifiers[]
): void {
  expect(state, context, Token.LeftBrace);
  while (state.currentToken !== Token.RightBrace) {
    const t = state.currentToken;
    const tokenValue = state.tokenValue;
    if (!(t & (Token.Identifier | Token.Keyword))) report(state, Errors.Unexpected);
    const imported = parseIdentifier(state, context);
    let local: ESTree.Identifier;
    if (optional(state, context, Token.AsKeyword)) {
      validateExpression(state, context, BindingType.Const);
      addVarOrLexicalNameAndDeduplicate(state, context, scope, BindingType.Const, false, state.tokenValue);
      local = parseIdentifier(state, context);
    } else {
      // An import name that is a keyword is a syntax error if it is not followed
      // by the keyword 'as'.
      validateExpression(state, context, BindingType.Const);
      addVarOrLexicalNameAndDeduplicate(state, context, scope, BindingType.Const, false, tokenValue);
      local = imported;
    }

    specifiers.push({
      type: 'ImportSpecifier',
      local,
      imported
    });

    if (state.currentToken !== Token.RightBrace) expect(state, context, Token.Comma);
  }

  expect(state, context, Token.RightBrace);
}

/**
 * Parse binding identifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-NameSpaceImport)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */

function parseImportNamespace(
  state: ParserState,
  context: Context,
  scope: ScopeState,
  specifiers: ESTree.Specifiers[]
): void {
  // NameSpaceImport:
  //  * as ImportedBinding
  nextToken(state, context);
  expect(state, context, Token.AsKeyword);
  validateExpression(state, context, BindingType.Const);
  addVarOrLexicalNameAndDeduplicate(state, context, scope, BindingType.Const, false, state.tokenValue);
  const local = parseIdentifier(state, context); // parseBindingIdentifier(state, context);
  specifiers.push({
    type: 'ImportNamespaceSpecifier',
    local
  });
}

/**
 * Parse module specifier
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-ModuleSpecifier)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseModuleSpecifier(state: ParserState, context: Context): ESTree.Literal {
  // ModuleSpecifier :
  //   StringLiteral
  expect(state, context, Token.FromKeyword);
  if ((state.currentToken & Token.StringLiteral) !== Token.StringLiteral) report(state, Errors.Unexpected);
  return parseLiteral(state, context);
}

/**
 * Parses either async function or assignment expression
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-AssignmentExpression)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncFunctionDeclaration)
 * @see [Link](https://tc39.github.io/ecma262/#prod-AsyncGeneratorDeclaration)
 *
 * @param parser  Parser instance
 * @param context Context masks
 */
function parseAsyncFunctionOrAssignmentExpression(
  state: ParserState,
  context: Context,
  scope: ScopeState
): ESTree.FunctionDeclaration | ESTree.AssignmentExpression {
  return lookAheadOrScan(state, context, nextTokenIsFuncKeywordOnSameLine, false)
    ? parseHoistableFunctionDeclaration(state, context, scope, false)
    : (parseAssignmentExpression(state, context) as any);
}
