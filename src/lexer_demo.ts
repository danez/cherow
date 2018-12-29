import { Token, descKeywordTable } from './token';
import { Chars, AsciiLookup, CharType } from './chars';
import { unicodeLookup } from './unicode';

/** Example on alternative lexer code. */

export const enum Context {
  None = 0,
  Module = 1 << 0
}

/**
 * A set of flags for maintaining the internal state machine.
 */
const enum ScanState {
  None = 0,
  NewLine = 1 << 0,
  LastIsCR = 1 << 1
}

/*@internal*/
export const enum Errors {
  Unexpected
}

/*@internal*/
export const errorMessages: {
  [key: string]: string;
} = {
  [Errors.Unexpected]: 'Unexpected token'
};

export function constructError(index: number, line: number, column: number, description: string): void {
  const error: any = new SyntaxError(`Line ${line}, column ${column}: ${description}`);

  error.index = index;
  error.line = line;
  error.column = column;
  error.description = description;
  return error;
}

export function report(index: number, line: number, column: number, type: Errors, ...params: string[]): any {
  const message = errorMessages[type].replace(/%(\d+)/g, (_: string, i: number) => params[i]);
  const error = constructError(index, line, column, message);
  throw error;
}

export function scan(source: string) {
  let index = 0;

  let start = 0;

  let line = 1;

  let column = 0;

  let length = source.length;

  let token = Token.EndOfSource;

  let value: any = '';

  let newline = false;

  let state = ScanState.None;

  let currentChar = source.charCodeAt(index);

  function nextChar(): number {
    ++column;
    return (currentChar = source.charCodeAt(++index));
  }

  function mapToToken(token: Token): () => Token {
    return () => {
      nextChar();
      return token;
    };
  }

  function consumeOpt(code: number) {
    if (source.charCodeAt(index) !== code) return false;
    currentChar = source.charCodeAt(++index);
    column++;
    return true;
  }

  function advanceNewline() {
    currentChar = source.charCodeAt(++index);
    column = 0;
    ++line;
  }

  /**
   * Use to consume a line feed instead of `advanceNewline`.
   */
  function consumeLineFeed(lastIsCR: boolean) {
    currentChar = source.charCodeAt(++index);
    if (!lastIsCR) {
      column = 0;
      line++;
    }
  }

  /**
   * Skips single HTML comments. Same behavior as in V8.
   *
   * @param parser Parser instance
   * @param context Context masks.
   */
  function skipSingleHTMLComment(context: Context): Token {
    // ES 2015 B.1.3 -  HTML comments are only allowed when parsing non-module code.
    if (context & Context.Module) report(index, line, column, Errors.Unexpected);
    state = skipSingleLineComment();
    return Token.SingleComment;
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

  function skipSingleLineComment(): ScanState {
    while (index < length) {
      switch (currentChar) {
        case Chars.CarriageReturn:
          advanceNewline();
          if (index < length && nextChar() === Chars.LineFeed) index++;
          return state | ScanState.NewLine;
        case Chars.LineFeed:
        case Chars.LineSeparator:
        case Chars.ParagraphSeparator:
          advanceNewline();
          return state | ScanState.NewLine;

        default:
          nextChar();
      }
    }

    return state;
  }
  /**
   * Skips multiline comment
   *
   * @see [Link](https://tc39.github.io/ecma262/#prod-annexB-MultiLineComment)
   *
   * @param state Parser instance
   */
  function skipMultilineComment(): any {
    while (index < length) {
      switch (nextChar()) {
        case Chars.Asterisk:
          nextChar();
          state &= ~ScanState.LastIsCR;
          if (consumeOpt(Chars.Slash)) return state;
          break;

        case Chars.CarriageReturn:
          state |= ScanState.NewLine | ScanState.LastIsCR;
          advanceNewline();
          break;

        case Chars.LineFeed:
          consumeLineFeed((state & ScanState.LastIsCR) !== 0);
          state = (state & ~ScanState.LastIsCR) | ScanState.NewLine;
          break;

        case Chars.LineSeparator:
        case Chars.ParagraphSeparator:
          state = (state & ~ScanState.LastIsCR) | ScanState.NewLine;
          advanceNewline();
          break;

        default:
          state &= ~ScanState.LastIsCR;
      }
    }
  }
  const truthFn = () => {
    nextChar();
    return true;
  };

  const whiteSpaceMap: Function[] = new Array(0xfeff);
  whiteSpaceMap.fill(() => false);
  whiteSpaceMap.fill(nextChar, 0x9, 0xd + 1);
  whiteSpaceMap.fill(nextChar, 0x2000, 0x200a + 1);
  whiteSpaceMap[0xa0] = whiteSpaceMap[0x1680] = whiteSpaceMap[0x202f] = whiteSpaceMap[0x205f] = whiteSpaceMap[0x3000] = whiteSpaceMap[0xfeff] = truthFn;

  const unexpectedCharacter: () => void = () =>
    report(index, line, column, Errors.Unexpected, String.fromCharCode(currentChar));

  const table = new Array(0xffff).fill(unexpectedCharacter, 0, 0x80).fill(scanMaybeIdentifier, 0x80) as ((
    context: Context
  ) => Token)[];

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

  /* line terminators */
  table[Chars.CarriageReturn] = () => {
    state |= ScanState.NewLine | ScanState.LastIsCR;
    advanceNewline();
    return Token.WhiteSpace;
  };

  table[Chars.LineFeed] = () => {
    consumeLineFeed((state & ScanState.LastIsCR) !== 0);
    state = (state & ~ScanState.LastIsCR) | ScanState.NewLine;
    return Token.WhiteSpace;
  };

  table[Chars.ParagraphSeparator] = table[Chars.LineSeparator] = () => {
    state = state & ~ScanState.LastIsCR | ScanState.NewLine;
    advanceNewline();
    return Token.WhiteSpace;
  };

  /* general whitespace */
  table[Chars.Space] = table[Chars.Tab] = table[Chars.FormFeed] = table[Chars.VerticalTab] = () => {
    nextChar();
    return Token.WhiteSpace;
  };

  // `1`...`9`
  for (let i = Chars.One; i <= Chars.Nine; i++) table[i] = () => scanNumeric(false);

  // `A`...`Z`
  for (let i = Chars.UpperA; i <= Chars.UpperZ; i++) table[i] = scanKnownIdentifier;

  // `a`...z`
  for (let i = Chars.LowerA; i <= Chars.LowerZ; i++) table[i] = scanKnownIdentifier;

  // `/`, `/=`, `/>`, '/*..*/'
  table[Chars.Slash] = () => {
    const next = nextChar();
    if (next === Chars.Slash) {
      nextChar();
      state = skipSingleLineComment();
      return Token.SingleComment;
    } else if (next === Chars.Asterisk) {
      nextChar();
      state = skipMultilineComment();
      return Token.MultiComment;
    } else if (next === Chars.EqualSign) {
      nextChar();
      return Token.DivideAssign;
    } else if (next === Chars.GreaterThan) {
      nextChar();
      return Token.JSXAutoClose;
    }

    return Token.Divide;
  };

  // `=`, `==`, `===`, `=>`
  table[Chars.EqualSign] = () => {
    const next = nextChar();
    if (next === Chars.EqualSign) {
      if (nextChar() === Chars.EqualSign) {
        nextChar();
        return Token.StrictEqual;
      }
      return Token.LooseEqual;
    } else if (next === Chars.GreaterThan) {
      nextChar();
      return Token.Arrow;
    }
    return Token.Assign;
  };

  // `<`, `<=`, `<<`, `<<=`, `</`,  <!--
  table[Chars.LessThan] = ctx => {
    if (index < source.length) {
      const next = nextChar();
      if (next === Chars.EqualSign) {
        nextChar();
        return Token.LessThanOrEqual;
      } else if (next === Chars.LessThan) {
        nextChar();
        if (currentChar === Chars.EqualSign) {
          nextChar();
          return Token.ShiftLeftAssign;
        }
        return Token.ShiftLeft;
      } else if (
        (ctx & Context.Module) === 0 &&
        next === Chars.Exclamation &&
        nextChar() === Chars.Hyphen &&
        nextChar() === Chars.Hyphen
      ) {
        nextChar();
        return skipSingleHTMLComment(ctx);
      }
    }
    return Token.LessThan;
  };

  // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
  table[Chars.GreaterThan] = () => {
    if (nextChar() === Chars.EqualSign) {
      nextChar();
      return Token.GreaterThanOrEqual;
    }
    if (currentChar !== Chars.GreaterThan) return Token.GreaterThan;

    const next = nextChar();

    if (next === Chars.GreaterThan) {
      nextChar();
      if (currentChar === Chars.EqualSign) {
        nextChar();
        return Token.LogicalShiftRightAssign;
      } else {
        return Token.LogicalShiftRight;
      }
    } else if (next === Chars.EqualSign) {
      nextChar();
      return Token.ShiftRightAssign;
    }

    return Token.ShiftRight;
  };

  // `!`, `!=`, `!==`
  table[Chars.Exclamation] = () => {
    if (nextChar() !== Chars.EqualSign) return Token.Negate;
    if (nextChar() !== Chars.EqualSign) return Token.LooseNotEqual;
    nextChar();
    return Token.StrictNotEqual;
  };

  // `*`, `**`, `*=`, `**=`
  table[Chars.Asterisk] = () => {
    const next = nextChar();
    if (next === Chars.EqualSign) {
      nextChar();
      return Token.MultiplyAssign;
    }
    if (next !== Chars.Asterisk) return Token.Multiply;
    if (nextChar() !== Chars.EqualSign) return Token.Exponentiate;
    nextChar();
    return Token.ExponentiateAssign;
  };

  // `%`, `%=`
  table[Chars.Percent] = () => {
    if (nextChar() !== Chars.EqualSign) return Token.Modulo;
    nextChar();
    return Token.ModuloAssign;
  };

  // `^`, `^=`
  table[Chars.Caret] = () => {
    if (nextChar() !== Chars.EqualSign) return Token.BitwiseXor;
    nextChar();
    return Token.BitwiseXorAssign;
  };

  // `&`, `&&`, `&=`
  table[Chars.Ampersand] = () => {
    const next = nextChar();
    if (next === Chars.Ampersand) {
      nextChar();
      return Token.LogicalAnd;
    }
    if (next !== Chars.EqualSign) return Token.BitwiseAnd;
    nextChar();
    return Token.BitwiseAndAssign;
  };

  // `+`, `++`, `+=`
  table[Chars.Plus] = () => {
    const next = nextChar();
    if (next === Chars.Plus) {
      nextChar();
      return Token.Increment;
    }
    if (next === Chars.EqualSign) {
      nextChar();
      return Token.AddAssign;
    }
    return Token.Add;
  };

  // `-`, `--`, `-=`
  table[Chars.Hyphen] = ctx => {
    const next = nextChar();
    if (next === Chars.Hyphen) {
      if ((ctx & Context.Module) === 0 && nextChar() === Chars.GreaterThan && state & ScanState.NewLine) {
        nextChar();
        return skipSingleHTMLComment(ctx);
      }
      return Token.Decrement;
    }

    if (next !== Chars.EqualSign) return Token.Subtract;
    nextChar();
    return Token.SubtractAssign;
  };

  // `|`, `||`, `|=`
  table[Chars.VerticalBar] = () => {
    const next = nextChar();
    if (next === Chars.VerticalBar) {
      nextChar();
      return Token.LogicalOr;
    } else if (next === Chars.EqualSign) {
      nextChar();
      return Token.BitwiseOrAssign;
    }
    return Token.BitwiseOr;
  };

  // `.`, `...`, `.123` (numeric literal)
  table[Chars.Period] = () => {
    let idx = index + 1;
    if (idx < length) {
      const next = source.charCodeAt(idx);
      if (next === Chars.Period) {
        idx++;
        if (idx < source.length && source.charCodeAt(idx) === Chars.Period) {
          index = idx + 1;
          column += 3;
          currentChar = source.charCodeAt(idx);
          return Token.Ellipsis;
        }
      } else if (next >= Chars.Zero && next <= Chars.Nine) {
        return scanNumeric(true);
      }
    }
    nextChar();
    return Token.Period;
  };

  /**
   * Scans maybe identifier
   */

  function scanMaybeIdentifier(): Token {
    if (whiteSpaceMap[currentChar](state)) return Token.WhiteSpace;
    if (
      (AsciiLookup[currentChar] & CharType.IDStart) > 0 ||
      ((unicodeLookup[(currentChar >>> 5) + 34816] >>> currentChar) & 31 & 1) > 0
    ) {
      nextChar();
      // TODO
    }
    return Token.Invalid;
  }

  /**
   * Scans identifier
   */
  function scanKnownIdentifier(): Token {
    while ((AsciiLookup[nextChar()] & (CharType.IDContinue | CharType.Decimal)) > 0) {}
    value = source.slice(start, index);
    return descKeywordTable[value] || Token.Identifier;
  }

  /**
   * Scans identifier rest
   */

  /**
   *  Scans numeric and decimal literal literal
   *
   * @see [https://tc39.github.io/ecma262/#prod-DecimalLiteral)
   * @see [https://tc39.github.io/ecma262/#prod-NumericLiteral)
   *
   * @param state Parser instance
   * @param context Context masks
   */

  function scanNumeric(isFloat: boolean): Token {
    if (isFloat) {
      value = 0;
    } else {
      // Hot path - fast path for decimal digits that fits into 4 bytes
      const maxDigits = 10;
      const digit = maxDigits - 1;
      value = currentChar - Chars.Zero;
      while (digit >= 0 && nextChar() <= Chars.Nine && currentChar >= Chars.Zero) {
        value = value * 10 + currentChar - Chars.Zero;
      }
      /*
      if (
        digit >= 0 &&
        currentChar !== Chars.Period &&
        ((AsciiLookup[currentChar] & CharType.IDStart) < 0 ||
          ((unicodeLookup[(currentChar >>> 5) + 34816] >>> currentChar) & 31 & 1) < 1)
      ) {
        return Token.NumericLiteral;
      }*/
    }
    return Token.NumericLiteral;
  }

  return function(context: Context): any {
    state = ScanState.None;

    while (index < length) {
      start = index;
      if (((token = table[currentChar](context)) & Token.WhiteSpace) !== Token.WhiteSpace) {
        return {
          type: token,
          value,
          newline: ScanState.NewLine !== 0,
          start,
          line,
          column,
          end: index
        };
      }
    }

    return {
      type: token,
      value: '',
      newline,
      line,
      column,
      start,
      end: index
    };
  };
}
