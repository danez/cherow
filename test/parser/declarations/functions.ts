import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Declarations - Functions', () => {
  const inValids: Array<[string, Context]> = [
    // Acorn

    ['let foo = 1; function x(foo) {} { var foo = 1; }', Context.Empty],
    ['var foo = 1; function x() {} let foo = 1;', Context.Empty],

    // Duplicate function args in strct mode

    ['function f(a, a) {}', Context.Strict],
    ['function f(a, b, a) {}', Context.Strict],
    ['function f(b, a, a) {}', Context.Strict],
    ['function f(a, a, b) {}', Context.Strict],
    ['function f(b, a, b, a) {}', Context.Strict],
    ['function f(b, a, b, a = x) {}', Context.Strict],

    // General

    ['let x = a; function x(){};', Context.Empty],
    ['const x = a; function x(){};', Context.Empty],
    ['"use strict"; function eval(){}', Context.Strict],
    ['const x = a; function x(){};', Context.Empty],

    // ['function f([b, a], b) {}', Context.Empty],
    // ['function f([b, a], {b}) {}', Context.Empty],
    // ['function f([b, a], b=x) {}', Context.Empty],
    // ['function f([b, a, b, a]) {}', Context.Empty],
    // ['function f([a, a, b]) {}', Context.Empty],
    // ['function f([b, a, a]) {}', Context.Empty],
    // ['function f([a, b, a]) {}', Context.Empty],
    // ['function f([a, a]) {}', Context.Empty],
    // ['function f([a, b, a]) {}', Context.Empty],
    // ['function f([a, b, a]) {}', Context.Empty],
    // ['function f([b, a], ...b) {}', Context.Empty],

    // Block scope

    ['{ function f() {} { var f; } }', Context.OptionDisablesWebCompat],
    ['{ function* f() {} function f() {} }', Context.OptionDisablesWebCompat],
    ['{ function f() {} var f; }', Context.OptionDisablesWebCompat],

    // Duplicate function args with explicit directive

    ['function f(a, a) {"use strict"}', Context.Empty],
    ['function f(a, b, a) {"use strict"}', Context.Empty],
    ['function f(b, a, a) {"use strict"}', Context.Empty],
    ['function f(a, a, b) {"use strict"}', Context.Empty],
    ['function f(b, a, b, a) {"use strict"}', Context.Empty],
    ['function f(b, a, b, a = x) {"use strict"}', Context.Empty],
    ['function f(b, a, b, a, [foo]) {"use strict"}', Context.Empty],

    // Duplicate args with locale binding

    ['let x; var x;', Context.Empty],
    ['let x; { var x; }', Context.Empty],
    ['{ var x; } let x;', Context.Empty],

    // General

    ['{ function f(){} function f(){} }', Context.OptionDisablesWebCompat],
    ['function f(x) { let x }', Context.OptionDisablesWebCompat],
    ['function f(x) { const x = y }', Context.Empty],
    ['function f(){ let x; var x; }', Context.Empty],
    ['function f(){ var x; let x; }', Context.Empty],
    ['function f(){ const x = y; var x; }', Context.Empty],
    ['function f(){ var x; const x = y; }', Context.Empty],
    ['function f(){ let x; function x(){} }', Context.Empty],
    ['function f(){ function x(){} let x; }', Context.OptionDisablesWebCompat],
    ['function f(){ const x = y; function x(){} }', Context.Empty],
    [
      'function f(){ function x(){} const x = y; }',
      Context.OptionDisablesWebCompat
    ],
    ['{ function f() {} ; function f() {} }', Context.OptionDisablesWebCompat], // Fails only Without AnnexB
    ['{ function f() {} ; function f() {} }', Context.Strict], // throws if no AnnexB and in strict mode only
    ['{ if (x) function f() {} ; function f() {} }', Context.Strict], // throws if no AnnexB and in strict mode only
    [
      'switch (x) {case a: function f(){}; break; case b: function f(){}; break; }',
      Context.Strict | Context.Module
    ] // throws if no AnnexB and in strict mode only
  ];

  fail('Declarations - Functions (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'function f([foo=a,bar] = x){}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'a'
                      }
                    },
                    {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  ]
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
            generator: false,
            expression: false,
            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([foo,bar=b]){}',
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
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'bar'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'b'
                    }
                  }
                ]
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
      'function f([foo,bar=b] = x){}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'bar'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'b'
                      }
                    }
                  ]
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
            generator: false,
            expression: false,
            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([foo=a,bar=b]){}',
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
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'a'
                    }
                  },
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'bar'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'b'
                    }
                  }
                ]
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
      'function f([foo=a,bar=b] = x){}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'a'
                      }
                    },
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'bar'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'b'
                      }
                    }
                  ]
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
            generator: false,
            expression: false,
            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([a=b=c]){}',
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
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'AssignmentPattern',
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
                  }
                ]
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
      'function f([a=b+=c]){}',
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
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    right: {
                      type: 'AssignmentExpression',
                      operator: '+=',
                      left: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'c'
                      }
                    }
                  }
                ]
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
      'function f([a = b = c] = arr){}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
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
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'arr'
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f({b: []}) {}',
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
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'b'
                    },
                    computed: false,
                    value: {
                      type: 'ArrayPattern',
                      elements: []
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false
                  }
                ]
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
      'function f([{b}]) {}',
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
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'b'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'b'
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true
                      }
                    ]
                  }
                ]
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
      'function f([a, {b: []}]) {}',
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
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'a'
                  },
                  {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'b'
                        },
                        computed: false,
                        value: {
                          type: 'ArrayPattern',
                          elements: []
                        },
                        kind: 'init',
                        method: false,
                        shorthand: false
                      }
                    ]
                  }
                ]
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
      'function fk({x: [a, {b: []}]}) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'fk'
            },
            params: [
              {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    computed: false,
                    value: {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'a'
                        },
                        {
                          type: 'ObjectPattern',
                          properties: [
                            {
                              type: 'Property',
                              key: {
                                type: 'Identifier',
                                name: 'b'
                              },
                              computed: false,
                              value: {
                                type: 'ArrayPattern',
                                elements: []
                              },
                              kind: 'init',
                              method: false,
                              shorthand: false
                            }
                          ]
                        }
                      ]
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false
                  }
                ]
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
      'function f([a, [b], c]) {}',
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
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'a'
                  },
                  {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'b'
                      }
                    ]
                  },
                  {
                    type: 'Identifier',
                    name: 'c'
                  }
                ]
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
      'function f([...bar]){}',
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
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  }
                ]
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
      'function f([...bar] = obj){}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'Identifier',
                        name: 'bar'
                      }
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'obj'
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([foo, ...bar]){}',
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
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  }
                ]
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
      'function f([foo, ...bar] = obj){}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'Identifier',
                        name: 'bar'
                      }
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'obj'
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([...[a, b]]){}',
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
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'a'
                        },
                        {
                          type: 'Identifier',
                          name: 'b'
                        }
                      ]
                    }
                  }
                ]
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
      'function f([...[a, b]] = obj){}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'ArrayPattern',
                        elements: [
                          {
                            type: 'Identifier',
                            name: 'a'
                          },
                          {
                            type: 'Identifier',
                            name: 'b'
                          }
                        ]
                      }
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'obj'
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([x, ...[a, b]]){}',
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
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'x'
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'a'
                        },
                        {
                          type: 'Identifier',
                          name: 'b'
                        }
                      ]
                    }
                  }
                ]
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
      'function f([x, ...[a, b]] = obj){}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'x'
                    },
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'ArrayPattern',
                        elements: [
                          {
                            type: 'Identifier',
                            name: 'a'
                          },
                          {
                            type: 'Identifier',
                            name: 'b'
                          }
                        ]
                      }
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'obj'
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f( [a=[...b], ...c]){}',
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
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    right: {
                      type: 'ArrayExpression',
                      elements: [
                        {
                          type: 'SpreadElement',
                          argument: {
                            type: 'Identifier',
                            name: 'b'
                          }
                        }
                      ]
                    }
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'c'
                    }
                  }
                ]
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
      'function f( [a=[...b], ...c] = obj){}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      right: {
                        type: 'ArrayExpression',
                        elements: [
                          {
                            type: 'SpreadElement',
                            argument: {
                              type: 'Identifier',
                              name: 'b'
                            }
                          }
                        ]
                      }
                    },
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'Identifier',
                        name: 'c'
                      }
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'obj'
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){foo}',
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
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Identifier',
                    name: 'foo'
                  }
                }
              ]
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
      'function f([ x ]) {}',
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
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'x'
                  }
                ]
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
      'function f([foo], b){}',
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
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'foo'
                  }
                ]
              },
              {
                type: 'Identifier',
                name: 'b'
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
      'function f([foo] = x, b){}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'Identifier',
                name: 'b'
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
      'function f([foo], b = y){}',
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
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'foo'
                  }
                ]
              },
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'Identifier',
                  name: 'b'
                },
                right: {
                  type: 'Identifier',
                  name: 'y'
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([foo] = x, b = y){}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'Identifier',
                  name: 'b'
                },
                right: {
                  type: 'Identifier',
                  name: 'y'
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(x, [foo]){}',
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
                name: 'x'
              },
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'foo'
                  }
                ]
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
      'function f(x = y, [foo]){}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'Identifier',
                  name: 'x'
                },
                right: {
                  type: 'Identifier',
                  name: 'y'
                }
              },
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'foo'
                  }
                ]
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
      'function f([foo=a] = c){}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'a'
                      }
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'c'
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([,foo]){}',
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
                type: 'ArrayPattern',
                elements: [
                  null,
                  {
                    type: 'Identifier',
                    name: 'foo'
                  }
                ]
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
      'function f([,foo]){}',
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
                type: 'ArrayPattern',
                elements: [
                  null,
                  {
                    type: 'Identifier',
                    name: 'foo'
                  }
                ]
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
      'function f({ x : y = 1 }) {}',
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
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    computed: false,
                    value: {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'y'
                      },
                      right: {
                        type: 'Literal',
                        value: 1
                      }
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false
                  }
                ]
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
      'function f([a = 1]) {}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'ArrayPattern',
                elements: [
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
                ]
              }
            ],
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
    ],
    [
      'function f([ x = y ] = []) {}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'y'
                      }
                    }
                  ]
                },
                right: {
                  type: 'ArrayExpression',
                  elements: []
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([,] = "icefapper") {}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [null]
                },
                right: {
                  type: 'Literal',
                  value: 'icefapper'
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f([,] = null) {}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [null]
                },
                right: {
                  type: 'Literal',
                  value: null
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
        ],
        sourceType: 'script'
      }
    ],

    [
      'function f([[x]] = 1) {}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'x'
                        }
                      ]
                    }
                  ]
                },
                right: {
                  type: 'Literal',
                  value: 1
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f15({a = () => b}, {b}) { return a() }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f15'
            },
            params: [
              {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    computed: false,
                    value: {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      right: {
                        type: 'ArrowFunctionExpression',
                        id: null,
                        params: [],
                        body: {
                          type: 'Identifier',
                          name: 'b'
                        },
                        generator: false,
                        expression: true,
                        async: false
                      }
                    },
                    kind: 'init',
                    method: false,
                    shorthand: true
                  }
                ]
              },
              {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'b'
                    },
                    computed: false,
                    value: {
                      type: 'Identifier',
                      name: 'b'
                    },
                    kind: 'init',
                    method: false,
                    shorthand: true
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ReturnStatement',
                  argument: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    arguments: []
                  }
                }
              ]
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
      'function f1({x}) { var x = 2; return x }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f1'
            },
            params: [
              {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    computed: false,
                    value: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    kind: 'init',
                    method: false,
                    shorthand: true
                  }
                ]
              }
            ],
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
                        name: 'x'
                      },
                      init: {
                        type: 'Literal',
                        value: 2
                      }
                    }
                  ],
                  kind: 'var'
                },
                {
                  type: 'ReturnStatement',
                  argument: {
                    type: 'Identifier',
                    name: 'x'
                  }
                }
              ]
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
      'function f10({x}, y) { var y; return y }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f10'
            },
            params: [
              {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    computed: false,
                    value: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    kind: 'init',
                    method: false,
                    shorthand: true
                  }
                ]
              },
              {
                type: 'Identifier',
                name: 'y'
              }
            ],
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
                        name: 'y'
                      },
                      init: null
                    }
                  ],
                  kind: 'var'
                },
                {
                  type: 'ReturnStatement',
                  argument: {
                    type: 'Identifier',
                    name: 'y'
                  }
                }
              ]
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
      'function f7({a: x}) { x = 2; return arguments[1].a }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f7'
            },
            params: [
              {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    computed: false,
                    value: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false
                  }
                ]
              }
            ],
            body: {
              type: 'BlockStatement',
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
                      type: 'Literal',
                      value: 2
                    }
                  }
                },
                {
                  type: 'ReturnStatement',
                  argument: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                      type: 'MemberExpression',
                      computed: true,
                      object: {
                        type: 'Identifier',
                        name: 'arguments'
                      },
                      property: {
                        type: 'Literal',
                        value: 1
                      }
                    },
                    property: {
                      type: 'Identifier',
                      name: 'a'
                    }
                  }
                }
              ]
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
      'try {throw {foo: 1, bar: 2}} catch({foo}) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ThrowStatement',
                  argument: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'foo'
                        },
                        computed: false,
                        value: {
                          type: 'Literal',
                          value: 1
                        },
                        kind: 'init',
                        method: false,
                        shorthand: false
                      },
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'bar'
                        },
                        computed: false,
                        value: {
                          type: 'Literal',
                          value: 2
                        },
                        kind: 'init',
                        method: false,
                        shorthand: false
                      }
                    ]
                  }
                }
              ]
            },
            handler: {
              type: 'CatchClause',
              param: {
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
                      type: 'Identifier',
                      name: 'foo'
                    },
                    kind: 'init',
                    method: false,
                    shorthand: true
                  }
                ]
              },
              body: {
                type: 'BlockStatement',
                body: []
              }
            },
            finalizer: null
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f({ x : y = 10 }) {}',
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
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    computed: false,
                    value: {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'y'
                      },
                      right: {
                        type: 'Literal',
                        value: 10
                      }
                    },
                    kind: 'init',
                    method: false,
                    shorthand: false
                  }
                ]
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
      'function f(a = { x = 1 } = value) {}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'Identifier',
                  name: 'a'
                },
                right: {
                  type: 'AssignmentExpression',
                  operator: '=',
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'Identifier',
                            name: 'x'
                          },
                          right: {
                            type: 'Literal',
                            value: 1
                          }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true
                      }
                    ]
                  },
                  right: {
                    type: 'Identifier',
                    name: 'value'
                  }
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
        ],
        sourceType: 'script'
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
      'function f([]){ var a }',
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
                type: 'ArrayPattern',
                elements: []
              }
            ],
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
                        name: 'a'
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f({}){ var a }',
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
                type: 'ObjectPattern',
                properties: []
              }
            ],
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
                        name: 'a'
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(a){ var a }',
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
                name: 'a'
              }
            ],
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
                        name: 'a'
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(a,){}',
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(a = b,){}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'Identifier',
                  name: 'a'
                },
                right: {
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(a=b){}',
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
                type: 'AssignmentPattern',
                left: {
                  type: 'Identifier',
                  name: 'a'
                },
                right: {
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(a=b=c){}',
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
                type: 'AssignmentPattern',
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
      'function f(){foo}',
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
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Identifier',
                    name: 'foo'
                  }
                }
              ]
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
      'function f(){foo;bar}',
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
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Identifier',
                    name: 'foo'
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Identifier',
                    name: 'bar'
                  }
                }
              ]
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
      'function f(){ var f = 123; if (abc) function f(){} }',
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
      'var x = a; function x(){};',
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
                  name: 'x'
                },
                init: {
                  type: 'Identifier',
                  name: 'a'
                }
              }
            ],
            kind: 'var'
          },
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
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
        ],
        sourceType: 'script'
      }
    ],

    [
      'function f(x) {var x}',
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
                name: 'x'
              }
            ],
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
                        name: 'x'
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(x) {{var x}}',
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
                name: 'x'
              }
            ],
            body: {
              type: 'BlockStatement',
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
                            name: 'x'
                          },
                          init: null
                        }
                      ],
                      kind: 'var'
                    }
                  ]
                }
              ]
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
      'function f() {{var f}}',
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
            params: [],
            body: {
              type: 'BlockStatement',
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
                            name: 'f'
                          },
                          init: null
                        }
                      ],
                      kind: 'var'
                    }
                  ]
                }
              ]
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
      'function f() {let f}',
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
                  kind: 'let'
                }
              ]
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
      'function f() {{let f}}',
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
            params: [],
            body: {
              type: 'BlockStatement',
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
                            name: 'f'
                          },
                          init: null
                        }
                      ],
                      kind: 'let'
                    }
                  ]
                }
              ]
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
      'function f(){ function x(){} var x = y; }',
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
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'FunctionDeclaration',
                  id: {
                    type: 'Identifier',
                    name: 'x'
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
                  type: 'VariableDeclaration',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      id: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      init: {
                        type: 'Identifier',
                        name: 'y'
                      }
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){ var x = y; function x(){} }',
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
                        name: 'x'
                      },
                      init: {
                        type: 'Identifier',
                        name: 'y'
                      }
                    }
                  ],
                  kind: 'var'
                },
                {
                  type: 'FunctionDeclaration',
                  id: {
                    type: 'Identifier',
                    name: 'x'
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
      'function f(a, a) {}',
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(a, b, a) {}',
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
                name: 'a'
              },
              {
                type: 'Identifier',
                name: 'b'
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(b, a, a) {}',
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
                name: 'b'
              },
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(b, a, b, a = x) {}',
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
                name: 'b'
              },
              {
                type: 'Identifier',
                name: 'a'
              },
              {
                type: 'Identifier',
                name: 'b'
              },
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'Identifier',
                  name: 'a'
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
            generator: false,
            expression: false,
            async: false
          }
        ],
        sourceType: 'script'
      }
    ],

    [
      'var x; { let x; }',
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
                  name: 'x'
                },
                init: null
              }
            ],
            kind: 'var'
          },
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
                      name: 'x'
                    },
                    init: null
                  }
                ],
                kind: 'let'
              }
            ]
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(x) { function x() {} }',
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
                name: 'x'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'FunctionDeclaration',
                  id: {
                    type: 'Identifier',
                    name: 'x'
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
      'function f(x) { var x; }',
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
                name: 'x'
              }
            ],
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
                        name: 'x'
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){ var f }',
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){ let f }',
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
                  kind: 'let'
                }
              ]
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
      'function f(){ let f; }',
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
                  kind: 'let'
                }
              ]
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
      'function f() {let f}',
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
                  kind: 'let'
                }
              ]
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
      'function f() {var f}',
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){} function f(){}',
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
        ],
        sourceType: 'script'
      }
    ],
    [
      'function g() {  function f(){} function f(){} }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'g'
            },
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
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
      'function f(x) { { const x = y } }',
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
                name: 'x'
              }
            ],
            body: {
              type: 'BlockStatement',
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
                            name: 'x'
                          },
                          init: {
                            type: 'Identifier',
                            name: 'y'
                          }
                        }
                      ],
                      kind: 'const'
                    }
                  ]
                }
              ]
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
      'function f(x) { { let x } }',
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
                name: 'x'
              }
            ],
            body: {
              type: 'BlockStatement',
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
                            name: 'x'
                          },
                          init: null
                        }
                      ],
                      kind: 'let'
                    }
                  ]
                }
              ]
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
      '(function({x}, {y} = {}, {z}, {v} = {}, ...a) {})',
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
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true
                      }
                    ]
                  },
                  right: {
                    type: 'ObjectExpression',
                    properties: []
                  }
                },
                {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'z'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'z'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'v'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'v'
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true
                      }
                    ]
                  },
                  right: {
                    type: 'ObjectExpression',
                    properties: []
                  }
                },
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
      'function f(){ new.target }',
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
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'MetaProperty',
                    meta: {
                      type: 'Identifier',
                      name: 'new'
                    },
                    property: {
                      type: 'Identifier',
                      name: 'target'
                    }
                  }
                }
              ]
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
      'function f(){ new . target }',
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
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'MetaProperty',
                    meta: {
                      type: 'Identifier',
                      name: 'new'
                    },
                    property: {
                      type: 'Identifier',
                      name: 'target'
                    }
                  }
                }
              ]
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
      'function f(){ _ => _ => new.target }',
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
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'ArrowFunctionExpression',
                    id: null,
                    params: [
                      {
                        type: 'Identifier',
                        name: '_'
                      }
                    ],
                    body: {
                      type: 'ArrowFunctionExpression',
                      id: null,
                      params: [
                        {
                          type: 'Identifier',
                          name: '_'
                        }
                      ],
                      body: {
                        type: 'MetaProperty',
                        meta: {
                          type: 'Identifier',
                          name: 'new'
                        },
                        property: {
                          type: 'Identifier',
                          name: 'target'
                        }
                      },
                      generator: false,
                      expression: true,
                      async: false
                    },
                    generator: false,
                    expression: true,
                    async: false
                  }
                }
              ]
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
      '() => function(){ new.target }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              id: null,
              params: [],
              body: {
                type: 'FunctionExpression',
                id: null,
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'MetaProperty',
                        meta: {
                          type: 'Identifier',
                          name: 'new'
                        },
                        property: {
                          type: 'Identifier',
                          name: 'target'
                        }
                      }
                    }
                  ]
                },
                generator: false,
                expression: false,
                async: false
              },
              generator: false,
              expression: true,
              async: false
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){ new.target + foo }',
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
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                      type: 'MetaProperty',
                      meta: {
                        type: 'Identifier',
                        name: 'new'
                      },
                      property: {
                        type: 'Identifier',
                        name: 'target'
                      }
                    },
                    right: {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  }
                }
              ]
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
      'function f(){ foo + new.target }',
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
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    right: {
                      type: 'MetaProperty',
                      meta: {
                        type: 'Identifier',
                        name: 'new'
                      },
                      property: {
                        type: 'Identifier',
                        name: 'target'
                      }
                    }
                  }
                }
              ]
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
      'function f(){ foo = new.target }',
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
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    operator: '=',
                    left: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    right: {
                      type: 'MetaProperty',
                      meta: {
                        type: 'Identifier',
                        name: 'new'
                      },
                      property: {
                        type: 'Identifier',
                        name: 'target'
                      }
                    }
                  }
                }
              ]
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
      'function f(){ new new .target; }',
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
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'NewExpression',
                    callee: {
                      type: 'MetaProperty',
                      meta: {
                        type: 'Identifier',
                        name: 'new'
                      },
                      property: {
                        type: 'Identifier',
                        name: 'target'
                      }
                    },
                    arguments: []
                  }
                }
              ]
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
      'function f(f) { }',
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
                name: 'f'
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
    ]
  ];

  pass('Declarations - Functions (pass)', valids);
});
