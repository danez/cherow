import { Context, Flags } from '../common';
import { ParserState } from '../types';
import { Token } from '../token';
import { Chars } from '../chars';
import { report, Errors } from '../errors';

const unexpectedCharacter: (state: ParserState) => void = (state: ParserState) => report(state, Errors.Unexpected, String.fromCharCode(state.currentChar));

const table = new Array(0xFFFF).fill(unexpectedCharacter, 0, 0x80)/*.fill(maybeIdentifier, 0x80)*/ as((state: ParserState, context: Context) => Token)[];

/**
 * Scans and return the next token in the stream.,
 *
 * @param state Parserstate instance
 * @param context Context masks
 */
export function nextToken(state: ParserState, context: Context): Token {
  state.flags &= ~Flags.LineTerminator;
  while (state.index < state.length) {
      if (((state.token = table[state.currentChar](state, context)) & Token.WhiteSpace) !== Token.WhiteSpace) {
        return state.token;
      }
  }

  return state.token = Token.EndOfSource;
}
