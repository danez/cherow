import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Block', () => {

  // valid tests
const valids: Array < [string, Context, any] > = [

['{ function foo() {}; };', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "BlockStatement",
          "body": [
              {
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "foo"
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
          ]
      },
      {
          "type": "EmptyStatement"
      }
  ],
  "sourceType": "script"
}],
  ['var a; { function a() {} }', Context.Empty, {
    "type": "Program",
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
        },
        {
            "type": "BlockStatement",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "a"
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
  ['function a() {} { function a() {} }', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "FunctionDeclaration",
            "id": {
                "type": "Identifier",
                "name": "a"
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
            "type": "BlockStatement",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "a"
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
  ['{debugger;}', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "BlockStatement",
            "body": [
                {
                    "type": "DebuggerStatement"
                }
            ]
        }
    ],
    "sourceType": "script"
}]
];

pass('Statements - Block (pass)', valids);

});
