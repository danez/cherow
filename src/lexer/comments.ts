import { Chars } from '../chars';
import { Context, Flags } from '../common';
import { Errors, report } from '../errors';
import { Token } from '../token';
import { ParserState } from '../types';

// TODO: Make sure this works, and add option to collect the comments

/**
 * Skips single HTML comments. Same behavior as in V8.
 *
 * @param parser Parser Object
 * @param context Context masks.
 */
export function skipSingleHTMLComment(state: ParserState, context: Context): Token {
  // ES 2015 B.1.3 -  HTML comments are only allowed when parsing non-module code.
  if (context & Context.Module) report(state, Errors.Unexpected);
  return skipSingleLineComment(state);
}

/**
 * Skips SingleLineComment, SingleLineHTMLCloseComment and SingleLineHTMLOpenComment
 *
 *  @see [Link](https://tc39.github.io/ecma262/#prod-SingleLineComment)
 *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLOpenComment)
 *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLCloseComment)
 *
 * @param state Parser object
 * @param returnToken Token to be returned
 */
export function skipSingleLineComment(state: ParserState): Token {
  let lastIsCR = 0;
  while (state.index < state.length) {
      const next = state.currentChar;
      if ((next & 0x53) < 3 && (
              next === Chars.LineFeed ||
              next === Chars.CarriageReturn ||
              next === Chars.LineSeparator ||
              next === Chars.ParagraphSeparator)) {
          if (next === Chars.CarriageReturn) lastIsCR = 2;
          if (!--lastIsCR) ++state.line;
          state.flags |= (Flags.LineTerminator | Flags.ConsumedComment);
          state.column = 0;
          ++state.line;
          break;
      } else {
          if (lastIsCR) {
              ++state.line;
              lastIsCR = 0;
          }
          ++state.column;
      }

      state.currentChar = state.source.charCodeAt(state.index++);
  }

  return Token.SingleComment;
}

/**
 * Skips multiline comment
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-annexB-MultiLineComment)
 *
 * @param state Parser object
 */
export function skipMultilineComment(state: ParserState): Token {
  let lastIsCR = 0;
  while (state.index < state.length) {
    let currentChar = state.currentChar;
    state.currentChar = state.source.charCodeAt(state.index++);
    while (currentChar === Chars.Asterisk) {
      if (state.index >= state.length) {
        return Token.Invalid;
      }
      currentChar = state.currentChar;
      state.currentChar = state.source.charCodeAt(state.index++);
      if (currentChar === Chars.Slash) {
        return Token.MultiComment;
      }
    }
    if ((currentChar & 0x53) < 3 && (currentChar === Chars.CarriageReturn ||
       (currentChar === Chars.LineFeed ||
        currentChar === Chars.ParagraphSeparator ||
        currentChar === Chars.LineSeparator))) {
          if (currentChar === Chars.CarriageReturn) lastIsCR = 2;
          if (!--lastIsCR) ++state.line;
          state.flags |= (Flags.LineTerminator | Flags.ConsumedComment);
          state.column = 0;
    } else {
      if (lastIsCR) {
          ++state.line;
          lastIsCR = 0;
      }
      ++state.column;
  }
  }
  return Token.Invalid;
}
