import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Member', () => {

  // valid tests
const valids: Array < [string, Context, any] > = [

  ['set.push(existing);', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": {
                        "type": "Identifier",
                        "name": "set"
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "push"
                    }
                },
                "arguments": [
                    {
                        "type": "Identifier",
                        "name": "existing"
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
  ['a[b, c]', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "MemberExpression",
                "computed": true,
                "object": {
                    "type": "Identifier",
                    "name": "a"
                },
                "property": {
                    "type": "SequenceExpression",
                    "expressions": [
                        {
                            "type": "Identifier",
                            "name": "b"
                        },
                        {
                            "type": "Identifier",
                            "name": "c"
                        }
                    ]
                }
            }
        }
    ],
    "sourceType": "script"
}],
    ['a.$._.B0', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "MemberExpression",
                  "computed": false,
                  "object": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                          "type": "MemberExpression",
                          "computed": false,
                          "object": {
                              "type": "Identifier",
                              "name": "a"
                          },
                          "property": {
                              "type": "Identifier",
                              "name": "$"
                          }
                      },
                      "property": {
                          "type": "Identifier",
                          "name": "_"
                      }
                  },
                  "property": {
                      "type": "Identifier",
                      "name": "B0"
                  }
              }
          }
      ],
      "sourceType": "script"
  }]
];

pass('Expressions - Member (pass)', valids);

});
