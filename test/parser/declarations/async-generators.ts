import { Context } from '../../../src/parser/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Async Generators', () => {
  const inValids: Array<[string, Context]> = [
    ['async function *f(a, a) {}', Context.Strict],
    ['(async function *f(a, a) {})', Context.Strict],
    ['(async function *f(a, a) {})', Context.Strict],
    ['(async function *f(a, a) {})', Context.Strict],
    ['(async function *f(a, a) {})', Context.Strict],
    ['(async function *f(a, a) {})', Context.Strict],
    ['(async function *f(a, a) {})', Context.Strict]
    //  ['await: ;', Context.Strict],
  ];

  fail('Expressions - Async Generators', inValids);

  // valid tests

  const valids: Array<[string, Context, any]> = [
    [
      'async function f(){ await x; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AwaitExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'x'
                    }
                  }
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
        ]
      }
    ],
    [
      'async function f(){}\nfoo',
      Context.Empty,
      {
        body: [
          {
            async: true,
            body: {
              body: [],
              type: 'BlockStatement'
            },
            expression: false,
            generator: false,
            id: {
              name: 'f',
              type: 'Identifier'
            },
            params: [],
            type: 'FunctionDeclaration'
          },
          {
            expression: {
              name: 'foo',
              type: 'Identifier'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'async function f() { return await foo; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ReturnStatement',
                  argument: {
                    type: 'AwaitExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  }
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
        ]
      }
    ],
    [
      'async function *f() { return await foo; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ReturnStatement',
                  argument: {
                    type: 'AwaitExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  }
                }
              ]
            },
            async: true,
            generator: true,
            expression: false,
            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        ]
      }
    ],
    /*  ['async function as(){ async function f(yield) {} }', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "FunctionDeclaration",
          "params": [],
          "body": {
            "type": "BlockStatement",
            "body": [
              {
                "type": "FunctionDeclaration",
                "params": [
                  {
                    "type": "Identifier",
                    "name": "yield"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": true,
                "generator": false,
                "expression": false,
                "id": {
                  "type": "Identifier",
                  "name": "f"
                }
              }
            ]
          },
          "async": true,
          "generator": false,
          "expression": false,
          "id": {
            "type": "Identifier",
            "name": "as"
          }
        }
      ]
    }], */
    [
      'x=async function *f(){ var f }',
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
                generator: true,
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
      'x=async function *f(){ let f }',
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
                generator: true,
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

  pass('Expressions - Async Generators (pass)', valids);
});
