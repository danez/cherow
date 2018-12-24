import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Declarations - Functions', () => {

    const inValids: Array < [string, Context] > = [

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
      ['function f(){ function x(){} const x = y; }', Context.OptionDisablesWebCompat],
      ['{ function f() {} ; function f() {} }', Context.OptionDisablesWebCompat], // Fails only Without AnnexB
      ['{ function f() {} ; function f() {} }', Context.Strict], // throws if no AnnexB and in strict mode only
      ['{ if (x) function f() {} ; function f() {} }', Context.Strict], // throws if no AnnexB and in strict mode only
      ['switch (x) {case a: function f(){}; break; case b: function f(){}; break; }', Context.Strict | Context.Module], // throws if no AnnexB and in strict mode only
  ];

  fail('Declarations - Functions (fail)', inValids);

  // valid tests
  const valids: Array < [string, Context, any] > = [

  // ['{ if (x) function f() {} ; function f() {} }', Context.Module, {}],
    ['{ if (x) function f() {} ; function f() {} }', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "BlockStatement",
              "body": [
                  {
                      "type": "IfStatement",
                      "test": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "consequent": {
                          "type": "FunctionDeclaration",
                          "id": {
                              "type": "Identifier",
                              "name": "f"
                          },
                          "params": [],
                          "body": {
                              "type": "BlockStatement",
                              "body": []
                          },
                          "generator": false,
                          "expression": false,
                          "async": false
                      },
                      "alternate": null
                  },
                  {
                      "type": "EmptyStatement"
                  },
                  {
                      "type": "FunctionDeclaration",
                      "id": {
                          "type": "Identifier",
                          "name": "f"
                      },
                      "params": [],
                      "body": {
                          "type": "BlockStatement",
                          "body": []
                      },
                      "generator": false,
                      "expression": false,
                      "async": false
                  }
              ]
          }
      ],
      "sourceType": "script"
  }],
    ['function f([]){ var a }', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [
                  {
                      "type": "ArrayPattern",
                      "elements": []
                  }
              ],
              "body": {
                  "type": "BlockStatement",
                  "body": [
                      {
                          "type": "VariableDeclaration",
                          "declarations": [
                              {
                                  "type": "VariableDeclarator",
                                  "id": {
                                      "type": "Identifier",
                                      "name": "a"
                                  },
                                  "init": null
                              }
                          ],
                          "kind": "var"
                      }
                  ]
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
    ['function f({}){ var a }', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [
                  {
                      "type": "ObjectPattern",
                      "properties": []
                  }
              ],
              "body": {
                  "type": "BlockStatement",
                  "body": [
                      {
                          "type": "VariableDeclaration",
                          "declarations": [
                              {
                                  "type": "VariableDeclarator",
                                  "id": {
                                      "type": "Identifier",
                                      "name": "a"
                                  },
                                  "init": null
                              }
                          ],
                          "kind": "var"
                      }
                  ]
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
    ['function f(a){ var a }', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [
                  {
                      "type": "Identifier",
                      "name": "a"
                  }
              ],
              "body": {
                  "type": "BlockStatement",
                  "body": [
                      {
                          "type": "VariableDeclaration",
                          "declarations": [
                              {
                                  "type": "VariableDeclarator",
                                  "id": {
                                      "type": "Identifier",
                                      "name": "a"
                                  },
                                  "init": null
                              }
                          ],
                          "kind": "var"
                      }
                  ]
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
    ['function f(a,){}', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [
                  {
                      "type": "Identifier",
                      "name": "a"
                  }
              ],
              "body": {
                  "type": "BlockStatement",
                  "body": []
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
    ['function f(a = b,){}', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [
                  {
                      "type": "AssignmentPattern",
                      "left": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "b"
                      }
                  }
              ],
              "body": {
                  "type": "BlockStatement",
                  "body": []
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
    ['function f(a=b){}', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [
                  {
                      "type": "AssignmentPattern",
                      "left": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "b"
                      }
                  }
              ],
              "body": {
                  "type": "BlockStatement",
                  "body": []
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
    ['function f(a=b=c){}', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [
                  {
                      "type": "AssignmentPattern",
                      "left": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "right": {
                          "type": "AssignmentExpression",
                          "operator": "=",
                          "left": {
                              "type": "Identifier",
                              "name": "b"
                          },
                          "right": {
                              "type": "Identifier",
                              "name": "c"
                          }
                      }
                  }
              ],
              "body": {
                  "type": "BlockStatement",
                  "body": []
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
    ['function f(){foo}', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [],
              "body": {
                  "type": "BlockStatement",
                  "body": [
                      {
                          "type": "ExpressionStatement",
                          "expression": {
                              "type": "Identifier",
                              "name": "foo"
                          }
                      }
                  ]
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
    ['function f(){foo;bar}', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [],
              "body": {
                  "type": "BlockStatement",
                  "body": [
                      {
                          "type": "ExpressionStatement",
                          "expression": {
                              "type": "Identifier",
                              "name": "foo"
                          }
                      },
                      {
                          "type": "ExpressionStatement",
                          "expression": {
                              "type": "Identifier",
                              "name": "bar"
                          }
                      }
                  ]
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],/*
    ['function yield() {}', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "yield"
              },
              "params": [],
              "body": {
                  "type": "BlockStatement",
                  "body": []
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],*/
    ['function f(){ var f = 123; if (abc) function f(){} }', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "FunctionDeclaration",
          "params": [],
          "body": {
            "type": "BlockStatement",
            "body": [
              {
                "type": "VariableDeclaration",
                "kind": "var",
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "init": {
                      "type": "Literal",
                      "value": 123
                    },
                    "id": {
                      "type": "Identifier",
                      "name": "f"
                    }
                  }
                ]
              },
              {
                "type": "IfStatement",
                "test": {
                  "type": "Identifier",
                  "name": "abc"
                },
                "consequent": {
                  "type": "FunctionDeclaration",
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": false,
                  "generator": false,
                  "expression": false,
                  "id": {
                    "type": "Identifier",
                    "name": "f"
                  }
                },
                "alternate": null
              }
            ]
          },
          "async": false,
          "generator": false,
          "expression": false,
          "id": {
            "type": "Identifier",
            "name": "f"
          }
        }
      ]
    }],
    ['{ var f = 123; if (abc) function f(){} }', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "BlockStatement",
          "body": [
            {
              "type": "VariableDeclaration",
              "kind": "var",
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "init": {
                    "type": "Literal",
                    "value": 123
                  },
                  "id": {
                    "type": "Identifier",
                    "name": "f"
                  }
                }
              ]
            },
            {
              "type": "IfStatement",
              "test": {
                "type": "Identifier",
                "name": "abc"
              },
              "consequent": {
                "type": "FunctionDeclaration",
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": {
                  "type": "Identifier",
                  "name": "f"
                }
              },
              "alternate": null
            }
          ]
        }
      ]
    }],
    ['var x = a; function x(){};', Context.Empty, {
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
                          "name": "a"
                      }
                  }
              ],
              "kind": "var"
          },
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "x"
              },
              "params": [],
              "body": {
                  "type": "BlockStatement",
                  "body": []
              },
              "generator": false,
              "expression": false,
              "async": false
          },
          {
              "type": "EmptyStatement"
          }
      ],
      "sourceType": "script"
  }],

    ['function f(x) {var x}', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [
                  {
                      "type": "Identifier",
                      "name": "x"
                  }
              ],
              "body": {
                  "type": "BlockStatement",
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
                      }
                  ]
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
    ['function f(x) {{var x}}', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [
                  {
                      "type": "Identifier",
                      "name": "x"
                  }
              ],
              "body": {
                  "type": "BlockStatement",
                  "body": [
                      {
                          "type": "BlockStatement",
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
                              }
                          ]
                      }
                  ]
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
    ['function f() {{var f}}', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [],
              "body": {
                  "type": "BlockStatement",
                  "body": [
                      {
                          "type": "BlockStatement",
                          "body": [
                              {
                                  "type": "VariableDeclaration",
                                  "declarations": [
                                      {
                                          "type": "VariableDeclarator",
                                          "id": {
                                              "type": "Identifier",
                                              "name": "f"
                                          },
                                          "init": null
                                      }
                                  ],
                                  "kind": "var"
                              }
                          ]
                      }
                  ]
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
    ['function f() {let f}', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [],
              "body": {
                  "type": "BlockStatement",
                  "body": [
                      {
                          "type": "VariableDeclaration",
                          "declarations": [
                              {
                                  "type": "VariableDeclarator",
                                  "id": {
                                      "type": "Identifier",
                                      "name": "f"
                                  },
                                  "init": null
                              }
                          ],
                          "kind": "let"
                      }
                  ]
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
    ['function f() {{let f}}', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [],
              "body": {
                  "type": "BlockStatement",
                  "body": [
                      {
                          "type": "BlockStatement",
                          "body": [
                              {
                                  "type": "VariableDeclaration",
                                  "declarations": [
                                      {
                                          "type": "VariableDeclarator",
                                          "id": {
                                              "type": "Identifier",
                                              "name": "f"
                                          },
                                          "init": null
                                      }
                                  ],
                                  "kind": "let"
                              }
                          ]
                      }
                  ]
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],

    ['function f(){ function x(){} var x = y; }', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [],
              "body": {
                  "type": "BlockStatement",
                  "body": [
                      {
                          "type": "FunctionDeclaration",
                          "id": {
                              "type": "Identifier",
                              "name": "x"
                          },
                          "params": [],
                          "body": {
                              "type": "BlockStatement",
                              "body": []
                          },
                          "generator": false,
                          "expression": false,
                          "async": false
                      },
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
                              }
                          ],
                          "kind": "var"
                      }
                  ]
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
    ['function f(){ var x = y; function x(){} }', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [],
              "body": {
                  "type": "BlockStatement",
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
                              }
                          ],
                          "kind": "var"
                      },
                      {
                          "type": "FunctionDeclaration",
                          "id": {
                              "type": "Identifier",
                              "name": "x"
                          },
                          "params": [],
                          "body": {
                              "type": "BlockStatement",
                              "body": []
                          },
                          "generator": false,
                          "expression": false,
                          "async": false
                      }
                  ]
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
    ['function f(a, a) {}', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [
                  {
                      "type": "Identifier",
                      "name": "a"
                  },
                  {
                      "type": "Identifier",
                      "name": "a"
                  }
              ],
              "body": {
                  "type": "BlockStatement",
                  "body": []
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
    ['function f(a, b, a) {}', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [
                  {
                      "type": "Identifier",
                      "name": "a"
                  },
                  {
                      "type": "Identifier",
                      "name": "b"
                  },
                  {
                      "type": "Identifier",
                      "name": "a"
                  }
              ],
              "body": {
                  "type": "BlockStatement",
                  "body": []
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
    ['function f(b, a, a) {}', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [
                  {
                      "type": "Identifier",
                      "name": "b"
                  },
                  {
                      "type": "Identifier",
                      "name": "a"
                  },
                  {
                      "type": "Identifier",
                      "name": "a"
                  }
              ],
              "body": {
                  "type": "BlockStatement",
                  "body": []
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
    ['function f(b, a, b, a = x) {}', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [
                  {
                      "type": "Identifier",
                      "name": "b"
                  },
                  {
                      "type": "Identifier",
                      "name": "a"
                  },
                  {
                      "type": "Identifier",
                      "name": "b"
                  },
                  {
                      "type": "AssignmentPattern",
                      "left": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "x"
                      }
                  }
              ],
              "body": {
                  "type": "BlockStatement",
                  "body": []
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],

    ['var x; { let x; }', Context.Empty, {
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
              "type": "BlockStatement",
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
                      "kind": "let"
                  }
              ]
          }
      ],
      "sourceType": "script"
  }],
    ['function f(x) { function x() {} }', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [
                  {
                      "type": "Identifier",
                      "name": "x"
                  }
              ],
              "body": {
                  "type": "BlockStatement",
                  "body": [
                      {
                          "type": "FunctionDeclaration",
                          "id": {
                              "type": "Identifier",
                              "name": "x"
                          },
                          "params": [],
                          "body": {
                              "type": "BlockStatement",
                              "body": []
                          },
                          "generator": false,
                          "expression": false,
                          "async": false
                      }
                  ]
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
    ['function f(x) { var x; }', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [
                  {
                      "type": "Identifier",
                      "name": "x"
                  }
              ],
              "body": {
                  "type": "BlockStatement",
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
                      }
                  ]
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
    ['function f(){ var f }', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [],
              "body": {
                  "type": "BlockStatement",
                  "body": [
                      {
                          "type": "VariableDeclaration",
                          "declarations": [
                              {
                                  "type": "VariableDeclarator",
                                  "id": {
                                      "type": "Identifier",
                                      "name": "f"
                                  },
                                  "init": null
                              }
                          ],
                          "kind": "var"
                      }
                  ]
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
  ['function f(){ let f }', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "FunctionDeclaration",
            "id": {
                "type": "Identifier",
                "name": "f"
            },
            "params": [],
            "body": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "id": {
                                    "type": "Identifier",
                                    "name": "f"
                                },
                                "init": null
                            }
                        ],
                        "kind": "let"
                    }
                ]
            },
            "generator": false,
            "expression": false,
            "async": false
        }
    ],
    "sourceType": "script"
}],
  ['function f(){ let f; }', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "FunctionDeclaration",
            "id": {
                "type": "Identifier",
                "name": "f"
            },
            "params": [],
            "body": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "VariableDeclaration",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "id": {
                                    "type": "Identifier",
                                    "name": "f"
                                },
                                "init": null
                            }
                        ],
                        "kind": "let"
                    }
                ]
            },
            "generator": false,
            "expression": false,
            "async": false
        }
    ],
    "sourceType": "script"
}],
['function f() {let f}', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "FunctionDeclaration",
          "id": {
              "type": "Identifier",
              "name": "f"
          },
          "params": [],
          "body": {
              "type": "BlockStatement",
              "body": [
                  {
                      "type": "VariableDeclaration",
                      "declarations": [
                          {
                              "type": "VariableDeclarator",
                              "id": {
                                  "type": "Identifier",
                                  "name": "f"
                              },
                              "init": null
                          }
                      ],
                      "kind": "let"
                  }
              ]
          },
          "generator": false,
          "expression": false,
          "async": false
      }
  ],
  "sourceType": "script"
}],
['function f() {var f}', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "FunctionDeclaration",
          "id": {
              "type": "Identifier",
              "name": "f"
          },
          "params": [],
          "body": {
              "type": "BlockStatement",
              "body": [
                  {
                      "type": "VariableDeclaration",
                      "declarations": [
                          {
                              "type": "VariableDeclarator",
                              "id": {
                                  "type": "Identifier",
                                  "name": "f"
                              },
                              "init": null
                          }
                      ],
                      "kind": "var"
                  }
              ]
          },
          "generator": false,
          "expression": false,
          "async": false
      }
  ],
  "sourceType": "script"
}],
['function f(){} function f(){}', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "FunctionDeclaration",
          "id": {
              "type": "Identifier",
              "name": "f"
          },
          "params": [],
          "body": {
              "type": "BlockStatement",
              "body": []
          },
          "generator": false,
          "expression": false,
          "async": false
      },
      {
          "type": "FunctionDeclaration",
          "id": {
              "type": "Identifier",
              "name": "f"
          },
          "params": [],
          "body": {
              "type": "BlockStatement",
              "body": []
          },
          "generator": false,
          "expression": false,
          "async": false
      }
  ],
  "sourceType": "script"
}],
['function g() {  function f(){} function f(){} }', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "FunctionDeclaration",
          "id": {
              "type": "Identifier",
              "name": "g"
          },
          "params": [],
          "body": {
              "type": "BlockStatement",
              "body": [
                  {
                      "type": "FunctionDeclaration",
                      "id": {
                          "type": "Identifier",
                          "name": "f"
                      },
                      "params": [],
                      "body": {
                          "type": "BlockStatement",
                          "body": []
                      },
                      "generator": false,
                      "expression": false,
                      "async": false
                  },
                  {
                      "type": "FunctionDeclaration",
                      "id": {
                          "type": "Identifier",
                          "name": "f"
                      },
                      "params": [],
                      "body": {
                          "type": "BlockStatement",
                          "body": []
                      },
                      "generator": false,
                      "expression": false,
                      "async": false
                  }
              ]
          },
          "generator": false,
          "expression": false,
          "async": false
      }
  ],
  "sourceType": "script"
}],

