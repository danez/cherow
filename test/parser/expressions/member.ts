import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Member', () => {
  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'foo.bar',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'foo'
              },
              property: {
                type: 'Identifier',
                name: 'bar'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'a().b',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'a'
                },
                arguments: []
              },
              property: {
                type: 'Identifier',
                name: 'b'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'a[b, c]',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              computed: true,
              object: {
                type: 'Identifier',
                name: 'a'
              },
              property: {
                type: 'SequenceExpression',
                expressions: [
                  {
                    type: 'Identifier',
                    name: 'b'
                  },
                  {
                    type: 'Identifier',
                    name: 'c'
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
      '(a[b]||(c[d]=e))',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'LogicalExpression',
              operator: '||',
              left: {
                type: 'MemberExpression',
                computed: true,
                object: {
                  type: 'Identifier',
                  name: 'a'
                },
                property: {
                  type: 'Identifier',
                  name: 'b'
                }
              },
              right: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'MemberExpression',
                  computed: true,
                  object: {
                    type: 'Identifier',
                    name: 'c'
                  },
                  property: {
                    type: 'Identifier',
                    name: 'd'
                  }
                },
                right: {
                  type: 'Identifier',
                  name: 'e'
                }
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'a&&(b=c)&&(d=e)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'LogicalExpression',
              operator: '&&',
              left: {
                type: 'LogicalExpression',
                operator: '&&',
                left: {
                  type: 'Identifier',
                  name: 'a'
                },
                right: {
                  type: 'AssignmentExpression',
                  operator: '=',
                  left: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'c'
                  }
                }
              },
              right: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'Identifier',
                  name: 'd'
                },
                right: {
                  type: 'Identifier',
                  name: 'e'
                }
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'a.if',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'a'
              },
              property: {
                type: 'Identifier',
                name: 'if'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'a.false',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'a'
              },
              property: {
                type: 'Identifier',
                name: 'false'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'set.push(existing);',
      Context.Empty,
      {
        type: 'Program',
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
                  name: 'set'
                },
                property: {
                  type: 'Identifier',
                  name: 'push'
                }
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'existing'
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'a[b, c]',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              computed: true,
              object: {
                type: 'Identifier',
                name: 'a'
              },
              property: {
                type: 'SequenceExpression',
                expressions: [
                  {
                    type: 'Identifier',
                    name: 'b'
                  },
                  {
                    type: 'Identifier',
                    name: 'c'
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
      'a.$._.B0',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'MemberExpression',
                computed: false,
                object: {
                  type: 'MemberExpression',
                  computed: false,
                  object: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  property: {
                    type: 'Identifier',
                    name: '$'
                  }
                },
                property: {
                  type: 'Identifier',
                  name: '_'
                }
              },
              property: {
                type: 'Identifier',
                name: 'B0'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Expressions - Member (pass)', valids);
});
