import { Chars } from '../chars';
import { Context, Flags } from '../common';
import { Errors, report } from '../errors';
import { Token } from '../token';
import { ParserState } from '../types';
import { advanceNewLine, nextChar } from './common';
import { scanIdentifier } from './identifiers';
import { scanNumber } from './numbers';
import { scanString } from './strings';
import { scanTemplate } from './template';

import { skipMultilineComment, skipSingleHTMLComment, skipSingleLineComment } from './comments';

export const whiteSpaceMap: Function[] = new Array(0xFEFF);

const truthFn = (state: ParserState) => { state.index++; state.column++; return true; };

whiteSpaceMap.fill(truthFn, 0x9, 0xD + 1);
whiteSpaceMap.fill(truthFn, 0x2000, 0x200A + 1);
whiteSpaceMap[0xA0] = whiteSpaceMap[0x1680] =
whiteSpaceMap[0x202F] = whiteSpaceMap[0x205F] = whiteSpaceMap[0x3000] = whiteSpaceMap[0xFEFF] = truthFn;
whiteSpaceMap[Chars.ParagraphSeparator] = whiteSpaceMap[Chars.LineSeparator] = (state: ParserState) => {
  advanceNewLine(state);
  return Token.WhiteSpace;
};

const unexpectedCharacter: (state: ParserState) => void =
(state: ParserState) => report(state, Errors.Unexpected, String.fromCharCode(state.currentChar));

const table = new Array(0xFFFF).fill(unexpectedCharacter, 0, 0x80).fill((state: ParserState) => {
  if (whiteSpaceMap[state.currentChar](state)) return Token.WhiteSpace;
  // TODO: Identifier special cases
  return Token.WhiteSpace;
},                                                                      0x80) as((state: ParserState, context: Context) => Token)[];

export function mapToToken(token: Token): (state: ParserState) => Token {
  return state => {
      nextChar(state);
      return token;
  };
}

// `,`, `~`, `?`, `[`, `]`, `{`, `}`, `:`, `;`, `(` ,`)`, `"`, `'`, `@`
table[Chars.Comma] = mapToToken(Token.Comma);
table[Chars.Tilde] = mapToToken(Token.Complement);
table[Chars.QuestionMark] = mapToToken(Token.QuestionMark);
table[Chars.LeftBracket] = mapToToken(Token.LeftBracket);
table[Chars.RightBracket] = mapToToken(Token.RightBracket);
table[Chars.LeftBrace] = mapToToken(Token.LeftBrace);
table[Chars.RightBrace] = mapToToken(Token.RightBrace);
table[Chars.Colon] = mapToToken(Token.Colon);
table[Chars.Semicolon] = mapToToken(Token.Semicolon);
table[Chars.LeftParen] = mapToToken(Token.LeftParen);
table[Chars.RightParen] = mapToToken(Token.RightParen);
table[Chars.At] = mapToToken(Token.At);

// `A`...`Z`
for (let i = Chars.UpperA; i <= Chars.UpperZ; i++) table[i] = scanIdentifier;

// `a`...z`
for (let i = Chars.LowerA; i <= Chars.LowerZ; i++) table[i] = scanIdentifier;

// `1`...`9`
for (let i = Chars.One; i <= Chars.Nine; i++) table[i] = (s, context) => scanNumber(s, context, false);

// `$foo`, `_var`
table[Chars.Dollar] = table[Chars.Underscore] = scanIdentifier;

// `foo`
table[Chars.Backtick] = scanTemplate;

// Whitespace
table[Chars.Space] =
table[Chars.Tab] =
table[Chars.FormFeed] =
table[Chars.VerticalTab] = s => {
  nextChar(s);
  return Token.WhiteSpace;
};

// Linefeed
table[Chars.LineFeed] = state => {
  advanceNewLine(state);
  return Token.WhiteSpace;
};

// Cr
table[Chars.CarriageReturn] = state => {
  advanceNewLine(state);
  if (state.index < state.length && state.currentChar === Chars.LineFeed) {
    state.currentChar = state.source.charCodeAt(++state.index);
  }
  return Token.WhiteSpace;
};

// String literal
table[Chars.DoubleQuote] = table[Chars.SingleQuote] = scanString;

// `/`, `/=`, `/>`, '/*..*/'
table[Chars.Slash] = (s, context) => {
 const next = nextChar(s);
 if (next === Chars.Slash) {
   nextChar(s);
   return skipSingleLineComment(s, context, 'SingleLine');
  } else if (next === Chars.Asterisk) {
    nextChar(s);
    return skipMultilineComment(s, context);
  } else if (next === Chars.EqualSign) {
      nextChar(s);
      return Token.DivideAssign;
  } else if (next === Chars.GreaterThan) {
      nextChar(s);
      return Token.JSXAutoClose;
  }

 return Token.Divide;
};

// `=`, `==`, `===`, `=>`
table[Chars.EqualSign] = s => {
  const next = nextChar(s);
  if (next === Chars.EqualSign) {
      if (nextChar(s) === Chars.EqualSign) {
        nextChar(s);
        return Token.StrictEqual;
      }
      return Token.LooseEqual;
  } else if (next === Chars.GreaterThan) {
    nextChar(s);
    return Token.Arrow;
  }
  return Token.Assign;
};

