import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';

describe('Lexer - Comments', () => {

  function pass(name: string, opts: any): void {
    it(name, () => {
        const state = new State(opts.source);
        nextToken(state, Context.Empty);
        t.deepEqual({
            index: state.index,
         //   line: state.line,
          //  column: state.column,
        },          {
          //  line: opts.line,
            index: opts.index,
          //  column: opts.column
        }, );
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

pass('should skip a simple single line comment', {
  source: `// `,
  line: 1, column: 3, index: 3
});


pass('should handle correct interpretation of single line comments', {
  source: `///`,
  line: 1, column: 3, index: 3
});
pass('should handle multiline comment with multiple carriage return and newline', {
  source: `/**\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\n*/`,
  line: 2, column: 2, index: 49
});

});

