import { Context } from '../../../src/parser/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Async Functions', () => {
  const inValids: Array<[string, Context]> = [
    ['(async function f(a, a) {})', Context.Strict]
    /*  ['x={async *f(){ let f }}', Context.Empty],
    ['(async function f(a, a) {})', Context.Empty],
    ['(async function f(a, a) {})', Context.Empty],
    ['(async function f(a, a) {})', Context.Empty],
    ['(async function f(a, a) {})', Context.Empty],
    ['(async function f(a, a) {})', Context.Empty],
    ['(async function f(a, a) {})', Context.Empty],*/
  ];

  fail('Expressions - Async Functions', inValids);

  // valid tests

  const valids: Array<[string, Context, any]> = [
    [
      'x=async function f(){ var f }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '=',
              right: {
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'VariableDeclaration',
                      kind: 'var',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'f'
                          }
                        }
                      ]
                    }
                  ]
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'f'
                }
              }
            }
          }
        ]
      }
    ],
    [
      '(async function foo(a, b = 39,) { })',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  right: {
                    type: 'Literal',
                    value: 39
                  }
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: false,
              expression: false,
              id: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      '(async function foo(_ = (function() {}())) { })',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: '_'
                  },
                  right: {
                    type: 'CallExpression',
                    callee: {
                      type: 'FunctionExpression',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      async: false,
                      generator: false,
                      expression: false,
                      id: null
                    },
                    arguments: []
                  }
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: false,
              expression: false,
              id: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      '(async function foo(x = x) { })',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'x'
                  }
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: false,
              expression: false,
              id: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      'x=async function f(){ let f }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '=',
              right: {
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'VariableDeclaration',
                      kind: 'let',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'f'
                          }
                        }
                      ]
                    }
                  ]
                },
                async: true,
                generator: false,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'f'
                }
              }
            }
          }
        ]
      }
    ]
  ];

  pass('Expressions - Async Functions (pass)', valids);
});
