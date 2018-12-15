import { Context, Flags } from '../common';
import { nextChar } from './common';
import { ParserState } from '../types';
import { Token } from '../token';
import { Chars } from '../chars';
import { report, Errors } from '../errors';
import { scanIdentifier } from './identifiers';

import { skipSingleHTMLComment, skipSingleLineComment, skipMultilineComment } from './comments';

export const whiteSpaceMap: Function[] = new Array(0xFEFF);

const truthFn = (state: ParserState) => { state.column++; return true; };

whiteSpaceMap.fill(truthFn, 0x9, 0xD + 1);
whiteSpaceMap.fill(truthFn, 0x2000, 0x200A + 1);
whiteSpaceMap[0xA0] = whiteSpaceMap[0x1680] =
whiteSpaceMap[0x202F] = whiteSpaceMap[0x205F] = whiteSpaceMap[0x3000] = whiteSpaceMap[0xFEFF] = truthFn;
whiteSpaceMap[Chars.ParagraphSeparator] = whiteSpaceMap[Chars.LineSeparator] = (state: ParserState) => {
  state.column = 0;
  state.line++;
  state.flags |= Flags.LineTerminator;
  return Token.WhiteSpace;
}

const unexpectedCharacter: (state: ParserState) => void =
(state: ParserState) => report(state, Errors.Unexpected, String.fromCharCode(state.currentChar));

const table = new Array(0xFFFF).fill(unexpectedCharacter, 0, 0x80).fill((state: ParserState, context: Context, currentChar: number) => {
  if (whiteSpaceMap[currentChar](state)) return Token.WhiteSpace;
  const c = context;
  // TODO: Identifier special cases
  return Token.WhiteSpace;
}, 0x80) as((state: ParserState, context: Context, currentChar: number, start: number) => Token)[];

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

// `$foo`, `_var`
table[Chars.Dollar] = table[Chars.Underscore] = scanIdentifier;

// Whitespace
table[Chars.Space] =
table[Chars.Tab] =
table[Chars.FormFeed] =
table[Chars.VerticalTab] = state => {
  state.column++;
  return Token.WhiteSpace;
}

// Linefeed
table[Chars.LineFeed] = state => {
  state.column = 0;
  state.line++;
  state.flags |= Flags.LineTerminator;
  return Token.WhiteSpace;
}

// Cr
table[Chars.CarriageReturn] = state => {
  state.column = 0;
  state.line++;
  state.flags |= Flags.LineTerminator;
  if (state.index < state.length && state.currentChar === Chars.LineFeed) {
      state.currentChar = state.source.charCodeAt(++state.index);
  }
  return Token.WhiteSpace;
}

// `/`, `/=`, `/>`, '/*..*/'
table[Chars.Slash] = (state, context) => {
  ++state.column;
  if (state.index  >= state.length) return Token.Divide;
  const currentChar = state.currentChar;
  if (currentChar === Chars.Slash) {
      ++state.column;
      state.currentChar = state.source.charCodeAt(state.index++);
      return skipSingleLineComment(state);
  } else if (currentChar === Chars.Asterisk) {
      ++state.column;
      state.currentChar = state.source.charCodeAt(state.index++);
      return skipMultilineComment(state);
  } else if (currentChar === Chars.EqualSign) {
    ++state.column;
    return Token.DivideAssign;
  } else if (context & Context.ExpressionStart) {
    // TODO: return scanRegularExpression(state, context);
  }
  return Token.Divide;
};

// `=`, `==`, `===`, `=>`
table[Chars.EqualSign] = state => {
    ++state.column;
    const currentChar = state.currentChar;
    if (currentChar === Chars.EqualSign) {
      if (state.index < state.length && nextChar(state) === Chars.EqualSign) {
        ++state.column;
        state.currentChar = state.source.charCodeAt(++state.index);
        return Token.StrictEqual;
      } else return Token.LooseEqual;
    } else if (currentChar === Chars.GreaterThan) {
      state.currentChar = state.source.charCodeAt(++state.index);
      ++state.column;
      return Token.Arrow;
    }
  return Token.Assign;
};

