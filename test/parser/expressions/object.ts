import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Object (fail)', () => {

  const inValids: Array < [string, Context] > = [
    ['({a(b, b){}})', Context.Strict],
    ['({a(b, b){ "use strict"; }})', Context.Empty],
    ['"use strict"; ({a(b, b){}})', Context.Empty],

    ['o = {f(x) { let x }}', Context.Empty],
    ['o = {f(x) { const x = y }}', Context.Empty],

     // Duplicate arguments
    ['({f(a, a) {}})', Context.Strict],
    ['({f(a, b, a) {}})', Context.Empty],
    ['({f(b, a, a) {}})', Context.Empty],
    ['({f(a, a, b) {}})', Context.Empty],
    ['({f(b, a, b, a) {}})', Context.Empty],
    ['({f(b, a, b, a = x) {}})', Context.Empty],

    // General

    ['({f(){ let x; var x; }})', Context.Empty],
    ['({f(){ var x; let x; }})', Context.Empty],
    ['({f(){ const x = y; var x; }})', Context.Empty],
    ['({f(){ var x; const x = y; }})', Context.Empty],
    ['({f(){ let x; function x(){} }})', Context.Empty],
    ['({f(){ function x(){} let x; }})', Context.Empty],
    ['({f(){ const x = y; function x(){} }})', Context.Empty],
    ['({f(){ function x(){} const x = y; }})', Context.Empty],

    ['({*get x(){}})', Context.Empty],
    ['({*set x(){}})', Context.Empty],
    ['({*ident: x})', Context.Empty],
    ['({*ident x(){}})', Context.Empty],
    ['({*async x(){}})', Context.Empty],
    ['({[fkleuver] 1(){}})', Context.Empty],

    // Duplicate prototypes

    ['({ "__proto__": "__proto__", "__proto__": "__proto__"})', Context.Empty],
    ['({ "__proto__": b, "__proto__": c})', Context.Empty],
    ['x = {\'__proto__\': 1, "__proto__": 2}', Context.Empty],
    ['x = {__proto__: 1, "__proto__": 2}', Context.Empty],
    ['({ __proto__: b, "__proto__": c})', Context.Empty],
    ['({ __proto__: b, "__proto__": c})', Context.Empty],
    ['({ __proto__: b, "__proto__": c})', Context.Empty],
    ['x = {__proto__: 1, __proto__: 2}', Context.Empty],
    ['x = {__proto__: 1, "__proto__": 2}', Context.Empty],
    ['x = {__proto__: 1, "__proto__": 2}', Context.Empty],
    ['x = {__proto__: 1, "__proto__": 2}', Context.Empty],
];

fail('Expressions - Object', inValids);

  // valid tests
