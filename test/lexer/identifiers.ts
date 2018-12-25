import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';
import { Token } from '../../src/token';

describe('Lexer - Identifiers', () => {
  function pass(name: string, opts: any) {
    function test(name: string, context: Context) {
      it(name, () => {
        const state = new State(opts.source);
        t.deepEqual(
          {
            token: nextToken(state, context | Context.OptionsRaw),
            //                  raw: state.tokenRaw,
            value: state.tokenValue,
            line: state.line,
            column: state.column
          },
          {
            token: opts.token,
            // raw: opts.raw,
            value: opts.value,
            line: opts.line,
            column: opts.column
          }
        );
      });
    }

    test(`${name} `, Context.Empty);
  }

  pass("scans '$$'", {
    source: '$$',
    value: '$$',
    raw: '$$',
    token: Token.Identifier,
    line: 1,
    column: 2
  });

  pass("scans 'foo'", {
    source: 'foo',
    value: 'foo',
    raw: 'foo',
    token: Token.Identifier,
    line: 1,
    column: 3
  });

  // Ignore bar - proves that the ASCII char table works
  pass("scans 'foo'", {
    source: 'foo bar',
    value: 'foo',
    raw: 'foo',
    token: Token.Identifier,
    line: 1,
    column: 3
  });

  pass("scans 'cD'", {
    source: 'cD',
    value: 'cD',
    raw: 'cD',
    token: Token.Identifier,
    line: 1,
    column: 2
  });

  pass("scans '$e'", {
    source: '$e',
    value: '$e',
    raw: '$e',
    token: Token.Identifier,
    line: 1,
    column: 2
  });

  pass("scans '_g'", {
    source: '_g',
    value: '_g',
    raw: '_g',
    token: Token.Identifier,
    line: 1,
    column: 2
  });

  pass("scans '_H'", {
    source: '_H',
    value: '_H',
    raw: '_H',
    token: Token.Identifier,
    line: 1,
    column: 2
  });

  pass("scans '___foo_______'", {
    source: '___foo_______',
    value: '___foo_______',
    raw: '___foo_______',
    token: Token.Identifier,
    line: 1,
    column: 13
  });

  pass("scans '________foo_________________________bar________________'", {
    source: '________foo_________________________bar________________',
    value: '________foo_________________________bar________________',
    raw: '________foo_________________________bar________________',
    token: Token.Identifier,
    line: 1,
    column: 55
  });

  pass("scans '__'", {
    source: '__',
    value: '__',
    raw: '__',
    token: Token.Identifier,
    line: 1,
    column: 2
  });
});
