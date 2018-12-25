import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Block', () => {
  const inValids: Array<[string, Context]> = [
    // Duplicate function args in strct mode

    ['{ if (x) function f() {} ; function f() {} }', Context.Strict],
    ['{ function f() {} ; function f() {} }', Context.Strict],
    ['function f(){ var f = 123; if (a) function f(){} }', Context.Strict],
    ['{ var f = 123; if (a) function f(){} }', Context.OptionDisablesWebCompat],
    [
      '{ var f = 123; if (abc) function f(){} }',
      Context.OptionDisablesWebCompat
    ],
    ['(function f(b, a, b, a = x) {})', Context.Strict]
  ];

  fail('Expressions - Functions', inValids);
  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      '{ a(); bt(); }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  arguments: []
                }
              },
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'bt'
                  },
                  arguments: []
                }
              }
            ]
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '{ var {foo=3} = {}; };',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'VariableDeclaration',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
                            type: 'Identifier',
                            name: 'foo'
                          },
                          computed: false,
                          value: {
                            type: 'AssignmentPattern',
                            left: {
                              type: 'Identifier',
                              name: 'foo'
                            },
                            right: {
                              type: 'Literal',
                              value: 3
                            }
                          },
                          kind: 'init',
                          method: false,
                          shorthand: true
                        }
                      ]
                    },
                    init: {
                      type: 'ObjectExpression',
                      properties: []
                    }
                  }
                ],
                kind: 'var'
              }
            ]
          },
          {
            type: 'EmptyStatement'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '{ var foo = 1; }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'VariableDeclaration',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    init: {
                      type: 'Literal',
                      value: 1
                    }
                  }
                ],
                kind: 'var'
              }
            ]
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '{ function foo() {}; };',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'FunctionDeclaration',
                id: {
                  type: 'Identifier',
                  name: 'foo'
                },
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                generator: false,
                expression: false,
                async: false
              },
              {
                type: 'EmptyStatement'
              }
            ]
          },
          {
            type: 'EmptyStatement'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '{ function f() {} ; function f() {} }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                async: false,
                generator: false,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'f'
                }
              },
              {
                type: 'EmptyStatement'
              },
              {
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                async: false,
                generator: false,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'f'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '{ if (x) function f() {} ; function f() {} }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'IfStatement',
                test: {
                  type: 'Identifier',
                  name: 'x'
                },
                consequent: {
                  type: 'FunctionDeclaration',
                  id: {
                    type: 'Identifier',
                    name: 'f'
                  },
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  generator: false,
                  expression: false,
                  async: false
                },
                alternate: null
              },
              {
                type: 'EmptyStatement'
              },
              {
                type: 'FunctionDeclaration',
                id: {
                  type: 'Identifier',
                  name: 'f'
                },
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: []
                },
                generator: false,
                expression: false,
                async: false
              }
            ]
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '{ var f = 123; if (abc) function f(){} }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'VariableDeclaration',
                kind: 'var',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    init: {
                      type: 'Literal',
                      value: 123
                    },
                    id: {
                      type: 'Identifier',
                      name: 'f'
                    }
                  }
                ]
              },
              {
                type: 'IfStatement',
                test: {
                  type: 'Identifier',
                  name: 'abc'
                },
                consequent: {
                  type: 'FunctionDeclaration',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  async: false,
                  generator: false,
                  expression: false,
                  id: {
                    type: 'Identifier',
                    name: 'f'
                  }
                },
                alternate: null
              }
            ]
          }
        ]
      }
    ],
    [
      '1 + 1',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              operator: '+',
              left: {
                type: 'Literal',
                value: 1
              },
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Statements - Block (pass)', valids);
});
