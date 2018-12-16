import { Chars } from '../chars';
import { Context, Flags } from '../common';
import { Errors, report } from '../errors';
import { Token } from '../token';
import { ParserState } from '../types';

export function fromCodePoint (code: Chars): string {
  return code <= 0xFFFF ?
      String.fromCharCode(code) :
      String.fromCharCode(
          ((code - 0x10000) >> 10) + 0xD800,
          ((code - 0x10000) & (1024 - 1)) + 0xDC00);
}

export function nextUnicodeChar(state: ParserState): number {
  let { index } = state;
  const hi = state.source.charCodeAt(index++);

  if (hi < 0xD800 || hi > 0xDBFF) return hi;
  if (index === state.source.length) return hi;
  const lo = state.source.charCodeAt(index);

  if (lo < 0xDC00 || lo > 0xDFFF) return hi;
  return (hi & 0x3FF) << 10 | lo & 0x3FF | 0x10000;
}

export function toHex(code: number): number {
  code -= Chars.Zero;
  if (code <= 9) return code;
  code = (code | 0x20) - (Chars.LowerA - Chars.Zero);
  if (code <= 5) return code + 10;
  return -1;
}

export function nextChar(state: ParserState): number {
  ++state.column;
  return state.currentChar = state.source.charCodeAt(++state.index);
}
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
