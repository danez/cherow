import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - With', () => {

  // valid tests
const valids: Array < [string, Context, any] > = [

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
