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

      // Block scope

      ['{ function f() {} { var f; } }', Context.Empty],
      ['{ function* f() {} function f() {} }', Context.Empty],
      ['{ function f() {} var f; }', Context.Empty],

      // Duplicate function args with explicit directive

      ['function f(a, a) {"use strict"}', Context.Empty],
      ['function f(a, b, a) {"use strict"}', Context.Empty],
      ['function f(b, a, a) {"use strict"}', Context.Empty],
      ['function f(a, a, b) {"use strict"}', Context.Empty],
      ['function f(b, a, b, a) {"use strict"}', Context.Empty],
      ['function f(b, a, b, a = x) {"use strict"}', Context.Empty],

      // Duplicate args with locale binding

      ['let x; var x;', Context.Empty],
      ['let x; { var x; }', Context.Empty],
      ['{ var x; } let x;', Context.Empty],


     ['{ function f(){} function f(){} }', Context.Empty],


      // ['function f(x) { let x }', Context.Empty],
      // ['function f(x) { const x = y }', Context.Empty],
      ['function f(){ let x; var x; }', Context.Empty],
      ['function f(){ var x; let x; }', Context.Empty],
      ['function f(){ const x = y; var x; }', Context.Empty],
      ['function f(){ var x; const x = y; }', Context.Empty],
      ['function f(){ let x; function x(){} }', Context.Empty],
      ['let x; {var x}', Context.Empty],
      ['function f(){ function x(){} let x; }', Context.Empty],
      ['function f(){ const x = y; function x(){} }', Context.Empty],
      ['unction f(){ function x(){} const x = y; }', Context.Empty],
      ['{ function f() {} ; function f() {} }', Context.Empty], // Fails only Without AnnexB
      ['function f() {} ; function f() {}', Context.Strict], // Fails only Without AnnexB and in strict mode
      ['{ function f() {} ; function f() {} }', Context.Strict], // throws if no AnnexB and in strict mode only
  ];

  fail('Declarations - Functions (fail)', inValids);

/*
  ['function f(a, a) {}', Context.Empty],
      // Explicit directive

      ['function f(a, a) {"use strict"}', Context.Empty],
      ['function f(a, b, a) {"use strict"}', Context.Empty],
      ['function f(b, a, a) {"use strict"}', Context.Empty],
      ['function f(a, a, b) {"use strict"}', Context.Empty],
      ['function f(b, a, b, a) {"use strict"}', Context.Empty],
      ['function f(b, a, b, a = x) {"use strict"}', Context.Empty],
      */

  // valid tests
  const valids: Array < [string, Context, any] > = [
/*
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
*/
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
['function f(){} function f(){}', Context.OptionsWebCompat, {
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
