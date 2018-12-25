import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Labeled', () => {
  const inValids: Array<[string, Context]> = [
    ['break: x', Context.OptionDisablesWebCompat],
    ['throw: x', Context.OptionDisablesWebCompat],
    ['debugger: x', Context.OptionDisablesWebCompat],
    ['with: x', Context.OptionDisablesWebCompat],
    ['await: x', Context.Module]
  ];

  fail('Statements - Labeled (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'L: let\nx',
      Context.Empty,
      {
        body: [
          {
            body: {
              expression: {
                name: 'let',
                type: 'Identifier'
              },
              type: 'ExpressionStatement'
            },
            label: {
              name: 'L',
              type: 'Identifier'
            },
            type: 'LabeledStatement'
          },
          {
            expression: {
              name: 'x',
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
      'start: while (true) break start',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'start'
            },
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Literal',
                value: true
              },
              body: {
                type: 'BreakStatement',
                label: {
                  type: 'Identifier',
                  name: 'start'
                }
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '__proto__: test',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: '__proto__'
            },
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'test'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '__proto__: while (true) { break __proto__; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: '__proto__'
            },
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Literal',
                value: true
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'BreakStatement',
                    label: {
                      type: 'Identifier',
                      name: '__proto__'
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    ],
    /*  ['`"use strict"; arguments: while (true) break arguments', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "Literal",
          "value": "use strict"
        },
        "directive": "use strict"
      },
      {
        "type": "LabeledStatement",
        "label": {
          "type": "Identifier",
          "name": "arguments"
        },
        "body": {
          "type": "WhileStatement",
          "test": {
            "type": "Literal",
            "value": true
          },
          "body": {
            "type": "BreakStatement",
            "label": {
              "type": "Identifier",
              "name": "arguments"
            }
          }
        }
      }
    ]
  }],*/
    [
      'a: function foo() {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'a'
            },
            body: {
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
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'a:{break a;}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'a'
            },
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'BreakStatement',
                  label: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'await: x',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'await'
            },
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'x'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'async: await',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'async'
            },
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'await'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Statements - Labeled (pass)', valids);
});
