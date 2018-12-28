import { Context } from '../../../src/parser/common';
import { pass, fail } from '../../test-utils';

describe('Declarations - Let', () => {
  const inValids: Array<[string, Context]> = [
    // Bindings

    ['const a = b, a = c', Context.Empty],
    ['const a = b; const a = c', Context.Empty],
    ['let a = b; const a = c', Context.Empty],
    ['const a = b; let a = c', Context.Empty],
    ['var x = a; let x = b;', Context.Empty],
    ['var x = a; const x = b;', Context.Empty],
    ['let x = a; let x = b;', Context.Empty],
    ['let x = a; const x = b;', Context.Empty],
    ['var x; let x;', Context.Empty],
    ['let x; var x;', Context.Empty],
    ['let x; { var x; }', Context.Empty],
    ['let x; {var x}', Context.Empty],
    ['{ let f; let f; }', Context.Empty],
    ['{ let f; function f() {} }', Context.Empty],
    ['{ let f; const f = b; }', Context.Empty],

    // Bindings - Blockstatement

    ['let x; { var x; var y; }', Context.Empty],
    ['let x; { var x; }', Context.Empty],

    // General

    ['let class = foo', Context.Empty],
    ['let break = foo', Context.Empty]

    //['let [foo];', Context.Empty],
    // ['let [foo = x];', Context.Empty],
    //    ['let [foo], bar;', Context.Empty],
    //['let foo, [bar];', Context.Empty],
    //    ['let [foo:bar] = obj;', Context.Empty],
  ];

  fail('Declarations - Let (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'let foo, bar',
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
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let [] = x;',
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
          }
        ],
        sourceType: 'script'
      }
    ], /*
    ['let [,] = x;', Context.Empty, {
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
              "kind": "let"
          }
      ],
      "sourceType": "script"
  }],*/
    ['let [foo] = arr;', Context.Empty, {
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
                          "name": "arr"
                      }
                  }
              ],
              "kind": "let"
          }
      ],
      "sourceType": "script"
  }],
    ['let [foo] = arr, bar = arr2;', Context.Empty, {
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
                          "name": "arr"
                      }
                  },
                  {
                      "type": "VariableDeclarator",
                      "id": {
                          "type": "Identifier",
                          "name": "bar"
                      },
                      "init": {
                          "type": "Identifier",
                          "name": "arr2"
                      }
                  }
              ],
              "kind": "let"
          }
      ],
      "sourceType": "script"
  }],
   ['let foo, [bar] = arr2;', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "VariableDeclaration",
              "declarations": [
                  {
                      "type": "VariableDeclarator",
                      "id": {
                          "type": "Identifier",
                          "name": "foo"
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
          }
      ],
      "sourceType": "script"
  }],
    ['let [foo=a] = arr;', Context.Empty, {
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
                          "name": "arr"
                      }
                  }
              ],
              "kind": "let"
          }
      ],
      "sourceType": "script"
  }],
    ['let [foo=a, bar] = arr;', Context.Empty, {
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
                          "name": "arr"
                      }
                  }
              ],
              "kind": "let"
          }
      ],
      "sourceType": "script"
  }],
    ['let [...foo] = obj;', Context.Empty, {
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
          }
      ],
      "sourceType": "script"
  }],
    ['let [foo, ...bar] = obj;', Context.Empty, {
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
              "kind": "let"
          }
      ],
      "sourceType": "script"
  }],
    ['let [x, ...[foo, bar]] = obj;', Context.Empty, {
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
                                  "name": "x"
                              },
                              {
                                  "type": "RestElement",
                                  "argument": {
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
          }
      ],
      "sourceType": "script"
  }],
    ['let [a=[...b], ...c] = obj;', Context.Empty, {
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
                                      "name": "a"
                                  },
                                  "right": {
                                      "type": "ArrayExpression",
                                      "elements": [
                                          {
                                              "type": "SpreadElement",
                                              "argument": {
                                                  "type": "Identifier",
                                                  "name": "b"
                                              }
                                          }
                                      ]
                                  }
                              },
                              {
                                  "type": "RestElement",
                                  "argument": {
                                      "type": "Identifier",
                                      "name": "c"
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
          }
      ],
      "sourceType": "script"
  }],
    [
      'let {} = obj;',
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
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let {x} = obj;',
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
                        type: 'Identifier',
                        name: 'x'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let {x,} = obj;',
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
                        type: 'Identifier',
                        name: 'x'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'obj'
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ], 
    ['let {x, y} = obj;', Context.Empty, {
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
                                      "name": "y"
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
          }
      ],
      "sourceType": "script"
  }],
    ['let {x} = a, {y} = obj;', Context.Empty, {
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
                              }
                          ]
                      },
                      "init": {
                          "type": "Identifier",
                          "name": "a"
                      }
                  },
                  {
                      "type": "VariableDeclarator",
                      "id": {
                          "type": "ObjectPattern",
                          "properties": [
                              {
                                  "type": "Property",
                                  "key": {
                                      "type": "Identifier",
                                      "name": "y"
                                  },
                                  "computed": false,
                                  "value": {
                                      "type": "Identifier",
                                      "name": "y"
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
          }
      ],
      "sourceType": "script"
  }],
    ['let {x} = a, y = obj;', Context.Empty, {
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
                              }
                          ]
                      },
                      "init": {
                          "type": "Identifier",
                          "name": "a"
                      }
                  },
                  {
                      "type": "VariableDeclarator",
                      "id": {
                          "type": "Identifier",
                          "name": "y"
                      },
                      "init": {
                          "type": "Identifier",
                          "name": "obj"
                      }
                  }
              ],
              "kind": "let"
          }
      ],
      "sourceType": "script"
  }],
    ['let x, {y} = obj;', Context.Empty, {
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
                          "type": "ObjectPattern",
                          "properties": [
                              {
                                  "type": "Property",
                                  "key": {
                                      "type": "Identifier",
                                      "name": "y"
                                  },
                                  "computed": false,
                                  "value": {
                                      "type": "Identifier",
                                      "name": "y"
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
          }
      ],
      "sourceType": "script"
  }],
    ['let {x : y} = obj;', Context.Empty, {
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
          }
      ],
      "sourceType": "script"
  }],
    ['let {x : y, z} = obj;', Context.Empty, {
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
                                      "name": "z"
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
          }
      ],
      "sourceType": "script"
  }],
    ['let {x : y, z : a} = obj;', Context.Empty, {
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
              "kind": "let"
          }
      ],
      "sourceType": "script"
  }],
    ['let {x : y, z, a : b = c} = obj;', Context.Empty, {
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
                                      "name": "z"
                                  },
                                  "kind": "init",
                                  "method": false,
                                  "shorthand": true
                              },
                              {
                                  "type": "Property",
                                  "key": {
                                      "type": "Identifier",
                                      "name": "a"
                                  },
                                  "computed": false,
                                  "value": {
                                      "type": "AssignmentPattern",
                                      "left": {
                                          "type": "Identifier",
                                          "name": "b"
                                      },
                                      "right": {
                                          "type": "Identifier",
                                          "name": "c"
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
                          "name": "obj"
                      }
                  }
              ],
              "kind": "let"
          }
      ],
      "sourceType": "script"
  }],
    ['let {[x]: y} = z;', Context.Empty, {
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
                                  "computed": true,
                                  "value": {
                                      "type": "Identifier",
                                      "name": "y"
                                  },
                                  "kind": "init",
                                  "method": false,
                                  "shorthand": false
                              }
                          ]
                      },
                      "init": {
                          "type": "Identifier",
                          "name": "z"
                      }
                  }
              ],
              "kind": "let"
          }
      ],
      "sourceType": "script"
  }],
/**    ['let {[x]: y = z} = a;', Context.Empty, {
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
                                  "computed": true,
                                  "value": {
                                      "type": "AssignmentPattern",
                                      "left": {
                                          "type": "Identifier",
                                          "name": "y"
                                      },
                                      "right": {
                                          "type": "Identifier",
                                          "name": "z"
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
                          "name": "a"
                      }
                  }
              ],
              "kind": "let"
          }
      ],
      "sourceType": "script"
  }], *//*
    ['let {a, [x]: y} = a;', Context.Empty, {
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
                                        "name": "a"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": true
                                },
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x"
                                    },
                                    "computed": true,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "y"
                                    },
                                    "kind": "init",
                                    "method": false,
                                    "shorthand": false
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "a"
                        }
                    }
                ],
                "kind": "let"
            }
        ],
        "sourceType": "script"
    }],*/
    [
      'let foo;',
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
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let foo = bar;',
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
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Declarations - Const (pass)', valids);
});
