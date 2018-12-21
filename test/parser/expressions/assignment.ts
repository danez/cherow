import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Assignment', () => {

  // valid tests
const valids: Array < [string, Context, any] > = [

  ['a = (b, c)', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "Identifier",
            "name": "a"
          },
          "operator": "=",
          "right": {
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
    ]
  }],
  ['x <<= 42', Context.Empty, {
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
          "operator": "<<=",
          "right": {
            "type": "Literal",
            "value": 42
          }
        }
      }
    ]
  }],
['x &= 42', Context.Empty, {
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
        "operator": "&=",
        "right": {
          "type": "Literal",
          "value": 42
        }
      }
    }
  ]
}],
['x /= 42', Context.Empty, {
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
        "operator": "/=",
        "right": {
          "type": "Literal",
          "value": 42
        }
      }
    }
  ]
}],
['x >>>= 42', Context.Empty, {
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
        "operator": ">>>=",
        "right": {
          "type": "Literal",
          "value": 42
        }
      }
    }
  ]
}],
['x |= 42', Context.Empty, {
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
        "operator": "|=",
        "right": {
          "type": "Literal",
          "value": 42
        }
      }
    }
  ]
}],
['a=1', Context.Empty, {
  "type": "Program",
  "sourceType": "script",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "AssignmentExpression",
        "left": {
          "type": "Identifier",
          "name": "a"
        },
        "operator": "=",
        "right": {
          "type": "Literal",
          "value": 1
        }
      }
    }
  ]
}],
['(a)=(1)', Context.Empty, {
  "type": "Program",
  "sourceType": "script",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "AssignmentExpression",
        "left": {
          "type": "Identifier",
          "name": "a"
        },
        "operator": "=",
        "right": {
          "type": "Literal",
          "value": 1
        }
      }
    }
  ]
}],
['x.x *= 1', Context.Empty, {
  "type": "Program",
  "sourceType": "script",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "AssignmentExpression",
        "left": {
          "type": "MemberExpression",
          "object": {
            "type": "Identifier",
            "name": "x"
          },
          "computed": false,
          "property": {
            "type": "Identifier",
            "name": "x"
          }
        },
        "operator": "*=",
        "right": {
          "type": "Literal",
          "value": 1
        }
      }
    }
  ]
}],
['x **= 1', Context.Empty, {
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
        "operator": "**=",
        "right": {
          "type": "Literal",
          "value": 1
        }
      }
    }
  ]
}],
['[1].length = 1', Context.Empty, {
  "type": "Program",
  "sourceType": "script",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "AssignmentExpression",
        "left": {
          "type": "MemberExpression",
          "object": {
            "type": "ArrayExpression",
            "elements": [
              {
                "type": "Literal",
                "value": 1
              }
            ]
          },
          "computed": false,
          "property": {
            "type": "Identifier",
            "name": "length"
          }
        },
        "operator": "=",
        "right": {
          "type": "Literal",
          "value": 1
        }
      }
    }
  ]
}],
['(a**b).c=1', Context.Empty, {
  "type": "Program",
  "sourceType": "script",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "AssignmentExpression",
        "left": {
          "type": "MemberExpression",
          "object": {
            "type": "BinaryExpression",
            "left": {
              "type": "Identifier",
              "name": "a"
            },
            "right": {
              "type": "Identifier",
              "name": "b"
            },
            "operator": "**"
          },
          "computed": false,
          "property": {
            "type": "Identifier",
            "name": "c"
          }
        },
        "operator": "=",
        "right": {
          "type": "Literal",
          "value": 1
        }
      }
    }
  ]
}],
];

pass('Expressions - Async function (pass)', valids);

});