// `<`, `<=`, `<<`, `<<=`, `</`,  <!--
table[Chars.LessThan] = (state: ParserState, context: Context) => {
  state.column++;
  if (state.index < state.length) {
    if (state.currentChar === Chars.EqualSign) {
      state.currentChar = state.source.charCodeAt(++state.index);
      state.column++;
      return Token.LessThanOrEqual;
    } else if (state.currentChar === Chars.LessThan) {
      state.column++;
      state.currentChar = state.source.charCodeAt(++state.index);
      if (state.currentChar !== Chars.EqualSign) return Token.ShiftLeft;
      state.column++;
      state.currentChar = state.source.charCodeAt(++state.index);
      return Token.ShiftLeftAssign;
    }
  } else if (context & Context.OptionsWebCompat &&
    state.currentChar === Chars.Exclamation &&
    state.source.codePointAt(1) === Chars.Hyphen &&
    state.source.codePointAt(2) === Chars.Hyphen) {
      return skipSingleHTMLComment(state, context);
  }
  return Token.LessThan;
};

// `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
table[Chars.GreaterThan] = (state: ParserState) => {
  ++state.column;
  if (state.currentChar === Chars.EqualSign) {
    state.currentChar = state.source.charCodeAt(++state.index);
    state.column++;
    return Token.GreaterThanOrEqual;
  } else if (state.currentChar === Chars.GreaterThan) {
    state.currentChar = state.source.charCodeAt(++state.index);
    state.column++;
    if (state.index < state.length) {
      if (state.currentChar === Chars.EqualSign) {
        ++state.column;
        state.currentChar = state.source.charCodeAt(++state.index);
        return Token.ShiftRightAssign;
      } else if (state.currentChar === Chars.GreaterThan) {
        ++state.column;
        state.currentChar = state.source.charCodeAt(++state.index);
        if (state.currentChar !== Chars.EqualSign) return Token.LogicalShiftRight;
        ++state.column;
        state.currentChar = state.source.charCodeAt(++state.index);
        return Token.LogicalShiftRightAssign;
      }
    }
    return Token.ShiftRight;
  }
  return Token.GreaterThan;
};

// `!`, `!=`, `!==`
table[Chars.Exclamation] = state => {
  ++state.column;
  if (state.currentChar === Chars.EqualSign) {
    ++state.column;
    state.currentChar = state.source.charCodeAt(++state.index);
    if (state.index < state.length && state.currentChar === Chars.EqualSign) {
      ++state.column;
      state.currentChar = state.source.charCodeAt(++state.index);
      return Token.StrictNotEqual;
    }
    return Token.LooseNotEqual;
  }
  return Token.Negate;
};

// `*`, `**`, `*=`, `**=`
table[Chars.Asterisk] = state => {
  ++state.column;
  if (state.index >= state.length) return Token.Multiply;
  if (state.currentChar === Chars.Asterisk) {
    ++state.column;
    state.currentChar = state.source.charCodeAt(++state.index);
    if (state.index < state.length && state.currentChar === Chars.EqualSign) {
      ++state.column;
      state.currentChar = state.source.charCodeAt(++state.index);
      return Token.ExponentiateAssign;
    }
    return Token.Exponentiate;
  } else if (state.currentChar === Chars.EqualSign) {
    ++state.column;
    return Token.MultiplyAssign;
  }

  return Token.Multiply;
};

// `%`, `%=`
table[Chars.Percent] = state => {
  ++state.column;
  if (state.currentChar !== Chars.EqualSign) return Token.Modulo;
    ++state.column;
    state.currentChar = state.source.charCodeAt(++state.index);
    return Token.ModuloAssign;
};

// `^`, `^=`
table[Chars.Caret] = state => {
  ++state.column;
  if (state.currentChar !== Chars.EqualSign) return Token.BitwiseXor;
    ++state.column;
    state.currentChar = state.source.charCodeAt(++state.index);
    return Token.BitwiseXorAssign;
};

