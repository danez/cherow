import * as t from 'assert';
import { skipHashBang } from '../../src/lexer/common';
import { State } from '../../src/state';
import { Context } from '../../src/common';

describe('Stage 3 - HashBang Grammar', () => {

  function pass(name: string, opts: any) {
      it(name, () => {
          const state = new State(opts.source);
          skipHashBang(state, Context.OptionsNext);
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

  // None of the first two tests should have some impact on the location tracking.

  pass('should skip big endian', {
      source: '  \uFFEE ',
      line: 1,
      column: 0,
      index: 0
  });

  pass('should skip a big endian and BOM at the start', {
      source: '  \uFFEE \uFEFF \uFFEE \uFEFF ',
      line: 1,
      column: 0,
      index: 0
  });

  pass('should skip a shebang+paragraph separator', {
      source: '#!/foo/bar/baz -abc\u2029',
      line: 2,
      column: 0,
      index: 20
  });

  pass('should skip a shebang + paragraph separator', {
      source: '#!/foo/bar/baz -abc\u2029',
      line: 2,
      column: 0,
      index: 20
  });
  pass('should skip a shebang+paragraph separator before an identifier', {
      source: '#!/foo/bar/baz -abc\u2029foo',
      hasNext: true,
      index: 20,
      line: 2,
      column: 0,
  });

  pass('should skip a shebang+paragraph separator before a lone hash', {
      source: '#!/foo/bar/baz -abc\u2029# foo',
      hasNext: true,
      index: 20,
      line: 2,
      column: 0,
  });

  pass('should skip a shebang+paragraph separator before a lone hash', {
    source: '#!/foo/bar/baz -abc\u2029# foo',
    hasNext: true,
    index: 20,
    line: 2,
    column: 0,
});

  pass('should skip a shebang+paragraph separator before a lone exclamation', {
      source: '#!/foo/bar/baz -abc\u2029! foo',
      hasNext: true,
      index: 20,
      line: 2,
      column: 0,
  });
/*
  pass('should skip a BigEndian+shebang+LF in an otherwise empty source', {
      source: '\uFFEE#!/foo/bar/baz -abc\n',
      hasNext: false,
      index: 21,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+LF in an otherwise empty source', {
      source: '\uFFEF#!/foo/bar/baz -abc\n',
      hasNext: false,
      index: 21,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+LF before an identifier', {
      source: '\uFFEF#!/foo/bar/baz -abc\nfoo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+LF before a lone hash', {
      source: '\uFFEF#!/foo/bar/baz -abc\n# foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+LF before a lone exclamation', {
      source: '\uFFEF#!/foo/bar/baz -abc\n! foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+CR in an otherwise empty source', {
      source: '\uFFEF#!/foo/bar/baz -abc\r',
      hasNext: false,
      index: 21,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+CR before an identifier', {
      source: '\uFFEF#!/foo/bar/baz -abc\rfoo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+CR before a lone hash', {
      source: '\uFFEF#!/foo/bar/baz -abc\r# foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+CR before a lone exclamation', {
      source: '\uFFEF#!/foo/bar/baz -abc\r! foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+CRLF in an otherwise empty source', {
      source: '\uFFEF#!/foo/bar/baz -abc\r\n',
      hasNext: false,
      index: 22,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+CRLF before an identifier', {
      source: '\uFFEF#!/foo/bar/baz -abc\r\nfoo',
      hasNext: true,
      index: 22,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+CRLF before a lone hash', {
      source: '\uFFEF#!/foo/bar/baz -abc\r\n# foo',
      hasNext: true,
      index: 22,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+CRLF before a lone exclamation', {
      source: '\uFFEF#!/foo/bar/baz -abc\r\n! foo',
      hasNext: true,
      index: 22,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+line separator in an otherwise empty source', {
      source: '\uFFEF#!/foo/bar/baz -abc\u2028',
      hasNext: false,
      index: 21,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+line separator before an identifier', {
      source: '\uFFEF#!/foo/bar/baz -abc\u2028foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+line separator before a lone hash', {
      source: '\uFFEF#!/foo/bar/baz -abc\u2028# foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+line separator before a lone exclamation', {
      source: '\uFFEF#!/foo/bar/baz -abc\u2028! foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+paragraph separator in an otherwise empty source', {
      source: '\uFFEF#!/foo/bar/baz -abc\u2029',
      hasNext: false,
      index: 21,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+paragraph separator before an identifier', {
      source: '\uFFEF#!/foo/bar/baz -abc\u2029foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+paragraph separator before a lone hash', {
      source: '\uFFEF#!/foo/bar/baz -abc\u2029# foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0,
  });

  pass('should skip a BOM+shebang+paragraph separator before a lone exclamation', {
      source: '\uFFEF#!/foo/bar/baz -abc\u2029! foo',
      hasNext: true,
      index: 21,
      line: 2,
      column: 0,
  });*/
});
