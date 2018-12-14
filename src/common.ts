import * as ESTree from './estree';
import { Token, KeywordDescTable } from './token';
import { nextToken } from './lexer/scan';
import { ParserState, Location } from './types';
import { report, Errors } from './errors';

export const enum Context {
  Empty                 = 0,
  OptionsRaw            = 1 << 1,
  OptionsNext           = 1 << 2,
  OptionsLoc            = 1 << 3,
  OptionsRanges         = 1 << 4,
  OptionsJSX            = 1 << 5,
  OptionsAnnexB         = 1 << 6,
  OptionsGlobalReturn   = 1 << 7,
  OptionsCollectComments = 1 << 8,
  OptionsExperimental   = 1 << 9,
  OptionsNative         = 1 << 10,
  ExpressionStart       = 1 << 11,
  InGenerator           = 1 << 12,
  InAsync               = 1 << 13,
  InParam               = 1 << 14,
  Strict                = 1 << 15,
  Module                = 1 << 16,
  TaggedTemplate        = 1 << 17,
  Tokenize              = 1 << 18,
  InClass               = 1 << 19,
  NewTarget             = 1 << 20,
  InFunctionBody        = 1 << 21,
  DisallowIn            = 1 << 22,
  RequireIdentifier     = 1 << 23,
  DisallowGenerator     = 1 << 24,
  InJSXChild            = 1 << 25,
}

export const enum Flags {
  Empty               = 0,
  LineTerminator      = 1 << 0,
  ConsumedComment     = 1 << 1,

}
