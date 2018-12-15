import { Context, Flags } from '../common';
import { ParserState } from '../types';
import { report, Errors } from '../errors';
import { nextChar, fromCodePoint, toHex } from './common';
import { Chars, isIdentifierPart, AsciiLookup, CharType } from '../chars';
import { Token, descKeywordTable } from '../token';
import { unicodeLookup } from '../unicode';

/**
 * Scans identifier
 *
 * @param state ParserState instance
 * @param context Context masks
 */
export function scanIdentifier(state: ParserState, context: Context): Token {
  state.column++;
  if (state.index < state.length) {
    while ((AsciiLookup[state.currentChar] & (CharType.IDContinue | CharType.Decimal)) > 0) nextChar(state);
    state.tokenValue = state.source.slice(state.start, state.index);
    if (state.currentChar === Chars.Backslash) return scanIdentifierRest(state, context);
    if (context & Context.OptionsRaw) state.tokenRaw = state.tokenValue;
    return descKeywordTable[state.tokenValue] || Token.Identifier;
  }
  // Single identifier char
  state.tokenValue = state.source.slice(state.start, state.index);
  if (context & Context.OptionsRaw) state.tokenRaw = state.tokenValue;
  return Token.Identifier;
}

/**
 * Scans the rest of the identifiers. It's the slow path that has to deal with multi unit encoding
 *
 * @param state ParserState instance
 * @param context Context masks
 */
export function scanIdentifierRest(state: ParserState, context: Context): Token {
  let start = state.index;
  let hasEscape = false;
  let c = context;

  if (state.index < state.length) {
    while ((AsciiLookup[state.currentChar] & (CharType.IDContinue | CharType.Decimal)) > 0 ||
          (state.currentChar & 8) === 8 && state.currentChar === Chars.Backslash) {
      if (state.currentChar === Chars.Backslash) {
        state.tokenValue += state.source.slice(start, state.index);
        const cookedChar = scanIdentifierUnicodeEscape(state);
        if (cookedChar === Chars.Backslash || !isIdentifierPart(cookedChar)) return Token.Invalid;
        state.tokenValue += fromCodePoint(cookedChar);
        hasEscape = true;
        start = state.index;
      }
      nextChar(state)
    }

    state.tokenValue += state.source.slice(start, state.index)
  }

 // 'options -> raw'
 if (context & Context.OptionsRaw) state.tokenRaw = state.source.slice(state.start, state.index);
 if (start < state.index &&
    (AsciiLookup[state.currentChar] & CharType.IDStart) > 0 ||
    (unicodeLookup[(state.currentChar >>> 5) + 34816] >>> state.currentChar & 31 & 1) > 0) scanIdentifierRest(state, context);

 const t = descKeywordTable[state.tokenValue] || Token.Identifier;

 if (!hasEscape) return t;

 // TODO(fkleuver): Not sure if this is correct?
 if (context & Context.Strict && (t & Token.YieldKeyword || t & Token.AwaitKeyword)) return Token.Invalid;

 // If not in strict mode context, this will 'fall through' and returned below
 if (t & Token.IdentifierOrContextual) return t;

 if (t & Token.FutureReserved || t === Token.LetKeyword || t === Token.StaticKeyword) {
     return Token.EscapedStrictReserved;
 }
 return Token.EscapedKeyword;
}

/**
 * Scans identifier unicode escape
 *
 * @param state ParserState instance
 */
export function scanIdentifierUnicodeEscape(state: ParserState): number {
  // Read 'u' characters
 if (nextChar(state) !== Chars.LowerU) report(state, Errors.Unexpected);
 let value = 0;
 if (nextChar(state) === Chars.LeftBrace) {
     let digit = toHex(nextChar(state));
     //  '\\u{}'
     if (state.currentChar === Chars.RightBrace) report(state, Errors.Unexpected);
     // Note: The 'while' loop will only execute if the digit is higher than or equal to zero. And the 'value'
     // will still be 0 if invalid hex value. So no need for further validations
     while (digit >= 0) {
         value = (value << 4) | digit;
         if (value > 0x10FFFF) report(state, Errors.Unexpected);
         digit = toHex(nextChar(state));
     }
     if (value < 0 || state.currentChar !== Chars.RightBrace) report(state, Errors.Unexpected);
     nextChar(state);
     return value;
 }

 // 4 characters have to be read for this to be valid
 for (let i = 0; i < 4; i++) {
     const digit = toHex(state.currentChar);
     if (digit < 0) report(state, Errors.Unexpected);
     value = (value << 4) | digit;
     nextChar(state);
 }

 return value;
}
