import * as ESTree from './estree';
import { parse, parseModule, parseScript, parseSource } from './parser/parser';

export const version = '__VERSION__';

export { ESTree, parseSource, parse, parseModule, parseScript };

export * from './errors';
export * from './token';
export * from './types';
export * from './unicode';
export * from './common';
