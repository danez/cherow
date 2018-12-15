import { Token } from './token';
import { Flags } from './common';
import { Comment } from './estree';

/**
 * `ECMAScript version
 */
export type EcmaVersion = 1 | 2 | 3 | 4 | 5 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020;

/**
 * The parser options.
 */
export interface Options {

  // Set to 3, 5 (default), 6, 7, 8, 9, or 10 to specify the version of ECMAScript syntax you want to use.
  // You can also set to 2015 (same as 6), 2016 (same as 7), 2017 (same as 8), 2018 (same as 9), or 2019 (same as 10) to use the year-based naming.
  ecmaVersion?: EcmaVersion;

  // The flag to allow module code
  module?: boolean;

  // Create a top-level comments array containing all comments
  attachComments?: boolean;

  // The flag to enable stage 3 support (ESNext)
  next?: boolean;

  // The flag to enable start and end offsets to each node
  ranges?: boolean;

  // The flag to enable line/column location information to each node
  loc?: boolean;

  // The flag to enable React JSX parsing
  jsx?: boolean;

  // The flag to attach raw property to each literal and identifier node
  raw?: boolean;

  // Set to true to record the source file in every node's loc object when the loc option is set.
  source?: string;

  // The flag to enable implied strict mode
  impliedStrict?: boolean;

  // The flag to allow return in the global scope
  globalReturn?: boolean;

  // The flag to allow experimental features
  experimental?: boolean;

  // Enables method that should be bypassed when running on NodeJS
  native?: boolean;

  // Enabled tokenizing
  tokenize?: boolean;

  // Disable web compability (AnnexB)
  disableWebCompat?: boolean;
}

export interface ParserState {
    index: number;
    line: number;
    column: number;
    source: string;
    flags: Flags;
    length: number;
    currentChar: number;
    tokenRaw: string | null;
    token: Token;
    tokenValue: any;
    tokenRegExp: any;
    tokens: any;
}

/**
 *  Line / column location
 *
 */
export interface Location {
  index: number;
  column: number;
  line: number;
}