['function f(x) { { const x = y } }', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "FunctionDeclaration",
          "id": {
              "type": "Identifier",
              "name": "f"
          },
          "params": [
              {
                  "type": "Identifier",
                  "name": "x"
              }
          ],
          "body": {
              "type": "BlockStatement",
              "body": [
                  {
                      "type": "BlockStatement",
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
                                  }
                              ],
                              "kind": "const"
                          }
                      ]
                  }
              ]
          },
          "generator": false,
          "expression": false,
          "async": false
      }
  ],
  "sourceType": "script"
}],
    ['function f(x) { { let x } }', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [
                  {
                      "type": "Identifier",
                      "name": "x"
                  }
              ],
              "body": {
                  "type": "BlockStatement",
                  "body": [
                      {
                          "type": "BlockStatement",
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
                                  "kind": "let"
                              }
                          ]
                      }
                  ]
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }],
     ['function f(f) { }', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "FunctionDeclaration",
              "id": {
                  "type": "Identifier",
                  "name": "f"
              },
              "params": [
                  {
                      "type": "Identifier",
                      "name": "f"
                  }
              ],
              "body": {
                  "type": "BlockStatement",
                  "body": []
              },
              "generator": false,
              "expression": false,
              "async": false
          }
      ],
      "sourceType": "script"
  }]
];

pass('Declarations - Functions (pass)', valids);

});
