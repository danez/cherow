import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Arrows', () => {

  const inValids: Array < [string, Context] > = [

    // Duplicate arrow function args

   ['(a, a) => {}', Context.Strict],
   ['(a, b, a) => {}', Context.Strict],
   ['(b, a, a) => {}', Context.Strict],
   ['(a, a, b) => {}', Context.Strict],
   ['(b, a, b, a) => {}', Context.Strict],
   ['(b, a, b, a = x) => {}', Context.Strict],
];

fail('Expressions - Functions', inValids);

  // valid tests
const valids: Array < [string, Context, any] > = [

  ['(a) => {}', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "ArrowFunctionExpression",
          "body": {
            "type": "BlockStatement",
            "body": []
          },
          "params": [
            {
              "type": "Identifier",
              "name": "a"
            }
          ],
          "id": null,
          "async": false,
          "generator": false,
          "expression": false
        }
      }
    ]
  }],
  ['(x) => { var x; }', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "ArrowFunctionExpression",
          "body": {
            "type": "BlockStatement",
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
              }
            ]
          },
          "params": [
            {
              "type": "Identifier",
              "name": "x"
            }
          ],
          "id": null,
          "async": false,
          "generator": false,
          "expression": false
        }
      }
    ]
  }],
  ['(x) => { function x() {} }', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "ArrowFunctionExpression",
          "body": {
            "type": "BlockStatement",
            "body": [
              {
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
                  "name": "x"
                }
              }
            ]
          },
          "params": [
            {
              "type": "Identifier",
              "name": "x"
            }
          ],
          "id": null,
          "async": false,
          "generator": false,
          "expression": false
        }
      }
    ]
  }]
];

pass('Expressions - Arrows (pass)', valids);

});
