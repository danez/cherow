import { Token, descKeywordTable } from './token';
import { Chars, AsciiLookup, CharType } from './chars';
import { unicodeLookup } from './unicode';

/** Example on alternative lexer code. */

export const enum Context {
  None = 0,
  Module = 1 << 0,
  OptionsJSX = 1 << 1
}

const enum Constants {
  Size = 128
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
    // ES 2015 B.1.3 - HTML comments are only allowed when parsing non-module code.
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

  /**
   * Scans maybe identifier
   */

  function scanMaybeIdentifier(): Token {
    switch (currentChar) {
      /* line terminators */
      case Chars.LineSeparator:
      case Chars.ParagraphSeparator:
        state = (state & ~ScanState.LastIsCR) | ScanState.NewLine;
        advanceNewline();
        return Token.WhiteSpace;
      /* whitespace */
      case Chars.NonBreakingSpace:
      case Chars.Ogham:
      case Chars.EnQuad:
      case Chars.EmQuad:
      case Chars.EnSpace:
      case Chars.EmSpace:
      case Chars.ThreePerEmSpace:
      case Chars.FourPerEmSpace:
      case Chars.SixPerEmSpace:
      case Chars.FigureSpace:
      case Chars.PunctuationSpace:
      case Chars.ThinSpace:
      case Chars.HairSpace:
      case Chars.NarrowNoBreakSpace:
      case Chars.MathematicalSpace:
      case Chars.IdeographicSpace:
      case Chars.Zwj:
        nextChar();
        return Token.WhiteSpace;
      default:
        if (
          (AsciiLookup[currentChar] & CharType.IDStart) > 0 ||
          ((unicodeLookup[(currentChar >>> 5) + 34816] >>> currentChar) & 31 & 1) > 0
        ) {
          nextChar();
          // TODO
        }
        return Token.Invalid;
    }
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
    }
    return Token.NumericLiteral;
  }

  function next(context: Context): any {
    if (currentChar >= Constants.Size) return scanMaybeIdentifier();

    switch (currentChar) {
      /* line terminators */
      case Chars.CarriageReturn:
        state |= ScanState.NewLine | ScanState.LastIsCR;
        advanceNewline();
        return Token.WhiteSpace;

      case Chars.LineFeed:
        consumeLineFeed((state & ScanState.LastIsCR) !== 0);
        state = (state & ~ScanState.LastIsCR) | ScanState.NewLine;
        return Token.WhiteSpace;

      /* general whitespace */
      case Chars.Space:
      case Chars.Tab:
      case Chars.FormFeed:
      case Chars.VerticalTab:
        nextChar();
        return Token.WhiteSpace;

      // `0`...`9`
      case Chars.Zero:
      case Chars.One:
      case Chars.Two:
      case Chars.Three:
      case Chars.Four:
      case Chars.Five:
      case Chars.Six:
      case Chars.Seven:
      case Chars.Eight:
      case Chars.Nine:
        return scanNumeric(false);

      // `/`, `/=`, `/>`, '/*..*/'
      case Chars.Slash: {
        nextChar();
        if (index < length) {
          if (currentChar === Chars.Slash) {
            nextChar();
            state = skipSingleLineComment();
            return Token.SingleComment;
          } else if (currentChar === Chars.Asterisk) {
            nextChar();
            state = skipMultilineComment();
            return Token.MultiComment;
          } else if (currentChar === Chars.EqualSign) {
            nextChar();
            return Token.DivideAssign;
          } else if (currentChar === Chars.GreaterThan) {
            nextChar();
            return Token.JSXAutoClose;
          }
        }
        return Token.Divide;
      }

      // `=`, `==`, `===`, `=>`
      case Chars.EqualSign: {
        nextChar();
        if (index >= source.length) return Token.Assign;
        if (currentChar === Chars.EqualSign) {
          nextChar();
          if (consumeOpt(Chars.EqualSign)) {
            return Token.StrictEqual;
          } else {
            return Token.LooseEqual;
          }
        } else if (currentChar === Chars.GreaterThan) {
          nextChar();
          return Token.Arrow;
        }

        return Token.Assign;
      }

      // `<`, `<=`, `<<`, `<<=`, `</`,  <!--
      case Chars.LessThan: {
        switch (nextChar()) {
          case Chars.LessThan:
            nextChar();
            if (consumeOpt(Chars.EqualSign)) {
              return Token.ShiftLeftAssign;
            } else {
              return Token.ShiftLeft;
            }

          case Chars.EqualSign:
            nextChar();
            return Token.LessThanOrEqual;

          case Chars.Slash: {
            if (!(context & Context.OptionsJSX)) break;
            const idx = index + 1;

            // Check that it's not a comment start.
            if (idx < length) {
              const next = source.charCodeAt(idx);
              if (next === Chars.Asterisk || next === Chars.Slash) break;
            }

            nextChar();
            return Token.JSXClose;
          }

          default:
            // ignore
            return Token.LessThan;
        }
      }

      // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
      case Chars.GreaterThan: {
        if (nextChar() === Chars.EqualSign) {
          nextChar();
          return Token.GreaterThanOrEqual;
        }
        if (currentChar !== Chars.GreaterThan) return Token.GreaterThan;
        nextChar();
        if (currentChar === Chars.GreaterThan) {
          nextChar();
          if (currentChar === Chars.EqualSign) {
            nextChar();
            return Token.LogicalShiftRightAssign;
          } else {
            return Token.LogicalShiftRight;
          }
        } else if (currentChar === Chars.EqualSign) {
          nextChar();
          return Token.ShiftRightAssign;
        }

        return Token.ShiftRight;
      }

      // `!`, `!=`, `!==`
      case Chars.Exclamation: {
        nextChar();
        if (!consumeOpt(Chars.EqualSign)) return Token.Negate;
        if (!consumeOpt(Chars.EqualSign)) return Token.LooseNotEqual;
        return Token.StrictNotEqual;
      }

      // `*`, `**`, `*=`, `**=`
      case Chars.Asterisk: {
        nextChar();
        if (currentChar === Chars.EqualSign) {
          nextChar();
          return Token.MultiplyAssign;
        }
        if (currentChar !== Chars.Asterisk) return Token.Multiply;
        if (nextChar() !== Chars.EqualSign) return Token.Exponentiate;
        nextChar();
        return Token.ExponentiateAssign;
      }

      // `%`, `%=`
      case Chars.Percent: {
        nextChar();
        if (!consumeOpt(Chars.EqualSign)) return Token.Modulo;
        return Token.ModuloAssign;
      }

      // `^`, `^=`
      case Chars.Caret: {
        if (nextChar() !== Chars.EqualSign) return Token.BitwiseXor;
        nextChar();
        return Token.BitwiseXorAssign;
      }

      // `&`, `&&`, `&=`
      case Chars.Ampersand: {
        nextChar();
        if (index >= source.length) return Token.BitwiseAnd;
        if (currentChar === Chars.Ampersand) {
          nextChar();
          return Token.LogicalAnd;
        }

        if (currentChar === Chars.EqualSign) {
          nextChar();
          return Token.BitwiseAndAssign;
        }

        return Token.BitwiseAnd;
      }

      // `+`, `++`, `+=`
      case Chars.Plus: {
        nextChar();
        if (index >= source.length) return Token.Add;
        if (currentChar === Chars.Plus) {
          nextChar();
          return Token.Increment;
        }
        if (currentChar === Chars.EqualSign) {
          nextChar();
          return Token.AddAssign;
        }
        return Token.Add;
      }

      // `-`, `--`, `-=`
      case Chars.Hyphen: {
        nextChar();
        if (index >= source.length) return Token.Subtract;
        if (currentChar === Chars.Hyphen) {
          if ((context & Context.Module) === 0 && nextChar() === Chars.GreaterThan && state & ScanState.NewLine) {
            nextChar();
            return skipSingleHTMLComment(context);
          }
          return Token.Decrement;
        }

        if (currentChar !== Chars.EqualSign) return Token.Subtract;
        nextChar();
        return Token.SubtractAssign;
      }

      // `|`, `||`, `|=`
      case Chars.VerticalBar: {
        nextChar();
        if (currentChar === Chars.VerticalBar) {
          nextChar();
          return Token.LogicalOr;
        } else if (currentChar === Chars.EqualSign) {
          nextChar();
          return Token.BitwiseOrAssign;
        }
        return Token.BitwiseOr;
      }

      // `.`, `...`, `.123` (numeric literal)
      case Chars.Period: {
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
      }

      // `,`, `~`, `?`, `[`, `]`, `{`, `}`, `:`, `;`, `(` ,`)`, `"`, `'`, `@`
      case Chars.Comma:
        nextChar();
        return Token.Comma;
      case Chars.Tilde:
        nextChar();
        return Token.Complement;
      case Chars.QuestionMark:
        nextChar();
        return Token.QuestionMark;
      case Chars.LeftBracket:
        nextChar();
        return Token.LeftBracket;
      case Chars.RightBracket:
        nextChar();
        return Token.RightBracket;
      case Chars.LeftBrace:
        nextChar();
        return Token.LeftBrace;
      case Chars.RightBrace:
        nextChar();
        return Token.RightBrace;
      case Chars.Colon:
        nextChar();
        return Token.Colon;
      case Chars.Semicolon:
        nextChar();
        return Token.Semicolon;
      case Chars.LeftParen:
        nextChar();
        return Token.LeftParen;
      case Chars.RightParen:
        nextChar();
        return Token.RightParen;
      case Chars.At:
        nextChar();
        return Token.At;

      // `a`...`z`, `A`...`Z`, `_var`, `$var`
      case Chars.UpperA:
      case Chars.UpperB:
      case Chars.UpperC:
      case Chars.UpperD:
      case Chars.UpperE:
      case Chars.UpperF:
      case Chars.UpperG:
      case Chars.UpperH:
      case Chars.UpperI:
      case Chars.UpperJ:
      case Chars.UpperK:
      case Chars.UpperL:
      case Chars.UpperM:
      case Chars.UpperN:
      case Chars.UpperO:
      case Chars.UpperP:
      case Chars.UpperQ:
      case Chars.UpperR:
      case Chars.UpperS:
      case Chars.UpperT:
      case Chars.UpperU:
      case Chars.UpperV:
      case Chars.UpperW:
      case Chars.UpperX:
      case Chars.UpperY:
      case Chars.UpperZ:
      case Chars.Dollar:
      case Chars.Underscore:
      case Chars.LowerA:
      case Chars.LowerB:
      case Chars.LowerC:
      case Chars.LowerD:
      case Chars.LowerE:
      case Chars.LowerF:
      case Chars.LowerG:
      case Chars.LowerH:
      case Chars.LowerI:
      case Chars.LowerJ:
      case Chars.LowerK:
      case Chars.LowerL:
      case Chars.LowerM:
      case Chars.LowerN:
      case Chars.LowerO:
      case Chars.LowerP:
      case Chars.LowerQ:
      case Chars.LowerR:
      case Chars.LowerS:
      case Chars.LowerT:
      case Chars.LowerU:
      case Chars.LowerV:
      case Chars.LowerW:
      case Chars.LowerX:
      case Chars.LowerY:
      case Chars.LowerZ:
        return scanKnownIdentifier();
      default:
        report(index, line, column, Errors.Unexpected, String.fromCharCode(currentChar));
    }
  }

  /**
   * Skip whitespace and comments to the next token start or the end of file, whichever comes
   * first.
   */
  return function(context: Context): any {
    state = ScanState.None;

    while (index < length) {
      start = index;
      if (((token = next(context)) & Token.WhiteSpace) !== Token.WhiteSpace) {
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
