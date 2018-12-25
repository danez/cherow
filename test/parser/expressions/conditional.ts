import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Conditional', () => {

  // valid tests
const valids: Array < [string, Context, any] > = [

  ['true ? y : false', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "ConditionalExpression",
                "test": {
                    "type": "Literal",
                    "value": true
                },
                "consequent": {
                    "type": "Identifier",
                    "name": "y"
                },
                "alternate": {
                    "type": "Literal",
                    "value": false
                }
            }
        }
    ],
    "sourceType": "script"
}],
    ['y ? y : "1"', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "ConditionalExpression",
                  "test": {
                      "type": "Identifier",
                      "name": "y"
                  },
                  "consequent": {
                      "type": "Identifier",
                      "name": "y"
                  },
                  "alternate": {
                      "type": "Literal",
                      "value": "1"
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['x = a ? 1 : 2', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "AssignmentExpression",
                  "operator": "=",
                  "left": {
                      "type": "Identifier",
                      "name": "x"
                  },
                  "right": {
                      "type": "ConditionalExpression",
                      "test": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "consequent": {
                          "type": "Literal",
                          "value": 1
                      },
                      "alternate": {
                          "type": "Literal",
                          "value": 2
                      }
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['a ? b : c ? d : e', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "ConditionalExpression",
                  "test": {
                      "type": "Identifier",
                      "name": "a"
                  },
                  "consequent": {
                      "type": "Identifier",
                      "name": "b"
                  },
                  "alternate": {
                      "type": "ConditionalExpression",
                      "test": {
                          "type": "Identifier",
                          "name": "c"
                      },
                      "consequent": {
                          "type": "Identifier",
                          "name": "d"
                      },
                      "alternate": {
                          "type": "Identifier",
                          "name": "e"
                      }
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['a * x ? b : c ? d : e', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "ConditionalExpression",
                  "test": {
                      "type": "BinaryExpression",
                      "operator": "*",
                      "left": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "x"
                      }
                  },
                  "consequent": {
                      "type": "Identifier",
                      "name": "b"
                  },
                  "alternate": {
                      "type": "ConditionalExpression",
                      "test": {
                          "type": "Identifier",
                          "name": "c"
                      },
                      "consequent": {
                          "type": "Identifier",
                          "name": "d"
                      },
                      "alternate": {
                          "type": "Identifier",
                          "name": "e"
                      }
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['a ** x ? b : c ? d : e', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "ConditionalExpression",
                  "test": {
                      "type": "BinaryExpression",
                      "operator": "**",
                      "left": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "x"
                      }
                  },
                  "consequent": {
                      "type": "Identifier",
                      "name": "b"
                  },
                  "alternate": {
                      "type": "ConditionalExpression",
                      "test": {
                          "type": "Identifier",
                          "name": "c"
                      },
                      "consequent": {
                          "type": "Identifier",
                          "name": "d"
                      },
                      "alternate": {
                          "type": "Identifier",
                          "name": "e"
                      }
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['a ? b * x : c ? d : e', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "ConditionalExpression",
                  "test": {
                      "type": "Identifier",
                      "name": "a"
                  },
                  "consequent": {
                      "type": "BinaryExpression",
                      "operator": "*",
                      "left": {
                          "type": "Identifier",
                          "name": "b"
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "x"
                      }
                  },
                  "alternate": {
                      "type": "ConditionalExpression",
                      "test": {
                          "type": "Identifier",
                          "name": "c"
                      },
                      "consequent": {
                          "type": "Identifier",
                          "name": "d"
                      },
                      "alternate": {
                          "type": "Identifier",
                          "name": "e"
                      }
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['a ? b : c * x ? d : e', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "ConditionalExpression",
                  "test": {
                      "type": "Identifier",
                      "name": "a"
                  },
                  "consequent": {
                      "type": "Identifier",
                      "name": "b"
                  },
                  "alternate": {
                      "type": "ConditionalExpression",
                      "test": {
                          "type": "BinaryExpression",
                          "operator": "*",
                          "left": {
                              "type": "Identifier",
                              "name": "c"
                          },
                          "right": {
                              "type": "Identifier",
                              "name": "x"
                          }
                      },
                      "consequent": {
                          "type": "Identifier",
                          "name": "d"
                      },
                      "alternate": {
                          "type": "Identifier",
                          "name": "e"
                      }
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['a ? b : c ? d * x : e', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "ConditionalExpression",
                  "test": {
                      "type": "Identifier",
                      "name": "a"
                  },
                  "consequent": {
                      "type": "Identifier",
                      "name": "b"
                  },
                  "alternate": {
                      "type": "ConditionalExpression",
                      "test": {
                          "type": "Identifier",
                          "name": "c"
                      },
                      "consequent": {
                          "type": "BinaryExpression",
                          "operator": "*",
                          "left": {
                              "type": "Identifier",
                              "name": "d"
                          },
                          "right": {
                              "type": "Identifier",
                              "name": "x"
                          }
                      },
                      "alternate": {
                          "type": "Identifier",
                          "name": "e"
                      }
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['a * x ? b ? c : d : e', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "ConditionalExpression",
                  "test": {
                      "type": "BinaryExpression",
                      "operator": "*",
                      "left": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "x"
                      }
                  },
                  "consequent": {
                      "type": "ConditionalExpression",
                      "test": {
                          "type": "Identifier",
                          "name": "b"
                      },
                      "consequent": {
                          "type": "Identifier",
                          "name": "c"
                      },
                      "alternate": {
                          "type": "Identifier",
                          "name": "d"
                      }
                  },
                  "alternate": {
                      "type": "Identifier",
                      "name": "e"
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['a ? b ? c : d * x : e', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "ConditionalExpression",
                  "test": {
                      "type": "Identifier",
                      "name": "a"
                  },
                  "consequent": {
                      "type": "ConditionalExpression",
                      "test": {
                          "type": "Identifier",
                          "name": "b"
                      },
                      "consequent": {
                          "type": "Identifier",
                          "name": "c"
                      },
                      "alternate": {
                          "type": "BinaryExpression",
                          "operator": "*",
                          "left": {
                              "type": "Identifier",
                              "name": "d"
                          },
                          "right": {
                              "type": "Identifier",
                              "name": "x"
                          }
                      }
                  },
                  "alternate": {
                      "type": "Identifier",
                      "name": "e"
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['x && y ? 1 : 2', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "ConditionalExpression",
                  "test": {
                      "type": "LogicalExpression",
                      "operator": "&&",
                      "left": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "y"
                      }
                  },
                  "consequent": {
                      "type": "Literal",
                      "value": 1
                  },
                  "alternate": {
                      "type": "Literal",
                      "value": 2
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['a ? !b : !c', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "ConditionalExpression",
                  "test": {
                      "type": "Identifier",
                      "name": "a"
                  },
                  "consequent": {
                      "type": "UnaryExpression",
                      "operator": "!",
                      "argument": {
                          "type": "Identifier",
                          "name": "b"
                      },
                      "prefix": true
                  },
                  "alternate": {
                      "type": "UnaryExpression",
                      "operator": "!",
                      "argument": {
                          "type": "Identifier",
                          "name": "c"
                      },
                      "prefix": true
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
    ['a ** b ? y-3 : 5*1', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "ExpressionStatement",
              "expression": {
                  "type": "ConditionalExpression",
                  "test": {
                      "type": "BinaryExpression",
                      "operator": "**",
                      "left": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "b"
                      }
                  },
                  "consequent": {
                      "type": "BinaryExpression",
                      "operator": "-",
                      "left": {
                          "type": "Identifier",
                          "name": "y"
                      },
                      "right": {
                          "type": "Literal",
                          "value": 3
                      }
                  },
                  "alternate": {
                      "type": "BinaryExpression",
                      "operator": "*",
                      "left": {
                          "type": "Literal",
                          "value": 5
                      },
                      "right": {
                          "type": "Literal",
                          "value": 1
                      }
                  }
              }
          }
      ],
      "sourceType": "script"
  }]
];

pass('Expressions - Conditional (pass)', valids);

});
