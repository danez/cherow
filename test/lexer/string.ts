import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';
import { Token } from '../../src/token';


describe('Lexer - String literal', () => {

  function pass(name: string, opts: any) {
      function test(name: string, context: Context, isEnd: boolean) {
          it(name, () => {
              if (opts.strict !== true) {
                  const parser = new State(isEnd ? opts.source : `${opts.source} `);

                  t.deepEqual({
                      token: nextToken(parser, context),
                      value: parser.tokenValue,
                      line: parser.line,
                      column: parser.column,
                  },          {
                      token: Token.StringLiteral,
                      value: opts.value,
                      line: opts.line,
                      column: opts.column,
                  });
              }
          });
      }

      test(`${name}`, Context.Empty, false);
      test(`${name}`, Context.Empty, true);
  }

  function fail(name: string, source: string, strict?: boolean) {
    function test(name: string, context: Context, isEnd: boolean) {
        it(name, () => {
            if (strict !== true) {
                const parser = new State(isEnd ? source : `${source} `);
                t.throws(() => {
                  nextToken(parser, context);
                });
            }

            if (strict !== false) {
                const parser = new State(isEnd ? source : `${source} `);
                t.throws(() => {
                    nextToken(parser, context | Context.Strict);
                });
            }
        });
    }

    test(`${name}`, Context.Empty, false);
    test(`${name}`, Context.Empty, true);
}

pass('scans \'\'', {
  source: '\'\'',
  value: '',
  raw: '\'\'',
  line: 1,
  column: 2,
});

pass('scans ""', {
  source: '""',
  value: '',
  raw: '""',
  line: 1,
  column: 2,
});

pass('scans \'abc\'', {
  source: '\'abc\'',
  value: 'abc',
  raw: '\'abc\'',
  line: 1,
  column: 5,
});

pass('scans "abc"', {
  source: '"abc"',
  value: 'abc',
  raw: '"abc"',
  line: 1,
  column: 5,
});

pass('scans \'123\'', {
  source: '\'123\'',
  value: '123',
  raw: '\'123\'',
  line: 1,
  column: 5,
});

pass('scans "123"', {
  source: '"123"',
  value: '123',
  raw: '"123"',
  line: 1,
  column: 5,
});

});
