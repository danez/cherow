import { Chars } from './chars';

export const enum Context {
  None = 0,
  Module = 1 << 0,
  Strict = 1 << 1,
  OptionsJSX = 1 << 2,
  OptionsNext = 1 << 3,
  OptionsRanges = 1 << 4,
  OptionsRaw = 1 << 5,
  OptionsGlobalReturn = 1 << 6,
  OptionsExperimental = 1 << 7,
  OptionsNative = 1 << 8,
  OptionsTokenize = 1 << 9,
  OptionDisablesWebCompat = 1 << 10,
  OptionsLoc = 1 << 11
}

export function fromCodePoint(code: Chars): string {
  return code <= 0xffff
    ? String.fromCharCode(code)
    : String.fromCharCode(((code - 0x10000) >> 10) + 0xd800, ((code - 0x10000) & (1024 - 1)) + 0xdc00);
}
export function toHex(code: number): number {
  code -= Chars.Zero;
  if (code <= 9) return code;
  code = (code | 0x20) - (Chars.LowerA - Chars.Zero);
  if (code <= 5) return code + 10;
  return -1;
}
