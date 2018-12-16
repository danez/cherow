import { Errors, report } from './errors';
import * as ESTree from './estree';
import { nextToken } from './lexer/scan';
import { KeywordDescTable, Token } from './token';
import { Location, ParserState } from './types';

export const enum Context {
  Empty                  = 0,
  OptionsRaw             = 1 << 1,
  OptionsNext            = 1 << 2,
  OptionsLoc             = 1 << 3,
  OptionsRanges          = 1 << 4,
  OptionsJSX             = 1 << 5,
  OptionsWebCompat       = 1 << 6,
  OptionsGlobalReturn    = 1 << 7,
  OptionsCollectComments = 1 << 8,
  OptionsExperimental    = 1 << 9,
  OptionsNative          = 1 << 10,
  OptionsTokenize        = 1 << 11,
  ExpressionStart        = 1 << 12,
  InGenerator            = 1 << 13,
  InAsync                = 1 << 14,
  InParam                = 1 << 15,
  Strict                 = 1 << 16,
  Module                 = 1 << 17,
  TaggedTemplate         = 1 << 18,
  Tokenize               = 1 << 19,
  InClass                = 1 << 20,
  NewTarget              = 1 << 21,
  InFunctionBody         = 1 << 22,
  DisallowIn             = 1 << 23,
  RequireIdentifier      = 1 << 24,
  DisallowGenerator      = 1 << 25,
  InJSXChild             = 1 << 26,
  //
  Exponentation           = 1 << 27, // ECMAScript 7
  TrailingComma           = 1 << 28, // ECMAScript 8
  AsyncFunctions          = 1 << 29, // ECMAScript 8
  AsyncGenerators         = 1 << 30, // ECMAScript 9
  RevistedTemplate        = 1 << 31, // ECMAScript 9
  ObjectSpread            = 1 << 32, // ECMAScript 9

  ES7            = Exponentation,
  ES8            = Exponentation | TrailingComma | AsyncFunctions  | TrailingComma,
  Next = Exponentation | TrailingComma | AsyncFunctions | AsyncGenerators | RevistedTemplate | ObjectSpread
}

export const enum Flags {
  Empty               = 0,
  LineTerminator      = 1 << 0,
  ConsumedComment     = 1 << 1,

}
