import * as t from 'assert';
import { nextToken } from '../../src/lexer/scan';
import { State } from '../../src/state';
import { Context } from '../../src/common';
import { Token, KeywordDescTable } from '../../src/token';

describe('Lexer - Punctuators', () => {

      function pass(name: string, opts: any) {
          it(name, () => {
              const state = new State(opts.source);
              t.deepEqual({
                  token: nextToken(state, opts.context),
                  line: state.line,
                  column: state.column,
              },          {
                  token: opts.token,
                  line: opts.line,
                  column: opts.column,
              });
          });
      }

      pass('scans noting and returns \'EndOfSource\'', {
          source: '',
          context: Context.Empty,
          token: Token.EndOfSource,
          line: 1, column: 0,
      });

      const tokens: Array<[Context, Token, string]> = [
          [Context.Empty,      Token.Arrow,         '=>'],
          [Context.Empty, Token.Assign,             '='],
          [Context.Empty, Token.StrictEqual,        '==='],
          [Context.Empty, Token.LooseEqual,         '=='],
          [Context.Empty, Token.LessThanOrEqual,    '<='],
          [Context.Empty, Token.ShiftLeftAssign,   '<<='],
          [Context.Empty, Token.LessThan,            '<'],
          [Context.Empty, Token.DivideAssign,        '/='],
          [Context.Empty, Token.ModuloAssign,        '%='],
          [Context.Empty, Token.StrictNotEqual,     '!=='],
          [Context.Empty, Token.LooseNotEqual,      '!='],
          [Context.Empty, Token.ExponentiateAssign,  '**='],
          [Context.Empty, Token.MultiplyAssign,      '*='],
          [Context.Empty, Token.Exponentiate,       '**'],
          [Context.Empty, Token.GreaterThanOrEqual, '>='],
          [Context.Empty, Token.ShiftRightAssign,    '>>='],
          [Context.Empty, Token.LogicalShiftRightAssign, '>>>='],
          [Context.Empty, Token.GreaterThan,        '>'],
          [Context.Empty, Token.ShiftLeft,          '<<'],
          [Context.Empty, Token.ShiftRight,         '>>'],
          [Context.Empty, Token.LogicalShiftRight,  '>>>'],
          [Context.Empty, Token.BitwiseAndAssign,    '&='],
          [Context.Empty, Token.LogicalAnd,         '&&'],
          [Context.Empty, Token.BitwiseAnd,         '&'],
          [Context.Empty, Token.AddAssign,           '+='],
          [Context.Empty,      Token.LeftParen,    '('],
          [Context.Empty,      Token.LeftBrace,    '{'],
          [Context.Empty,      Token.Period,       '.'],
          [Context.Empty,      Token.Ellipsis,     '...'],
          [Context.Empty,      Token.RightBrace,   '}'],
          [Context.Empty,      Token.RightParen,   ')'],
          [Context.Empty,      Token.Semicolon,    ';'],
          [Context.Empty,      Token.Comma,        ','],
          [Context.Empty,      Token.LeftBracket,  '['],
          [Context.Empty,      Token.RightBracket, ']'],
          [Context.Empty,      Token.Colon,        ':'],
          [Context.Empty,      Token.QuestionMark, '?'],
          [Context.Empty, Token.Increment,         '++'],
          [Context.Empty, Token.Decrement,         '--'],
          [Context.Empty, Token.SubtractAssign,    '-='],
          [Context.Empty, Token.BitwiseXorAssign,  '^='],
          [Context.Empty, Token.BitwiseOrAssign,   '|='],
          [Context.Empty, Token.Negate,             '!'],
          [Context.Empty, Token.Complement,         '~'],
          [Context.Empty, Token.Add,                '+'],
          [Context.Empty, Token.Subtract,           '-'],
          [Context.Empty, Token.Multiply,           '*'],
          [Context.Empty, Token.Modulo,             '%'],
          [Context.Empty, Token.Divide,             '/'],
          [Context.Empty, Token.LogicalOr,         '||'],
          [Context.Empty, Token.LessThanOrEqual,   '<='],
          [Context.Empty, Token.BitwiseOr,          '|'],
          [Context.Empty, Token.BitwiseXor,         '^'],
          [Context.Empty, Token.At,                 '@'],
      ];

      for (const [ctx, token, op] of tokens) {
          it(`scans '${op}'`, () => {
              const state = new State(op);
              t.deepEqual({
                  token: KeywordDescTable[nextToken(state, ctx) & Token.Type],
                  //hasNext: state.index < state.length,
                  line: state.line,
                  column: state.column,
              },          {
                  token: KeywordDescTable[token & Token.Type],
                  //hasNext: false,
                  line: 1,
                  column: op.length,
              });
          });

          it(`scans '${op}' with space`, () => {
              const state = new State(`${op} foo`);

              t.deepEqual({
                  token: KeywordDescTable[nextToken(state, ctx) & Token.Type],
                //  hasNext: state.index < state.length,
                  line: state.line,
                  column: state.column,
              },          {
                  token: KeywordDescTable[token & Token.Type],
                 // hasNext: true,
                  line: 1,
                  column: op.length,
              });
          });
      }

     it('scans \'.\' in \'..\'', () => {
          const state = new State('..');

          t.deepEqual({
              token: KeywordDescTable[nextToken(state, Context.Empty) & Token.Type],
              hasNext: state.index < state.length,
              line: state.line,
              column: state.column,
          },          {
              token: KeywordDescTable[Token.Period & Token.Type],
              hasNext: true,
              line: 1, column: 1,
          });
      });
});
