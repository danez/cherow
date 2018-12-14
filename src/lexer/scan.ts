import { Context, Flags } from '../common';
import { ParserState } from '../types';
import { Token } from '../token';
import { Chars } from '../chars';
import { report, Errors } from '../errors';

/*@internal*/
export const whiteSpaceMap: Function[] = new Array(0xFEFF);
const truthFn = (state: ParserState) => { state.column++; return true; };

whiteSpaceMap.fill(truthFn, 0x9, 0xD + 1);
whiteSpaceMap.fill(truthFn, 0x2000, 0x200A + 1);
whiteSpaceMap[0xA0] = whiteSpaceMap[0x1680] = whiteSpaceMap[0x202F] = whiteSpaceMap[0x205F] = whiteSpaceMap[0x3000] = whiteSpaceMap[0xFEFF] = truthFn;
whiteSpaceMap[Chars.ByteOrderMark] = () => Token.WhiteSpace;
whiteSpaceMap[Chars.ParagraphSeparator] = whiteSpaceMap[Chars.LineSeparator] = (state: ParserState) => {
  state.column = 0;
  state.line++;
  state.flags |= Flags.LineTerminator;
  return Token.WhiteSpace;
}

const unexpectedCharacter: (state: ParserState) => void = (state: ParserState) => report(state, Errors.Unexpected, String.fromCharCode(state.currentChar));

const maybeIdentifier = (state: ParserState, context: Context, currentChar: number) => {
  if (whiteSpaceMap[currentChar](state)) return Token.WhiteSpace;
  const c = context;
  // TODO: Identifier special cases
  return Token.WhiteSpace;
}

const table = new Array(0xFFFF).fill(unexpectedCharacter, 0, 0x80).fill(maybeIdentifier, 0x80) as((state: ParserState, context: Context, currentChar: number) => Token)[];

table[Chars.Space] =
table[Chars.Tab] =
table[Chars.FormFeed] =
table[Chars.VerticalTab] = state => {
  state.column++;
  return Token.WhiteSpace;
}

table[Chars.LineFeed] = state => {
  state.column = 0;
  state.line++;
  state.flags |= Flags.LineTerminator;
  return Token.WhiteSpace;
}

table[Chars.CarriageReturn] = state => {
  state.column = 0;
  state.line++;
  state.flags |= Flags.LineTerminator;
  if (state.index < state.length && state.currentChar === Chars.LineFeed) {
      state.currentChar = state.source.charCodeAt(++state.index);
  }
  return Token.WhiteSpace;
}

/**
 * Scans and return the next token in the stream.
 *
 * @param state Parserstate instance
 * @param context Context masks
 */
export function nextToken(state: ParserState, context: Context): Token {
  while (state.index < state.length) {
      const currentChar = state.currentChar;
      state.currentChar = state.source.charCodeAt(++state.index);
      if (((state.token = table[currentChar](state, context, currentChar)) & Token.WhiteSpace) !== Token.WhiteSpace) {
        return state.token;
      }
  }

  return state.token = Token.EndOfSource;
}
