import { Options } from '../types';
import { Context } from '../common';
import * as ESTree from '../estree';
import { State } from '../state';

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
  context: Context): any {
  let sourceFile: string = '';

  if (options !== undefined) {
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
      // The flag to attach raw property to each literal node
      if (options.raw) context |= Context.OptionsRaw;
      // The flag to allow return in the global scope
      if (options.globalReturn) context |= Context.OptionsGlobalReturn;
      // Set to true to record the source file in every node's loc object when the loc option is set.
      if (!!options.source) sourceFile = options.source;
      // The flag to enable implied strict mode
      if (options.impliedStrict) context |= Context.Strict;
      // The flag to enable experimental features
      if (options.experimental) context |= Context.OptionsExperimental;
  }

  const state = new State(source);

  const body = {};

  const node: ESTree.Program = {
      type: 'Program',
      sourceType: context & Context.Module ? 'module' : 'script',
      body: body as ESTree.Statement[],
  };

  return node;

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
  return options && options.module ?
      parseModule(source, options) :
      parseScript(source, options);
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