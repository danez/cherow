import { parseSource, parse, parseModule, parseScript } from './parser/parser';
import * as ESTree from './estree';

export const version = '__VERSION__';

export { ESTree, parseSource, parse, parseModule, parseScript };

export * from './errors';
export * from './token';
export * from './types';
export * from './unicode';
export * from './common';