const valids: Array < [string, Context, any] > = [

   ['x = {...y}', Context.OptionDisablesWebCompat, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "SpreadElement",
                "argument": {
                  "type": "Identifier",
                  "name": "y"
                }
              }
            ]
          }
        }
      }
    ]
  }],
   ['x = {x, ...y}', Context.OptionDisablesWebCompat, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "x"
                },
                "value": {
                  "type": "Identifier",
                  "name": "x"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": true
              },
              {
                "type": "SpreadElement",
                "argument": {
                  "type": "Identifier",
                  "name": "y"
                }
              }
            ]
          }
        }
      }
    ]
  }],
   ['x = {a, ...y, b}', Context.OptionDisablesWebCompat, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "a"
                },
                "value": {
                  "type": "Identifier",
                  "name": "a"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": true
              },
              {
                "type": "SpreadElement",
                "argument": {
                  "type": "Identifier",
                  "name": "y"
                }
              },
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "b"
                },
                "value": {
                  "type": "Identifier",
                  "name": "b"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": true
              }
            ]
          }
        }
      }
    ]
  }],
   ['x = {...y, b}', Context.OptionDisablesWebCompat, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "SpreadElement",
                "argument": {
                  "type": "Identifier",
                  "name": "y"
                }
              },
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "b"
                },
                "value": {
                  "type": "Identifier",
                  "name": "b"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": true
              }
            ]
          }
        }
      }
    ]
  }],
   ['x = {...a,}', Context.OptionDisablesWebCompat, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "SpreadElement",
                "argument": {
                  "type": "Identifier",
                  "name": "a"
                }
              }
            ]
          }
        }
      }
    ]
  }],
   ['x = {...a=b}', Context.OptionDisablesWebCompat, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "SpreadElement",
                "argument": {
                  "type": "AssignmentExpression",
                  "left": {
                    "type": "Identifier",
                    "name": "a"
                  },
                  "operator": "=",
                  "right": {
                    "type": "Identifier",
                    "name": "b"
                  }
                }
              }
            ]
          }
        }
      }
    ]
  }],
   ['x = {...a + b}', Context.OptionDisablesWebCompat, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "SpreadElement",
                "argument": {
                  "type": "BinaryExpression",
                  "left": {
                    "type": "Identifier",
                    "name": "a"
                  },
                  "right": {
                    "type": "Identifier",
                    "name": "b"
                  },
                  "operator": "+"
                }
              }
            ]
          }
        }
      }
    ]
  }],
   ['x = {...[a, b]}', Context.OptionDisablesWebCompat, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "SpreadElement",
                "argument": {
                  "type": "ArrayExpression",
                  "elements": [
                    {
                      "type": "Identifier",
                      "name": "a"
                    },
                    {
                      "type": "Identifier",
                      "name": "b"
                    }
                  ]
                }
              }
            ]
          }
        }
      }
    ]
  }],
   ['x = {...{a, b}}', Context.OptionDisablesWebCompat, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "SpreadElement",
                "argument": {
                  "type": "ObjectExpression",
                  "properties": [
                    {
                      "type": "Property",
                      "key": {
                        "type": "Identifier",
                        "name": "a"
                      },
                      "value": {
                        "type": "Identifier",
                        "name": "a"
                      },
                      "kind": "init",
                      "computed": false,
                      "method": false,
                      "shorthand": true
                    },
                    {
                      "type": "Property",
                      "key": {
                        "type": "Identifier",
                        "name": "b"
                      },
                      "value": {
                        "type": "Identifier",
                        "name": "b"
                      },
                      "kind": "init",
                      "computed": false,
                      "method": false,
                      "shorthand": true
                    }
                  ]
                }
              }
            ]
          }
        }
      }
    ]
  }],
   ['x = {...a, ...b}', Context.OptionDisablesWebCompat, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "SpreadElement",
                "argument": {
                  "type": "Identifier",
                  "name": "a"
                }
              },
              {
                "type": "SpreadElement",
                "argument": {
                  "type": "Identifier",
                  "name": "b"
                }
              }
            ]
          }
        }
      }
    ]
  }],
   ['({...a} = x)', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "RestElement",
                "argument": {
                  "type": "Identifier",
                  "name": "a"
                }
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "x"
          }
        }
      }
    ]
  }],
   ['({...[a, b]} = x)', Context.OptionDisablesWebCompat, {
      "body": [
        {
         "expression": {
            "left": {
              "properties": [
                {
                  "argument": {
                    "elements": [
                      {
                        "name": "a",
                        "type": "Identifier"
                      },
                      {
                       "name": "b",
                        "type": "Identifier"
                      }
                    ],
                    "type": "ArrayPattern"
                  },
                  "type": "RestElement"
                }
              ],
              "type": "ObjectPattern"
            },
            "operator": "=",
            "right": {
              "name": "x",
              "type": "Identifier"
            },
            "type": "AssignmentExpression"
          },
          "type": "ExpressionStatement"
        }
      ],
      "sourceType": "script",
      "type": "Program"
    }],
   ['({...[a, b]}) => x', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "ArrowFunctionExpression",
          "body": {
            "type": "Identifier",
            "name": "x"
          },
          "params": [
            {
              "type": "ObjectPattern",
              "properties": [
                {
                  "type": "RestElement",
                  "argument": {
                    "type": "ArrayPattern",
                    "elements": [
                      {
                        "type": "Identifier",
                        "name": "a"
                      },
                      {
                        "type": "Identifier",
                        "name": "b"
                      }
                    ]
                  }
                }
              ]
            }
          ],
          "id": null,
          "async": false,
          "generator": false,
          "expression": true
        }
      }
    ]
  }],
   ['({...{a, b}}) => x', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "ArrowFunctionExpression",
          "body": {
            "type": "Identifier",
            "name": "x"
          },
          "params": [
            {
              "type": "ObjectPattern",
              "properties": [
                {
                  "type": "RestElement",
                  "argument": {
                    "type": "ObjectPattern",
                    "properties": [
                      {
                        "type": "Property",
                        "key": {
                          "type": "Identifier",
                          "name": "a"
                        },
                        "value": {
                          "type": "Identifier",
                          "name": "a"
                        },
                        "kind": "init",
                        "computed": false,
                        "method": false,
                        "shorthand": true
                      },
                      {
                        "type": "Property",
                        "key": {
                          "type": "Identifier",
                          "name": "b"
                        },
                        "value": {
                          "type": "Identifier",
                          "name": "b"
                        },
                        "kind": "init",
                        "computed": false,
                        "method": false,
                        "shorthand": true
                      }
                    ]
                  }
                }
              ]
            }
          ],
          "id": null,
          "async": false,
          "generator": false,
          "expression": true
        }
      }
    ]
  }],
   ['(z = {...x.y} = z) => z', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "ArrowFunctionExpression",
          "body": {
            "type": "Identifier",
            "name": "z"
          },
          "params": [
            {
              "type": "AssignmentPattern",
              "left": {
                "type": "Identifier",
                "name": "z"
              },
              "right": {
                "type": "AssignmentExpression",
                "left": {
                  "type": "ObjectPattern",
                  "properties": [
                    {
                      "type": "RestElement",
                      "argument": {
                        "type": "MemberExpression",
                        "object": {
                          "type": "Identifier",
                          "name": "x"
                        },
                        "computed": false,
                        "property": {
                          "type": "Identifier",
                          "name": "y"
                        }
                      }
                    }
                  ]
                },
                "operator": "=",
                "right": {
                  "type": "Identifier",
                  "name": "z"
                }
              }
            }
          ],
          "id": null,
          "async": false,
          "generator": false,
          "expression": true
        }
      }
    ]
  }],
   ['({...x=y});', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "ObjectExpression",
          "properties": [
            {
              "type": "SpreadElement",
              "argument": {
                "type": "AssignmentExpression",
                "left": {
                  "type": "Identifier",
                  "name": "x"
                },
                "operator": "=",
                "right": {
                  "type": "Identifier",
                  "name": "y"
                }
              }
            }
          ]
        }
      }
    ]
  }],
   ['({...x+=y});', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "ObjectExpression",
          "properties": [
            {
              "type": "SpreadElement",
              "argument": {
                "type": "AssignmentExpression",
                "left": {
                  "type": "Identifier",
                  "name": "x"
                },
                "operator": "+=",
                "right": {
                  "type": "Identifier",
                  "name": "y"
                }
              }
            }
          ]
        }
      }
    ]
  }],
   ['({...x, ...y});', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "ObjectExpression",
          "properties": [
            {
              "type": "SpreadElement",
              "argument": {
                "type": "Identifier",
                "name": "x"
              }
            },
            {
              "type": "SpreadElement",
              "argument": {
                "type": "Identifier",
                "name": "y"
              }
            }
          ]
        }
      }
    ]
  }],
   ['({...x.y} = z)', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "RestElement",
                "argument": {
                  "type": "MemberExpression",
                  "object": {
                    "type": "Identifier",
                    "name": "x"
                  },
                  "computed": false,
                  "property": {
                    "type": "Identifier",
                    "name": "y"
                  }
                }
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "z"
          }
        }
      }
    ]
  }],
   ['({[foo]: x} = y)', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "ObjectPattern",
                    "properties": [
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "computed": true,
                            "value": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        }
                    ]
                },
                "right": {
                    "type": "Identifier",
                    "name": "y"
                }
            }
        }
    ],
    "sourceType": "script"
}],
   ['({[foo]: bar} = baz)', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "ObjectPattern",
                    "properties": [
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "foo"
                            },
                            "computed": true,
                            "value": {
                                "type": "Identifier",
                                "name": "bar"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        }
                    ]
                },
                "right": {
                    "type": "Identifier",
                    "name": "baz"
                }
            }
        }
    ],
    "sourceType": "script"
}],
    ['({...x});', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "ObjectExpression",
          "properties": [
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
    ]
  }],
   ['({ __proto__: b, "__proto__": c})', Context.OptionDisablesWebCompat, {
      "body": [
        {
          "expression": {
            "properties": [
              {
                "computed": false,
                "key": {
                  "name": "__proto__",
                  "type": "Identifier",
                },
                "kind": "init",
                "method": false,
                "shorthand": false,
                "type": "Property",
                "value": {
                  "name": "b",
                  "type": "Identifier"
                }
              },
              {
                "computed": false,
                "key": {
                  "type": "Literal",
                  "value": "__proto__",
                },
                "kind": "init",
                "method": false,
                "shorthand": false,
                "type": "Property",
                "value": {
                  "name": "c",
                  "type": "Identifier"
                }
              }
            ],
            "type": "ObjectExpression"
          },
          "type": "ExpressionStatement"
        }
      ],
      "sourceType": "script",
      "type": "Program"
    }],
   ['x = {__proto__(){}, __proto__: 2}', Context.Empty, {
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
                    "type": "ObjectExpression",
                    "properties": [
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "__proto__"
                            },
                            "computed": false,
                            "value": {
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
                            "kind": "init",
                            "method": true,
                            "shorthand": false
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "__proto__"
                            },
                            "computed": false,
                            "value": {
                                "type": "Literal",
                                "value": 2,
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        }
                    ]
                }
            }
        }
    ],
    "sourceType": "script"
}],
   ['x = {__proto__(){}, __proto__(){}}', Context.Empty, {
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
                    "type": "ObjectExpression",
                    "properties": [
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "__proto__"
                            },
                            "computed": false,
                            "value": {
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
                            "kind": "init",
                            "method": true,
                            "shorthand": false
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "__proto__"
                            },
                            "computed": false,
                            "value": {
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
                            "kind": "init",
                            "method": true,
                            "shorthand": false
                        }
                    ]
                }
            }
        }
    ],
    "sourceType": "script"
}],
   ['x = {async __proto__(){}, *__proto__(){}}', Context.Empty, {
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
                    "type": "ObjectExpression",
                    "properties": [
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "__proto__"
                            },
                            "computed": false,
                            "value": {
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
                            "kind": "init",
                            "method": true,
                            "shorthand": false
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "__proto__"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "generator": true,
                                "expression": false,
                                "async": false
                            },
                            "kind": "init",
                            "method": true,
                            "shorthand": false
                        }
                    ]
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['({ "__proto__": "__proto__"})', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "ObjectExpression",
                "properties": [
                    {
                        "type": "Property",
                        "key": {
                            "type": "Literal",
                            "value": "__proto__"
                        },
                        "computed": false,
                        "value": {
                            "type": "Literal",
                            "value": "__proto__"
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
  ['({f(x) { var x; }})', Context.Empty, {
    "type": "Program",
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
                            "name": "f"
                        },
                        "computed": false,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "x"
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": [
                                    {
                                        "type": "VariableDeclaration",
                                        "declarations": [
                                            {
                                                "type": "VariableDeclarator",
                                                "id": {
                                                    "type": "Identifier",
                                                    "name": "x"
                                                },
                                                "init": null
                                            }
                                        ],
                                        "kind": "var"
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
        }
    ],
    "sourceType": "script"
}],
  ['x = {f(f) { }}', Context.Empty, {
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
                    "type": "ObjectExpression",
                    "properties": [
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "f"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [
                                    {
                                        "type": "Identifier",
                                        "name": "f"
                                    }
                                ],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": []
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
            }
        }
    ],
    "sourceType": "script"
}],
  ['o = {f(x) { function x() {} }}', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "Identifier",
                    "name": "o"
                },
                "right": {
                    "type": "ObjectExpression",
                    "properties": [
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "f"
                            },
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [
                                    {
                                        "type": "Identifier",
                                        "name": "x"
                                    }
                                ],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "FunctionDeclaration",
                                            "id": {
                                                "type": "Identifier",
                                                "name": "x"
                                            },
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": []
                                            },
                                            "generator": false,
                                            "expression": false,
                                            "async": false
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
            }
        }
    ],
    "sourceType": "script"
}],
  ['({15: bar});', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "ObjectExpression",
                "properties": [
                    {
                        "type": "Property",
                        "key": {
                            "type": "Literal",
                            "value": 15
                        },
                        "computed": false,
                        "value": {
                            "type": "Identifier",
                            "name": "bar"
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
  ['({9:a=b});', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "ObjectExpression",
                "properties": [
                    {
                        "type": "Property",
                        "key": {
                            "type": "Literal",
                            "value": 9,
                        },
                        "computed": false,
                        "value": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "b"
                            }
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
  ['({15(){}});', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "ObjectExpression",
                "properties": [
                    {
                        "type": "Property",
                        "key": {
                            "type": "Literal",
                            "value": 15
                        },
                        "computed": false,
                        "value": {
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
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
  ['({15: bar}) => x', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "ArrowFunctionExpression",
                "id": null,
                "params": [
                    {
                        "type": "ObjectPattern",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Literal",
                                    "value": 15
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "bar"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }
                        ]
                    }
                ],
                "body": {
                    "type": "Identifier",
                    "name": "x"
                },
                "generator": false,
                "expression": true,
                "async": false
            }
        }
    ],
    "sourceType": "script"
}],
  ['({"a b c"(){}});', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "ObjectExpression",
                "properties": [
                    {
                        "type": "Property",
                        "key": {
                            "type": "Literal",
                            "value": "a b c"
                        },
                        "computed": false,
                        "value": {
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
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
  ['({ident: yield})', Context.Empty, {
    "type": "Program",
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
                            "name": "ident"
                        },
                        "computed": false,
                        "value": {
                            "type": "Identifier",
                            "name": "yield"
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
  ['x = ({get});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "get"
                },
                "value": {
                  "type": "Identifier",
                  "name": "get"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": true
              }
            ]
          }
        }
      }
    ]
  }],

  ['x = ({async});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "async"
                },
                "value": {
                  "type": "Identifier",
                  "name": "async"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": true
              }
            ]
          }
        }
      }
    ]
  }],
   ['wrap({get} = x);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "CallExpression",
          "callee": {
            "type": "Identifier",
            "name": "wrap"
          },
          "arguments": [
            {
              "type": "AssignmentExpression",
              "left": {
                "type": "ObjectPattern",
                "properties": [
                  {
                    "type": "Property",
                    "key": {
                      "type": "Identifier",
                      "name": "get"
                    },
                    "value": {
                      "type": "Identifier",
                      "name": "get"
                    },
                    "kind": "init",
                    "computed": false,
                    "method": false,
                    "shorthand": true
                  }
                ]
              },
              "operator": "=",
              "right": {
                "type": "Identifier",
                "name": "x"
              }
            }
          ]
        }
      }
    ]
  }],
   ['wrap({async} = x);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "CallExpression",
          "callee": {
            "type": "Identifier",
            "name": "wrap"
          },
          "arguments": [
            {
              "type": "AssignmentExpression",
              "left": {
                "type": "ObjectPattern",
                "properties": [
                  {
                    "type": "Property",
                    "key": {
                      "type": "Identifier",
                      "name": "async"
                    },
                    "value": {
                      "type": "Identifier",
                      "name": "async"
                    },
                    "kind": "init",
                    "computed": false,
                    "method": false,
                    "shorthand": true
                  }
                ]
              },
              "operator": "=",
              "right": {
                "type": "Identifier",
                "name": "x"
              }
            }
          ]
        }
      }
    ]
  }],
   ['x = ({get:b});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "get"
                },
                "value": {
                  "type": "Identifier",
                  "name": "b"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              }
            ]
          }
        }
      }
    ]
  }],
    ['x = ({a, b});', Context.Empty, {
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
                      "type": "ObjectExpression",
                      "properties": [
                          {
                              "type": "Property",
                              "key": {
                                  "type": "Identifier",
                                  "name": "a"
                              },
                              "computed": false,
                              "value": {
                                  "type": "Identifier",
                                  "name": "a"
                              },
                              "kind": "init",
                              "method": false,
                              "shorthand": true
                          },
                          {
                              "type": "Property",
                              "key": {
                                  "type": "Identifier",
                                  "name": "b"
                              },
                              "computed": false,
                              "value": {
                                  "type": "Identifier",
                                  "name": "b"
                              },
                              "kind": "init",
                              "method": false,
                              "shorthand": true
                          }
                      ]
                  }
              }
          }
      ],
      "sourceType": "script"
  }],
  ['x = ({a, b} = x);', Context.Empty, {
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
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "ObjectPattern",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true
                            },
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "b"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "b"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true
                            }
                        ]
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "x"
                    }
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['x = ({a:b, c:d});', Context.Empty, {
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
                    "type": "ObjectExpression",
                    "properties": [
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "computed": false,
                            "value": {
                                "type": "Identifier",
                                "name": "b"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "c"
                            },
                            "computed": false,
                            "value": {
                                "type": "Identifier",
                                "name": "d"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        }
                    ]
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['x = ({a, c:d});', Context.Empty, {
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
                    "type": "ObjectExpression",
                    "properties": [
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "computed": false,
                            "value": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": true
                        },
                        {
                            "type": "Property",
                            "key": {
                                "type": "Identifier",
                                "name": "c"
                            },
                            "computed": false,
                            "value": {
                                "type": "Identifier",
                                "name": "d"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        }
                    ]
                }
            }
        }
    ],
    "sourceType": "script"
}],
   ['x = ({a:b, c});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "a"
                },
                "value": {
                  "type": "Identifier",
                  "name": "b"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              },
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "c"
                },
                "value": {
                  "type": "Identifier",
                  "name": "c"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": true
              }
            ]
          }
        }
      }
    ]
  }],
   ['x = ({a, c:d} = x);', Context.Empty, {
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
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "ObjectPattern",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true
                            },
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "c"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "d"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }
                        ]
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "x"
                    }
                }
            }
        }
    ],
    "sourceType": "script"
}],
  ['x = ({a:b, c} = x);', Context.Empty, {
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
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "ObjectPattern",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "b"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            },
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "c"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Identifier",
                                    "name": "c"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true
                            }
                        ]
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "x"
                    }
                }
            }
        }
    ],
    "sourceType": "script"
}],
   ['for ({x=y} in a) b', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ForInStatement",
            "left": {
                "type": "ObjectPattern",
                "properties": [
                    {
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "computed": false,
                        "value": {
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "y"
                            }
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": true
                    }
                ]
            },
            "right": {
                "type": "Identifier",
                "name": "a"
            },
            "body": {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Identifier",
                    "name": "b"
                }
            },
        }
    ],
    "sourceType": "script"
}],
  ['for ({x=y} of a) b', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ForOfStatement",
            "await": false,
            "left": {
                "type": "ObjectPattern",
                "properties": [
                    {
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "computed": false,
                        "value": {
                            "type": "AssignmentPattern",
                            "left": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "y"
                            }
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": true
                    }
                ]
            },
            "right": {
                "type": "Identifier",
                "name": "a"
            },
            "body": {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "Identifier",
                    "name": "b"
                }
            }
        }
    ],
    "sourceType": "script"
}],
   ['x = ({15:b});', Context.Empty, {
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
                    "type": "ObjectExpression",
                    "properties": [
                        {
                            "type": "Property",
                            "key": {
                                "type": "Literal",
                                "value": 15
                            },
                            "computed": false,
                            "value": {
                                "type": "Identifier",
                                "name": "b"
                            },
                            "kind": "init",
                            "method": false,
                            "shorthand": false
                        }
                    ]
                }
            }
        }
    ],
    "sourceType": "script"
}],
   //['wrap({1:b, 2:d});', Context.Empty, {}],
   ['x = ({"a":b});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": "a"
                },
                "value": {
                  "type": "Identifier",
                  "name": "b"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              }
            ]
          }
        }
      }
    ]
  }],
   ['x = ({"a":b, "c":d});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": "a"
                },
                "value": {
                  "type": "Identifier",
                  "name": "b"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              },
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": "c"
                },
                "value": {
                  "type": "Identifier",
                  "name": "d"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              }
            ]
          }
        }
      }
    ]
  }],
   ['x = ({"a":b});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": "a"
                },
                "value": {
                  "type": "Identifier",
                  "name": "b"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              }
            ]
          }
        }
      }
    ]
  }],
   ['x = ({"a":b, "c":d});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": "a"
                },
                "value": {
                  "type": "Identifier",
                  "name": "b"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              },
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": "c"
                },
                "value": {
                  "type": "Identifier",
                  "name": "d"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              }
            ]
          }
        }
      }
    ]
  }],
   ['x = ({[a]:b});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "a"
                },
                "value": {
                  "type": "Identifier",
                  "name": "b"
                },
                "kind": "init",
                "computed": true,
                "method": false,
                "shorthand": false
              }
            ]
          }
        }
      }
    ]
  }],
   ['x = ({[a]:b, [15]:d});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "a"
                },
                "value": {
                  "type": "Identifier",
                  "name": "b"
                },
                "kind": "init",
                "computed": true,
                "method": false,
                "shorthand": false
              },
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": 15
                },
                "value": {
                  "type": "Identifier",
                  "name": "d"
                },
                "kind": "init",
                "computed": true,
                "method": false,
                "shorthand": false
              }
            ]
          }
        }
      }
    ]
  }],
   ['x = ({foo(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
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
                  "params": [],
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
      }
    ]
  }],
   ['({typeof: x});', Context.Empty, {
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
                "name": "typeof"
              },
              "value": {
                "type": "Identifier",
                "name": "x"
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({typeof: x} = y);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "typeof"
                },
                "value": {
                  "type": "Identifier",
                  "name": "x"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "y"
          }
        }
      }
    ]
  }],
   ['({typeof: x}) => x;', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "ArrowFunctionExpression",
          "body": {
            "type": "Identifier",
            "name": "x"
          },
          "params": [
            {
              "type": "ObjectPattern",
              "properties": [
                {
                  "type": "Property",
                  "key": {
                    "type": "Identifier",
                    "name": "typeof"
                  },
                  "value": {
                    "type": "Identifier",
                    "name": "x"
                  },
                  "kind": "init",
                  "computed": false,
                  "method": false,
                  "shorthand": false
                }
              ]
            }
          ],
          "id": null,
          "async": false,
          "generator": false,
          "expression": true
        }
      }
    ]
  }],
   ['({typeof(){}});', Context.Empty, {
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
                "name": "typeof"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [],
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
   ['({*typeof(){}});', Context.Empty, {
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
                "name": "typeof"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": false,
                "generator": true,
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
  ['({set typeof(x){}});', Context.Empty, {
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
                "name": "typeof"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [
                  {
                    "type": "Identifier",
                    "name": "x"
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
              "kind": "set",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({get typeof(){}});', Context.Empty, {
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
                "name": "typeof"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": null
              },
              "kind": "get",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({async typeof(){}});', Context.Empty, {
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
                "name": "typeof"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": true,
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
   ['({async * typeof(){}});', Context.Empty, {
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
                "name": "typeof"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": true,
                "generator": true,
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
   ['x = { async *[y](){} }', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "y"
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": true,
                  "generator": true,
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
      }
    ]
  }],
   ['({async "a b c"(){}});', Context.Empty, {
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
                "type": "Literal",
                "value": "a b c"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": true,
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
   ['({async 15(){}});', Context.Empty, {
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
                "type": "Literal",
                "value": 15
              },
              "value": {
                "type": "FunctionExpression",
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": true,
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
   ['({get "a b c"(){}});', Context.Empty, {
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
                "type": "Literal",
                "value": "a b c"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": null
              },
              "kind": "get",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({get 15(){}});', Context.Empty, {
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
                "type": "Literal",
                "value": 15
              },
              "value": {
                "type": "FunctionExpression",
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": null
              },
              "kind": "get",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({set "a b c"(x){}});', Context.Empty, {
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
                "type": "Literal",
                "value": "a b c"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [
                  {
                    "type": "Identifier",
                    "name": "x"
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
              "kind": "set",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({set 15(x){}});', Context.Empty, {
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
                "type": "Literal",
                "value": 15
              },
              "value": {
                "type": "FunctionExpression",
                "params": [
                  {
                    "type": "Identifier",
                    "name": "x"
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
              "kind": "set",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['x = ({async(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "async"
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
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
      }
    ]
  }],
   ['x = ({foo(){}, bar(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
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
                  "params": [],
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
              },
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "bar"
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
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
      }
    ]
  }],
   ['x = ({foo(a,b,c){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
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
                      "type": "Identifier",
                      "name": "a"
                    },
                    {
                      "type": "Identifier",
                      "name": "b"
                    },
                    {
                      "type": "Identifier",
                      "name": "c"
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
      }
    ]
  }],
   ['x = ({1(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": 1
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
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
      }
    ]
  }],
   ['x = ({"foo"(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": "foo"
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
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
      }
    ]
  }],
   ['x = ({async foo(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
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
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": true,
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
      }
    ]
  }],
   ['x = ({async get(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "get"
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": true,
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
      }
    ]
  }],
   ['x = ({async async(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "async"
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": true,
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
      }
    ]
  }],
   ['x = ({async "foo"(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": "foo"
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": true,
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
      }
    ]
  }],
   ['x = ({async 100(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": 100
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": true,
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
      }
    ]
  }],/*
   ['wrap({async [foo](){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
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
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": true,
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
      }
    ]
  }],*/
   ['x = ({async foo(){}, async bar(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
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
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": true,
                  "generator": false,
                  "expression": false,
                  "id": null
                },
                "kind": "init",
                "computed": false,
                "method": true,
                "shorthand": false
              },
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "bar"
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": true,
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
      }
    ]
  }],
   ['x = ({async foo(){}, bar(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
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
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": true,
                  "generator": false,
                  "expression": false,
                  "id": null
                },
                "kind": "init",
                "computed": false,
                "method": true,
                "shorthand": false
              },
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "bar"
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
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
      }
    ]
  }],
   ['x = ({foo(){}, async bar(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
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
                  "params": [],
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
              },
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "bar"
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": true,
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
      }
    ]
  }],
   ['x = ({*foo(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
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
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": false,
                  "generator": true,
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
      }
    ]
  }],
   ['x = ({*get(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "get"
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": false,
                  "generator": true,
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
      }
    ]
  }],
   ['x = ({*async(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "async"
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": false,
                  "generator": true,
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
      }
    ]
  }],
   ['x = ({*"foo"(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": "foo"
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": false,
                  "generator": true,
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
      }
    ]
  }],
   ['x = ({*123(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": 123
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": false,
                  "generator": true,
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
      }
    ]
  }],
   ['x = ({*[foo](){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
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
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": false,
                  "generator": true,
                  "expression": false,
                  "id": null
                },
                "kind": "init",
                "computed": true,
                "method": true,
                "shorthand": false
              }
            ]
          }
        }
      }
    ]
  }],
   ['x = ({* foo(){},*bar(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
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
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": false,
                  "generator": true,
                  "expression": false,
                  "id": null
                },
                "kind": "init",
                "computed": false,
                "method": true,
                "shorthand": false
              },
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "bar"
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": false,
                  "generator": true,
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
      }
    ]
  }],
   ['x = ({* foo(){}, bar(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
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
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": false,
                  "generator": true,
                  "expression": false,
                  "id": null
                },
                "kind": "init",
                "computed": false,
                "method": true,
                "shorthand": false
              },
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "bar"
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
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
      }
    ]
  }],
   ['x = ({foo(){}, *bar(){}});', Context.Empty, {
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
          "operator": "=",
          "right": {
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
                  "params": [],
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
              },
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "bar"
                },
                "value": {
                  "type": "FunctionExpression",
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "body": []
                  },
                  "async": false,
                  "generator": true,
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
      }
    ]
  }],
   ['({get foo(){}});', Context.Empty, {
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
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": null
              },
              "kind": "get",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({get get(){}});', Context.Empty, {
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
                "name": "get"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": null
              },
              "kind": "get",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({get foo(){}, get bar(){}});', Context.Empty, {
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
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": null
              },
              "kind": "get",
              "computed": false,
              "method": false,
              "shorthand": false
            },
            {
              "type": "Property",
              "key": {
                "type": "Identifier",
                "name": "bar"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": null
              },
              "kind": "get",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
  ['({get foo(){}, bar(){}});', Context.Empty, {
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
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": null
              },
              "kind": "get",
              "computed": false,
              "method": false,
              "shorthand": false
            },
            {
              "type": "Property",
              "key": {
                "type": "Identifier",
                "name": "bar"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [],
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
   ['({foo(){}, get bar(){}});', Context.Empty, {
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
                "params": [],
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
            },
            {
              "type": "Property",
              "key": {
                "type": "Identifier",
                "name": "bar"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": null
              },
              "kind": "get",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({get [foo](){}});', Context.Empty, {
    "type": "Program",
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
                        "computed": true,
                        "value": {
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
                        "kind": "get",
                        "method": false,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
   ['({get [foo](){}, get [bar](){}});', Context.Empty, {
    "type": "Program",
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
                        "computed": true,
                        "value": {
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
                        "kind": "get",
                        "method": false,
                        "shorthand": false
                    },
                    {
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "bar"
                        },
                        "computed": true,
                        "value": {
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
                        "kind": "get",
                        "method": false,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
   ['({get [foo](){}, [bar](){}});', Context.Empty, {
    "type": "Program",
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
                        "computed": true,
                        "value": {
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
                        "kind": "get",
                        "method": false,
                        "shorthand": false
                    },
                    {
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "bar"
                        },
                        "computed": true,
                        "value": {
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
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
   ['({[foo](){}, get [bar](){}});', Context.Empty, {
    "type": "Program",
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
                        "computed": true,
                        "value": {
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
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    },
                    {
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "bar"
                        },
                        "computed": true,
                        "value": {
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
                        "kind": "get",
                        "method": false,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
   ['({get "foo"(){}});', Context.Empty, {
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
                "type": "Literal",
                "value": "foo"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": null
              },
              "kind": "get",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({get "foo"(){}});', Context.Empty, {
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
                "type": "Literal",
                "value": "foo"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": null
              },
              "kind": "get",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({get 123(){}});', Context.Empty, {
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
                "type": "Literal",
                "value": 123
              },
              "value": {
                "type": "FunctionExpression",
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": false,
                "generator": false,
                "expression": false,
                "id": null
              },
              "kind": "get",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({set foo(a){}});', Context.Empty, {
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
                    "type": "Identifier",
                    "name": "a"
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
              "kind": "set",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({set get(a){}});', Context.Empty, {
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
                "name": "get"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [
                  {
                    "type": "Identifier",
                    "name": "a"
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
              "kind": "set",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({set foo(b){}, set bar(d){}});', Context.Empty, {
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
                    "type": "Identifier",
                    "name": "b"
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
              "kind": "set",
              "computed": false,
              "method": false,
              "shorthand": false
            },
            {
              "type": "Property",
              "key": {
                "type": "Identifier",
                "name": "bar"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [
                  {
                    "type": "Identifier",
                    "name": "d"
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
              "kind": "set",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({set foo(c){}, bar(){}});', Context.Empty, {
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
                    "type": "Identifier",
                    "name": "c"
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
              "kind": "set",
              "computed": false,
              "method": false,
              "shorthand": false
            },
            {
              "type": "Property",
              "key": {
                "type": "Identifier",
                "name": "bar"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [],
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
   ['({foo(){}, set bar(e){}});', Context.Empty, {
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
                "params": [],
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
            },
            {
              "type": "Property",
              "key": {
                "type": "Identifier",
                "name": "bar"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [
                  {
                    "type": "Identifier",
                    "name": "e"
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
              "kind": "set",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({set [foo](a){}});', Context.Empty, {
    "type": "Program",
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
                        "computed": true,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "a"
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        },
                        "kind": "set",
                        "method": false,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
   ['({set [foo](b){}, set [bar](d){}});', Context.Empty, {
    "type": "Program",
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
                        "computed": true,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "b"
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        },
                        "kind": "set",
                        "method": false,
                        "shorthand": false
                    },
                    {
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "bar"
                        },
                        "computed": true,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "d"
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        },
                        "kind": "set",
                        "method": false,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
   ['({set [foo](c){}, [bar](){}});', Context.Empty, {
    "type": "Program",
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
                        "computed": true,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "c"
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        },
                        "kind": "set",
                        "method": false,
                        "shorthand": false
                    },
                    {
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "bar"
                        },
                        "computed": true,
                        "value": {
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
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
   ['({[foo](){}, set [bar](e){}});', Context.Empty, {
    "type": "Program",
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
                        "computed": true,
                        "value": {
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
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    },
                    {
                        "type": "Property",
                        "key": {
                            "type": "Identifier",
                            "name": "bar"
                        },
                        "computed": true,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "e"
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        },
                        "kind": "set",
                        "method": false,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
   ['({set "foo"(a){}});', Context.Empty, {
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
                "type": "Literal",
                "value": "foo"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [
                  {
                    "type": "Identifier",
                    "name": "a"
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
              "kind": "set",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({set 123(a){}});', Context.Empty, {
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
                "type": "Literal",
                "value": 123
              },
              "value": {
                "type": "FunctionExpression",
                "params": [
                  {
                    "type": "Identifier",
                    "name": "a"
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
              "kind": "set",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({foo: typeof x});', Context.Empty, {
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
                "type": "UnaryExpression",
                "operator": "typeof",
                "argument": {
                  "type": "Identifier",
                  "name": "x"
                },
                "prefix": true
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({}=obj);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": []
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "obj"
          }
        }
      }
    ]
  }],
   ['({a}=obj);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "a"
                },
                "value": {
                  "type": "Identifier",
                  "name": "a"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": true
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "obj"
          }
        }
      }
    ]
  }],
   ['({a:b}=obj);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "a"
                },
                "value": {
                  "type": "Identifier",
                  "name": "b"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "obj"
          }
        }
      }
    ]
  }],
   ['({a, b}=obj);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "a"
                },
                "value": {
                  "type": "Identifier",
                  "name": "a"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": true
              },
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "b"
                },
                "value": {
                  "type": "Identifier",
                  "name": "b"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": true
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "obj"
          }
        }
      }
    ]
  }],
   ['({a:b, c:d}=obj);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "a"
                },
                "value": {
                  "type": "Identifier",
                  "name": "b"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              },
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "c"
                },
                "value": {
                  "type": "Identifier",
                  "name": "d"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "obj"
          }
        }
      }
    ]
  }],
   ['({a, c:d}=obj);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "a"
                },
                "value": {
                  "type": "Identifier",
                  "name": "a"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": true
              },
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "c"
                },
                "value": {
                  "type": "Identifier",
                  "name": "d"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "obj"
          }
        }
      }
    ]
  }],
   ['({a:b, c}=obj);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "a"
                },
                "value": {
                  "type": "Identifier",
                  "name": "b"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              },
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "c"
                },
                "value": {
                  "type": "Identifier",
                  "name": "c"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": true
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "obj"
          }
        }
      }
    ]
  }],
   ['({}=x);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": []
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "x"
          }
        }
      }
    ]
  }],
   ['({a=b}=c);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "a"
                },
                "value": {
                  "type": "AssignmentPattern",
                  "left": {
                    "type": "Identifier",
                    "name": "a"
                  },
                  "right": {
                    "type": "Identifier",
                    "name": "b"
                  }
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": true
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "c"
          }
        }
      }
    ]
  }],
   ['({a:v=b}=c);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "a"
                },
                "value": {
                  "type": "AssignmentPattern",
                  "left": {
                    "type": "Identifier",
                    "name": "v"
                  },
                  "right": {
                    "type": "Identifier",
                    "name": "b"
                  }
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "c"
          }
        }
      }
    ]
  }],
   ['({x:let} = a)', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "x"
                },
                "value": {
                  "type": "Identifier",
                  "name": "let"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "a"
          }
        }
      }
    ]
  }],
   ['({x:let})', Context.Empty, {
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
                "name": "x"
              },
              "value": {
                "type": "Identifier",
                "name": "let"
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({a:b=x}=y);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "a"
                },
                "value": {
                  "type": "AssignmentPattern",
                  "left": {
                    "type": "Identifier",
                    "name": "b"
                  },
                  "right": {
                    "type": "Identifier",
                    "name": "x"
                  }
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "y"
          }
        }
      }
    ]
  }],
   ['({"a":b}=obj);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": "a"
                },
                "value": {
                  "type": "Identifier",
                  "name": "b"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "obj"
          }
        }
      }
    ]
  }],
   ['({"a":b, "c":d}=obj);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": "a"
                },
                "value": {
                  "type": "Identifier",
                  "name": "b"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              },
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": "c"
                },
                "value": {
                  "type": "Identifier",
                  "name": "d"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "obj"
          }
        }
      }
    ]
  }],
   ['({"x": y+z})', Context.Empty, {
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
                "type": "Literal",
                "value": "x"
              },
              "value": {
                "type": "BinaryExpression",
                "left": {
                  "type": "Identifier",
                  "name": "y"
                },
                "right": {
                  "type": "Identifier",
                  "name": "z"
                },
                "operator": "+"
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({"x": [y]})', Context.Empty, {
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
                "type": "Literal",
                "value": "x"
              },
              "value": {
                "type": "ArrayExpression",
                "elements": [
                  {
                    "type": "Identifier",
                    "name": "y"
                  }
                ]
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({"x": [y]}) => x', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "ArrowFunctionExpression",
          "body": {
            "type": "Identifier",
            "name": "x"
          },
          "params": [
            {
              "type": "ObjectPattern",
              "properties": [
                {
                  "type": "Property",
                  "key": {
                    "type": "Literal",
                    "value": "x"
                  },
                  "value": {
                    "type": "ArrayPattern",
                    "elements": [
                      {
                        "type": "Identifier",
                        "name": "y"
                      }
                    ]
                  },
                  "kind": "init",
                  "computed": false,
                  "method": false,
                  "shorthand": false
                }
              ]
            }
          ],
          "id": null,
          "async": false,
          "generator": false,
          "expression": true
        }
      }
    ]
  }],
   ['({"x": [y + x]})', Context.Empty, {
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
                "type": "Literal",
                "value": "x"
              },
              "value": {
                "type": "ArrayExpression",
                "elements": [
                  {
                    "type": "BinaryExpression",
                    "left": {
                      "type": "Identifier",
                      "name": "y"
                    },
                    "right": {
                      "type": "Identifier",
                      "name": "x"
                    },
                    "operator": "+"
                  }
                ]
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({"x": {y: z}})', Context.Empty, {
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
                "type": "Literal",
                "value": "x"
              },
              "value": {
                "type": "ObjectExpression",
                "properties": [
                  {
                    "type": "Property",
                    "key": {
                      "type": "Identifier",
                      "name": "y"
                    },
                    "value": {
                      "type": "Identifier",
                      "name": "z"
                    },
                    "kind": "init",
                    "computed": false,
                    "method": false,
                    "shorthand": false
                  }
                ]
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({"x": {y: z}} = x)', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": "x"
                },
                "value": {
                  "type": "ObjectPattern",
                  "properties": [
                    {
                      "type": "Property",
                      "key": {
                        "type": "Identifier",
                        "name": "y"
                      },
                      "value": {
                        "type": "Identifier",
                        "name": "z"
                      },
                      "kind": "init",
                      "computed": false,
                      "method": false,
                      "shorthand": false
                    }
                  ]
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "x"
          }
        }
      }
    ]
  }],
   ['({"x": {y: z}}) => x', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "ArrowFunctionExpression",
          "body": {
            "type": "Identifier",
            "name": "x"
          },
          "params": [
            {
              "type": "ObjectPattern",
              "properties": [
                {
                  "type": "Property",
                  "key": {
                    "type": "Literal",
                    "value": "x"
                  },
                  "value": {
                    "type": "ObjectPattern",
                    "properties": [
                      {
                        "type": "Property",
                        "key": {
                          "type": "Identifier",
                          "name": "y"
                        },
                        "value": {
                          "type": "Identifier",
                          "name": "z"
                        },
                        "kind": "init",
                        "computed": false,
                        "method": false,
                        "shorthand": false
                      }
                    ]
                  },
                  "kind": "init",
                  "computed": false,
                  "method": false,
                  "shorthand": false
                }
              ]
            }
          ],
          "id": null,
          "async": false,
          "generator": false,
          "expression": true
        }
      }
    ]
  }],
   ['({"x": {a: y + x}})', Context.Empty, {
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
                "type": "Literal",
                "value": "x"
              },
              "value": {
                "type": "ObjectExpression",
                "properties": [
                  {
                    "type": "Property",
                    "key": {
                      "type": "Identifier",
                      "name": "a"
                    },
                    "value": {
                      "type": "BinaryExpression",
                      "left": {
                        "type": "Identifier",
                        "name": "y"
                      },
                      "right": {
                        "type": "Identifier",
                        "name": "x"
                      },
                      "operator": "+"
                    },
                    "kind": "init",
                    "computed": false,
                    "method": false,
                    "shorthand": false
                  }
                ]
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({"x": 600})', Context.Empty, {
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
                "type": "Literal",
                "value": "x"
              },
              "value": {
                "type": "Literal",
                "value": 600
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
   ['({[a]:b}=obj);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "a"
                },
                "value": {
                  "type": "Identifier",
                  "name": "b"
                },
                "kind": "init",
                "computed": true,
                "method": false,
                "shorthand": false
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "obj"
          }
        }
      }
    ]
  }],
  ['({[a]:b, [15]:d}=obj);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "a"
                },
                "value": {
                  "type": "Identifier",
                  "name": "b"
                },
                "kind": "init",
                "computed": true,
                "method": false,
                "shorthand": false
              },
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": 15
                },
                "value": {
                  "type": "Identifier",
                  "name": "d"
                },
                "kind": "init",
                "computed": true,
                "method": false,
                "shorthand": false
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "obj"
          }
        }
      }
    ]
  }],
  ['x = {y}', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "y"
                },
                "value": {
                  "type": "Identifier",
                  "name": "y"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": true
              }
            ]
          }
        }
      }
    ]
  }],
  ['x, {foo, bar} = doo', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "SequenceExpression",
          "expressions": [
            {
              "type": "Identifier",
              "name": "x"
            },
            {
              "type": "AssignmentExpression",
              "left": {
                "type": "ObjectPattern",
                "properties": [
                  {
                    "type": "Property",
                    "key": {
                      "type": "Identifier",
                      "name": "foo"
                    },
                    "value": {
                      "type": "Identifier",
                      "name": "foo"
                    },
                    "kind": "init",
                    "computed": false,
                    "method": false,
                    "shorthand": true
                  },
                  {
                    "type": "Property",
                    "key": {
                      "type": "Identifier",
                      "name": "bar"
                    },
                    "value": {
                      "type": "Identifier",
                      "name": "bar"
                    },
                    "kind": "init",
                    "computed": false,
                    "method": false,
                    "shorthand": true
                  }
                ]
              },
              "operator": "=",
              "right": {
                "type": "Identifier",
                "name": "doo"
              }
            }
          ]
        }
      }
    ]
  }],
  ['x, {foo = y, bar} = doo', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "SequenceExpression",
          "expressions": [
            {
              "type": "Identifier",
              "name": "x"
            },
            {
              "type": "AssignmentExpression",
              "left": {
                "type": "ObjectPattern",
                "properties": [
                  {
                    "type": "Property",
                    "key": {
                      "type": "Identifier",
                      "name": "foo"
                    },
                    "value": {
                      "type": "AssignmentPattern",
                      "left": {
                        "type": "Identifier",
                        "name": "foo"
                      },
                      "right": {
                        "type": "Identifier",
                        "name": "y"
                      }
                    },
                    "kind": "init",
                    "computed": false,
                    "method": false,
                    "shorthand": true
                  },
                  {
                    "type": "Property",
                    "key": {
                      "type": "Identifier",
                      "name": "bar"
                    },
                    "value": {
                      "type": "Identifier",
                      "name": "bar"
                    },
                    "kind": "init",
                    "computed": false,
                    "method": false,
                    "shorthand": true
                  }
                ]
              },
              "operator": "=",
              "right": {
                "type": "Identifier",
                "name": "doo"
              }
            }
          ]
        }
      }
    ]
  }],
  ['x = {a, b} = y', Context.Empty, {
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
          "operator": "=",
          "right": {
            "type": "AssignmentExpression",
            "left": {
              "type": "ObjectPattern",
              "properties": [
                {
                  "type": "Property",
                  "key": {
                    "type": "Identifier",
                    "name": "a"
                  },
                  "value": {
                    "type": "Identifier",
                    "name": "a"
                  },
                  "kind": "init",
                  "computed": false,
                  "method": false,
                  "shorthand": true
                },
                {
                  "type": "Property",
                  "key": {
                    "type": "Identifier",
                    "name": "b"
                  },
                  "value": {
                    "type": "Identifier",
                    "name": "b"
                  },
                  "kind": "init",
                  "computed": false,
                  "method": false,
                  "shorthand": true
                }
              ]
            },
            "operator": "=",
            "right": {
              "type": "Identifier",
              "name": "y"
            }
          }
        }
      }
    ]
  }],
  ['({a, b} = c = d)', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "a"
                },
                "value": {
                  "type": "Identifier",
                  "name": "a"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": true
              },
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "b"
                },
                "value": {
                  "type": "Identifier",
                  "name": "b"
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": true
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "AssignmentExpression",
            "left": {
              "type": "Identifier",
              "name": "c"
            },
            "operator": "=",
            "right": {
              "type": "Identifier",
              "name": "d"
            }
          }
        }
      }
    ]
  }],
  ['({ x: x[Y] } = x);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "AssignmentExpression",
          "left": {
            "type": "ObjectPattern",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Identifier",
                  "name": "x"
                },
                "value": {
                  "type": "MemberExpression",
                  "object": {
                    "type": "Identifier",
                    "name": "x"
                  },
                  "computed": true,
                  "property": {
                    "type": "Identifier",
                    "name": "Y"
                  }
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              }
            ]
          },
          "operator": "=",
          "right": {
            "type": "Identifier",
            "name": "x"
          }
        }
      }
    ]
  }],
  ['a={"b":c=d}', Context.Empty, {
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
            "type": "ObjectExpression",
            "properties": [
              {
                "type": "Property",
                "key": {
                  "type": "Literal",
                  "value": "b"
                },
                "value": {
                  "type": "AssignmentExpression",
                  "left": {
                    "type": "Identifier",
                    "name": "c"
                  },
                  "operator": "=",
                  "right": {
                    "type": "Identifier",
                    "name": "d"
                  }
                },
                "kind": "init",
                "computed": false,
                "method": false,
                "shorthand": false
              }
            ]
          }
        }
      }
    ]
  }],
  ['({a: 1, a: 2})', Context.Empty, {
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
                "name": "a"
              },
              "value": {
                "type": "Literal",
                "value": 1
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": false
            },
            {
              "type": "Property",
              "key": {
                "type": "Identifier",
                "name": "a"
              },
              "value": {
                "type": "Literal",
                "value": 2
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
  ['({a: 1, b: 3, a: 2})', Context.Empty, {
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
                "name": "a"
              },
              "value": {
                "type": "Literal",
                "value": 1
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": false
            },
            {
              "type": "Property",
              "key": {
                "type": "Identifier",
                "name": "b"
              },
              "value": {
                "type": "Literal",
                "value": 3
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": false
            },
            {
              "type": "Property",
              "key": {
                "type": "Identifier",
                "name": "a"
              },
              "value": {
                "type": "Literal",
                "value": 2
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
  ['({a: 1, a: 2, b: 3})', Context.Empty, {
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
                "name": "a"
              },
              "value": {
                "type": "Literal",
                "value": 1
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": false
            },
            {
              "type": "Property",
              "key": {
                "type": "Identifier",
                "name": "a"
              },
              "value": {
                "type": "Literal",
                "value": 2
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": false
            },
            {
              "type": "Property",
              "key": {
                "type": "Identifier",
                "name": "b"
              },
              "value": {
                "type": "Literal",
                "value": 3
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
  ['({a, a})', Context.Empty, {
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
                "name": "a"
              },
              "value": {
                "type": "Identifier",
                "name": "a"
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": true
            },
            {
              "type": "Property",
              "key": {
                "type": "Identifier",
                "name": "a"
              },
              "value": {
                "type": "Identifier",
                "name": "a"
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": true
            }
          ]
        }
      }
    ]
  }],
  ['({a, a: 1})', Context.Empty, {
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
                "name": "a"
              },
              "value": {
                "type": "Identifier",
                "name": "a"
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": true
            },
            {
              "type": "Property",
              "key": {
                "type": "Identifier",
                "name": "a"
              },
              "value": {
                "type": "Literal",
                "value": 1
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],

  ['({[foo](){}})', Context.Empty, {
    "type": "Program",
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
                        "computed": true,
                        "value": {
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
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
  ['({[foo]: x})', Context.Empty, {
    "type": "Program",
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
                        "computed": true,
                        "value": {
                            "type": "Identifier",
                            "name": "x"
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
  ['const foo = { get ["bar"] () { }, };', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "foo"
                    },
                    "init": {
                        "type": "ObjectExpression",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Literal",
                                    "value": "bar",
                                },
                                "computed": true,
                                "value": {
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
                                "kind": "get",
                                "method": false,
                                "shorthand": false
                            }
                        ]
                    }
                }
            ],
            "kind": "const"
        }
    ],
    "sourceType": "script"
}],
  ['const foo = { async [key] () { } };', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": "foo"
                    },
                    "init": {
                        "type": "ObjectExpression",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "key"
                                },
                                "computed": true,
                                "value": {
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
                                "kind": "init",
                                "method": true,
                                "shorthand": false
                            }
                        ]
                    }
                }
            ],
            "kind": "const"
        }
    ],
    "sourceType": "script"
}],
  ['({*[expr](){}})', Context.Empty, {
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
                "name": "expr"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "body": []
                },
                "async": false,
                "generator": true,
                "expression": false,
                "id": null
              },
              "kind": "init",
              "computed": true,
              "method": true,
              "shorthand": false
            }
          ]
        }
      }
    ]
  }],
  ['({*"cherow"(){}})', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "ObjectExpression",
                "properties": [
                    {
                        "type": "Property",
                        "key": {
                            "type": "Literal",
                            "value": "cherow",
                        },
                        "computed": false,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": true,
                            "expression": false,
                            "async": false
                        },
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
   ['({*99(){}})', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ExpressionStatement",
            "expression": {
                "type": "ObjectExpression",
                "properties": [
                    {
                        "type": "Property",
                        "key": {
                            "type": "Literal",
                            "value": 99
                        },
                        "computed": false,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": true,
                            "expression": false,
                            "async": false
                        },
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
  ['({*ident(d){}})', Context.Empty, {
    "type": "Program",
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
                            "name": "ident"
                        },
                        "computed": false,
                        "value": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [
                                {
                                    "type": "Identifier",
                                    "name": "d"
                                }
                            ],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "generator": true,
                            "expression": false,
                            "async": false
                        },
                        "kind": "init",
                        "method": true,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
  ['({})', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ExpressionStatement",
        "expression": {
          "type": "ObjectExpression",
          "properties": []
        }
      }
    ]
  }],
  ['({a(b, c){}})', Context.Empty, {
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
                "name": "a"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [
                  {
                    "type": "Identifier",
                    "name": "b"
                  },
                  {
                    "type": "Identifier",
                    "name": "c"
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
  ['({a(){}})', Context.Empty, {
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
                "name": "a"
              },
              "value": {
                "type": "FunctionExpression",
                "params": [],
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
  ['({a: a={}})', Context.Empty, {
    "type": "Program",
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
                            "name": "a"
                        },
                        "computed": false,
                        "value": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "a"
                            },
                            "right": {
                                "type": "ObjectExpression",
                                "properties": []
                            }
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
  ['({a:b})', Context.Empty, {
    "type": "Program",
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
                            "name": "a"
                        },
                        "computed": false,
                        "value": {
                            "type": "Identifier",
                            "name": "b"
                        },
                        "kind": "init",
                        "method": false,
                        "shorthand": false
                    }
                ]
            }
        }
    ],
    "sourceType": "script"
}],
  ['({a})', Context.Empty, {
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
                "name": "a"
              },
              "value": {
                "type": "Identifier",
                "name": "a"
              },
              "kind": "init",
              "computed": false,
              "method": false,
              "shorthand": true
            }
          ]
        }
      }
    ]
  }]
];

pass('Expressions - Object (pass)', valids);

});
