import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Try', () => {
  const inValids: Array<[string, Context]> = [
    // Bindings - Acorn

    ['try {} catch (foo) { var foo; }', Context.OptionDisablesWebCompat],
    ['try {} catch (foo) { let foo; }', Context.Empty],
    [
      'try {} catch (foo) { try {} catch (_) { var foo; } }',
      Context.OptionDisablesWebCompat
    ],
    ['try {} catch ([foo]) { var foo; }', Context.OptionDisablesWebCompat],
    ['try {} catch ({ foo }) { var foo; }', Context.OptionDisablesWebCompat],
    ['try {} catch ({ a: foo, b: { c: [foo] } }) {}', Context.Empty],
    [
      'try {} catch (foo) { function foo() {} }',
      Context.OptionDisablesWebCompat
    ],
    ['try {} catch (e) { for (var e;;) {} }', Context.OptionDisablesWebCompat],
    [
      'try {} catch (e) { for (var e in y) {} }',
      Context.OptionDisablesWebCompat
    ],
    [
      'try {} catch (e) { for (var e of y) {} }',
      Context.OptionDisablesWebCompat
    ],
    ['try {} catch (e) { let e = x; }', Context.OptionDisablesWebCompat],
    ['try {} catch (e) { const e = x; }', Context.OptionDisablesWebCompat],
    ['try {} catch (e) { for (var e of y) {} }', Context.Empty],
    ['try {} catch (e) { let e = x; }', Context.Empty],
    ['try {} catch (e) { const e = x; }', Context.Empty],
    ['try {} catch (e) { for (var e of y) {} }', Context.Empty],
    ['try {} catch (e) { for (var e of y) {} }', Context.Empty],
    ['try {} catch(e) { var e; }', Context.OptionDisablesWebCompat],

    // Bindings

    ['try {} catch (e) { const e = x; }', Context.Empty],
    ['try {} catch (e) { var e = x; }', Context.OptionDisablesWebCompat],
    ['try {} catch (e) { let e = x; }', Context.Empty],
    ['try { var foo = 1; } catch (e) {} let foo = 1;', Context.Empty],
    ['try {} catch ([a,a]) { }', Context.Empty]
  ];

  fail('Statements - Try (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'try {} catch ([a,b,c]) { }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'ArrayPattern',
                elements: [
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
                    name: 'c'
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
      'try {} catch (foo) {} var foo;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo'
              },
              body: {
                type: 'BlockStatement',
                body: []
              }
            },
            finalizer: null
          },
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'foo'
                },
                init: null
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'try {} catch (foo) {} let foo;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo'
              },
              body: {
                type: 'BlockStatement',
                body: []
              }
            },
            finalizer: null
          },
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'foo'
                },
                init: null
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'try {} catch (foo) { { let foo; } }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo'
              },
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
                              name: 'foo'
                            },
                            init: null
                          }
                        ],
                        kind: 'let'
                      }
                    ]
                  }
                ]
              }
            },
            finalizer: null
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'try {} catch (foo) { function x() { var foo; } }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo'
              },
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
                ]
              }
            },
            finalizer: null
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'try { throw null; } catch (f) {if (false) ; else function f() { return 123; }}',
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
                    type: 'Literal',
                    value: null
                  }
                }
              ]
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'f'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'IfStatement',
                    test: {
                      type: 'Literal',
                      value: false
                    },
                    consequent: {
                      type: 'EmptyStatement'
                    },
                    alternate: {
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
                            type: 'ReturnStatement',
                            argument: {
                              type: 'Literal',
                              value: 123
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
              }
            },
            finalizer: null
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'try { throw {}; } catch ({ arrow = () => {} }) {}',
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
                    properties: []
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
                      name: 'arrow'
                    },
                    computed: false,
                    value: {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'arrow'
                      },
                      right: {
                        type: 'ArrowFunctionExpression',
                        id: null,
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          body: []
                        },
                        generator: false,
                        expression: false,
                        async: false
                      }
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
      'try { throw null; } catch ({}) {}',
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
                    type: 'Literal',
                    value: null
                  }
                }
              ]
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'ObjectPattern',
                properties: []
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
      'try { } catch (a) { { let a = b; } }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'a'
              },
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
                              name: 'a'
                            },
                            init: {
                              type: 'Identifier',
                              name: 'b'
                            }
                          }
                        ],
                        kind: 'let'
                      }
                    ]
                  }
                ]
              }
            },
            finalizer: null
          }
        ],
        sourceType: 'script'
      }
    ],

    [
      'try {} catch (foo) { function x(foo) {} }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'FunctionDeclaration',
                    id: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    params: [
                      {
                        type: 'Identifier',
                        name: 'foo'
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
                ]
              }
            },
            finalizer: null
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var foo; try {} catch (_) { let foo; }',
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
                init: null
              }
            ],
            kind: 'var'
          },
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: '_'
              },
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
                          name: 'foo'
                        },
                        init: null
                      }
                    ],
                    kind: 'let'
                  }
                ]
              }
            },
            finalizer: null
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'try {} catch(e) { try {} catch (e) {} }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'TryStatement',
                    block: {
                      type: 'BlockStatement',
                      body: []
                    },
                    handler: {
                      type: 'CatchClause',
                      param: {
                        type: 'Identifier',
                        name: 'e'
                      },
                      body: {
                        type: 'BlockStatement',
                        body: []
                      }
                    },
                    finalizer: null
                  }
                ]
              }
            },
            finalizer: null
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'try {} catch (e) { { let e = x; } }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e'
              },
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
                              name: 'e'
                            },
                            init: {
                              type: 'Identifier',
                              name: 'x'
                            }
                          }
                        ],
                        kind: 'let'
                      }
                    ]
                  }
                ]
              }
            },
            finalizer: null
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'try {} catch (e) { for (const e = y;;) {} }',
      Context.OptionDisablesWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForStatement',
                    init: {
                      type: 'VariableDeclaration',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          id: {
                            type: 'Identifier',
                            name: 'e'
                          },
                          init: {
                            type: 'Identifier',
                            name: 'y'
                          }
                        }
                      ],
                      kind: 'const'
                    },
                    test: null,
                    update: null,
                    body: {
                      type: 'BlockStatement',
                      body: []
                    }
                  }
                ]
              }
            },
            finalizer: null
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'try {} catch (e) { for (let e in y) {} }',
      Context.OptionDisablesWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForInStatement',
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    left: {
                      type: 'VariableDeclaration',
                      kind: 'let',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'e'
                          }
                        }
                      ]
                    },
                    right: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  }
                ]
              }
            },
            finalizer: null
          }
        ]
      }
    ],
    [
      'try {} catch (e) { for (const e in y) {} }',
      Context.OptionDisablesWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForInStatement',
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    left: {
                      type: 'VariableDeclaration',
                      kind: 'const',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'e'
                          }
                        }
                      ]
                    },
                    right: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  }
                ]
              }
            },
            finalizer: null
          }
        ]
      }
    ],
    [
      'try {} catch (e) { for (let e of y) {} }',
      Context.OptionDisablesWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForOfStatement',
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    left: {
                      type: 'VariableDeclaration',
                      kind: 'let',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'e'
                          }
                        }
                      ]
                    },
                    right: {
                      type: 'Identifier',
                      name: 'y'
                    },
                    await: false
                  }
                ]
              }
            },
            finalizer: null
          }
        ]
      }
    ],
    [
      'try {} catch (e) { for (const e of y) {} }',
      Context.OptionDisablesWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForOfStatement',
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    left: {
                      type: 'VariableDeclaration',
                      kind: 'const',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'e'
                          }
                        }
                      ]
                    },
                    right: {
                      type: 'Identifier',
                      name: 'y'
                    },
                    await: false
                  }
                ]
              }
            },
            finalizer: null
          }
        ]
      }
    ],
    [
      'try {} catch (e) { for (const e in y) {} }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForInStatement',
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    left: {
                      type: 'VariableDeclaration',
                      kind: 'const',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'e'
                          }
                        }
                      ]
                    },
                    right: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  }
                ]
              }
            },
            finalizer: null
          }
        ]
      }
    ],
    [
      'try {} catch (e) { for (let e of y) {} }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForOfStatement',
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    left: {
                      type: 'VariableDeclaration',
                      kind: 'let',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'e'
                          }
                        }
                      ]
                    },
                    right: {
                      type: 'Identifier',
                      name: 'y'
                    },
                    await: false
                  }
                ]
              }
            },
            finalizer: null
          }
        ]
      }
    ],
    [
      'try {} catch (e) { for (const e of y) {} }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForOfStatement',
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    left: {
                      type: 'VariableDeclaration',
                      kind: 'const',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'e'
                          }
                        }
                      ]
                    },
                    right: {
                      type: 'Identifier',
                      name: 'y'
                    },
                    await: false
                  }
                ]
              }
            },
            finalizer: null
          }
        ]
      }
    ],
    [
      'try {} catch (e) { for (var e in y) {} }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForInStatement',
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    left: {
                      type: 'VariableDeclaration',
                      kind: 'var',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'e'
                          }
                        }
                      ]
                    },
                    right: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  }
                ]
              }
            },
            finalizer: null
          }
        ]
      }
    ],
    [
      'try {} catch (e) { var e = x; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e'
              },
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
                          type: 'Identifier',
                          name: 'x'
                        },
                        id: {
                          type: 'Identifier',
                          name: 'e'
                        }
                      }
                    ]
                  }
                ]
              }
            },
            finalizer: null
          }
        ]
      }
    ]
  ];

  pass('Statements - Try (pass)', valids);
});
