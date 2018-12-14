import { unicodeLookup } from './unicode';
import { State } from './state';

/*@internal*/
export const enum CharType {
  IDContinue  = 0b1,
  IDStart     = 0b10,
  Decimal     = 0b100,
  Letters     = IDContinue | IDStart,
}

/*@internal*/
export const AsciiLookup = new Uint8Array(0x80)
.fill(CharType.Letters, 0x24, 0x25)  /* $ */
.fill(CharType.Decimal, 0x30, 0x3A)  /* 0-9 */
.fill(CharType.Letters, 0x41, 0x5B)  /* A-Z */
.fill(CharType.Letters, 0x5F, 0x60)  /* _ */
.fill(CharType.Letters, 0x61, 0x7B); /* a-z */

/*@internal*/
export function isIdentifierPart(code: Chars): boolean {
  return (AsciiLookup[code] & CharType.IDContinue) > 0 || (unicodeLookup[(code >>> 5) + 0] >>> code & 31 & 1) > 0;
}

/*@internal*/
export function isIdentifierStart(code: Chars): boolean {
  return (AsciiLookup[code] & CharType.IDStart) > 0 || (unicodeLookup[(code >>> 5) + 34816] >>> code & 31 & 1) > 0;
}

/**
 * A list of character constants with much more human-readable names.
 */
/*@internal*/
export const enum Chars {

    // Optimized for the  0...127 range
    MaxAsciiCharacter = (1 << 7) - 1, // '0x7F'

    Null           = 0b0,
    Backspace      = 0b1000,
    Tab            = 0b1001,
    LineFeed       = 0b1010,
    VerticalTab    = 0b1011,
    FormFeed       = 0b1100,
    CarriageReturn = 0b1101,
    Space          = 0b100000,
    Exclamation    = 0b100001,
    DoubleQuote    = 0b100010,
    Hash           = 0b100011,
    Dollar         = 0b100100,
    Percent        = 0b100101,
    Ampersand      = 0b100110,
    SingleQuote    = 0b100111,
    LeftParen      = 0b101000,
    RightParen     = 0b101001,
    Asterisk       = 0b101010,
    Plus           = 0b101011,
    Comma          = 0b101100,
    Hyphen         = 0b101101,
    Period         = 0b101110,
    Slash          = 0b101111,
    At             = 0b1000000,
    Backtick       = 0b1100000,
    LeftBracket    = 0b1011011,
    Backslash      = 0b1011100,
    RightBracket   = 0b1011101,
    Caret          = 0b1011110,
    Underscore     = 0b1011111,
    LeftBrace      = 0b1111011,
    VerticalBar    = 0b1111100,
    RightBrace     = 0b1111101,
    Tilde          = 0b1111110,
    Colon          = 0b111010,
    Semicolon      = 0b111011,
    LessThan       = 0b111100,
    EqualSign      = 0b111101,
    GreaterThan    = 0b111110,
    QuestionMark   = 0b111111,

    /* Numbers  */

    Zero   = 0b110000,
    One    = 0b110001,
    Two    = 0b110010,
    Three  = 0b110011,
    Four   = 0b110100,
    Five   = 0b110101,
    Six    = 0b110110,
    Seven  = 0b110111,
    Eight  = 0b111000,
    Nine   = 0b111001,

    /* 'A' - 'Z' */
    UpperA = 0b1000001,
    UpperB = 0b1000010,
    UpperC = 0b1000011,
    UpperD = 0b1000100,
    UpperE = 0b1000101,
    UpperF = 0b1000110,
    UpperG = 0b1000111,
    UpperH = 0b1001000,
    UpperI = 0b1001001,
    UpperJ = 0b1001010,
    UpperK = 0b1001011,
    UpperL = 0b1001100,
    UpperM = 0b1001101,
    UpperN = 0b1001110,
    UpperO = 0b1001111,
    UpperP = 0b1010000,
    UpperQ = 0b1010001,
    UpperR = 0b1010010,
    UpperS = 0b1010011,
    UpperT = 0b1010100,
    UpperU = 0b1010101,
    UpperV = 0b1010110,
    UpperW = 0b1010111,
    UpperX = 0b1011000,
    UpperY = 0b1011001,
    UpperZ = 0b1011010,

    /* 'a' - 'z' */

    LowerA  = 0b1100001,
    LowerB  = 0b1100010,
    LowerC  = 0b1100011,
    LowerD  = 0b1100100,
    LowerE  = 0b1100101,
    LowerF  = 0b1100110,
    LowerG  = 0b1100111,
    LowerH  = 0b1101000,
    LowerI  = 0b1101001,
    LowerJ  = 0b1101010,
    LowerK  = 0b1101011,
    LowerL  = 0b1101100,
    LowerM  = 0b1101101,
    LowerN  = 0b1101110,
    LowerO  = 0b1101111,
    LowerP  = 0b1110000,
    LowerQ  = 0b1110001,
    LowerR  = 0b1110010,
    LowerS  = 0b1110011,
    LowerT  = 0b1110100,
    LowerU  = 0b1110101,
    LowerV  = 0b1110110,
    LowerW  = 0b1110111,
    LowerX  = 0b1111000,
    LowerY  = 0b1111001,
    LowerZ  = 0b1111010,

    /* Zs space */
    NextLine           = 0b10000101,
    NonBreakingSpace   = 0b10100000,
    Ogham              = 0b1011010000000,
    EnQuad             = 0b10000000000000,
    EmQuad             = 0b10000000000001,
    EnSpace            = 0b10000000000010,
    EmSpace            = 0b10000000000011,
    ThreePerEmSpace    = 0b10000000000100,
    FourPerEmSpace     = 0b10000000000101,
    SixPerEmSpace      = 0b10000000000110,
    FigureSpace        = 0b10000000000111,
    PunctuationSpace   = 0b10000000001000,
    ThinSpace          = 0b10000000001001,
    HairSpace          = 0b10000000001010,
    ZeroWidthSpace     = 0b10000000001011,
    Zwnj               = 0b10000000001100,
    Zwj                = 0b10000000001101,
    Zwnbs              = 0b1111111011111111,
    LineSeparator      = 0b10000000101000,
    ParagraphSeparator = 0b10000000101001,
    NarrowNoBreakSpace = 0b10000000101111,
    MathematicalSpace  = 0b10000001011111,
    IdeographicSpace   = 0b11000000000000,
    ByteOrderMark      = 0b1111111111101111,
    BigEndian          = 0b1111111111101110
}
