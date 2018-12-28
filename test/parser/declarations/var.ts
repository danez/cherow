import { Context } from '../../../src/parser/common';
import { pass, fail } from '../../test-utils';

describe('Declarations - Var', () => {
  const inValids: Array<[string, Context]> = [
    // Bindings

    ['var a = b; const a = c', Context.Empty],
    ['const a = b; var a = c', Context.Empty],
    ['{ var f; function f() {} }', Context.Empty],

    // Bindings - Blockstatement

    ['{ let x; var x; }', Context.Empty],

    // General

    ['var class = foo', Context.Empty],
    ['var break = foo', Context.Empty],

    // Strict mode only

    ['var implements = foo', Context.Strict],

    // General

    ['var while = x', Context.Empty],
    ['var null = x', Context.Empty],
    ['var import = x', Context.Empty],
    ['var function = x', Context.Empty],
    ['var enum = x', Context.Empty],
    ['var delete = x', Context.Empty],
    ['var continue = x', Context.Empty],
    ['var break = x', Context.Empty],
    ['var const = x', Context.Empty],

    ['function f(enum) {}', Context.Empty],
    ['function fh({x: break}) {}', Context.Empty],
    ['var const = x', Context.Empty],
    ['var const = x', Context.Empty]
  ];

  fail('Declarations - Var (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    
    ['var [,] = x;', Context.Empty, {
      "type": "Program",
      "body": [
          {
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
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
    ['var [,,] = x;', Context.Empty, {
      "type": "Program",
      "body": [
          {
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
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
    ['var {x, y : z} = obj;', Context.Empty, {
      "type": "Program",
      "body": [
          {
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
                              },
                              {
                                  "type": "Property",
                                  "key": {
                                      "type": "Identifier",
                                      "name": "y"
                                  },
                                  "computed": false,
                                  "value": {
                                      "type": "Identifier",
                                      "name": "z"
                                  },
                                  "kind": "init",
                                  "method": false,
                                  "shorthand": false
                              }
                          ]
                      },
                      "init": {
                          "type": "Identifier",
                          "name": "obj"
                      }
                  }
              ],
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
     ['var {x : y, z : a} = obj;', Context.Empty, {
      "type": "Program",
      "body": [
          {
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
                                      "name": "y"
                                  },
                                  "kind": "init",
                                  "method": false,
                                  "shorthand": false
                              },
                              {
                                  "type": "Property",
                                  "key": {
                                      "type": "Identifier",
                                      "name": "z"
                                  },
                                  "computed": false,
                                  "value": {
                                      "type": "Identifier",
                                      "name": "a"
                                  },
                                  "kind": "init",
                                  "method": false,
                                  "shorthand": false
                              }
                          ]
                      },
                      "init": {
                          "type": "Identifier",
                          "name": "obj"
                      }
                  }
              ],
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
    [
      'var\nfoo',
      Context.Empty,
      {
        body: [
          {
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
            kind: 'var',
            type: 'VariableDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
      ['var [...bar] = obj;', Context.Empty, {
      "type": "Program",
      "body": [
          {
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
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
   ['var [foo, ...bar] = obj;', Context.Empty, {
      "type": "Program",
      "body": [
          {
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
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
   ['var [foo=a,bar=b] = x;', Context.Empty, {
    "type": "Program",
    "body": [
        {
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
                        "name": "x"
                    }
                }
            ],
            "kind": "var"
        }
    ],
    "sourceType": "script"
}],
   ['var [foo,,] = x;', Context.Empty, {
      "type": "Program",
      "body": [
          {
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
                              null
                          ]
                      },
                      "init": {
                          "type": "Identifier",
                          "name": "x"
                      }
                  }
              ],
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
     ['var [,foo] = x;', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "VariableDeclaration",
              "declarations": [
                  {
                      "type": "VariableDeclarator",
                      "id": {
                          "type": "ArrayPattern",
                          "elements": [
                              null,
                              {
                                  "type": "Identifier",
                                  "name": "foo"
                              }
                          ]
                      },
                      "init": {
                          "type": "Identifier",
                          "name": "x"
                      }
                  }
              ],
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
     ['var [,,foo] = x;', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "VariableDeclaration",
              "declarations": [
                  {
                      "type": "VariableDeclarator",
                      "id": {
                          "type": "ArrayPattern",
                          "elements": [
                              null,
                              null,
                              {
                                  "type": "Identifier",
                                  "name": "foo"
                              }
                          ]
                      },
                      "init": {
                          "type": "Identifier",
                          "name": "x"
                      }
                  }
              ],
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
    ['var [foo,bar] = x;', Context.Empty, {
      "type": "Program",
      "body": [
          {
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
                                  "type": "Identifier",
                                  "name": "bar"
                              }
                          ]
                      },
                      "init": {
                          "type": "Identifier",
                          "name": "x"
                      }
                  }
              ],
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
    ['var [foo] = x, [foo] = y;', Context.Empty, {
      "type": "Program",
      "body": [
          {
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
                          "name": "x"
                      }
                  },
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
                          "name": "y"
                      }
                  }
              ],
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
    ['var [foo] = x, b;', Context.Empty, {
      "type": "Program",
      "body": [
          {
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
                          "name": "x"
                      }
                  },
                  {
                      "type": "VariableDeclarator",
                      "id": {
                          "type": "Identifier",
                          "name": "b"
                      },
                      "init": null
                  }
              ],
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
     ['var [foo] = x, b = y;', Context.Empty, {
      "type": "Program",
      "body": [
          {
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
                          "name": "x"
                      }
                  },
                  {
                      "type": "VariableDeclarator",
                      "id": {
                          "type": "Identifier",
                          "name": "b"
                      },
                      "init": {
                          "type": "Identifier",
                          "name": "y"
                      }
                  }
              ],
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
     ['var x, [foo] = y;', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "VariableDeclaration",
              "declarations": [
                  {
                      "type": "VariableDeclarator",
                      "id": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "init": null
                  },
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
                          "name": "y"
                      }
                  }
              ],
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
     ['var x = y, [foo] = z;', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "VariableDeclaration",
              "declarations": [
                  {
                      "type": "VariableDeclarator",
                      "id": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "init": {
                          "type": "Identifier",
                          "name": "y"
                      }
                  },
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
                          "name": "z"
                      }
                  }
              ],
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
      ['var [foo=a] = c;', Context.Empty, {
      "type": "Program",
      "body": [
          {
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
                          "name": "c"
                      }
                  }
              ],
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }], 
    ['var [foo=a,bar] = x;', Context.Empty, {
      "type": "Program",
      "body": [
          {
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
                          "name": "x"
                      }
                  }
              ],
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
   [
      'var {} = x;',
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
                  type: 'ObjectPattern',
                  properties: []
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var {foo} = x;',
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
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var {foo,} = x;',
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
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var {foo} = x, {foo} = y;',
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
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'VariableDeclarator',
                id: {
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
                init: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var {foo} = x, b;',
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
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'b'
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
      'var {foo} = x, b = y;',
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
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'b'
                },
                init: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var x, {foo} = y;',
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
              },
              {
                type: 'VariableDeclarator',
                id: {
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
                init: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var x = y, {foo} = z;',
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
                  name: 'y'
                }
              },
              {
                type: 'VariableDeclarator',
                id: {
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
                init: {
                  type: 'Identifier',
                  name: 'z'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var {foo=a} = x;',
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
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var {foo=a,bar} = x;',
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
                      kind: 'init',
                      method: false,
                      shorthand: true
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'bar'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'bar'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var {foo,bar=b} = x;',
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
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'bar'
                      },
                      computed: false,
                      value: {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'bar'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'b'
                        }
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var {foo=a,bar=b} = x;',
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
                      kind: 'init',
                      method: false,
                      shorthand: true
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'bar'
                      },
                      computed: false,
                      value: {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'bar'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'b'
                        }
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
     ['var {foo:a} = x;', Context.Empty, {
      "type": "Program",
      "body": [
          {
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
                                      "name": "foo"
                                  },
                                  "computed": false,
                                  "value": {
                                      "type": "Identifier",
                                      "name": "a"
                                  },
                                  "kind": "init",
                                  "method": false,
                                  "shorthand": false
                              }
                          ]
                      },
                      "init": {
                          "type": "Identifier",
                          "name": "x"
                      }
                  }
              ],
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
    ['var {foo:a,bar} = x;', Context.Empty, {
      "type": "Program",
      "body": [
          {
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
                                      "name": "foo"
                                  },
                                  "computed": false,
                                  "value": {
                                      "type": "Identifier",
                                      "name": "a"
                                  },
                                  "kind": "init",
                                  "method": false,
                                  "shorthand": false
                              },
                              {
                                  "type": "Property",
                                  "key": {
                                      "type": "Identifier",
                                      "name": "bar"
                                  },
                                  "computed": false,
                                  "value": {
                                      "type": "Identifier",
                                      "name": "bar"
                                  },
                                  "kind": "init",
                                  "method": false,
                                  "shorthand": true
                              }
                          ]
                      },
                      "init": {
                          "type": "Identifier",
                          "name": "x"
                      }
                  }
              ],
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
    ['var {foo,bar:b} = x;', Context.Empty, {
      "type": "Program",
      "body": [
          {
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
                                      "name": "foo"
                                  },
                                  "computed": false,
                                  "value": {
                                      "type": "Identifier",
                                      "name": "foo"
                                  },
                                  "kind": "init",
                                  "method": false,
                                  "shorthand": true
                              },
                              {
                                  "type": "Property",
                                  "key": {
                                      "type": "Identifier",
                                      "name": "bar"
                                  },
                                  "computed": false,
                                  "value": {
                                      "type": "Identifier",
                                      "name": "b"
                                  },
                                  "kind": "init",
                                  "method": false,
                                  "shorthand": false
                              }
                          ]
                      },
                      "init": {
                          "type": "Identifier",
                          "name": "x"
                      }
                  }
              ],
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
    ['var {foo:a=b, bar:c=d} = x;', Context.Empty, {
      "type": "Program",
      "body": [
          {
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
                                      "name": "foo"
                                  },
                                  "computed": false,
                                  "value": {
                                      "type": "AssignmentPattern",
                                      "left": {
                                          "type": "Identifier",
                                          "name": "a"
                                      },
                                      "right": {
                                          "type": "Identifier",
                                          "name": "b"
                                      }
                                  },
                                  "kind": "init",
                                  "method": false,
                                  "shorthand": false
                              },
                              {
                                  "type": "Property",
                                  "key": {
                                      "type": "Identifier",
                                      "name": "bar"
                                  },
                                  "computed": false,
                                  "value": {
                                      "type": "AssignmentPattern",
                                      "left": {
                                          "type": "Identifier",
                                          "name": "c"
                                      },
                                      "right": {
                                          "type": "Identifier",
                                          "name": "d"
                                      }
                                  },
                                  "kind": "init",
                                  "method": false,
                                  "shorthand": false
                              }
                          ]
                      },
                      "init": {
                          "type": "Identifier",
                          "name": "x"
                      }
                  }
              ],
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
    [
      'var {foo};',
      Context.Empty,
      {
        body: [
          {
            declarations: [
              {
                id: {
                  properties: [
                    {
                      computed: false,
                      key: {
                        name: 'foo',
                        type: 'Identifier'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true,
                      type: 'Property',
                      value: {
                        name: 'foo',
                        type: 'Identifier'
                      }
                    }
                  ],
                  type: 'ObjectPattern'
                },
                init: null,
                type: 'VariableDeclarator'
              }
            ],
            kind: 'var',
            type: 'VariableDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    // ['var foo = { x = 10 } = {};', Context.Empty, {}],
    [
      'var foo = { x = 10 } = {};',
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
                            value: 10
                          }
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
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var foo = { q } = { x = 10 } = {};',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'q'
                        },
                        value: {
                          type: 'Identifier',
                          name: 'q'
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true
                      }
                    ]
                  },
                  operator: '=',
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
                            type: 'Identifier',
                            name: 'x'
                          },
                          value: {
                            type: 'AssignmentPattern',
                            left: {
                              type: 'Identifier',
                              name: 'x'
                            },
                            right: {
                              type: 'Literal',
                              value: 10
                            }
                          },
                          kind: 'init',
                          computed: false,
                          method: false,
                          shorthand: true
                        }
                      ]
                    },
                    operator: '=',
                    right: {
                      type: 'ObjectExpression',
                      properties: []
                    }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'foo'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'var foo; foo = { x = 10 } = {};',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
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
                  name: 'foo'
                }
              }
            ]
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'foo'
              },
              operator: '=',
              right: {
                type: 'AssignmentExpression',
                left: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      value: {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        right: {
                          type: 'Literal',
                          value: 10
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                operator: '=',
                right: {
                  type: 'ObjectExpression',
                  properties: []
                }
              }
            }
          }
        ]
      }
    ],
    [
      'var foo; foo = { q } = { x = 10 } = {};',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
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
                  name: 'foo'
                }
              }
            ]
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'foo'
              },
              operator: '=',
              right: {
                type: 'AssignmentExpression',
                left: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'q'
                      },
                      value: {
                        type: 'Identifier',
                        name: 'q'
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                operator: '=',
                right: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        value: {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'Identifier',
                            name: 'x'
                          },
                          right: {
                            type: 'Literal',
                            value: 10
                          }
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true
                      }
                    ]
                  },
                  operator: '=',
                  right: {
                    type: 'ObjectExpression',
                    properties: []
                  }
                }
              }
            }
          }
        ]
      }
    ],
    [
      'var x; ({ x = 10 } = {});',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
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
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    value: {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      right: {
                        type: 'Literal',
                        value: 10
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true
                  }
                ]
              },
              operator: '=',
              right: {
                type: 'ObjectExpression',
                properties: []
              }
            }
          }
        ]
      }
    ],
    [
      'var q, x; ({ q } = { x = 10 } = {});',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
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
                  name: 'q'
                }
              },
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'q'
                    },
                    value: {
                      type: 'Identifier',
                      name: 'q'
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true
                  }
                ]
              },
              operator: '=',
              right: {
                type: 'AssignmentExpression',
                left: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      value: {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        right: {
                          type: 'Literal',
                          value: 10
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                operator: '=',
                right: {
                  type: 'ObjectExpression',
                  properties: []
                }
              }
            }
          }
        ]
      }
    ],/*
     ['var x; [{ x = 10 } = {}]', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "VariableDeclaration",
          "kind": "var",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "init": null,
              "id": {
                "type": "Identifier",
                "name": "x"
              }
            }
          ]
        },
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "ArrayExpression",
            "elements": [
              {
                "type": "AssignmentExpression",
                "left": {
                  "type": "ObjectPattern",
                  "properties": [
                    {
                      "type": "Property",
                      "key": {
                        "type": "Identifier",
                        "name": "x"
                      },
                      "value": {
                        "type": "AssignmentPattern",
                        "left": {
                          "type": "Identifier",
                          "name": "x"
                        },
                        "right": {
                          "type": "Literal",
                          "value": 10
                        }
                      },
                      "kind": "init",
                      "computed": false,
                      "method": false,
                      "shorthand": true
                    }
                  ]
                },
                "operator": "=",
                "right": {
                  "type": "ObjectExpression",
                  "properties": []
                }
              }
            ]
          }
        }
      ]
    }],*/
     ['var x; (true ? { x = true } = {} : { x = false } = {})', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "VariableDeclaration",
              "declarations": [
                  {
                      "type": "VariableDeclarator",
                      "id": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "init": null
                  }
              ],
              "kind": "var"
          },
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "ConditionalExpression",
                  "test": {
                      "type": "Literal",
                      "value": true,
                  },
                  "consequent": {
                      "type": "AssignmentExpression",
                      "operator": "=",
                      "left": {
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
                                      "type": "AssignmentPattern",
                                      "left": {
                                          "type": "Identifier",
                                          "name": "x"
                                      },
                                      "right": {
                                          "type": "Literal",
                                          "value": true,
                                      }
                                  },
                                  "kind": "init",
                                  "method": false,
                                  "shorthand": true
                              }
                          ]
                      },
                      "right": {
                          "type": "ObjectExpression",
                          "properties": []
                      }
                  },
                  "alternate": {
                      "type": "AssignmentExpression",
                      "operator": "=",
                      "left": {
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
                                      "type": "AssignmentPattern",
                                      "left": {
                                          "type": "Identifier",
                                          "name": "x"
                                      },
                                      "right": {
                                          "type": "Literal",
                                          "value": false,
                                      }
                                  },
                                  "kind": "init",
                                  "method": false,
                                  "shorthand": true
                              }
                          ]
                      },
                      "right": {
                          "type": "ObjectExpression",
                          "properties": []
                      }
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    [
      'var x; (({ x = 10 } = { x = 20 } = {}) => x)({})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
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
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'Identifier',
                  name: 'x'
                },
                params: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
                            type: 'Identifier',
                            name: 'x'
                          },
                          value: {
                            type: 'AssignmentPattern',
                            left: {
                              type: 'Identifier',
                              name: 'x'
                            },
                            right: {
                              type: 'Literal',
                              value: 10
                            }
                          },
                          kind: 'init',
                          computed: false,
                          method: false,
                          shorthand: true
                        }
                      ]
                    },
                    right: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'ObjectPattern',
                        properties: [
                          {
                            type: 'Property',
                            key: {
                              type: 'Identifier',
                              name: 'x'
                            },
                            value: {
                              type: 'AssignmentPattern',
                              left: {
                                type: 'Identifier',
                                name: 'x'
                              },
                              right: {
                                type: 'Literal',
                                value: 20
                              }
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: true
                          }
                        ]
                      },
                      operator: '=',
                      right: {
                        type: 'ObjectExpression',
                        properties: []
                      }
                    }
                  }
                ],
                id: null,
                async: false,
                generator: false,
                expression: true
              },
              arguments: [
                {
                  type: 'ObjectExpression',
                  properties: []
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'var { x = 10 } = (o = { x = 20 } = {});',
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
                          value: 10
                        }
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'AssignmentExpression',
                  operator: '=',
                  left: {
                    type: 'Identifier',
                    name: 'o'
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
                              value: 20
                            }
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
                  }
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var x; { let x; var y; }',
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
              },
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
              }
            ]
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var foo;',
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
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var foo = bar;',
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
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Declarations - Var (pass)', valids);
});