// `&`, `&&`, `&=`
table[Chars.Ampersand] = state => {
  ++state.column;
  if (state.index >= state.length) return Token.BitwiseAnd;
  if (state.currentChar === Chars.Ampersand) {
    state.currentChar = state.source.charCodeAt(++state.index);
    ++state.column;
    return Token.LogicalAnd;
  }
  if (state.currentChar === Chars.EqualSign) {
      state.currentChar = state.source.charCodeAt(++state.index);
      ++state.column;
      return Token.BitwiseAndAssign;
  }
  return Token.BitwiseAnd;
};

// `+`, `++`, `+=`
table[Chars.Plus] = state => {
  ++state.column;
  if (state.index >= state.length) return Token.Add;
  if (state.currentChar === Chars.Plus) {
    state.currentChar = state.source.charCodeAt(++state.index);
      ++state.column;
      return Token.Increment;
  }

  if (state.currentChar === Chars.EqualSign) {
    state.currentChar = state.source.charCodeAt(++state.index);
      ++state.column;
      return Token.AddAssign;
  }

  return Token.Add;
};

// `-`, `--`, `-=`
table[Chars.Hyphen] = (state, context) => {
  ++state.column;
  if (state.index < state.source.length) {
      if (state.currentChar === Chars.Hyphen) {
        state.currentChar = state.source.charCodeAt(++state.index);
          ++state.column;
          // https://tc39.github.io/ecma262/#prod-annexB-MultiLineComment
          if ((state.flags & (Flags.LineTerminator | Flags.ConsumedComment)) &&
              state.currentChar === Chars.Hyphen && state.source.charCodeAt(state.index + 1) === Chars.GreaterThan) {
              return skipSingleHTMLComment(state, context);
          }
          return Token.Decrement;
      } else if (state.currentChar === Chars.EqualSign) {
        state.currentChar = state.source.charCodeAt(++state.index);
          ++state.column;
          return Token.SubtractAssign;
      }
  }

  return Token.Subtract;
};

// `|`, `||`, `|=`
table[Chars.VerticalBar] = state => {
  ++state.column;
  if (state.index < state.length) {
      if (state.currentChar === Chars.VerticalBar) {
        state.currentChar = state.source.charCodeAt(++state.index);
          ++state.column;
          return Token.LogicalOr;
      }
      if (state.currentChar === Chars.EqualSign) {
        state.currentChar = state.source.charCodeAt(++state.index);
          ++state.column;
          return Token.BitwiseOrAssign;
      }
  }
  return Token.BitwiseOr;
};

// `.`, `...`, `.123` (numeric literal)
table[Chars.Period] = (state: ParserState) => {
  if (state.currentChar === Chars.Period) {
    if (state.source.charCodeAt(state.index + 1) === Chars.Period) {
      state.currentChar = state.source.charCodeAt(state.index + 2);
      state.column += 3;
      return Token.Ellipsis;
    }
    state.column++;
    return Token.Period;

  } else if (state.currentChar >= Chars.Zero && state.currentChar <= Chars.Nine) {
    // TODO: return scanNumeric(state, context, true);
  }
  state.column++;
  return Token.Period;
};

/**
 * Scans and return the next token in the stream.
 *
 * @param state Parserstate instance
 * @param context Context masks
 */
export function nextToken(state: ParserState, context: Context): Token {
  state.flags &= ~(Flags.LineTerminator | Flags.ConsumedComment);
  while (state.index < state.length) {
      const currentChar = state.currentChar;
      let start = state.index;
      state.currentChar = state.source.charCodeAt(++state.index);
      if (((state.token = table[currentChar](state, context, currentChar, start)) & Token.WhiteSpace) !== Token.WhiteSpace) {
        if (context & Context.OptionsTokenize) state.tokens.push(state.token);
        return state.token;
      }
  }

  return state.token = Token.EndOfSource;
}
