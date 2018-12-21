import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Return', () => {

  // valid tests
const valids: Array < [string, Context, any] > = [

  ['(function(){ return x * y })', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "FunctionExpression",
                "id": null,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ReturnStatement",
                            "argument": {
                                "type": "BinaryExpression",
                                "operator": "*",
                                "left": {
                                    "type": "Identifier",
                                    "name": "x"
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "y"
                                }
                            }
                        }
                    ]
                },
                "generator": false,
                "expression": false,
                "async": false
            }
        }
    ],
    "sourceType": "script"
}],
  ['(function(){ return x; })', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "FunctionExpression",
                "id": null,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ReturnStatement",
                            "argument": {
                                "type": "Identifier",
                                "name": "x"
                            }
                        }
                    ]
                },
                "generator": false,
                "expression": false,
                "async": false
            }
        }
    ],
    "sourceType": "script"
}],
  ['(function(){ return; })', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "FunctionExpression",
                "id": null,
                "params": [],
                "body": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ReturnStatement",
                            "argument": null
                        }
                    ]
                },
                "generator": false,
                "expression": false,
                "async": false
            }
        }
    ],
    "sourceType": "script"
}]
];

pass('Statements - Return (pass)', valids);

});
