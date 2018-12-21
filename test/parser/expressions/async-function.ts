import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Async Functions', () => {

  const inValids: Array < [string, Context] > = [

    ['(async function f(a, a) {})', Context.Strict],
];

fail('Expressions - Async Functions', inValids);

  // valid tests

const valids: Array < [string, Context, any] > = [

 ['x=async function f(){ var f }', Context.Empty, {
  "type": "Program",
  "sourceType": "script",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "AssignmentExpression",
        "left": {
          "type": "Identifier",
          "name": "x"
        },
        "operator": "=",
        "right": {
          "type": "FunctionExpression",
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
                    "init": null,
                    "id": {
                      "type": "Identifier",
                      "name": "f"
                    }
                  }
                ]
              }
            ]
          },
          "async": true,
          "generator": false,
          "expression": false,
          "id": {
            "type": "Identifier",
            "name": "f"
          }
        }
      }
    }
  ]
}],
 ['x=async function f(){ let f }', Context.Empty, {
  "type": "Program",
  "sourceType": "script",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "AssignmentExpression",
        "left": {
          "type": "Identifier",
          "name": "x"
        },
        "operator": "=",
        "right": {
          "type": "FunctionExpression",
          "params": [],
          "body": {
            "type": "BlockStatement",
            "body": [
              {
                "type": "VariableDeclaration",
                "kind": "let",
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "init": null,
                    "id": {
                      "type": "Identifier",
                      "name": "f"
                    }
                  }
                ]
              }
            ]
          },
          "async": true,
          "generator": false,
          "expression": false,
          "id": {
            "type": "Identifier",
            "name": "f"
          }
        }
      }
    }
  ]
}]
];

pass('Expressions - Async Functions (pass)', valids);

});
