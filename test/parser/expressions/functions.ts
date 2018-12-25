import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/parser';

describe('Expressions - Functions', () => {
  const inValids: Array<[string, Context]> = [
    // Duplicate function args in strct mode

    ['(function f(a, a) {})', Context.Strict],
    ['(function f(a, b, a) {})', Context.Strict],
    ['(function f(b, a, a) {})', Context.Strict],
    ['(function f(a, a, b) {})', Context.Strict],
    ['(function f(b, a, b, a) {})', Context.Strict],
    ['(function f(b, a, b, a = x) {})', Context.Strict],

    // Duplicate function args with explicit directive

    ['(function f(a, a) {"use strict";})', Context.Empty],
    ['(function f(a, b, a) {"use strict";})', Context.Empty],
    ['(function f(b, a, a) {"use strict";})', Context.Empty],
    ['(function f(a, a, b) {"use strict";})', Context.Empty],
    ['(function f(b, a, b, a) {"use strict";})', Context.Empty],
    ['(function f(b, a, b, a = x) {"use strict";})', Context.Empty],

    ['(function eval() {"use strict";})', Context.Empty],

    // General
    // ['"use strict"; (function eval(){})', Context.Empty],
    // ['"use strict"; (function eval(){})', Context.Empty],

    ['(function arguments(){ "use strict"; })', Context.Empty],
    ['(function arguments(){ "use strict"; })', Context.Empty]
    // ['(function f(x) { let x })', Context.Empty],

    // Future reserved words
    //['(function package() {})', Context.Strict],
    //['(function package() {})', Context.Strict | Context.Module],
    // ['(function package() {"use strict";})', Context.Empty],
  ];

  fail('Expressions - Functions', inValids);

  for (const arg of [
    '{ x: y }',
    '{ x, }',
    '{ x: y = 33 }',
    '{ fn = function () {}, xFn = function x() {} }',
    '{ cover = (function () {}), xCover = (1, function() {})  }',
    '{ arrow = () => {} }',
    '{}',
    '{ x: y } = { x: 23 }',
    '{ poisoned: x = ++initEvalCount } = poisonedProperty',
    '{ w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }',
    '{ x, } = { x: 23 }',
    '[,] = g()',
    '[{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = []',
    '[{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]',
    '[{ x, y, z } = { x: 44, y: 55, z: 66 }] = []',
    '[x = 23] = [,]',
    '[[...x] = [2, 1, 3]] = []',
    '[[x, y, z] = [4, 5, 6]] = []',
    '[ , , ...x]',
    '[, ...x]',
    '[,]',
    '[{ x }]',
    '[{ x }]',
    '[{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }]',
    '[ a = b ]',
    '[x = 23]',
    '[[] = function() { a += 1; }()]',
    'x = args = arguments'
  ]) {
    it(`(function(${arg}) {})`, () => {
      t.doesNotThrow(() => {
        parseSource(`(function(${arg}) {})`, undefined, Context.Empty);
      });
    });
  }

  for (const arg of [
    '(function([[,] = function* g() {}]) {})',
    '(function([cover = (function () {}), xCover = (1, function() {})]) {})',
    '(function([fn = function () {}, xFn = function x() {}]) {})',
    '(function([x = 23]) {})',
    '(function([...[x, y, z]]) {})',
    '(function([...[,]]) {})',
    '(function([...x]) {})',
    '(function([...{ length }]) {})',
    '(function([x = 23] = [undefined]) {})',
    '(function([{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = [{ u: 777, w: 888, y: 999 }]) {})',
    '(function({} = null) {})'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
      });
    });
  }
  // valid tests

  const valids: Array<[string, Context, any]> = [
    [
      '(function package() { (function gave_away_the_package() { "use strict"; }) })',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              id: {
                type: 'Identifier',
                name: 'package'
              },
              params: [],
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'FunctionExpression',
                      id: {
                        type: 'Identifier',
                        name: 'gave_away_the_package'
                      },
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'Literal',
                              value: 'use strict'
                            }
                          }
                        ]
                      },
                      generator: false,
                      expression: false,
                      async: false
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
      '(function (eval) { (function () { "use strict"; })})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              id: null,
              params: [
                {
                  type: 'Identifier',
                  name: 'eval'
                }
              ],
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'Literal',
                              value: 'use strict'
                            }
                          }
                        ]
                      },
                      generator: false,
                      expression: false,
                      async: false
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
      `if (a && b) {
  c.d(this.e, (ctx) => a.b(this, void 1, void 1, function* () {
    return a
  }));
}`,
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'IfStatement',
            test: {
              type: 'LogicalExpression',
              operator: '&&',
              left: {
                type: 'Identifier',
                name: 'a'
              },
              right: {
                type: 'Identifier',
                name: 'b'
              }
            },
            consequent: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CallExpression',
                    callee: {
                      type: 'MemberExpression',
                      computed: false,
                      object: {
                        type: 'Identifier',
                        name: 'c'
                      },
                      property: {
                        type: 'Identifier',
                        name: 'd'
                      }
                    },
                    arguments: [
                      {
                        type: 'MemberExpression',
                        computed: false,
                        object: {
                          type: 'ThisExpression'
                        },
                        property: {
                          type: 'Identifier',
                          name: 'e'
                        }
                      },
                      {
                        type: 'ArrowFunctionExpression',
                        id: null,
                        params: [
                          {
                            type: 'Identifier',
                            name: 'ctx'
                          }
                        ],
                        body: {
                          type: 'CallExpression',
                          callee: {
                            type: 'MemberExpression',
                            computed: false,
                            object: {
                              type: 'Identifier',
                              name: 'a'
                            },
                            property: {
                              type: 'Identifier',
                              name: 'b'
                            }
                          },
                          arguments: [
                            {
                              type: 'ThisExpression'
                            },
                            {
                              type: 'UnaryExpression',
                              operator: 'void',
                              argument: {
                                type: 'Literal',
                                value: 1
                              },
                              prefix: true
                            },
                            {
                              type: 'UnaryExpression',
                              operator: 'void',
                              argument: {
                                type: 'Literal',
                                value: 1
                              },
                              prefix: true
                            },
                            {
                              type: 'FunctionExpression',
                              id: null,
                              params: [],
                              body: {
                                type: 'BlockStatement',
                                body: [
                                  {
                                    type: 'ReturnStatement',
                                    argument: {
                                      type: 'Identifier',
                                      name: 'a'
                                    }
                                  }
                                ]
                              },
                              generator: true,
                              expression: false,
                              async: false
                            }
                          ]
                        },
                        generator: false,
                        expression: true,
                        async: false
                      }
                    ]
                  }
                }
              ]
            },
            alternate: null
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'x=function f(){ var f }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              right: {
                type: 'FunctionExpression',
                id: {
                  type: 'Identifier',
                  name: 'f'
                },
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'VariableDeclaration',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          id: {
                            type: 'Identifier',
                            name: 'f'
                          },
                          init: null
                        }
                      ],
                      kind: 'var'
                    }
                  ]
                },
                generator: false,
                expression: false,
                async: false
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'x=function f(){ let f }',
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
                async: false,
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
      'foo(function f(){})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'foo'
              },
              arguments: [
                {
                  type: 'FunctionExpression',
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
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'foo(function f(){})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'foo'
              },
              arguments: [
                {
                  type: 'FunctionExpression',
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
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let f = function await() {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'f'
                },
                init: {
                  type: 'FunctionExpression',
                  id: {
                    type: 'Identifier',
                    name: 'await'
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
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(yield) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'Identifier',
                name: 'yield'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,
            expression: false,
            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(await) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'Identifier',
                name: 'await'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,
            expression: false,
            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let f = function f(yield) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'f'
                },
                init: {
                  type: 'FunctionExpression',
                  id: {
                    type: 'Identifier',
                    name: 'f'
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'yield'
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  generator: false,
                  expression: false,
                  async: false
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(function(a, a) {})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              id: null,
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
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
      '(function eval() {})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              id: {
                type: 'Identifier',
                name: 'eval'
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
          }
        ],
        sourceType: 'script'
      }
    ]
    //['function(a, a) {"use strict"}', Context.Empty, {}]
  ];

  pass('Expressions - Functions (pass)', valids);
});
