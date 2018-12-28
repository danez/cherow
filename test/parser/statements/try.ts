import { Context } from '../../../src/parser/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Try', () => {
  const inValids: Array<[string, Context]> = [
    // Bindings - Acorn

    ['try {} catch (foo) { var foo; }', Context.OptionDisablesWebCompat],
    ['try {} catch (foo) { let foo; }', Context.Empty],
    ['try {} catch (foo) { try {} catch (_) { var foo; } }', Context.OptionDisablesWebCompat],
    ['try {} catch ([foo]) { var foo; }', Context.OptionDisablesWebCompat],
    ['try {} catch ({ foo }) { var foo; }', Context.OptionDisablesWebCompat],
    ['try {} catch ({ a: foo, b: { c: [foo] } }) {}', Context.Empty],
    ['try {} catch (foo) { function foo() {} }', Context.OptionDisablesWebCompat],
    ['try {} catch (e) { for (var e;;) {} }', Context.OptionDisablesWebCompat],
    ['try {} catch (e) { for (var e in y) {} }', Context.OptionDisablesWebCompat],
    ['try {} catch (e) { for (var e of y) {} }', Context.OptionDisablesWebCompat],
    ['try {} catch (e) { let e = x; }', Context.OptionDisablesWebCompat],
    ['try {} catch (e) { const e = x; }', Context.OptionDisablesWebCompat],
    ['try {} catch (e) { for (var e of y) {} }', Context.Empty],
    ['try {} catch (e) { let e = x; }', Context.Empty],

    // Bindings

    ['try {} catch (e) { const e = x; }', Context.Empty],
    ['try {} catch (e) { var e = x; }', Context.OptionDisablesWebCompat],
    ['try {} catch (e) { let e = x; }', Context.Empty],
    ['try { var foo = 1; } catch (e) {} let foo = 1;', Context.Empty],
    ['try {} catch ([a,a]) { }', Context.Empty],
    [`try{ {} catch(e){} finally{} }`, Context.Empty],
    [`try {} catch ([...{ x } = []]) {}`, Context.Empty],

    // General

    [
      `try{}
     catch()`,
      Context.Empty
    ],
    [
      `try{}
    catch(){`,
      Context.OptionDisablesWebCompat
    ],
    [
      `catch(){}
    finally{}`,
      Context.OptionDisablesWebCompat
    ],
    [
      `try{}
    catch(){
    finally{}`,
      Context.OptionDisablesWebCompat
    ]
  ];

  fail('Statements - Try (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      `try {} catch ({ arrow = () => {} }) {}`,
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
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    kind: 'init',
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
                        body: {
                          type: 'BlockStatement',
                          body: []
                        },
                        params: [],
                        id: null,
                        async: false,
                        generator: false,
                        expression: false
                      }
                    },
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
        ]
      }
    ],
    [
      `try {} catch ({ x: y }) {}`,
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
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    kind: 'init',
                    key: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    computed: false,
                    value: {
                      type: 'Identifier',
                      name: 'y'
                    },
                    method: false,
                    shorthand: false
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
        ]
      }
    ],
    [
      `try {} catch ({ x: y, }) {}`,
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
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    kind: 'init',
                    key: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    computed: false,
                    value: {
                      type: 'Identifier',
                      name: 'y'
                    },
                    method: false,
                    shorthand: false
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
        ]
      }
    ],
    // [`try {} catch ({ w: { x, y, z } = { x: 4, y: 5, z: 6 } }) {}`, Context.Empty, {}],
    [
      `try {} catch ([,]) {}`,
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
                type: 'ArrayPattern',
                elements: [null]
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
    ],
    [
      `try {} catch ([...[...x]]) {}`,
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
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'RestElement',
                          argument: {
                            type: 'Identifier',
                            name: 'x'
                          }
                        }
                      ]
                    }
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
        ]
      }
    ],
    [
      `try {} catch ({}) {}`,
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
        ]
      }
    ],
    [
      `try { throw [null]; } catch ([{ x }]) {}`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ThrowStatement',
                  argument: {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'Literal',
                        value: null
                      }
                    ]
                  }
                }
              ]
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        method: false,
                        shorthand: true
                      }
                    ]
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
        ]
      }
    ],
    [
      'try {} catch {} finally {}',
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
              param: null,
              body: {
                type: 'BlockStatement',
                body: []
              }
            },
            finalizer: {
              type: 'BlockStatement',
              body: []
            }
          }
        ]
      }
    ],
    [
      'try {} catch {}',
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
              param: null,
              body: {
                type: 'BlockStatement',
                body: []
              }
            },
            finalizer: null
          }
        ]
      }
    ],
    [
      `do{
      try{
        c1+=1;
        continue;
      }
      catch(er1){}
      finally{
        fin=1;
      }
      fin=-1;
    }
    while(c1<2);
    if(fin!==1){}`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'DoWhileStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'TryStatement',
                  block: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'AssignmentExpression',
                          left: {
                            type: 'Identifier',
                            name: 'c1'
                          },
                          operator: '+=',
                          right: {
                            type: 'Literal',
                            value: 1
                          }
                        }
                      },
                      {
                        type: 'ContinueStatement',
                        label: null
                      }
                    ]
                  },
                  handler: {
                    type: 'CatchClause',
                    param: {
                      type: 'Identifier',
                      name: 'er1'
                    },
                    body: {
                      type: 'BlockStatement',
                      body: []
                    }
                  },
                  finalizer: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'AssignmentExpression',
                          left: {
                            type: 'Identifier',
                            name: 'fin'
                          },
                          operator: '=',
                          right: {
                            type: 'Literal',
                            value: 1
                          }
                        }
                      }
                    ]
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'fin'
                    },
                    operator: '=',
                    right: {
                      type: 'UnaryExpression',
                      operator: '-',
                      argument: {
                        type: 'Literal',
                        value: 1
                      },
                      prefix: true
                    }
                  }
                }
              ]
            },
            test: {
              type: 'BinaryExpression',
              left: {
                type: 'Identifier',
                name: 'c1'
              },
              right: {
                type: 'Literal',
                value: 2
              },
              operator: '<'
            }
          },
          {
            type: 'IfStatement',
            test: {
              type: 'BinaryExpression',
              left: {
                type: 'Identifier',
                name: 'fin'
              },
              right: {
                type: 'Literal',
                value: 1
              },
              operator: '!=='
            },
            consequent: {
              type: 'BlockStatement',
              body: []
            },
            alternate: null
          }
        ]
      }
    ],
    [
      'try { x = 2; } catch { let x = 3; let y = true; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
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
                      type: 'Literal',
                      value: 2
                    }
                  }
                }
              ]
            },
            handler: {
              type: 'CatchClause',
              param: null,
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'let',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Literal',
                          value: 3
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
                    kind: 'let',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Literal',
                          value: true
                        },
                        id: {
                          type: 'Identifier',
                          name: 'y'
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
    ],
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
