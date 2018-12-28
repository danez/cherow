import { Context } from '../../../src/parser/common';
import { pass, fail } from '../../test-utils';

describe('Statements - For', () => {
  const inValids: Array<[string, Context]> = [
    // Bindings

    ['for (let x;;) { var x; }', Context.OptionDisablesWebCompat],
    ['for (const x = y;;) { var x; }', Context.OptionDisablesWebCompat],
    ['for (let x in y) { var x; }', Context.OptionDisablesWebCompat],
    ['for (const x in y) { var x; }', Context.OptionDisablesWebCompat],
    ['for (let x of y) { var x; }', Context.OptionDisablesWebCompat],
    ['for (const a;;);', Context.OptionDisablesWebCompat],
    ['for (const a,b,c;;);', Context.OptionDisablesWebCompat],
    // ['for (const [x, x] in {}) {}', Context.OptionDisablesWebCompat],
    ['for (let a, b, x, d;;) { var foo; var bar; { var doo, x, ee; } }', Context.OptionDisablesWebCompat],

    // General
    ['for (var [foo] = arr, [bar] = arr2);', Context.OptionDisablesWebCompat],
    ['for (var [foo,,bar] = arr);', Context.OptionDisablesWebCompat],
    ['for (var [foo,bar] = arr);', Context.OptionDisablesWebCompat],
    ['for (var [,,foo] = arr);', Context.OptionDisablesWebCompat],
    ['for (var [,foo] = arr);', Context.OptionDisablesWebCompat],
    ['for (var [foo,,] = arr);', Context.OptionDisablesWebCompat],
    ['for (var [foo,] = arr);', Context.OptionDisablesWebCompat],
    ['for (var [foo] = arr);', Context.OptionDisablesWebCompat],
    ['for (var [,,] = x);', Context.OptionDisablesWebCompat],
    ['for (var [,] = x);', Context.OptionDisablesWebCompat],
    ['for (var [] = x);', Context.OptionDisablesWebCompat],
    ['for (var [foo] = arr, [bar] = arr2);', Context.OptionDisablesWebCompat],
    ['for (var [foo] = arr, bar);', Context.OptionDisablesWebCompat],
    ['for (var [foo] = arr, bar = arr2);', Context.OptionDisablesWebCompat],
    ['for (var foo = arr, [bar] = arr2);', Context.OptionDisablesWebCompat],
    ['for (var [foo=a] = arr);', Context.OptionDisablesWebCompat],
    ['for (var [foo=a, bar] = arr);', Context.OptionDisablesWebCompat],
    ['for (var [foo, bar=b] = arr);', Context.OptionDisablesWebCompat],
    ['for (var [foo=a, bar=b] = arr);', Context.OptionDisablesWebCompat],
    ['for (var [foo]);', Context.OptionDisablesWebCompat],
    ['for (var [foo = x]);', Context.OptionDisablesWebCompat],
    ['for (var [foo], bar);', Context.OptionDisablesWebCompat],
    ['for (var foo, [bar]);', Context.OptionDisablesWebCompat],
    ['for (var [...foo] = obj);', Context.OptionDisablesWebCompat],
    ['for (var [foo, ...bar] = obj);', Context.OptionDisablesWebCompat],
    ['for (var [...foo, bar] = obj);', Context.OptionDisablesWebCompat],
    ['for (var [...foo,] = obj);', Context.OptionDisablesWebCompat],
    ['for (var [...foo,,] = obj);', Context.OptionDisablesWebCompat],
    ['for (var [...[foo, bar]] = obj);', Context.OptionDisablesWebCompat],
    ['for (var [...[foo, bar],] = obj);', Context.OptionDisablesWebCompat],
    ['for (var [...[foo, bar],,] = obj);', Context.OptionDisablesWebCompat],
    ['for (var [x, ...[foo, bar]] = obj);', Context.OptionDisablesWebCompat],
    ['for (var [...bar = foo] = obj);', Context.OptionDisablesWebCompat],
    ['for (var [...] = obj);', Context.OptionDisablesWebCompat],
    ['for (var {} = obj);', Context.OptionDisablesWebCompat],
    ['for (var {,} = obj);', Context.OptionDisablesWebCompat],
    ['for (var {,,} = obj);', Context.OptionDisablesWebCompat],
    ['for (var {x} = obj);', Context.OptionDisablesWebCompat],
    ['for (var {x,} = obj);', Context.OptionDisablesWebCompat],
    ['for (var {x,,} = obj);', Context.OptionDisablesWebCompat],
    ['for (var {,x} = obj);', Context.OptionDisablesWebCompat],
    ['for (var {,,x} = obj);', Context.OptionDisablesWebCompat],
    ['for (var {x, y} = obj);', Context.OptionDisablesWebCompat],
    ['for (var {x,, y} = obj);', Context.OptionDisablesWebCompat],
    ['for (var {x} = a, {y} = obj);', Context.OptionDisablesWebCompat],
    ['for (var {x} = a, y = obj);', Context.OptionDisablesWebCompat],
    ['for (var {x} = a, obj);', Context.OptionDisablesWebCompat],
    ['for (var x = a, {y} = obj);', Context.OptionDisablesWebCompat],
    ['for (var x, {y} = obj);', Context.OptionDisablesWebCompat],
    ['for (var {x = y} = obj);', Context.OptionDisablesWebCompat],
    ['for (var {x = y, z} = obj);', Context.OptionDisablesWebCompat],
    ['for (var {x, y = z} = obj);', Context.OptionDisablesWebCompat],
    ['for (var {x = y, z = a} = obj);', Context.OptionDisablesWebCompat],
    ['for (var {x}, {y} = z);', Context.OptionDisablesWebCompat],
    ['for (var {x}, y);', Context.OptionDisablesWebCompat],
    ['for (var x = y, {z});', Context.OptionDisablesWebCompat],
    ['for (var {x}, y);', Context.OptionDisablesWebCompat],
    ['for (var {x=y});', Context.OptionDisablesWebCompat],
    ['for (var {x:y=z});', Context.OptionDisablesWebCompat],
    ['for (var {x:y=z} = obj, {a:b=c});', Context.OptionDisablesWebCompat],
    ['for (var {x:y=z}, {a:b=c} = obj);', Context.OptionDisablesWebCompat],
    ['for (var {a:=c} = z);', Context.OptionDisablesWebCompat],
    ['for (var {[x]: y} = z);', Context.OptionDisablesWebCompat],
    ['for (var {[x]} = z);', Context.OptionDisablesWebCompat],
    ['for (var {[x]: y});', Context.OptionDisablesWebCompat],
    ['for (var {[x]: y = z});', Context.OptionDisablesWebCompat],
    ['for (var {[x]: y = z} = a);', Context.OptionDisablesWebCompat],
    ['for (var {a, [x]: y} = a);', Context.OptionDisablesWebCompat]
  ];

  fail('Statements - For (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'for (let foo, bar;;);',
      Context.OptionDisablesWebCompat,
      {
        type: 'Program',
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
                    name: 'foo'
                  },
                  init: null
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'bar'
                  },
                  init: null
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let foo = bar;;);',
      Context.OptionDisablesWebCompat,
      {
        type: 'Program',
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
                    name: 'foo'
                  },
                  init: {
                    type: 'Identifier',
                    name: 'bar'
                  }
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let foo = bar, zoo = boo;;);',
      Context.OptionDisablesWebCompat,
      {
        type: 'Program',
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
                    name: 'foo'
                  },
                  init: {
                    type: 'Identifier',
                    name: 'bar'
                  }
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'zoo'
                  },
                  init: {
                    type: 'Identifier',
                    name: 'boo'
                  }
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let\nfoo;;);',
      Context.OptionDisablesWebCompat,
      {
        body: [
          {
            body: {
              type: 'EmptyStatement'
            },
            init: {
              declarations: [
                {
                  id: {
                    name: 'foo',
                    type: 'Identifier'
                  },
                  init: null,
                  type: 'VariableDeclarator'
                }
              ],
              kind: 'let',
              type: 'VariableDeclaration'
            },
            test: null,
            type: 'ForStatement',
            update: null
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'for (let [] = x;;);',
      Context.OptionDisablesWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'ArrayPattern',
                    elements: []
                  },
                  init: {
                    type: 'Identifier',
                    name: 'x'
                  }
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ] /* ['for (let [foo=a, bar=b] in arr);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "body": [
        {
            "type": "ForInStatement",
            "left": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "foo"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "a"
                                    }
                                },
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "bar"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "b"
                                    }
                                }
                            ]
                        },
                        "init": null
                    }
                ],
                "kind": "let"
            },
            "right": {
                "type": "Identifier",
                "name": "arr"
            },
            "body": {
                "type": "EmptyStatement"
            },
            "each": false
        }
    ],
    "sourceType": "script"
}], */ /*
  ['for (let [foo, bar=b] in arr);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "body": [
        {
            "type": "ForInStatement",
            "left": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "Identifier",
                                    "name": "foo"
                                },
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "bar"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "b"
                                    }
                                }
                            ]
                        },
                        "init": null
                    }
                ],
                "kind": "let"
            },
            "right": {
                "type": "Identifier",
                "name": "arr"
            },
            "body": {
                "type": "EmptyStatement"
            },
            "each": false
        }
    ],
    "sourceType": "script"
}],*/,
    ['for (let [,] = x;;);', Context.OptionDisablesWebCompat, {
      "type": "Program",
      "body": [
          {
              "type": "ForStatement",
              "init": {
                  "type": "VariableDeclaration",
                  "declarations": [
                      {
                          "type": "VariableDeclarator",
                          "id": {
                              "type": "ArrayPattern",
                              "elements": [
                                  null
                              ]
                          },
                          "init": {
                              "type": "Identifier",
                              "name": "x"
                          }
                      }
                  ],
                  "kind": "let"
              },
              "test": null,
              "update": null,
              "body": {
                  "type": "EmptyStatement"
              }
          }
      ],
      "sourceType": "script"
  }],
    ['for (let [,,] = x;;);', Context.OptionDisablesWebCompat, {
      "type": "Program",
      "body": [
          {
              "type": "ForStatement",
              "init": {
                  "type": "VariableDeclaration",
                  "declarations": [
                      {
                          "type": "VariableDeclarator",
                          "id": {
                              "type": "ArrayPattern",
                              "elements": [
                                  null,
                                  null
                              ]
                          },
                          "init": {
                              "type": "Identifier",
                              "name": "x"
                          }
                      }
                  ],
                  "kind": "let"
              },
              "test": null,
              "update": null,
              "body": {
                  "type": "EmptyStatement"
              }
          }
      ],
      "sourceType": "script"
  }],
    ['for (let [foo] = arr;;);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "body": [
        {
            "type": "ForStatement",
            "init": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "Identifier",
                                    "name": "foo"
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "arr"
                        }
                    }
                ],
                "kind": "let"
            },
            "test": null,
            "update": null,
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],
     ['for (let [foo,] = arr;;);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "body": [
        {
            "type": "ForStatement",
            "init": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "Identifier",
                                    "name": "foo"
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "arr"
                        }
                    }
                ],
                "kind": "let"
            },
            "test": null,
            "update": null,
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],
    ['for (let [foo] = arr, [bar] = arr2;;);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "body": [
        {
            "type": "ForStatement",
            "init": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "Identifier",
                                    "name": "foo"
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "arr"
                        }
                    },
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "Identifier",
                                    "name": "bar"
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "arr2"
                        }
                    }
                ],
                "kind": "let"
            },
            "test": null,
            "update": null,
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],
['for (let [foo] = arr, bar;;);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "body": [
        {
            "type": "ForStatement",
            "init": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "Identifier",
                                    "name": "foo"
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "arr"
                        }
                    },
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "bar"
                        },
                        "init": null
                    }
                ],
                "kind": "let"
            },
            "test": null,
            "update": null,
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],
     ['for (let foo = arr, [bar] = arr2;;);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "body": [
        {
            "type": "ForStatement",
            "init": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "foo"
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "arr"
                        }
                    },
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "Identifier",
                                    "name": "bar"
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "arr2"
                        }
                    }
                ],
                "kind": "let"
            },
            "test": null,
            "update": null,
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],
     ['for (let [foo=a] = arr;;);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "body": [
        {
            "type": "ForStatement",
            "init": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "foo"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "a"
                                    }
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "arr"
                        }
                    }
                ],
                "kind": "let"
            },
            "test": null,
            "update": null,
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],
      ['for (let [foo=a, bar] = arr;;);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "body": [
        {
            "type": "ForStatement",
            "init": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "foo"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "a"
                                    }
                                },
                                {
                                    "type": "Identifier",
                                    "name": "bar"
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "arr"
                        }
                    }
                ],
                "kind": "let"
            },
            "test": null,
            "update": null,
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],
      ['for (let [foo, bar=b] = arr;;);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "body": [
        {
            "type": "ForStatement",
            "init": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "Identifier",
                                    "name": "foo"
                                },
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "bar"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "b"
                                    }
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "arr"
                        }
                    }
                ],
                "kind": "let"
            },
            "test": null,
            "update": null,
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],
     ['for (let [foo=a, bar=b] = arr;;);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "body": [
        {
            "type": "ForStatement",
            "init": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "foo"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "a"
                                    }
                                },
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "bar"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "b"
                                    }
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "arr"
                        }
                    }
                ],
                "kind": "let"
            },
            "test": null,
            "update": null,
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],
    ['for (let [...foo] = obj;;);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "body": [
        {
            "type": "ForStatement",
            "init": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "foo"
                                    }
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "obj"
                        }
                    }
                ],
                "kind": "let"
            },
            "test": null,
            "update": null,
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],
     ['for (let [foo, ...bar] = obj;;);', Context.OptionDisablesWebCompat, {
        "type": "Program",
        "body": [
            {
                "type": "ForStatement",
                "init": {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "ArrayPattern",
                                "elements": [
                                    {
                                        "type": "Identifier",
                                        "name": "foo"
                                    },
                                    {
                                        "type": "RestElement",
                                        "argument": {
                                            "type": "Identifier",
                                            "name": "bar"
                                        }
                                    }
                                ]
                            },
                            "init": {
                                "type": "Identifier",
                                "name": "obj"
                            }
                        }
                    ],
                    "kind": "let"
                },
                "test": null,
                "update": null,
                "body": {
                    "type": "EmptyStatement"
                }
            }
        ],
        "sourceType": "script"
    }],
    ['for (let {x} = obj;;);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "body": [
        {
            "type": "ForStatement",
            "init": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ObjectPattern",
                            "properties": [
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "obj"
                        }
                    }
                ],
                "kind": "let"
            },
            "test": null,
            "update": null,
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}], [
      'for (let foo in x);',
      Context.OptionDisablesWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'ForInStatement',
            left: {
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
            },
            right: {
              type: 'Identifier',
              name: 'x'
            },
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let foo;;);',
      Context.OptionDisablesWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement'
            },
            init: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'Identifier',
                    name: 'foo'
                  }
                }
              ]
            },
            test: null,
            update: null
          }
        ]
      }
    ],
    [
      'for (;;);',
      Context.OptionDisablesWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: null,
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (a;;);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement'
            },
            init: {
              type: 'Identifier',
              name: 'a'
            },
            test: null,
            update: null
          }
        ]
      }
    ],
    [
      'for (;b;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: null,
            test: {
              type: 'Identifier',
              name: 'b'
            },
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (;;c);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: null,
            test: null,
            update: {
              type: 'Identifier',
              name: 'c'
            },
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (a;b;);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
              type: 'Identifier',
              name: 'a'
            },
            test: {
              type: 'Identifier',
              name: 'b'
            },
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (a;;c);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
              type: 'Identifier',
              name: 'a'
            },
            test: null,
            update: {
              type: 'Identifier',
              name: 'c'
            },
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (;b;c);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement'
            },
            init: null,
            test: {
              type: 'Identifier',
              name: 'b'
            },
            update: {
              type: 'Identifier',
              name: 'c'
            }
          }
        ]
      }
    ],
    [
      'for (var a;;);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement'
            },
            init: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            },
            test: null,
            update: null
          }
        ]
      }
    ],
    [
      'for (var a,b,c;;);',
      Context.Empty,
      {
        type: 'Program',
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
                    name: 'a'
                  },
                  init: null
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  init: null
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'c'
                  },
                  init: null
                }
              ],
              kind: 'var'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let a;;);',
      Context.Empty,
      {
        type: 'Program',
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
                    name: 'a'
                  },
                  init: null
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let a,b,c;;);',
      Context.Empty,
      {
        type: 'Program',
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
                    name: 'a'
                  },
                  init: null
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  init: null
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'c'
                  },
                  init: null
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (var a;;) { let a; }',
      Context.OptionDisablesWebCompat,
      {
        type: 'Program',
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
                    name: 'a'
                  },
                  init: null
                }
              ],
              kind: 'var'
            },
            test: null,
            update: null,
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
                  kind: 'let'
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Statements - For (pass)', valids);
});
