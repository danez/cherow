import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Continue', () => {
  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'while (true) { continue }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'WhileStatement',
            test: {
              type: 'Literal',
              value: true
            },
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ContinueStatement',
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
      'done: while (true) { continue done }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'done'
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
                    type: 'ContinueStatement',
                    label: {
                      type: 'Identifier',
                      name: 'done'
                    }
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `a: while (1) { continue \n b; }`,
      Context.Empty,
      {
        body: [
          {
            body: {
              body: {
                body: [
                  {
                    label: null,
                    type: 'ContinueStatement'
                  },
                  {
                    expression: {
                      name: 'b',
                      type: 'Identifier'
                    },
                    type: 'ExpressionStatement'
                  }
                ],
                type: 'BlockStatement'
              },
              test: {
                type: 'Literal',
                value: 1
              },
              type: 'WhileStatement'
            },
            label: {
              name: 'a',
              type: 'Identifier'
            },
            type: 'LabeledStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `a: while (1) { continue /*\r*/ b; }`,
      Context.Empty,
      {
        body: [
          {
            body: {
              body: {
                body: [
                  {
                    label: null,
                    type: 'ContinueStatement'
                  },
                  {
                    expression: {
                      name: 'b',
                      type: 'Identifier'
                    },
                    type: 'ExpressionStatement'
                  }
                ],
                type: 'BlockStatement'
              },
              test: {
                type: 'Literal',
                value: 1
              },
              type: 'WhileStatement'
            },
            label: {
              name: 'a',
              type: 'Identifier'
            },
            type: 'LabeledStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `a: do continue a; while(1);`,
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
              type: 'DoWhileStatement',
              body: {
                type: 'ContinueStatement',
                label: {
                  type: 'Identifier',
                  name: 'a'
                }
              },
              test: {
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

  pass('Statements - Continue (pass)', valids);
});
