import { Chars } from '../chars';
import { Context } from '../parser/common';
import { Errors, report } from '../errors';
import { Token } from '../token';
import { ParserState } from '../types';
import { fromCodePoint, nextChar } from './common';
import { InvalidEscapeType, reportInvalidEscapeError, table } from './strings';

/**
 * Scan template
 *
 * @param parser Parser object
 * @param context Context masks
 */
export function scanTemplate(state: ParserState, context: Context) {
  let tail = true;
  let ret: string | void = '';

  while (nextChar(state) !== Chars.Backtick) {
    if (state.currentChar === Chars.Dollar) {
      if (state.index + 1 < state.length && state.source.charCodeAt(state.index + 1) === Chars.LeftBrace) {
        state.index++;
        tail = false;
        break;
      } else {
        ret += '$';
      }
    } else if (state.currentChar === Chars.Backslash) {
      if (state.currentChar >= 0x80) {
        ret += fromCodePoint(state.currentChar);
      } else {
        const code = table[state.currentChar](state, context);
        if (code >= 0) {
          ret += fromCodePoint(code);
        } else if (code !== InvalidEscapeType.Empty && context & Context.TaggedTemplate) {
          ret = undefined;
          state.currentChar = scanLooserTemplateSegment(state, state.currentChar);
          if (state.currentChar < 0) {
            state.currentChar = -state.currentChar;
            tail = false;
          }
          break;
        } else {
          reportInvalidEscapeError(state, code as InvalidEscapeType);
        }
      }
    } else {
      ret += String.fromCharCode(state.currentChar);
    }
  }

  nextChar(state);
  state.tokenValue = ret;
  if (tail) {
    return Token.TemplateTail;
  }
  return Token.TemplateCont;
}

export function scanTemplateTail(state: ParserState, context: Context): Token {
  if (state.index >= state.length) {
    report(state, Errors.Unexpected);
  }
  state.index--;
  return scanTemplate(state, context);
}

/**
 * Scan looser template segment
 *
 * @param parser Parser object
 * @param ch codepoint
 */
export function scanLooserTemplateSegment(state: ParserState, ch: number): number {
  while (ch !== Chars.Backtick) {
    if (ch === Chars.Dollar && state.source.charCodeAt(state.index + 1) === Chars.LeftBrace) {
      nextChar(state);
      return -ch;
    }

    // Skip '\' and continue to scan the template token to search
    // for the end, without validating any escape sequences
    ch = nextChar(state);
  }

  return ch;
}
