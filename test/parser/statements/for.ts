import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - For', () => {

  const inValids: Array < [string, Context] > = [

    // Bindings

   ['for (let x;;) { var x; }', Context.OptionDisablesWebCompat],
   ['for (const x = y;;) { var x; }', Context.OptionDisablesWebCompat],
   ['for (let x in y) { var x; }', Context.OptionDisablesWebCompat],
   ['for (const x in y) { var x; }', Context.OptionDisablesWebCompat],
   ['for (let x of y) { var x; }', Context.OptionDisablesWebCompat],
   ['for (const a;;);', Context.OptionDisablesWebCompat],
   ['for (const a,b,c;;);', Context.OptionDisablesWebCompat],
   ['for (let a, b, x, d;;) { var foo; var bar; { var doo, x, ee; } }', Context.OptionDisablesWebCompat],
];

fail('Statements - For (fail)', inValids);

  // valid tests
const valids: Array < [string, Context, any] > = [

  ['for (;;);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "body": [
        {
            "type": "ForStatement",
            "init": null,
            "test": null,
            "update": null,
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],
  ['for (a;;);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "init": {
          "type": "Identifier",
          "name": "a"
        },
        "test": null,
        "update": null
      }
    ]
  }],
   ['for (;b;);', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ForStatement",
            "init": null,
            "test": {
                "type": "Identifier",
                "name": "b"
            },
            "update": null,
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],
   ['for (;;c);', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ForStatement",
            "init": null,
            "test": null,
            "update": {
                "type": "Identifier",
                "name": "c"
            },
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],
   ['for (a;b;);', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ForStatement",
            "init": {
                "type": "Identifier",
                "name": "a"
            },
            "test": {
                "type": "Identifier",
                "name": "b"
            },
            "update": null,
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],
   ['for (a;;c);', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ForStatement",
            "init": {
                "type": "Identifier",
                "name": "a"
            },
            "test": null,
            "update": {
                "type": "Identifier",
                "name": "c"
            },
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],
   ['for (;b;c);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "init": null,
        "test": {
          "type": "Identifier",
          "name": "b"
        },
        "update": {
          "type": "Identifier",
          "name": "c"
        }
      }
    ]
  }],
   ['for (var a;;);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "init": {
          "type": "VariableDeclaration",
          "kind": "var",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "init": null,
              "id": {
                "type": "Identifier",
                "name": "a"
              }
            }
          ]
        },
        "test": null,
        "update": null
      }
    ]
  }],
   ['for (var a,b,c;;);', Context.Empty, {
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
                            "name": "a"
                        },
                        "init": null
                    },
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "b"
                        },
                        "init": null
                    },
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "c"
                        },
                        "init": null
                    }
                ],
                "kind": "var"
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
   ['for (let a;;);', Context.Empty, {
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
                            "name": "a"
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
   ['for (let a,b,c;;);', Context.Empty, {
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
                            "name": "a"
                        },
                        "init": null
                    },
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "b"
                        },
                        "init": null
                    },
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "c"
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
  ['for (var a;;) { let a; }', Context.OptionDisablesWebCompat, {
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
                          "name": "a"
                      },
                      "init": null
                  }
              ],
              "kind": "var"
          },
          "test": null,
          "update": null,
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
                      "kind": "let"
                  }
              ]
          }
      }
  ],
  "sourceType": "script"
}]
];

pass('Statements - For (pass)', valids);

});
