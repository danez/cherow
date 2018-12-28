import { Context } from '../../../src/parser/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Do while', () => {
  const inValids: Array<[string, Context]> = [
    ['with(1) b: function a(){}', Context.OptionDisablesWebCompat],
    // ['with ({}) async function f() {}', Context.OptionDisablesWebCompat],
    ['with ({}) function f() {}', Context.OptionDisablesWebCompat],
    ['with ({}) let x;', Context.OptionDisablesWebCompat],
    ['while 1 break;', Context.OptionDisablesWebCompat],
    [`while '' break;`, Context.OptionDisablesWebCompat],
    ['while (false) label1: label2: function f() {}', Context.OptionDisablesWebCompat],
    [
      `while({1}){
      break ;
   };`,
      Context.Module
    ]
  ];

  fail('Statements - Do while (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'do{ break; } while(function __func(){return 1;});',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'DoWhileStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'BreakStatement',
                  label: null
                }
              ]
            },
            test: {
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
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `do { __condition++; if (((""+__condition/2).split(".")).length>1) continue; __odds++;} while(__condition < 10)`,
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'DoWhileStatement',
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
                      name: '__condition'
                    },
                    prefix: false
                  }
                },
                {
                  type: 'IfStatement',
                  test: {
                    type: 'BinaryExpression',
                    operator: '>',
                    left: {
                      type: 'MemberExpression',
                      computed: false,
                      object: {
                        type: 'CallExpression',
                        callee: {
                          type: 'MemberExpression',
                          computed: false,
                          object: {
                            type: 'BinaryExpression',
                            operator: '+',
                            left: {
                              type: 'Literal',
                              value: ''
                            },
                            right: {
                              type: 'BinaryExpression',
                              operator: '/',
                              left: {
                                type: 'Identifier',
                                name: '__condition'
                              },
                              right: {
                                type: 'Literal',
                                value: 2
                              }
                            }
                          },
                          property: {
                            type: 'Identifier',
                            name: 'split'
                          }
                        },
                        arguments: [
                          {
                            type: 'Literal',
                            value: '.'
                          }
                        ]
                      },
                      property: {
                        type: 'Identifier',
                        name: 'length'
                      }
                    },
                    right: {
                      type: 'Literal',
                      value: 1
                    }
                  },
                  consequent: {
                    type: 'ContinueStatement',
                    label: null
                  },
                  alternate: null
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'UpdateExpression',
                    operator: '++',
                    argument: {
                      type: 'Identifier',
                      name: '__odds'
                    },
                    prefix: false
                  }
                }
              ]
            },
            test: {
              type: 'BinaryExpression',
              operator: '<',
              left: {
                type: 'Identifier',
                name: '__condition'
              },
              right: {
                type: 'Literal',
                value: 10
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'do ; while (true)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'DoWhileStatement',
            body: {
              type: 'EmptyStatement'
            },
            test: {
              type: 'Literal',
              value: true
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'do continue; while(1);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'DoWhileStatement',
            body: {
              type: 'ContinueStatement',
              label: null
            },
            test: {
              type: 'Literal',
              value: 1
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'do {} while (true)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'DoWhileStatement',
            body: {
              type: 'BlockStatement',
              body: []
            },
            test: {
              type: 'Literal',
              value: true
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '{do ; while(false); false}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'DoWhileStatement',
                body: {
                  type: 'EmptyStatement'
                },
                test: {
                  type: 'Literal',
                  value: false
                }
              },
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'Literal',
                  value: false
                }
              }
            ]
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '{do ; while(false) false}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'DoWhileStatement',
                body: {
                  type: 'EmptyStatement'
                },
                test: {
                  type: 'Literal',
                  value: false
                }
              },
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'Literal',
                  value: false
                }
              }
            ]
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Statements - Do while (pass)', valids);
});
