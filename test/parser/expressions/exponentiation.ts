import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Exponentiation', () => {

  // valid tests
const valids: Array < [string, Context, any] > = [

  ['(+x) ** 10', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "BinaryExpression",
          "left": {
            "type": "UnaryExpression",
            "operator": "+",
            "argument": {
              "type": "Identifier",
              "name": "x"
            },
            "prefix": true
          },
          "right": {
            "type": "Literal",
            "value": 10
          },
          "operator": "**"
        }
      }
    ]
  }],
    ['x ** y ** z', Context.Empty, {
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
              "operator": "**"
            },
            "operator": "**"
          }
        }
      ]
    }],
    ['(typeof x) ** 10', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "left": {
              "type": "UnaryExpression",
              "operator": "typeof",
              "argument": {
                "type": "Identifier",
                "name": "x"
              },
              "prefix": true
            },
            "right": {
              "type": "Literal",
              "value": 10
            },
            "operator": "**"
          }
        }
      ]
    }],

    ['2 ** 4', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "BinaryExpression",
                  "operator": "**",
                  "left": {
                      "type": "Literal",
                      "value": 2
                  },
                  "right": {
                      "type": "Literal",
                      "value": 4
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['new x ** 2;', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "BinaryExpression",
                  "operator": "**",
                  "left": {
                      "type": "NewExpression",
                      "callee": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "arguments": []
                  },
                  "right": {
                      "type": "Literal",
                      "value": 2
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['new x() ** 2;', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "BinaryExpression",
                  "operator": "**",
                  "left": {
                      "type": "NewExpression",
                      "callee": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "arguments": []
                  },
                  "right": {
                      "type": "Literal",
                      "value": 2,

                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['true ** a', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "BinaryExpression",
                  "operator": "**",
                  "left": {
                      "type": "Literal",
                      "value": true,
                  },
                  "right": {
                      "type": "Identifier",
                      "name": "a"
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['++x ** a', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "BinaryExpression",
                  "operator": "**",
                  "left": {
                      "type": "UpdateExpression",
                      "operator": "++",
                      "argument": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "prefix": true
                  },
                  "right": {
                      "type": "Identifier",
                      "name": "a"
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['x++ ** a', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "BinaryExpression",
                  "operator": "**",
                  "left": {
                      "type": "UpdateExpression",
                      "operator": "++",
                      "argument": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "prefix": false
                  },
                  "right": {
                      "type": "Identifier",
                      "name": "a"
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['x-- ** a', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "BinaryExpression",
                  "operator": "**",
                  "left": {
                      "type": "UpdateExpression",
                      "operator": "--",
                      "argument": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "prefix": false
                  },
                  "right": {
                      "type": "Identifier",
                      "name": "a"
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['+a * b ** c ** 3', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "BinaryExpression",
                  "operator": "*",
                  "left": {
                      "type": "UnaryExpression",
                      "operator": "+",
                      "argument": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "prefix": true
                  },
                  "right": {
                      "type": "BinaryExpression",
                      "operator": "**",
                      "left": {
                          "type": "Identifier",
                          "name": "b"
                      },
                      "right": {
                          "type": "BinaryExpression",
                          "operator": "**",
                          "left": {
                              "type": "Identifier",
                              "name": "c"
                          },
                          "right": {
                              "type": "Literal",
                              "value": 3,
                          }
                      }
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['(new x() ** 2)', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "BinaryExpression",
                  "operator": "**",
                  "left": {
                      "type": "NewExpression",
                      "callee": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "arguments": []
                  },
                  "right": {
                      "type": "Literal",
                      "value": 2,
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['(--x ** a)', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "BinaryExpression",
                  "operator": "**",
                  "left": {
                      "type": "UpdateExpression",
                      "operator": "--",
                      "argument": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "prefix": true
                  },
                  "right": {
                      "type": "Identifier",
                      "name": "a"
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['(x++ ** a)', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "BinaryExpression",
                  "operator": "**",
                  "left": {
                      "type": "UpdateExpression",
                      "operator": "++",
                      "argument": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "prefix": false
                  },
                  "right": {
                      "type": "Identifier",
                      "name": "a"
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['(+c * b ** a ** 3)', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "BinaryExpression",
                  "operator": "*",
                  "left": {
                      "type": "UnaryExpression",
                      "operator": "+",
                      "argument": {
                          "type": "Identifier",
                          "name": "c"
                      },
                      "prefix": true
                  },
                  "right": {
                      "type": "BinaryExpression",
                      "operator": "**",
                      "left": {
                          "type": "Identifier",
                          "name": "b"
                      },
                      "right": {
                          "type": "BinaryExpression",
                          "operator": "**",
                          "left": {
                              "type": "Identifier",
                              "name": "a"
                          },
                          "right": {
                              "type": "Literal",
                              "value": 3,
                          }
                      }
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['(-x) ** 10', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "left": {
              "type": "UnaryExpression",
              "operator": "-",
              "argument": {
                "type": "Identifier",
                "name": "x"
              },
              "prefix": true
            },
            "right": {
              "type": "Literal",
              "value": 10
            },
            "operator": "**"
          }
        }
      ]
    }],
    ['(+x) ** 10', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "left": {
              "type": "UnaryExpression",
              "operator": "+",
              "argument": {
                "type": "Identifier",
                "name": "x"
              },
              "prefix": true
            },
            "right": {
              "type": "Literal",
              "value": 10
            },
            "operator": "**"
          }
        }
      ]
    }],
    ['(~x) ** 10', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "left": {
              "type": "UnaryExpression",
              "operator": "~",
              "argument": {
                "type": "Identifier",
                "name": "x"
              },
              "prefix": true
            },
            "right": {
              "type": "Literal",
              "value": 10
            },
            "operator": "**"
          }
        }
      ]
    }],
    ['(delete x) ** 10', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "left": {
              "type": "UnaryExpression",
              "operator": "delete",
              "argument": {
                "type": "Identifier",
                "name": "x"
              },
              "prefix": true
            },
            "right": {
              "type": "Literal",
              "value": 10
            },
            "operator": "**"
          }
        }
      ]
    }],
    ['(!x) ** 10', Context.Empty, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ExpressionStatement",
          "expression": {
            "type": "BinaryExpression",
            "left": {
              "type": "UnaryExpression",
              "operator": "!",
              "argument": {
                "type": "Identifier",
                "name": "x"
              },
              "prefix": true
            },
            "right": {
              "type": "Literal",
              "value": 10
            },
            "operator": "**"
          }
        }
      ]
    }],
    ['++O.p ** 10', Context.Empty, {
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
                "type": "MemberExpression",
                "object": {
                  "type": "Identifier",
                  "name": "O"
                },
                "computed": false,
                "property": {
                  "type": "Identifier",
                  "name": "p"
                }
              },
              "operator": "++",
              "prefix": true
            },
            "right": {
              "type": "Literal",
              "value": 10
            },
            "operator": "**"
          }
        }
      ]
    }],
    ['x-- ** 10', Context.Empty, {
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
              "operator": "--",
              "prefix": false
            },
            "right": {
              "type": "Literal",
              "value": 10
            },
            "operator": "**"
          }
        }
      ]
    }]
];

pass('Expressions - Exponentiation (pass)', valids);

});
