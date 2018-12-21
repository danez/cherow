import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Assignment', () => {

  // valid tests
const valids: Array < [string, Context, any] > = [

['[]', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "ArrayExpression",
              "elements": []
          }
      }
  ],
  "sourceType": "script"
}],
['[,]', Context.Empty, {
  "type": "Program",
  "sourceType": "script",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "ArrayExpression",
        "elements": [
          null
        ]
      }
    }
  ]
}],
['[,,]', Context.Empty, {
  "type": "Program",
  "sourceType": "script",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "ArrayExpression",
        "elements": [
          null,
          null
        ]
      }
    }
  ]
}],
['[x,]', Context.Empty, {
  "type": "Program",
  "sourceType": "script",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "ArrayExpression",
        "elements": [
          {
            "type": "Identifier",
            "name": "x"
          }
        ]
      }
    }
  ]
}],
['[x,,,]', Context.Empty, {
  "type": "Program",
  "sourceType": "script",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "ArrayExpression",
        "elements": [
          {
            "type": "Identifier",
            "name": "x"
          },
          null,
          null
        ]
      }
    }
  ]
}],
['[x,,y]', Context.Empty, {
  "type": "Program",
  "sourceType": "script",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "ArrayExpression",
        "elements": [
          {
            "type": "Identifier",
            "name": "x"
          },
          null,
          {
            "type": "Identifier",
            "name": "y"
          }
        ]
      }
    }
  ]
}],
['[foo = A] = arr;', Context.Empty, {
  "type": "Program",
  "sourceType": "script",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "AssignmentExpression",
        "left": {
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
                "name": "A"
              }
            }
          ]
        },
        "operator": "=",
        "right": {
          "type": "Identifier",
          "name": "arr"
        }
      }
    }
  ]
}],
['[foo, bar] = arr;', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
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
              "right": {
                  "type": "Identifier",
                  "name": "arr"
              }
          }
      }
  ],
  "sourceType": "script"
}],
['[foo = A, bar = B] = arr;', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
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
                              "name": "A"
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
                              "name": "B"
                          }
                      }
                  ]
              },
              "right": {
                  "type": "Identifier",
                  "name": "arr"
              }
          }
      }
  ],
  "sourceType": "script"
}]
];

pass('Expressions - Async function (pass)', valids);

});
