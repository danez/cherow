import { Token, descKeywordTable } from './token';
import { Chars } from './chars';
import { AsciiLookup, CharType } from './chars';

/**

Example on alternative lexer code. 

*/

export const enum Context {
  None = 0
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

  let line = 0;

  let column = 0;

  let length = source.length;

  let token = Token.EndOfSource;

  let value = '';

  let newline = false;

  let currentChar = source.charCodeAt(index);

  const unexpectedCharacter: () => void = () =>
    report(index, line, column, Errors.Unexpected, String.fromCharCode(currentChar));

  const table = new Array(0xffff).fill(unexpectedCharacter, 0, 0x80) as ((context: Context) => Token)[];

  // Whitespace
  table[Chars.Space] = table[Chars.Tab] = table[Chars.FormFeed] = table[Chars.VerticalTab] = () => Token.WhiteSpace;

  table[Chars.LineFeed] = table[Chars.CarriageReturn] = () => {
    column = 0;
    line++;
    newline = true;
    // If it's a \r\n sequence, consume it as a single EOL.
    if (index < length && source.charCodeAt(index) === Chars.LineFeed) {
      ++index;
    }
    return Token.WhiteSpace;
  };

  // `a`...z`
  for (let i = Chars.LowerA; i <= Chars.LowerZ; i++) table[i] = scanIdentifier;

  function nextChar(): number {
    ++column;
    return (currentChar = source.charCodeAt(++index));
  }

  function mapToToken(token: Token): () => Token {
    return () => {
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

  // `/`, `/=`, `/>`, '/*..*/'
  table[Chars.Slash] = () => {
    if (currentChar === Chars.Slash) {
      nextChar();
      // return skipSingleLineComment(s, context, 'SingleLine');
    } else if (currentChar === Chars.Asterisk) {
      nextChar();
      // return skipMultilineComment(s, context);
    } else if (currentChar === Chars.EqualSign) {
      nextChar();
      return Token.DivideAssign;
    } else if (currentChar === Chars.GreaterThan) {
      nextChar();
      return Token.JSXAutoClose;
    }

    return Token.Divide;
  };

  // `=`, `==`, `===`, `=>`
  table[Chars.EqualSign] = () => {
    if (currentChar === Chars.EqualSign) {
      if (nextChar() === Chars.EqualSign) {
        nextChar();
        return Token.StrictEqual;
      }
      return Token.LooseEqual;
    } else if (currentChar === Chars.GreaterThan) {
      nextChar();
      return Token.Arrow;
    }
    return Token.Assign;
  };

  // `<`, `<=`, `<<`, `<<=`, `</`,  <!--
  table[Chars.LessThan] = () => {
    if (index < length) {
      if (currentChar === Chars.EqualSign) {
        nextChar();
        return Token.LessThanOrEqual;
      } else if (currentChar === Chars.LessThan) {
        nextChar();
        if (currentChar === Chars.EqualSign) {
          nextChar();
          return Token.ShiftLeftAssign;
        }
        return Token.ShiftLeft;
      } else if (currentChar === Chars.Exclamation && nextChar() === Chars.Hyphen && nextChar() === Chars.Hyphen) {
        nextChar();
        // return skipSingleHTMLComment(state, context, 'HTMLOpen');
      }
    }
    return Token.LessThan;
  };

  // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
  table[Chars.GreaterThan] = () => {
    if (currentChar === Chars.EqualSign) {
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
    if (currentChar !== Chars.EqualSign) return Token.Negate;
    if (nextChar() !== Chars.EqualSign) return Token.LooseNotEqual;
    nextChar();
    return Token.StrictNotEqual;
  };

  // `*`, `**`, `*=`, `**=`
  table[Chars.Asterisk] = () => {
    if (currentChar === Chars.EqualSign) {
      nextChar();
      return Token.MultiplyAssign;
    }
    if (currentChar !== Chars.Asterisk) return Token.Multiply;
    if (nextChar() !== Chars.EqualSign) return Token.Exponentiate;
    nextChar();
    return Token.ExponentiateAssign;
  };

  // `%`, `%=`
  table[Chars.Percent] = () => {
    if (currentChar !== Chars.EqualSign) return Token.Modulo;
    nextChar();
    return Token.ModuloAssign;
  };

  // `^`, `^=`
  table[Chars.Caret] = () => {
    if (currentChar !== Chars.EqualSign) return Token.BitwiseXor;
    nextChar();
    return Token.BitwiseXorAssign;
  };

  // `&`, `&&`, `&=`
  table[Chars.Ampersand] = () => {
    if (currentChar === Chars.Ampersand) {
      nextChar();
      return Token.LogicalAnd;
    }
    if (currentChar !== Chars.EqualSign) return Token.BitwiseAnd;
    nextChar();
    return Token.BitwiseAndAssign;
  };

  // `+`, `++`, `+=`
  table[Chars.Plus] = () => {
    if (currentChar === Chars.Plus) {
      nextChar();
      return Token.Increment;
    }
    if (currentChar === Chars.EqualSign) {
      nextChar();
      return Token.AddAssign;
    }
    return Token.Add;
  };

  // `-`, `--`, `-=`
  table[Chars.Hyphen] = () => {
    if (currentChar === Chars.Hyphen) {
      /* if (
      nextChar() === Chars.GreaterThan &&
      (context & Context.OptionDisablesWebCompat) === 0 &&
      (s.flags & Flags.LineTerminator || s.startIndex === 0)
    ) {
      nextChar(s);
      return skipSingleHTMLComment(s, context, 'HTMLClose');
    }*/
      nextChar();
      return Token.Decrement;
    }

    if (currentChar !== Chars.EqualSign) return Token.Subtract;
    nextChar();
    return Token.SubtractAssign;
  };

  // `|`, `||`, `|=`
  table[Chars.VerticalBar] = () => {
    if (currentChar === Chars.VerticalBar) {
      nextChar();
      return Token.LogicalOr;
    } else if (currentChar === Chars.EqualSign) {
      nextChar();
      return Token.BitwiseOrAssign;
    }
    return Token.BitwiseOr;
  };

  /**
   * Scans identifier
   */
  function scanIdentifier(): Token {
    while ((AsciiLookup[nextChar()] & (CharType.IDContinue | CharType.Decimal)) > 0) {}
    value = source.slice(start, index);
    return descKeywordTable[value] || Token.Identifier;
  }

  return function(context: Context): any {
    newline = false;
    while (index < length) {
      let current = currentChar;
      start = index;
      currentChar = source.charCodeAt(++index);
      if (((token = table[current](context)) & Token.WhiteSpace) !== Token.WhiteSpace) {
        return {
          type: token,
          value,
          newline,
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
      start,
      end: index
    };
  };
}
