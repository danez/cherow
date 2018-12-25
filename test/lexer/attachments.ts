import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';

describe('Lexer - Attach comments', () => {
  function pass(name: string, opts: any): void {
    it(name, () => {
      const state = new State(opts.source);
      nextToken(state, Context.OptionsCollectComments);
      t.deepStrictEqual(
        {
          comment: state.comments[0].value,
          type: state.comments[0].type,
          line: state.line,
          column: state.column
        },
        {
          line: opts.line,
          column: opts.column,
          comment: opts.comment,
          type: opts.type
        }
      );
    });
  }

  pass('should skip a simple single line comment', {
    source: `//`,
    comment: '',
    type: 'SingleLine',
    line: 1,
    column: 2,
    index: 3
  });

  pass('should skip a simple single line comment', {
    source: `// Fred`,
    comment: ' Fred',
    type: 'SingleLine',
    line: 1,
    column: 7,
    index: 3
  });

  pass('should skip a simple single line comment', {
    source: `/* Cherow */`,
    comment: ' Cherow ',
    type: 'MultiLine',
    line: 1,
    column: 12,
    index: 3
  });
});