// `<`, `<=`, `<<`, `<<=`, `</`,  <!--
table[Chars.LessThan] = (state, context) => {
  if (state.index < state.source.length) {
    const next = nextChar(state);
    if (next === Chars.EqualSign) {
      nextChar(state);
      return Token.LessThanOrEqual;
    } else if (next === Chars.LessThan) {
      nextChar(state);
      if (state.currentChar === Chars.EqualSign) {
          nextChar(state);
          return Token.ShiftLeftAssign;
        }
      return Token.ShiftLeft;
    } else if ((context & Context.OptionDisablesWebCompat) === 0 && next === Chars.Exclamation &&
    nextChar(state) === Chars.Hyphen &&
    nextChar(state) === Chars.Hyphen) {
    nextChar(state);
    return skipSingleHTMLComment(state, context, 'HTMLOpen');
  }
}
  return Token.LessThan;
};

// `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
table[Chars.GreaterThan] = s => {
  if (nextChar(s) === Chars.EqualSign) {
    nextChar(s);
    return Token.GreaterThanOrEqual;
  }
  if (s.currentChar !== Chars.GreaterThan) return Token.GreaterThan;

  const next = nextChar(s);

  if (next === Chars.GreaterThan) {
    nextChar(s);
    if (s.currentChar === Chars.EqualSign) {
        nextChar(s);
        return Token.LogicalShiftRightAssign;
    } else {
        return Token.LogicalShiftRight;
    }
   } else if (next === Chars.EqualSign) {
      nextChar(s);
      return Token.ShiftRightAssign;
  }

  return Token.ShiftRight;
};

// `!`, `!=`, `!==`
table[Chars.Exclamation] = s => {
  if (nextChar(s) !== Chars.EqualSign) return Token.Negate;
  if (nextChar(s) !== Chars.EqualSign) return Token.LooseNotEqual;
  nextChar(s);
  return Token.StrictNotEqual;
};

// `*`, `**`, `*=`, `**=`
table[Chars.Asterisk] = s => {
  const next = nextChar(s);
  if (next === Chars.EqualSign) {
    nextChar(s);
    return Token.MultiplyAssign;
  }
  if (next !== Chars.Asterisk) return Token.Multiply;
  if (nextChar(s) !== Chars.EqualSign) return Token.Exponentiate;
  nextChar(s);
  return Token.ExponentiateAssign;
};

// `%`, `%=`
table[Chars.Percent] = s => {
  if (nextChar(s) !== Chars.EqualSign) return Token.Modulo;
  nextChar(s);
  return Token.ModuloAssign;
};

// `^`, `^=`
table[Chars.Caret] = s => {
  if (nextChar(s) !== Chars.EqualSign) return Token.BitwiseXor;
  nextChar(s);
  return Token.BitwiseXorAssign;
};

// `&`, `&&`, `&=`
table[Chars.Ampersand] = s => {
  const next = nextChar(s);
  if (next === Chars.Ampersand) {
    nextChar(s);
    return Token.LogicalAnd;
  }
  if (next !== Chars.EqualSign) return Token.BitwiseAnd;
  nextChar(s);
  return Token.BitwiseAndAssign;
 };

// `+`, `++`, `+=`
table[Chars.Plus] = s => {
  const next = nextChar(s);
  if (next === Chars.Plus) {
    nextChar(s);
    return Token.Increment;
  }
  if (next === Chars.EqualSign) {
    nextChar(s);
    return Token.AddAssign;
  }
  return Token.Add;
};

// `-`, `--`, `-=`
table[Chars.Hyphen] = (s, context) => {
  const next = nextChar(s);
  if (next === Chars.Hyphen) {
      if (nextChar(s) === Chars.GreaterThan &&
        (context & Context.OptionDisablesWebCompat) === 0 &&
        (s.flags & Flags.LineTerminator || s.startIndex === 0)) {
        nextChar(s);
        return skipSingleHTMLComment(s, context, 'HTMLClose');
      }
      return Token.Decrement;
    }

  if (next !== Chars.EqualSign) return Token.Subtract;
  nextChar(s);
  return Token.SubtractAssign;
};

// `|`, `||`, `|=`
table[Chars.VerticalBar] = s => {
  const next = nextChar(s);
  if (next === Chars.VerticalBar) {
    nextChar(s);
    return Token.LogicalOr;
  } else if (next === Chars.EqualSign) {
    nextChar(s);
    return Token.BitwiseOrAssign;
  }
  return Token.BitwiseOr;
};

// `.`, `...`, `.123` (numeric literal)
table[Chars.Period] = (state, context) => {
  let index = state.index + 1;
  if (index < state.source.length) {
      const next = state.source.charCodeAt(index);
      if (next === Chars.Period) {
          index++;
          if (index < state.source.length &&
              state.source.charCodeAt(index) === Chars.Period) {
              state.index = index + 1;
              state.column += 3;
              state.currentChar = state.source.charCodeAt(state.index);
              return Token.Ellipsis;
          }
      } else if (next >= Chars.Zero && next <= Chars.Nine) {
          // Rewind the initial token.
          scanNumber(state, context, true);
          return Token.NumericLiteral;
      }
    }
  nextChar(state);
  return Token.Period;
};

/**
 * Scans and return the next token in the stream.
 *
 * @param state Parserstate instance
 * @param context Context masks
 */
export function nextToken(state: ParserState, context: Context): Token {
  while (state.index < state.length) {
      state.startIndex = state.index;
      if (((state.currentToken = table[state.currentChar](state, context)) & Token.WhiteSpace) !== Token.WhiteSpace) {
        if (context & Context.OptionsTokenize) state.tokens.push(state.currentToken);
        return state.currentToken;
      }
  }

  return state.currentToken = Token.EndOfSource;
}
