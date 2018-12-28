import { Context } from '../../../src/parser/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Unary', () => {
  // valid tests

  const valids: Array<[string, Context, any]> = [
    [
      'typeof async ()',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'typeof',
              argument: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'async'
                },
                arguments: []
              },
              prefix: true
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'typeof async function(){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'typeof',
              argument: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                generator: false,
                expression: false,
                async: true
              },
              prefix: true
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let x = typeof async \n (x)',
      Context.Empty,
      {
        body: [
          {
            declarations: [
              {
                id: {
                  name: 'x',
                  type: 'Identifier'
                },
                init: {
                  argument: {
                    arguments: [
                      {
                        name: 'x',
                        type: 'Identifier'
                      }
                    ],
                    callee: {
                      name: 'async',
                      type: 'Identifier'
                    },
                    type: 'CallExpression'
                  },
                  operator: 'typeof',
                  prefix: true,
                  type: 'UnaryExpression'
                },
                type: 'VariableDeclarator'
              }
            ],
            kind: 'let',
            type: 'VariableDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'delete async',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'delete',
              argument: {
                type: 'Identifier',
                name: 'async'
              },
              prefix: true
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'delete async ()',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'delete',
              argument: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'async'
                },
                arguments: []
              },
              prefix: true
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'delete x.y',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'delete',
              argument: {
                type: 'MemberExpression',
                computed: false,
                object: {
                  type: 'Identifier',
                  name: 'x'
                },
                property: {
                  type: 'Identifier',
                  name: 'y'
                }
              },
              prefix: true
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'delete async function(){}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'delete',
              argument: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                generator: false,
                expression: false,
                async: true
              },
              prefix: true
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'typeof async',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'typeof',
              argument: {
                type: 'Identifier',
                name: 'async'
              },
              prefix: true
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Expressions - New (pass)', valids);
});
