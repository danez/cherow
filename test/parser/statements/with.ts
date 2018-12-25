import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - With', () => {

  const inValids: Array < [string, Context] > = [
    ['with(1) b: function a(){}', Context.OptionDisablesWebCompat],
    // ['with ({}) async function f() {}', Context.OptionDisablesWebCompat],
    ['with ({}) function f() {}', Context.OptionDisablesWebCompat],
    ['with ({}) let x;', Context.OptionDisablesWebCompat],
    ['while 1 break;', Context.OptionDisablesWebCompat],
    [`while '' break;`, Context.OptionDisablesWebCompat],
    ['while (false) label1: label2: function f() {}', Context.OptionDisablesWebCompat],
    [`while({1}){
      break ;
   };`, Context.Module],
  ];

  fail('Statements - While (fail)', inValids);

  // valid tests
const valids: Array < [string, Context, any] > = [

  ['with({}){ p1 = "x1"; }', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "WithStatement",
            "object": {
                "type": "ObjectExpression",
                "properties": []
            },
            "body": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "p1"
                            },
                            "right": {
                                "type": "Literal",
                                "value": "x1",
                            }
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
   [`if (false) {
    with ({}) let // ASI
    {}
}`, Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "IfStatement",
          "test": {
              "type": "Literal",
              "value": false,
          },
          "consequent": {
              "type": "BlockStatement",
              "body": [
                  {
                      "type": "WithStatement",
                      "object": {
                          "type": "ObjectExpression",
                          "properties": []
                      },
                      "body": {
                          "type": "ExpressionStatement",
                          "expression": {
                              "type": "Identifier",
                              "name": "let"
                          }
                      }
                  },
                  {
                      "type": "BlockStatement",
                      "body": []
                  }
              ]
          },
          "alternate": null
      }
  ],
  "sourceType": "script"
}],
  // ['a: while (true) continue a;', Context.Empty, {}],
  // ['a: while (true) continue a;', Context.Empty, {}],
  ['a: while (true) continue a;', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "LabeledStatement",
        "label": {
          "type": "Identifier",
          "name": "a"
        },
        "body": {
          "type": "WhileStatement",
          "test": {
            "type": "Literal",
            "value": true
          },
          "body": {
            "type": "ContinueStatement",
            "label": {
              "type": "Identifier",
              "name": "a"
            }
          }
        }
      }
    ]
  }],
  ['with (x) foo;', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "WithStatement",
            "object": {
                "type": "Identifier",
                "name": "x"
            },
            "body": {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Identifier",
                    "name": "foo"
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['with (x) { foo }', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "WithStatement",
            "object": {
                "type": "Identifier",
                "name": "x"
            },
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
            }
        }
    ],
    "sourceType": "script"
}]
];

pass('Statements - With (pass)', valids);

});
