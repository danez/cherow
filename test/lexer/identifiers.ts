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
              t.deepEqual({
                  token: nextToken(state, context | Context.OptionsRaw),
                  //                  raw: state.tokenRaw,
                  value: state.tokenValue,
                  line: state.line,
                  column: state.column,
              },          {
                  token: opts.token,
                  // raw: opts.raw,
                  value: opts.value,
                  line: opts.line,
                  column: opts.column,
              });
          });
      }

      test(`${name} `, Context.Empty);
  }



pass('scans \'$$\'', {
    source: '$$',
    value: '$$',
    raw: '$$',
    token: Token.Identifier,
    line: 1,
    column: 2,
});


pass('scans \'foo\'', {
  source: 'foo',
  value: 'foo',
  raw: 'foo',
  token: Token.Identifier,
  line: 1,
  column: 3,
});

// Ignore bar - proves that the ASCII char table works
pass('scans \'foo\'', {
  source: 'foo bar',
  value: 'foo',
  raw: 'foo',
  token: Token.Identifier,
  line: 1,
  column: 3,
});


pass('scans \'cD\'', {
  source: 'cD',
  value: 'cD',
  raw: 'cD',
  token: Token.Identifier,
  line: 1,
  column: 2,
});

pass('scans \'$e\'', {
  source: '$e',
  value: '$e',
  raw: '$e',
  token: Token.Identifier,
  line: 1,
  column: 2,
});

pass('scans \'_g\'', {
  source: '_g',
  value: '_g',
  raw: '_g',
  token: Token.Identifier,
  line: 1,
  column: 2,
});

pass('scans \'_H\'', {
  source: '_H',
  value: '_H',
  raw: '_H',
  token: Token.Identifier,
  line: 1,
  column: 2,
});

pass('scans \'___foo_______\'', {
  source: '___foo_______',
  value: '___foo_______',
  raw: '___foo_______',
  token: Token.Identifier,
  line: 1,
  column: 13,
});

pass('scans \'________foo_________________________bar________________\'', {
  source: '________foo_________________________bar________________',
  value: '________foo_________________________bar________________',
  raw: '________foo_________________________bar________________',
  token: Token.Identifier,
  line: 1,
  column: 55,
});

pass('scans \'__\'', {
  source: '__',
  value: '__',
  raw: '__',
  token: Token.Identifier,
  line: 1,
  column: 2,
});

/*
pass('scans \'_\'', {
  source: '_',
  value: '_',
  raw: '_',
  token: Token.Identifier,
  line: 1,
  column: 1,
});
*/
pass('scans \'$U\'', {
  source: '$U',
  value: '$U',
  raw: '$U',
  token: Token.Identifier,
  line: 1,
  column: 2,
});

pass('scans \'$Insane\'', {
  source: '$Insane',
  value: '$Insane',
  raw: '$Insane',
  token: Token.Identifier,
  line: 1,
  column: 7,
});

pass('scans \'_foo\'', {
  source: '_foo',
  value: '_foo',
  raw: '_foo',
  token: Token.Identifier,
  line: 1,
  column: 4,
});

pass('scans \'_$_\'', {
  source: '_$_',
  value: '_$_',
  raw: '_',
  token: Token.Identifier,
  line: 1,
  column: 3,
});

pass('scans \'__\'', {
    source: '__',
    value: '__',
    raw: '__',
    token: Token.Identifier,
    line: 1,
    column: 2,
});

pass('scans \'_I\'', {
    source: '_I',
    value: '_I',
    raw: '_I',
    token: Token.Identifier,
    line: 1,
    column: 2,
});

pass('scans \'foo bar\'', {
    source: 'foo bar',
    value: 'foo',
    raw: 'foo',
    token: Token.Identifier,
    line: 1,
    column: 3,
});

pass('scans \'O7\'', {
    source: 'O7',
    value: 'O7',
    raw: 'O7',
    token: Token.Identifier,
    line: 1,
    column: 2,
});


  pass('scans \'wX\'', {
    source: 'wX',
    value: 'wX',
    raw: 'wX',
    token: Token.Identifier,
    line: 1,
    column: 2,
});

pass('scans \'$4\'', {
    source: '$4',
    value: '$4',
    raw: '$4',
    token: Token.Identifier,
    line: 1,
    column: 2,
});


pass('scans \'function\'', {
  source: 'function',
  value: 'function',
  token: Token.FunctionKeyword,
  line: 1,
  column: 8,
});

pass('scans \'a\'', {
  source: 'a',
  value: 'a',
  token: Token.Identifier,
  line: 1,
  column: 1,
});

pass('scans \'fkleuver\'', {
    source: 'fkleuver',
    value: 'fkleuver',
    token: Token.Identifier,
    line: 1,
    column: 8,
});

pass('scans \'fred kleuver\'', {
  source: 'fred kleuver',
  value: 'fred',
  token: Token.Identifier,
  line: 1,
  column: 4,
});

pass('scans \'$_\'', {
  source: '$_',
  value: '$_',
  raw: '$_',
  token: Token.Identifier,
  line: 1,
  column: 2,
});


pass('scans \'a\u2001b\'', {
  source: 'a\u2001b',
  value: 'a',
  raw: 'a',
  token: Token.Identifier,
  line: 1,
  column: 1,
 });


 pass('scans \'a\\u{71}c\'', {
  source: 'a\\u{71}c',
  value: 'aqc',
  raw: 'a\\u{71}c',
  token: Token.Identifier,
  line: 1,
  column: 8,
});


pass('scans \'ab\\u{0000000000000000000072}\'', {
  source: 'ab\\u{0000000000000000000072}',
  value: 'abr',
  raw: 'ab\\u{0000000000000000000072}',
  token: Token.Identifier,
  line: 1,
  column: 29,
});

pass('scans \'abc\\u007Xvwxyz\'', {
  source: 'abc\\u007Xvwxyz',
  value: 'abcqvwxyz',
  raw: 'abc\\u007Xvwxyz',
  token: Token.Identifier,
  line: 1,
  column: 14,
});


});
