import { Context } from '../../../src/parser/common';
import { pass, fail } from '../../test-utils';

describe('Declarations - Const', () => {
  const inValids: Array<[string, Context]> = [
    // Bindings

    ['const a = b, a = c', Context.Empty],
    ['const a = b; const a = c', Context.Empty],
    ['let a = b; const a = c', Context.Empty],
    ['const a = b; let a = c', Context.Empty],
    ['const x = a; const x = b;', Context.Empty],
    ['let x = a; const x = b;', Context.Empty],
    ['var x = a; const x = b;', Context.Empty],

    // Bindings - Blockstatement

    ['const x; { let x; var y; }', Context.Empty],
    ['{ const f = a; let f; }', Context.Empty],
    ['{ const f = a; function f() {} }', Context.Empty],

    // General

    ['const a', Context.Empty],
    ['const a, b, c', Context.Empty],
    ['const a, b = c', Context.Empty],
    ['const class = foo', Context.Empty],
    ['const break = foo', Context.Empty],

    ['const x = 1, y;', Context.Empty],
    ['const x, y = 1;', Context.Empty],
    ['label: const x = 1;', Context.Empty],
    ['switch (true) { case true: const x; }', Context.Empty],
    ['label: const x;', Context.Empty],
    ['while (false) const x;', Context.Empty],
    ['while (false) const x = 1;', Context.Empty],
    ['const break = foo', Context.Empty],
    ['for (;false;) const x;', Context.Empty],
    ['if (true) {} else const x;', Context.Empty]
  ];

  fail('Declarations - Const (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'switch (true) { default: const x = 1; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Literal',
              value: true
            },
            cases: [
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'const',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Literal',
                          value: 1
                        },
                        id: {
                          type: 'Identifier',
                          name: 'x'
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    [
      `const x = "outer_x";
     const y = "outer_y";
     var i = 1;
     
     for (const x = "inner_x"; i < 1; i++) {
       const y = "inner_y";
     }`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'const',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Literal',
                  value: 'outer_x'
                },
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          },
          {
            type: 'VariableDeclaration',
            kind: 'const',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Literal',
                  value: 'outer_y'
                },
                id: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ]
          },
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Literal',
                  value: 1
                },
                id: {
                  type: 'Identifier',
                  name: 'i'
                }
              }
            ]
          },
          {
            type: 'ForStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'VariableDeclaration',
                  kind: 'const',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: {
                        type: 'Literal',
                        value: 'inner_y'
                      },
                      id: {
                        type: 'Identifier',
                        name: 'y'
                      }
                    }
                  ]
                }
              ]
            },
            init: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 'inner_x'
                  },
                  id: {
                    type: 'Identifier',
                    name: 'x'
                  }
                }
              ]
            },
            test: {
              type: 'BinaryExpression',
              left: {
                type: 'Identifier',
                name: 'i'
              },
              right: {
                type: 'Literal',
                value: 1
              },
              operator: '<'
            },
            update: {
              type: 'UpdateExpression',
              argument: {
                type: 'Identifier',
                name: 'i'
              },
              operator: '++',
              prefix: false
            }
          }
        ]
      }
    ],
    [
      'const foo = bar;',
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
                  name: 'foo'
                },
                init: {
                  type: 'Identifier',
                  name: 'bar'
                }
              }
            ],
            kind: 'const'
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Declarations - Const (pass)', valids);
});
