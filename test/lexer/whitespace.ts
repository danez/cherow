import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';

// https://github.com/tc39/test262/tree/master/test/language/white-space

describe('Lexer - Whitespace', () => {

    function pass(name: string, opts: any) {
        it(name, () => {
            const state = new State(opts.source);
            nextToken(state, Context.Empty);
            t.deepEqual({
                line: state.line,
                column: state.column,
                index: state.index,
            },          {
                line: opts.line,
                column: opts.column,
                index: opts.index
            }, );
        });
    }

  pass('should skip nothing', {
    source: '',
    line: 1, column: 0, index: 0
  });

  pass('should skip newline', {
      source: '\r',
    line: 2, column: 0, index: 1
  });

  pass('should skip crlf', {
    source: '\r\n',
    line: 2, column: 0, index: 2
  });

  pass('should skip non breaking space', {
    source: '\xA0',
    line: 1, column: 1, index: 1
  });

  pass('should skip newline', {
    source: '\n',
    line: 2, column: 0, index: 1
  });

  pass('should skip tabs', {
    source: '\t\t\t\t\t\t\t\t',
    line: 1, column: 8, index: 8
  });

  pass('should skip vertical tabs', {
      source: '\v\v\v\v\v\v\v\v',
      line: 1, column: 8, index: 8
  });


   pass('should skip line separator', {
    source: '\u2028',
    line: 2, column: 0, index: 1
  });

  pass('should skip paragraph separator', {
    source: '\u2029',
    line: 2, column: 0, index: 1
  });

   pass('should skip punctual space', {
    source: '\u2008',
    line: 1, column: 1, index: 1
  });

  pass('should skip EmQuad', {
    source: '\u2001',
    line: 1, column: 1, index: 1
  });

   pass('should skip mixed whitespace', {
    source: '\u000A\u000D\u2028\u2029',
    line: 5, column: 0, index: 4
  });

  pass('should skip ideographic space', {
    source: '\u3000',
    line: 1, column: 1, index: 1
  });

  pass('should skip punctual space', {
    source: '\u2008',
    line: 1, column: 1, index: 1
  });

  pass('should skip mixed whitespace', {
    source: '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF',
    line: 3, column: 20, index: 25
  });
});
