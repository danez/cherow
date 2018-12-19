import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - For in', () => {

  const inValids: Array < [string, Context] > = [

    // Bindings

   ['for (let in x) {}', Context.Strict],
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

  ['for (a in b);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "Identifier",
          "name": "a"
        },
        "right": {
          "type": "Identifier",
          "name": "b"
        }
      }
    ]
  }],
  ['for (a in b); for (a in b); for (a in b);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "Identifier",
          "name": "a"
        },
        "right": {
          "type": "Identifier",
          "name": "b"
        }
      },
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "Identifier",
          "name": "a"
        },
        "right": {
          "type": "Identifier",
          "name": "b"
        }
      },
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "Identifier",
          "name": "a"
        },
        "right": {
          "type": "Identifier",
          "name": "b"
        }
      }
    ]
  }],
   ['for (let a in b);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "VariableDeclaration",
          "kind": "let",
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
        "right": {
          "type": "Identifier",
          "name": "b"
        }
      }
    ]
  }],
   ['for (const a in b);', Context.Empty, {
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
                            "type": "Identifier",
                            "name": "a"
                        },
                        "init": null
                    }
                ],
                "kind": "const"
            },
            "right": {
                "type": "Identifier",
                "name": "b"
            },
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],

   ['for (let in x) {}', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ForInStatement",
            "left": {
                "type": "Identifier",
                "name": "let"
            },
            "right": {
                "type": "Identifier",
                "name": "x"
            },
            "body": {
                "type": "BlockStatement",
                "body": []
            }
        }
    ],
    "sourceType": "script"
}],
   ['for (var a = b in c);', Context.Empty, {
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
                            "type": "Identifier",
                            "name": "a"
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "b"
                        }
                    }
                ],
                "kind": "var"
            },
            "right": {
                "type": "Identifier",
                "name": "c"
            },
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}]
];

pass('Statements - For In (pass)', valids);

});
