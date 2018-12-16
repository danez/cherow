import { Chars } from '../chars';
import { CommentType, Comment } from '../estree';
import { Context, Flags } from '../common';
import { nextChar } from './common';
import { Errors, report } from '../errors';
import { Token } from '../token';
import { ParserState } from '../types';

// TODO: Make sure this works, and add option to collect the comments

/**
 * Skips single HTML comments. Same behavior as in V8.
 *
 * @param parser Parser instance
 * @param context Context masks.
 */
export function skipSingleHTMLComment(state: ParserState, context: Context, type: CommentType): Token {
  // ES 2015 B.1.3 -  HTML comments are only allowed when parsing non-module code.
  if (context & Context.Module) report(state, Errors.Unexpected);
  return skipSingleLineComment(state, context, type);
}

/**
 * Skips SingleLineComment, SingleLineHTMLCloseComment and SingleLineHTMLOpenComment
 *
 *  @see [Link](https://tc39.github.io/ecma262/#prod-SingleLineComment)
 *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLOpenComment)
 *  @see [Link](https://tc39.github.io/ecma262/#prod-annexB-SingleLineHTMLCloseComment)
 *
 * @param state Parser instance
 * @param returnToken Token to be returned
 */
export function skipSingleLineComment(state: ParserState, context: Context, type: CommentType): Token {

  let lastIsCR = 0;
  const start = state.index;
  while (state.index < state.length) {
      const next = state.source.charCodeAt(state.index);
      if ((next & 0x53) < 3 && (
              next === Chars.LineFeed ||
              next === Chars.CarriageReturn ||
              next === Chars.LineSeparator ||
              next === Chars.ParagraphSeparator)) {
          if (next === Chars.CarriageReturn) lastIsCR = 2;
          if (!--lastIsCR) ++state.line;
          state.flags |= Flags.LineTerminator;
          ++state.index;
          state.column = 0;
          ++state.line;
          break;
      } else {
          if (lastIsCR) {
              ++state.line;
              lastIsCR = 0;
          }
          ++state.index;
          ++state.column;
      }
    }

    if (context & Context.OptionsCollectComments) addComment(state, type, start);
    return Token.SingleComment;
}

/**
 * Skips multiline comment
 *
 * @see [Link](https://tc39.github.io/ecma262/#prod-annexB-MultiLineComment)
 *
 * @param state Parser instance
 */
export function skipMultilineComment(state: ParserState, context: Context): any {
  let lastIsCR = 0;
  const start = state.index;
  while (state.index < state.length) {
      switch (state.source.charCodeAt(state.index)) {
          case Chars.Asterisk:
              if (nextChar(state) === Chars.Slash) {
                  nextChar(state)
                  if (context & Context.OptionsCollectComments) addComment(state, 'MultiLine', start);
                  return Token.MultiComment;
              }
              break;
          case Chars.CarriageReturn:
              lastIsCR = 2;
          case Chars.LineFeed: // falls through
          case Chars.LineSeparator: // falls through
          case Chars.ParagraphSeparator:
              if (!--lastIsCR) state.line++;
              state.flags |= Flags.LineTerminator;
              state.index++;
              state.column = 0;
              break;
          default:
              if (lastIsCR) {
                  state.line++;
                  lastIsCR = 0;
              }
              nextChar(state)
      }
  }

  // Unclosed multiline comment
  report(state, Errors.Unexpected);
}

/**
 * Add comments
 *
 * @param parser Parser object
 * @param context Context masks
 * @param type  Comment type
 * @param commentStart Start position of comment
 */

export function addComment(state: ParserState, type: CommentType, start: number): void {
  state.comments.push({
      type,
      value: state.source.slice(start, type === 'MultiLine' ? state.index - 2 : state.index),
  });
}
