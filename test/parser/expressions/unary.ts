import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Unary', () => {

  // valid tests
const valids: Array < [string, Context, any] > = [

  ['+a', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "UnaryExpression",
          "operator": "+",
          "argument": {
            "type": "Identifier",
            "name": "a"
          },
          "prefix": true
        }
      }
    ]
  }],
  ['++a',  Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "UpdateExpression",
          "argument": {
            "type": "Identifier",
            "name": "a"
          },
          "operator": "++",
          "prefix": true
        }
      }
    ]
  }],
  ['typeof chinese++', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "UnaryExpression",
          "operator": "typeof",
          "argument": {
            "type": "UpdateExpression",
            "argument": {
              "type": "Identifier",
              "name": "chinese"
            },
            "operator": "++",
            "prefix": false
          },
          "prefix": true
        }
      }
    ]
  }],
  ['void chinese', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "UnaryExpression",
          "operator": "void",
          "argument": {
            "type": "Identifier",
            "name": "chinese"
          },
          "prefix": true
        }
      }
    ]
  }],
];

pass('Expressions - Unary (pass)', valids);

});
