import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Functions', () => {

  const inValids: Array < [string, Context] > = [

     // Duplicate function args in strct mode

    ['(function f(a, a) {})', Context.Strict],
    ['(function f(a, b, a) {})', Context.Strict],
    ['(function f(b, a, a) {})', Context.Strict],
    ['(function f(a, a, b) {})', Context.Strict],
    ['(function f(b, a, b, a) {})', Context.Strict],
    ['(function f(b, a, b, a = x) {})', Context.Strict],

    // Duplicate function args with explicit directive

    ['(function f(a, a) {"use strict";})', Context.Empty],
    ['(function f(a, b, a) {"use strict";})', Context.Empty],
    ['(function f(b, a, a) {"use strict";})', Context.Empty],
    ['(function f(a, a, b) {"use strict";})', Context.Empty],
    ['(function f(b, a, b, a) {"use strict";})', Context.Empty],
    ['(function f(b, a, b, a = x) {"use strict";})', Context.Empty],

    ['(function eval() {"use strict";})', Context.Empty],

    // Future reserved words
    ['(function package() {})', Context.Strict],
    // ['(function package() {"use strict";})', Context.Empty],
];

fail('Expressions - Functions', inValids);

  // valid tests

const valids: Array < [string, Context, any] > = [

 ['x=function f(){ var f }', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
                  "type": "Identifier",
                  "name": "x"
              },
              "right": {
                  "type": "FunctionExpression",
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
          }
      }
  ],
  "sourceType": "script"
}],
 ['x=function f(){ let f }', Context.Empty, {
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
          "async": false,
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
['(function(a, a) {})', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "FunctionExpression",
              "id": null,
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
      }
  ],
  "sourceType": "script"
}],
['(function eval() {})', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "FunctionExpression",
              "id": {
                  "type": "Identifier",
                  "name": "eval"
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
      }
  ],
  "sourceType": "script"
}],
//['function(a, a) {"use strict"}', Context.Empty, {}]
];

pass('Expressions - Functions (pass)', valids);

});
