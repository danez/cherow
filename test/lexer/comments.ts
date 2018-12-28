import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';

describe('Lexer - Comments', () => {
  function pass(name: string, opts: any): void {
    it(name, () => {
      const state = new State(opts.source);
      nextToken(state, Context.Empty);
      t.deepStrictEqual(
        {
          // index: state.index,
          line: state.line,
          column: state.column
        },
        {
          line: opts.line,
          // index: opts.index,
          column: opts.column
        }
      );
    });
  }

  function fail(name: string, context: Context, opts: any): void {
    it(name, () => {
      const state = new State(opts.source);
      t.throws(() => {
        nextToken(state, context);
      });
    });
  }

  function passAll(name: (lt: string) => string, opts: (lt: string) => any) {
    pass(name('line feed'), opts('\n'));
    pass(name('carriage return'), opts('\r'));
    pass(name('Windows newline'), opts('\r'));
    pass(name('line separators'), opts('\u2028'));
    pass(name('paragraph separators'), opts('\u2029'));
  }

  pass('should skip a simple single with Mongolian Vowel Separator', {
    source: `//\u180E`,
    line: 1,
    column: 3,
    index: 3
  });

  pass('should skip a simple single line comment', {
    source: `// `,
    line: 1,
    column: 3,
    index: 3
  });

  pass('should handle correct interpretation of single line comments', {
    source: `///`,
    line: 1,
    column: 3,
    index: 3
  });

  pass('should skip a single line comment with new line', {
    source: `// foo
   `,
    line: 2,
    column: 3,
    index: 10
  });

  pass('should skip slash in a comment', {
    source: `// /`,
    line: 1,
    column: 4,
    index: 4
  });

  pass('should skip single line comment with malformed escape', {
    source: `//\\unope \\u{nope} \\xno `,
    line: 1,
    column: 23,
    index: 23
  });

  pass('should skip single line comment with multi line paragrap', {
    source: `// \u2028\u2028`,
    line: 3,
    column: 0,
    index: 5
  });

  pass('should handle multiline comment with multiple carriage return and newline', {
    source: `/**\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\n*/`,
    line: 2,
    column: 2,
    index: 49
  });

  pass('should handle multiline comment with carriage return and multiple newline', {
    source: `/**\r\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n*/`,
    line: 2,
    column: 2,
    index: 35
  });

  pass('should handle multiline comment with carriage return and newline, paragrap separator and line separator', {
    source: `/**\r\n\u2028\u2029*/`,
    line: 2,
    column: 2,
    index: 9
  });

  pass('should skip single line comment with line feed', {
    source: `// \r`,
    line: 2,
    column: 0,
    index: 4
  });

  pass('should skip single line with newline and line feed', {
    source: `// \r\n`,
    line: 3,
    column: 0,
    index: 5
  });

  pass('should handle slash in a comment', {
    source: `// */`,
    line: 1,
    column: 5,
    index: 5
  });

  pass('should handle multiline comment with carriage return and newline', {
    source: `/**\r\n*/`,
    line: 2,
    column: 2,
    index: 7
  });

  passAll(
    () => 'skips single line comments with line feed',
    lt => ({
      source: `  \t // foo bar${lt}  `,
      hasNext: false,
      line: 2,
      column: 2
    })
  );

  passAll(
    lt => `skips multiple single line comments with ${lt}`,
    lt => ({
      source: `  \t // foo bar${lt} // baz ${lt} //`,
      hasNext: false,
      line: 3,
      column: 3
    })
  );

  passAll(
    lt => `skips multiple multiline comments with ${lt}`,
    lt => ({
      source: `  \t /* foo bar${lt} *//* baz*/ ${lt} /**/`,
      hasNext: false,
      line: 3,
      column: 5
    })
  );

  pass('skips multiline comments with nothing', {
    source: '  \t /* foo * /* bar */  ',
    hasNext: false,
    line: 1,
    column: 24
  });

  passAll(
    lt => `skips multiline comments with ${lt}`,
    lt => ({
      source: `  \t /* foo * /* bar ${lt} */  `,
      hasNext: false,
      line: 2,
      column: 5
    })
  );

  pass('should skip multiline comment with multiple newline', {
    source: `/* \n\n\n */`,
    line: 2,
    column: 3,
    index: 9
  });

  pass('single line comment escaped newlines are ignored', {
    source: `//\\n \\r \\x0a \\u000a still comment`,
    line: 1,
    column: 33,
    index: 33
  });

  pass('should skip Mongolian Vowel Separator in single line comments', {
    source: `//   single-line comment with U+180E`,
    line: 1,
    column: 36,
    index: 36
  });

  pass('should skip Mongolian Vowel Separator in multi line comments', {
    source: `// U+180E in comments; UTF8(0x180E) = 0xE1 0xA0 0x8E`,
    line: 1,
    column: 52,
    index: 52
  });

  pass('should handle correct interpretation of single line comments', {
    source: `//FOO
    ///`,
    line: 2,
    column: 7,
    index: 17
  });

  pass('should handle correct interpretation of single line comments', {
    source: `/* var
    //x
    */`,
    line: 3,
    column: 6,
    index: 25
  });

  pass('should insert Single line comment into Multi line comment', {
    source: `/* var
    //x
    */`,
    line: 3,
    column: 6,
    index: 29
  });

  pass('should handle fist multi line comment, then Single line comment', {
    source: `/*CHECK#1*/
    /* var
    *///x*/`,
    line: 3,
    column: 11,
    index: 42
  });

  pass('single and Multi line comments are used together', {
    source: `// var /* x */`,
    line: 1,
    column: 14,
    index: 14
  });

  pass('multi line comment can contain FORM FEED (U+000C)', {
    source: `/*\\u000C multi line \\u000C comment \\u000C*/`,
    line: 1,
    column: 43,
    index: 43
  });

  pass('multi line comment can contain SPACE (U+0020)', {
    source: `/*\\u0020 multi line \\u0020 comment \\u0020*/`,
    line: 1,
    column: 43,
    index: 43
  });

  pass('multi line comment can contain NO-BREAK SPACE (U+00A0)', {
    source: `/*\\u00A0 multi line \\u00A0 comment \\u00A0*/`,
    line: 1,
    column: 43,
    index: 43
  });

  pass('multi line comment can contain NO-BREAK SPACE (U+00A0)', {
    source: `/*
    */-->the comment extends to these characters`,
    line: 2,
    column: 48,
    index: 51
  });

  pass('multi line comment can contain NO-BREAK SPACE (U+00A0)', {
    source: `/*
    optional
    MultiLineCommentChars */-->the comment extends to these characters`,
    line: 3,
    column: 70,
    index: 86
  });

  pass('optional SingleLineDelimitedCommentSequence', {
    source: `/*
    */ /* optional SingleLineDelimitedCommentSequence */-->the comment extends to these characters`,
    line: 2,
    column: 98,
    index: 101
  });
});
