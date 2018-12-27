import { Context } from '../common';
import { Errors, report } from '../errors';
import * as ESTree from '../estree';
import { skipHashBang } from '../lexer/common';
import { createBlockScope } from '../scope';
import { State } from '../state';
import { EcmaVersion, Options, ScopeState } from '../types';
import { parseModuleItemList } from './module';
import { parseStatementList } from './statements';

/**
 * Parse source
 *
 * @param source The source coode to parser
 * @param options The parser options
 * @param context Context masks
 */
export function parseSource(
  source: string,
  options: Options | void,
  /*@internal*/
  context: Context
): any {
  let sourceFile: string = '';

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

  // Parser insdtance
  const state = new State(source);

  // Stage 3 - HashBang grammar
  skipHashBang(state, context);

  // Scope
  const scope: ScopeState = createBlockScope();

  const body =
    (context & Context.Module) === Context.Module
      ? parseModuleItemList(state, context | Context.ScopeRoot, scope)
      : parseStatementList(state, context | Context.ScopeRoot, scope);

  if (context & Context.Module) {
    for (let key in state.exportedBindings) {
      if (key[0] === '#' && key !== '#default' && (scope.var[key] === undefined && scope.lex[key] === undefined)) {
        //    report(state, Errors.Unexpected);
      }
    }
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
  return parseSource(source, options, Context.Empty);
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
