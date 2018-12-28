import { Context } from '../../../src/parser/common';
import { pass, fail } from '../../test-utils';

describe('Statements - While', () => {
  const inValids: Array<[string, Context]> = [
    ['while 1 break;', Context.OptionDisablesWebCompat],
    ['while "hood" break;', Context.OptionDisablesWebCompat],
    ['while (false) function f() {}', Context.OptionDisablesWebCompat],
    ['while (false) let x = 1;', Context.OptionDisablesWebCompat],
    ['while 1 break;', Context.OptionDisablesWebCompat],
    [`while '' break;`, Context.OptionDisablesWebCompat],
    // [`while (false) async function f() {}`, Context.OptionDisablesWebCompat],
    [`while (false) function* g() {}`, Context.OptionDisablesWebCompat],
    ['while (false) label1: label2: function f() {}', Context.OptionDisablesWebCompat],
    [
      `while({1}){
    break ;
 };`,
      Context.Module
    ]
  ];

  fail('Statements - While (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'while(function __func(){return 1;}()){ break }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'WhileStatement',
            test: {
              type: 'CallExpression',
              callee: {
                type: 'FunctionExpression',
                id: {
                  type: 'Identifier',
                  name: '__func'
                },
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ReturnStatement',
                      argument: {
                        type: 'Literal',
                        value: 1
                      }
                    }
                  ]
                },
                generator: false,
                expression: false,
                async: false
              },
              arguments: []
            },
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'BreakStatement',
                  label: null
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'while (i-->1) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'WhileStatement',
            test: {
              type: 'BinaryExpression',
              operator: '>',
              left: {
                type: 'UpdateExpression',
                operator: '--',
                argument: {
                  type: 'Identifier',
                  name: 'i'
                },
                prefix: false
              },
              right: {
                type: 'Literal',
                value: 1
              }
            },
            body: {
              type: 'BlockStatement',
              body: []
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'while (x < 10) { x++; y--; }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'WhileStatement',
            test: {
              type: 'BinaryExpression',
              operator: '<',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              right: {
                type: 'Literal',
                value: 10
              }
            },
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'UpdateExpression',
                    operator: '++',
                    argument: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    prefix: false
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'UpdateExpression',
                    operator: '--',
                    argument: {
                      type: 'Identifier',
                      name: 'y'
                    },
                    prefix: false
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'while(1);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'WhileStatement',
            test: {
              type: 'Literal',
              value: 1
            },
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Statements - While (pass)', valids);
});
