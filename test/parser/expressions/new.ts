import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - New', () => {

  const inValids: Array < [string, Context] > = [

//    ['foo(,,);', Context.Strict],
  ////  ['foo(,);', Context.Strict],
 //   ['foo(,,);', Context.Strict],
    //['foo(a,,);', Context.Strict],
    ['(async function *f(a, a) {})', Context.Strict],
    ['(async function *f(a, a) {})', Context.Strict],
    ['(async function *f(a, a) {})', Context.Strict],
    ['(async function *f(a, a) {})', Context.Strict],
];

fail('Expressions - New', inValids);

  // valid tests

const valids: Array < [string, Context, any] > = [

 ['new Foo.Bar', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "MemberExpression",
                  "computed": false,
                  "object": {
                      "type": "Identifier",
                      "name": "Foo"
                  },
                  "property": {
                      "type": "Identifier",
                      "name": "Bar"
                  }
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
 ['new Foo', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "Identifier",
                  "name": "Foo"
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
 ['new a.b.c.d', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
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
                              "name": "b"
                          }
                      },
                      "property": {
                          "type": "Identifier",
                          "name": "c"
                      }
                  },
                  "property": {
                      "type": "Identifier",
                      "name": "d"
                  }
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
 ['new Foo["bar"]', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "MemberExpression",
                  "computed": true,
                  "object": {
                      "type": "Identifier",
                      "name": "Foo"
                  },
                  "property": {
                      "type": "Literal",
                      "value": "bar",
                  }
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
 ['new Foo()', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "Identifier",
                  "name": "Foo"
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
 ['new Foo.Bar()', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "MemberExpression",
                  "computed": false,
                  "object": {
                      "type": "Identifier",
                      "name": "Foo"
                  },
                  "property": {
                      "type": "Identifier",
                      "name": "Bar"
                  }
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
 ['new a.b.c.d()', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
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
                              "name": "b"
                          }
                      },
                      "property": {
                          "type": "Identifier",
                          "name": "c"
                      }
                  },
                  "property": {
                      "type": "Identifier",
                      "name": "d"
                  }
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
 ['new Foo["bar"]()', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "MemberExpression",
                  "computed": true,
                  "object": {
                      "type": "Identifier",
                      "name": "Foo"
                  },
                  "property": {
                      "type": "Literal",
                      "value": "bar",
                  }
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
 ['new Foo(X)', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "Identifier",
                  "name": "Foo"
              },
              "arguments": [
                  {
                      "type": "Identifier",
                      "name": "X"
                  }
              ]
          }
      }
  ],
  "sourceType": "script"
}],
['new Foo.Bar(X)', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "MemberExpression",
                  "computed": false,
                  "object": {
                      "type": "Identifier",
                      "name": "Foo"
                  },
                  "property": {
                      "type": "Identifier",
                      "name": "Bar"
                  }
              },
              "arguments": [
                  {
                      "type": "Identifier",
                      "name": "X"
                  }
              ]
          }
      }
  ],
  "sourceType": "script"
}],
['new Foo["bar"](X)', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "MemberExpression",
                  "computed": true,
                  "object": {
                      "type": "Identifier",
                      "name": "Foo"
                  },
                  "property": {
                      "type": "Literal",
                      "value": "bar"
                  }
              },
              "arguments": [
                  {
                      "type": "Identifier",
                      "name": "X"
                  }
              ]
          }
      }
  ],
  "sourceType": "script"
}],
['new Foo(X, Y, Z)', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "Identifier",
                  "name": "Foo"
              },
              "arguments": [
                  {
                      "type": "Identifier",
                      "name": "X"
                  },
                  {
                      "type": "Identifier",
                      "name": "Y"
                  },
                  {
                      "type": "Identifier",
                      "name": "Z"
                  }
              ]
          }
      }
  ],
  "sourceType": "script"
}],
['new Foo.Bar(X, Y, Z)', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "MemberExpression",
                  "computed": false,
                  "object": {
                      "type": "Identifier",
                      "name": "Foo"
                  },
                  "property": {
                      "type": "Identifier",
                      "name": "Bar"
                  }
              },
              "arguments": [
                  {
                      "type": "Identifier",
                      "name": "X"
                  },
                  {
                      "type": "Identifier",
                      "name": "Y"
                  },
                  {
                      "type": "Identifier",
                      "name": "Z"
                  }
              ]
          }
      }
  ],
  "sourceType": "script"
}],
['new Foo["bar"](X, Y, Z)', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "MemberExpression",
                  "computed": true,
                  "object": {
                      "type": "Identifier",
                      "name": "Foo"
                  },
                  "property": {
                      "type": "Literal",
                      "value": "bar"
                  }
              },
              "arguments": [
                  {
                      "type": "Identifier",
                      "name": "X"
                  },
                  {
                      "type": "Identifier",
                      "name": "Y"
                  },
                  {
                      "type": "Identifier",
                      "name": "Z"
                  }
              ]
          }
      }
  ],
  "sourceType": "script"
}],
['new x().y', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "MemberExpression",
              "computed": false,
              "object": {
                  "type": "NewExpression",
                  "callee": {
                      "type": "Identifier",
                      "name": "x"
                  },
                  "arguments": []
              },
              "property": {
                  "type": "Identifier",
                  "name": "y"
              }
          }
      }
  ],
  "sourceType": "script"
}],
['new x()[y]', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "MemberExpression",
              "computed": true,
              "object": {
                  "type": "NewExpression",
                  "callee": {
                      "type": "Identifier",
                      "name": "x"
                  },
                  "arguments": []
              },
              "property": {
                  "type": "Identifier",
                  "name": "y"
              }
          }
      }
  ],
  "sourceType": "script"
}],
['new x()();', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "CallExpression",
              "callee": {
                  "type": "NewExpression",
                  "callee": {
                      "type": "Identifier",
                      "name": "x"
                  },
                  "arguments": []
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
['new x().y = z', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
                  "type": "MemberExpression",
                  "computed": false,
                  "object": {
                      "type": "NewExpression",
                      "callee": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "arguments": []
                  },
                  "property": {
                      "type": "Identifier",
                      "name": "y"
                  }
              },
              "right": {
                  "type": "Identifier",
                  "name": "z"
              }
          }
      }
  ],
  "sourceType": "script"
}],
['new x().y + z', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "BinaryExpression",
              "operator": "+",
              "left": {
                  "type": "MemberExpression",
                  "computed": false,
                  "object": {
                      "type": "NewExpression",
                      "callee": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "arguments": []
                  },
                  "property": {
                      "type": "Identifier",
                      "name": "y"
                  }
              },
              "right": {
                  "type": "Identifier",
                  "name": "z"
              }
          }
      }
  ],
  "sourceType": "script"
}],
['new x()[y] = z', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
                  "type": "MemberExpression",
                  "computed": true,
                  "object": {
                      "type": "NewExpression",
                      "callee": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "arguments": []
                  },
                  "property": {
                      "type": "Identifier",
                      "name": "y"
                  }
              },
              "right": {
                  "type": "Identifier",
                  "name": "z"
              }
          }
      }
  ],
  "sourceType": "script"
}],
['new x()[y] + z', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "BinaryExpression",
              "operator": "+",
              "left": {
                  "type": "MemberExpression",
                  "computed": true,
                  "object": {
                      "type": "NewExpression",
                      "callee": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "arguments": []
                  },
                  "property": {
                      "type": "Identifier",
                      "name": "y"
                  }
              },
              "right": {
                  "type": "Identifier",
                  "name": "z"
              }
          }
      }
  ],
  "sourceType": "script"
}],
['++new x().y', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "UpdateExpression",
              "operator": "++",
              "argument": {
                  "type": "MemberExpression",
                  "computed": false,
                  "object": {
                      "type": "NewExpression",
                      "callee": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "arguments": []
                  },
                  "property": {
                      "type": "Identifier",
                      "name": "y"
                  }
              },
              "prefix": true
          }
      }
  ],
  "sourceType": "script"
}],
['new x().y++', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "UpdateExpression",
              "operator": "++",
              "argument": {
                  "type": "MemberExpression",
                  "computed": false,
                  "object": {
                      "type": "NewExpression",
                      "callee": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "arguments": []
                  },
                  "property": {
                      "type": "Identifier",
                      "name": "y"
                  }
              },
              "prefix": false
          }
      }
  ],
  "sourceType": "script"
}],
['delete new x()', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "UnaryExpression",
              "operator": "delete",
              "argument": {
                  "type": "NewExpression",
                  "callee": {
                      "type": "Identifier",
                      "name": "x"
                  },
                  "arguments": []
              },
              "prefix": true
          }
      }
  ],
  "sourceType": "script"
}],
['delete new x().y', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "UnaryExpression",
              "operator": "delete",
              "argument": {
                  "type": "MemberExpression",
                  "computed": false,
                  "object": {
                      "type": "NewExpression",
                      "callee": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "arguments": []
                  },
                  "property": {
                      "type": "Identifier",
                      "name": "y"
                  }
              },
              "prefix": true
          }
      }
  ],
  "sourceType": "script"
}],
['typeof new x()', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "UnaryExpression",
              "operator": "typeof",
              "argument": {
                  "type": "NewExpression",
                  "callee": {
                      "type": "Identifier",
                      "name": "x"
                  },
                  "arguments": []
              },
              "prefix": true
          }
      }
  ],
  "sourceType": "script"
}],
['typeof new x().y', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "UnaryExpression",
              "operator": "typeof",
              "argument": {
                  "type": "MemberExpression",
                  "computed": false,
                  "object": {
                      "type": "NewExpression",
                      "callee": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "arguments": []
                  },
                  "property": {
                      "type": "Identifier",
                      "name": "y"
                  }
              },
              "prefix": true
          }
      }
  ],
  "sourceType": "script"
}],
['new arguments', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "Identifier",
                  "name": "arguments"
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
['new async', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "Identifier",
                  "name": "async"
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
['new async ()', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "Identifier",
                  "name": "async"
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
['new async (x, y)', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "Identifier",
                  "name": "async"
              },
              "arguments": [
                  {
                      "type": "Identifier",
                      "name": "x"
                  },
                  {
                      "type": "Identifier",
                      "name": "y"
                  }
              ]
          }
      }
  ],
  "sourceType": "script"
}],
['new async (...x)', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "Identifier",
                  "name": "async"
              },
              "arguments": [
                  {
                      "type": "SpreadElement",
                      "argument": {
                          "type": "Identifier",
                          "name": "x"
                      }
                  }
              ]
          }
      }
  ],
  "sourceType": "script"
}],
['new async function(){}', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "FunctionExpression",
                  "id": null,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  },
                  "generator": false,
                  "expression": false,
                  "async": true
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
['let x = new async \n (x)', Context.Empty, {
    "body": [
      {
        "declarations": [
          {
            "id": {
              "name": "x",
              "type": "Identifier"
            },
            "init": {
              "arguments": [
                {
                  "name": "x",
                  "type": "Identifier"
                }
              ],
              "callee": {
                "name": "async",
                "type": "Identifier"
              },
              "type": "NewExpression"
            },
            "type": "VariableDeclarator"
          }
        ],
        "kind": "let",
        "type": "VariableDeclaration"
      }
    ],
    "sourceType": "script",
    "type": "Program"
  }],
 ['new await', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "Identifier",
                  "name": "await"
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
 ['new await()', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "Identifier",
                  "name": "await"
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
 ['new eval', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "Identifier",
                  "name": "eval"
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
 ['new eval()', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "Identifier",
                  "name": "eval"
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
['new false', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "Literal",
                  "value": false,
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
['new false.__proto__.constructor', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "MemberExpression",
                  "computed": false,
                  "object": {
                      "type": "MemberExpression",
                      "computed": false,
                      "object": {
                          "type": "Literal",
                          "value": false,
                      },
                      "property": {
                          "type": "Identifier",
                          "name": "__proto__"
                      }
                  },
                  "property": {
                      "type": "Identifier",
                      "name": "constructor"
                  }
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
['new function(){}', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "FunctionExpression",
                  "id": null,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  },
                  "generator": false,
                  "expression": false,
                  "async": false
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
['new function(){}(x)', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "FunctionExpression",
                  "id": null,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  },
                  "generator": false,
                  "expression": false,
                  "async": false
              },
              "arguments": [
                  {
                      "type": "Identifier",
                      "name": "x"
                  }
              ]
          }
      }
  ],
  "sourceType": "script"
}],
['new let', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "Identifier",
                  "name": "let"
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],
['new null', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "Literal",
                  "value": null,
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}],

