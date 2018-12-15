import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';
import { Token,  } from '../../src/token';

describe('Lexer - Numbers', () => {

    function pass(name: string, opts: any): any {
      function test(name: string, context: Context): any {
        it(name, () => {
            const state = new State(opts.source);

            t.deepEqual({
              token: nextToken(state, context),
              value: state.tokenValue,
              line: state.line,
              raw: state.tokenRaw,
              column: state.column,
            },          {
                token: opts.token,
                value: opts.value,
                line: opts.line,
                raw: opts.raw,
                column: opts.column,
              });
        });
      }
      test(`${name}`, Context.OptionsRaw);
    }
    function fail(name: string, context: Context, opts: any): any {
        it(name, () => {
          const state = new State(opts.source);
          t.throws(() => {
            nextToken(state, context);
          });
        });
    }

      pass('scans \'9\'', {
      source: '9',
      value: 9,
      raw: '9',
      token: Token.NumericLiteral,
      line: 1,
      column: 1,
    });

    pass('scans \'99\'', {
      source: '99',
      value: 99,
      raw: '99',
      token: Token.NumericLiteral,
      line: 1,
      column: 2,
    });

    pass('scans \'.3\'', {
      source: '.3',
      value: 0.3,
      raw: '.3',
      token: Token.NumericLiteral,
      line: 1,
      column: 2,
    });

    pass('scans \'2.3\'', {
      source: '2.3',
      value: 2.3,
      raw: '2.3',
      token: Token.NumericLiteral,
      line: 1,
      column: 3,
    });


    pass('scans \'123.012\'', {
      source: '123.012',
      value: 123.012,
      raw: '123.012',
      token: Token.NumericLiteral,
      line: 1,
      column: 7,
    });

    pass('scans \'1234567890.0987654321\'', {
      source: '1234567890.0987654321',
      value: 1234567890.0987654321,
      raw: '1234567890.0987654321',
      token: Token.NumericLiteral,
      line: 1,
      column: 21,
    });

    pass('scans \'99\'', {
      source: '99',
      value: 99,
      raw: '99',
      token: Token.NumericLiteral,
      line: 1,
      column: 2,
    });

    pass('scans \'19\'', {
      source: '1',
      value: 1,
      raw: '1',
      token: Token.NumericLiteral,
      line: 1,
      column: 1,
    });

    pass('scans \'7890', {
      source: '7890',
      value: 7890,
      raw: '7890',
      token: Token.NumericLiteral,
      line: 1,
      column: 4,
    });

    pass('scans \'2.3', {
      source: '2.3',
      value: 2.3,
      raw: '2.3',
      token: Token.NumericLiteral,
      line: 1,
      column: 3,
    });


   pass('scans \'2.3', {
      source: '2.3',
      value: 2.3,
      raw: '2.3',
      token: Token.NumericLiteral,
      line: 1,
      column: 3,
    });
    pass('scans \'1234567890.0987654321', {
      source: '1234567890.0987654321',
      value: 1234567890.0987654321,
      raw: '1234567890.0987654321',
      token: Token.NumericLiteral,
      line: 1,
      column: 21,
    });


  });
