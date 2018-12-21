import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - While', () => {

  // valid tests
const valids: Array < [string, Context, any] > = [
  ['while(function __func(){return 1;}()){ break }', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "WhileStatement",
            "test": {
                "type": "CallExpression",
                "callee": {
                    "type": "FunctionExpression",
                    "id": {
                        "type": "Identifier",
                        "name": "__func"
                    },
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "argument": {
                                    "type": "Literal",
                                    "value": 1,
                                }
                            }
                        ]
                    },
                    "generator": false,
                    "expression": false,
                    "async": false
                },
                "arguments": []
            },
            "body": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "BreakStatement",
                        "label": null
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
  ['while (i-->1) {}', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "WhileStatement",
            "test": {
                "type": "BinaryExpression",
                "operator": ">",
                "left": {
                    "type": "UpdateExpression",
                    "operator": "--",
                    "argument": {
                        "type": "Identifier",
                        "name": "i"
                    },
                    "prefix": false
                },
                "right": {
                    "type": "Literal",
                    "value": 1
                }
            },
            "body": {
                "type": "BlockStatement",
                "body": []
            }
        }
    ],
    "sourceType": "script"
}],
  ['while (x < 10) { x++; y--; }', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "WhileStatement",
            "test": {
                "type": "BinaryExpression",
                "operator": "<",
                "left": {
                    "type": "Identifier",
                    "name": "x"
                },
                "right": {
                    "type": "Literal",
                    "value": 10,
                }
            },
            "body": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "UpdateExpression",
                            "operator": "++",
                            "argument": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "prefix": false
                        }
                    },
                    {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "UpdateExpression",
                            "operator": "--",
                            "argument": {
                                "type": "Identifier",
                                "name": "y"
                            },
                            "prefix": false
                        }
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
  ['while(1);', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "WhileStatement",
            "test": {
                "type": "Literal",
                "value": 1,
            },
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],

];

pass('Statements - While (pass)', valids);

});