['foo({bar(){ new.target }})', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "CallExpression",
              "callee": {
                  "type": "Identifier",
                  "name": "foo"
              },
              "arguments": [
                  {
                      "type": "ObjectExpression",
                      "properties": [
                          {
                              "type": "Property",
                              "key": {
                                  "type": "Identifier",
                                  "name": "bar"
                              },
                              "computed": false,
                              "value": {
                                  "type": "FunctionExpression",
                                  "id": null,
                                  "params": [],
                                  "body": {
                                      "type": "BlockStatement",
                                      "body": [
                                          {
                                              "type": "ExpressionStatement",
                                              "expression": {
                                                  "type": "MetaProperty",
                                                  "meta": {
                                                      "type": "Identifier",
                                                      "name": "new"
                                                  },
                                                  "property": {
                                                      "type": "Identifier",
                                                      "name": "target"
                                                  }
                                              }
                                          }
                                      ]
                                  },
                                  "generator": false,
                                  "expression": false,
                                  "async": false
                              },
                              "kind": "init",
                              "method": true,
                              "shorthand": false
                          }
                      ]
                  }
              ]
          }
      }
  ],
  "sourceType": "script"
}],
['({foo(x=new.target){}})', Context.Empty, {
  "type": "Program",
  "sourceType": "script",
  "body": [
    {
      "type": "ExpressionStatement",
      "expression": {
        "type": "ObjectExpression",
        "properties": [
          {
            "type": "Property",
            "key": {
              "type": "Identifier",
              "name": "foo"
            },
            "value": {
              "type": "FunctionExpression",
              "params": [
                {
                  "type": "AssignmentPattern",
                  "left": {
                    "type": "Identifier",
                    "name": "x"
                  },
                  "right": {
                    "meta": {
                      "type": "Identifier",
                      "name": "new"
                    },
                    "type": "MetaProperty",
                    "property": {
                      "type": "Identifier",
                      "name": "target"
                    }
                  }
                }
              ],
              "body": {
                "type": "BlockStatement",
                "body": []
              },
              "async": false,
              "generator": false,
              "expression": false,
              "id": null
            },
            "kind": "init",
            "computed": false,
            "method": true,
            "shorthand": false
          }
        ]
      }
    }
  ]
}],
['function f(){ [...new.target] }', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "FunctionDeclaration",
          "id": {
              "type": "Identifier",
              "name": "f"
          },
          "params": [],
          "body": {
              "type": "BlockStatement",
              "body": [
                  {
                      "type": "ExpressionStatement",
                      "expression": {
                          "type": "ArrayExpression",
                          "elements": [
                              {
                                  "type": "SpreadElement",
                                  "argument": {
                                      "type": "MetaProperty",
                                      "meta": {
                                          "type": "Identifier",
                                          "name": "new"
                                      },
                                      "property": {
                                          "type": "Identifier",
                                          "name": "target"
                                      }
                                  }
                              }
                          ]
                      }
                  }
              ]
          },
          "generator": false,
          "expression": false,
          "async": false
      }
  ],
  "sourceType": "script"
}],
['new async \n ()', Context.Empty, {
    "body": [
      {
        "expression": {
          "arguments": [],
          "callee": {
            "name": "async",
            "type": "Identifier"
          },
          "type": "NewExpression"
        },
        "type": "ExpressionStatement"
      },
    ],
    "sourceType": "script",
    "type": "Program"
  }],
['x({[new A()]:y})', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "CallExpression",
              "callee": {
                  "type": "Identifier",
                  "name": "x"
              },
              "arguments": [
                  {
                      "type": "ObjectExpression",
                      "properties": [
                          {
                              "type": "Property",
                              "key": {
                                  "type": "NewExpression",
                                  "callee": {
                                      "type": "Identifier",
                                      "name": "A"
                                  },
                                  "arguments": []
                              },
                              "computed": true,
                              "value": {
                                  "type": "Identifier",
                                  "name": "y"
                              },
                              "kind": "init",
                              "method": false,
                              "shorthand": false
                          }
                      ]
                  }
              ]
          }
      }
  ],
  "sourceType": "script"
}],
// ['new new x', Context.Empty, {}],
// ['new new x', Context.Empty, {}],
// ['new new x', Context.Empty, {}],
// ['new new x', Context.Empty, {}],
['new new x', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "NewExpression",
              "callee": {
                  "type": "NewExpression",
                  "callee": {
                      "type": "Identifier",
                      "name": "x"
                  },
                  "arguments": []
              },
              "arguments": []
          }
      }
  ],
  "sourceType": "script"
}]

];

pass('Expressions - New (pass)', valids);

});
