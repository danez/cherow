import { Context, Flags } from '../common';
import { ParserState } from '../types';
import { Token } from '../token';
import { Chars } from '../chars';
import { report, Errors } from '../errors';

/**
 * Skips any byte order mark at the start
 *
 * parser Parser object
 */
export function skipHashBang(state: ParserState, context: Context): void {
  let index = state.index;
  if (state.currentChar === Chars.ByteOrderMark ||
      state.currentChar === Chars.BigEndian) {
      state.index = index;
  }
  // Stage 3 - HashBang Grammar
  if (context & Context.OptionsNext &&
      index < state.source.length &&
      state.source.charCodeAt(index) === Chars.Hash) {
      index++;
      // '#!'
      if (index < state.source.length && state.source.charCodeAt(index) === Chars.Exclamation) {
          state.index = index + 1;
          while (state.index < state.length) {
              const next = state.source.charCodeAt(state.index);
              if ((next & 83) < 3 && (
                      next === Chars.LineFeed ||
                      next === Chars.CarriageReturn ||
                      next === Chars.LineSeparator ||
                      next === Chars.ParagraphSeparator)) {
                  state.flags |= Flags.LineTerminator;
                  state.index++;
                  state.column = 0;
                  state.line++;
                  if (state.index < state.length && next === Chars.CarriageReturn &&
                      state.source.charCodeAt(state.index) === Chars.LineFeed) {
                      state.index++;
                  }
                  break;
              }
              state.index++;
              state.column++;
          }
      }
   }
 }
