import { Context, Flags } from '../common';
import { ParserState } from '../types';
import { Token } from '../token';
import { Chars } from '../chars';
import { report, Errors } from '../errors';

const unexpectedCharacter: (state: ParserState) => void = (state: ParserState) => report(state, Errors.Unexpected, String.fromCharCode(state.currentChar));

const table = new Array(0xFFFF).fill(unexpectedCharacter, 0, 0x80)/*.fill(maybeIdentifier, 0x80)*/ as((state: ParserState, context: Context) => Token)[];

table[Chars.Space] =
table[Chars.Tab] =
table[Chars.FormFeed] =
table[Chars.VerticalTab] = () => {
  return Token.WhiteSpace;
}

table[Chars.LineFeed] =
table[Chars.Tab] =
table[Chars.FormFeed] =
table[Chars.VerticalTab] = state => {
    state.flags |= Flags.LineTerminator;
    return Token.WhiteSpace;
}

table[Chars.CarriageReturn] = state => {
  state.flags |= Flags.LineTerminator;
   // If it's a \r\n sequence, consume it as a single EOL.
  if (state.index < state.length && state.currentChar === Chars.LineFeed) {
      state.currentChar = state.source.charCodeAt(++state.index);
  }
  return Token.WhiteSpace;
}

/**
 * Scans and return the next token in the stream.,
 *
 * @param state Parserstate instance
 * @param context Context masks
 */
export function nextToken(state: ParserState, context: Context): Token {
  while (state.index < state.length) {
      const currentChar = state.currentChar;
      state.currentChar = state.source.charCodeAt(++state.index);
      if (((state.token = table[currentChar](state, context)) & Token.WhiteSpace) !== Token.WhiteSpace) {
        return state.token;
      }
  }

  return state.token = Token.EndOfSource;
}
