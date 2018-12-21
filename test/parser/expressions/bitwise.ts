import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - BitWise', () => {

  // valid tests
const valids: Array < [string, Context, any] > = [

  ['a|b', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "BinaryExpression",
          "left": {
            "type": "Identifier",
            "name": "a"
          },
          "right": {
            "type": "Identifier",
            "name": "b"
          },
          "operator": "|"
        }
      }
    ]
  }],
    ['a&b', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "left": {
              "type": "Identifier",
              "name": "a"
            },
            "right": {
              "type": "Identifier",
              "name": "b"
            },
            "operator": "&"
          }
        }
      ]
    }],
   ['a>>>b', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "BinaryExpression",
          "left": {
            "type": "Identifier",
            "name": "a"
          },
          "right": {
            "type": "Identifier",
            "name": "b"
          },
          "operator": ">>>"
        }
      }
    ]
  }],
    ['1+2', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "left": {
              "type": "Literal",
              "value": 1
            },
            "right": {
              "type": "Literal",
              "value": 2
            },
            "operator": "+"
          }
        }
      ]
    }],
    ['x + y * z', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "left": {
              "type": "Identifier",
              "name": "x"
            },
            "right": {
              "type": "BinaryExpression",
              "left": {
                "type": "Identifier",
                "name": "y"
              },
              "right": {
                "type": "Identifier",
                "name": "z"
              },
              "operator": "*"
            },
            "operator": "+"
          }
        }
      ]
    }],
    ['x + y / z', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "left": {
              "type": "Identifier",
              "name": "x"
            },
            "right": {
              "type": "BinaryExpression",
              "left": {
                "type": "Identifier",
                "name": "y"
              },
              "right": {
                "type": "Identifier",
                "name": "z"
              },
              "operator": "/"
            },
            "operator": "+"
          }
        }
      ]
    }],
    ['++x ** y', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "left": {
              "type": "UpdateExpression",
              "argument": {
                "type": "Identifier",
                "name": "x"
              },
              "operator": "++",
              "prefix": true
            },
            "right": {
              "type": "Identifier",
              "name": "y"
            },
            "operator": "**"
          }
        }
      ]
    }],
    ['x instanceof y', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "left": {
              "type": "Identifier",
              "name": "x"
            },
            "right": {
              "type": "Identifier",
              "name": "y"
            },
            "operator": "instanceof"
          }
        }
      ]
    }],
    ['x || y && z', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "LogicalExpression",
            "left": {
              "type": "Identifier",
              "name": "x"
            },
            "right": {
              "type": "LogicalExpression",
              "left": {
                "type": "Identifier",
                "name": "y"
              },
              "right": {
                "type": "Identifier",
                "name": "z"
              },
              "operator": "&&"
            },
            "operator": "||"
          }
        }
      ]
    }],
    ['x != y', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "left": {
              "type": "Identifier",
              "name": "x"
            },
            "right": {
              "type": "Identifier",
              "name": "y"
            },
            "operator": "!="
          }
        }
      ]
    }],
    ['x === y', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "left": {
              "type": "Identifier",
              "name": "x"
            },
            "right": {
              "type": "Identifier",
              "name": "y"
            },
            "operator": "==="
          }
        }
      ]
    }],
    ['x <= y', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "left": {
              "type": "Identifier",
              "name": "x"
            },
            "right": {
              "type": "Identifier",
              "name": "y"
            },
            "operator": "<="
          }
        }
      ]
    }],
    ['a-->a', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "left": {
              "type": "UpdateExpression",
              "argument": {
                "type": "Identifier",
                "name": "a"
              },
              "operator": "--",
              "prefix": false
            },
            "right": {
              "type": "Identifier",
              "name": "a"
            },
            "operator": ">"
          }
        }
      ]
    }],
    ['x * y % z', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "left": {
              "type": "BinaryExpression",
              "left": {
                "type": "Identifier",
                "name": "x"
              },
              "right": {
                "type": "Identifier",
                "name": "y"
              },
              "operator": "*"
            },
            "right": {
              "type": "Identifier",
              "name": "z"
            },
            "operator": "%"
          }
        }
      ]
    }],
    ['x << y', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "left": {
              "type": "Identifier",
              "name": "x"
            },
            "right": {
              "type": "Identifier",
              "name": "y"
            },
            "operator": "<<"
          }
        }
      ]
    }],
  ['(a|b)', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "BinaryExpression",
          "left": {
            "type": "Identifier",
            "name": "a"
          },
          "right": {
            "type": "Identifier",
            "name": "b"
          },
          "operator": "|"
        }
      }
    ]
  }],
  ['(1+1)', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "BinaryExpression",
          "left": {
            "type": "Literal",
            "value": 1
          },
          "right": {
            "type": "Literal",
            "value": 1
          },
          "operator": "+"
        }
      }
    ]
  }],
  ['(++a)', Context.Empty, {
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
  }]
];

pass('Expressions - Bitwise (pass)', valids);

});
