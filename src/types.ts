import { Token } from './token';
import { Flags, LabelState } from './common';
import { Comment } from './estree';
import { CommentType } from './lexer/comments';

/**
 * `onToken` option.
 */
export type OnToken = void | ((token: string, value: string, line?: number, column?: number) => void);

/**
 * `onError` option.
 */
export type OnError = void | ((error: string, line: number, column: number) => void);

/**
 * `onComment` option.
 */
export type OnComment = void | Comment[] | ((type: string, value: string, start: number, end: number) => any);

/**
 * The parser options.
 */
export interface Options {

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
    lastIdentifier: any;
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
