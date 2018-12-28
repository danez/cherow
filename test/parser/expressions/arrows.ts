import { Context } from '../../../src/parser/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Arrows', () => {
  const inValids: Array<[string, Context]> = [
    // Duplicate arrow function args

    ['(a, a) => {}', Context.Empty],
    ['(a, b, a) => {}', Context.Empty],
    ['(b, a, a) => {}', Context.Empty],
    ['(a, a, b) => {}', Context.Empty],
    ['(b, a, b, a) => {}', Context.Empty],
    ['(b, a, b, a = x) => {}', Context.Empty],
    ['(a, {a}) => {}', Context.Empty],
    ['(a, {a:a}) => {}', Context.Empty],

    // ['([a,b,c]) => { const c = x; }', Context.Empty],
    // ['([a,b,c]) => { var c }', Context.Empty],
    ['x => { function x() {} }', Context.Empty],
    ['(a, {a:a}) => {}', Context.Empty],
    ['(a, {a:a}) => {}', Context.Empty],
    ['(a, {a:a}) => {}', Context.Empty],
    ['(a, {a:a}) => {}', Context.Empty],
    ['(a, {a:a}) => {}', Context.Empty],
    ['(a, {a:a}) => {}', Context.Empty],
    ['(a, {a:a}) => {}', Context.Empty],

    // ['([a, a]) => {}', Context.Empty],
    // ['([a, b, a]) => {}', Context.Empty],
    // ['([b, a, a]) => {}', Context.Empty],
    // ['([a, a, b]) => {}', Context.Empty],
    // ['([b, a, b, a]) => {}', Context.Empty],
    // ['([b, a], b) => {}', Context.Empty],
    // ['([b, a], {b}) => {}', Context.Empty],
    // ['([b, a], b=x) => {}', Context.Empty],
    // ['([b, a], ...b) => {}', Context.Empty],
    // ['([b, a], b=x) => {}', Context.Empty],

    // Rest element
    ['(a, ...a) => {}', Context.Empty],

    // General

    ['(x) => { let x }', Context.Empty],
    ['(x) => { const x = 1; }', Context.Empty],
    ['(x) => { const x }', Context.Empty]
  ];

  fail('Expressions - Functions', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      `(a, ...b) => {}`,
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              id: null,
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'RestElement',
                  argument: {
                    type: 'Identifier',
                    name: 'b'
                  }
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
      `(...a) => {}`,
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              id: null,
              params: [
                {
                  type: 'RestElement',
                  argument: {
                    type: 'Identifier',
                    name: 'a'
                  }
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
      '(a) => {}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              id: null,
              async: false,
              generator: false,
              expression: false
            }
          }
        ]
      }
    ],
    [
      '(a = 1) => {}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  right: {
                    type: 'Literal',
                    value: 1
                  }
                }
              ],
              id: null,
              async: false,
              generator: false,
              expression: false
            }
          }
        ]
      }
    ],
    [
      '(x) => { var x; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
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
                          name: 'x'
                        }
                      }
                    ]
                  }
                ]
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'x'
                }
              ],
              id: null,
              async: false,
              generator: false,
              expression: false
            }
          }
        ]
      }
    ],
    [
      '(x) => { function x() {} }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
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
                      name: 'x'
                    }
                  }
                ]
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'x'
                }
              ],
              id: null,
              async: false,
              generator: false,
              expression: false
            }
          }
        ]
      }
    ]
  ];

  pass('Expressions - Arrows (pass)', valids);
});
