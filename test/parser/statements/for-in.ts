import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - For in', () => {

  const inValids: Array < [string, Context] > = [

    // Bindings

   ['for (let in x) {}', Context.Strict],
   ['for (let x;;) { var x; }', Context.OptionDisablesWebCompat],
   ['for (const x = y;;) { var x; }', Context.OptionDisablesWebCompat],
   ['for (let x in y) { var x; }', Context.OptionDisablesWebCompat],
   ['for (const x in y) { var x; }', Context.OptionDisablesWebCompat],
   ['for (let x of y) { var x; }', Context.OptionDisablesWebCompat],
   ['for (const a;;);', Context.OptionDisablesWebCompat],
   ['for (const a,b,c;;);', Context.OptionDisablesWebCompat],
   ['for (let a, b, x, d;;) { var foo; var bar; { var doo, x, ee; } }', Context.OptionDisablesWebCompat],

   // General

   // ['for (var [foo] = arr, [bar] in arr);', Context.OptionDisablesWebCompat],
   // ['for (var [foo], bar in arr);', Context.OptionDisablesWebCompat],
   // ['for (var [foo] = arr, bar in arr);', Context.OptionDisablesWebCompat],
   // ['for (var foo, [bar] in arr);', Context.OptionDisablesWebCompat],
   // ['for (var foo = arr, [bar] in arr);', Context.OptionDisablesWebCompat],
   ['for (var [foo]);', Context.OptionDisablesWebCompat],
   ['for (var [foo = x]);', Context.OptionDisablesWebCompat],
   ['for (var [foo], bar);', Context.OptionDisablesWebCompat],
   ['for (var foo, [bar]);', Context.OptionDisablesWebCompat],
   ['for (var {x}, y);', Context.OptionDisablesWebCompat],
   // ['for (var [...bar = foo] in obj);', Context.OptionDisablesWebCompat],
   // ['for (var [.x] in obj);', Context.OptionDisablesWebCompat],
   // ['for (var [..x] in obj);', Context.OptionDisablesWebCompat],
   ['for (var {x,,} in obj);', Context.OptionDisablesWebCompat],
   ['for (var {,x} in obj);', Context.OptionDisablesWebCompat],
   ['for (var {,,x} in obj);', Context.OptionDisablesWebCompat],
   ['for (var {x,, y} in obj);', Context.OptionDisablesWebCompat],
   // ['for (var {x} = a, {y} in obj);', Context.OptionDisablesWebCompat],
   // ['for (var {x} = a, y in obj);', Context.OptionDisablesWebCompat],
//   ['for (var {x} = a, obj in obj2);', Context.OptionDisablesWebCompat],
   // ['for (var x = a, {y} in obj);', Context.OptionDisablesWebCompat],
//   ['for (var x, {y} in obj);', Context.OptionDisablesWebCompat],
   ['for (var {x}, y);', Context.OptionDisablesWebCompat],
   ['for (var {x}, y);', Context.OptionDisablesWebCompat],
   ['for (var {x}, y);', Context.OptionDisablesWebCompat],
   ['for (var {x}, y);', Context.OptionDisablesWebCompat],
   ['for (var {x}, y);', Context.OptionDisablesWebCompat],
   ['for (var {x}, y);', Context.OptionDisablesWebCompat],

];

fail('Statements - For (fail)', inValids);

  // valid tests
const valids: Array < [string, Context, any] > = [
     ['for (var {x = y, z = a} in obj);', Context.OptionDisablesWebCompat, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ForInStatement",
          "body": {
            "type": "EmptyStatement"
          },
          "left": {
            "type": "VariableDeclaration",
            "kind": "var",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "init": null,
                "id": {
                  "type": "ObjectPattern",
                  "properties": [
                    {
                      "type": "Property",
                      "kind": "init",
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
                      "method": false,
                      "shorthand": true
                    },
                    {
                      "type": "Property",
                      "kind": "init",
                      "key": {
                        "type": "Identifier",
                        "name": "z"
                      },
                      "computed": false,
                      "value": {
                        "type": "AssignmentPattern",
                        "left": {
                          "type": "Identifier",
                          "name": "z"
                        },
                        "right": {
                          "type": "Identifier",
                          "name": "a"
                        }
                      },
                      "method": false,
                      "shorthand": true
                    }
                  ]
                }
              }
            ]
          },
          "right": {
            "type": "Identifier",
            "name": "obj"
          }
        }
      ]
    }],
      /*['for (var {x : y} in obj);', Context.OptionDisablesWebCompat, {
        "type": "Program",
        "sourceType": "script",
        "body": [
          {
            "type": "ForInStatement",
            "body": {
              "type": "EmptyStatement"
            },
            "left": {
              "type": "VariableDeclaration",
              "kind": "var",
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "init": null,
                  "id": {
                    "type": "ObjectPattern",
                    "properties": [
                      {
                        "type": "Property",
                        "kind": "init",
                        "key": {
                          "type": "Identifier",
                          "name": "x"
                        },
                        "computed": false,
                        "value": {
                          "type": "Identifier",
                          "name": "y"
                        },
                        "method": false,
                        "shorthand": false
                      }
                    ]
                  }
                }
              ]
            },
            "right": {
              "type": "Identifier",
              "name": "obj"
            }
          }
        ]
      }],*/
     /* ['for (var [foo, bar=b] of arr);', Context.OptionDisablesWebCompat, {
        "type": "Program",
        "body": [
            {
                "type": "ForOfStatement",
                "left": {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "ArrayPattern",
                                "elements": [
                                    {
                                        "type": "Identifier",
                                        "name": "foo"
                                    },
                                    {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "bar"
                                        },
                                        "right": {
                                            "type": "Identifier",
                                            "name": "b"
                                        }
                                    }
                                ]
                            },
                            "init": null
                        }
                    ],
                    "kind": "var"
                },
                "right": {
                    "type": "Identifier",
                    "name": "arr"
                },
                "body": {
                    "type": "EmptyStatement"
                }
            }
        ],
        "sourceType": "script"
    }],*/

  /* ['for (var {[x]: y} of obj);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForOfStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "VariableDeclaration",
          "kind": "var",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "init": null,
              "id": {
                "type": "ObjectPattern",
                "properties": [
                  {
                    "type": "Property",
                    "kind": "init",
                    "key": {
                      "type": "Identifier",
                      "name": "x"
                    },
                    "computed": true,
                    "value": {
                      "type": "Identifier",
                      "name": "y"
                    },
                    "method": false,
                    "shorthand": false
                  }
                ]
              }
            }
          ]
        },
        "right": {
          "type": "Identifier",
          "name": "obj"
        },
        "await": false
      }
    ]
  }],*/

/*   ['for (var [a=[...b], ...c] in obj);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "body": [
        {
            "type": "ForInStatement",
            "left": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "a"
                                    },
                                    "right": {
                                        "type": "ArrayExpression",
                                        "elements": [
                                            {
                                                "type": "SpreadElement",
                                                "argument": {
                                                    "type": "Identifier",
                                                    "name": "b"
                                                }
                                            }
                                        ]
                                    }
                                },
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "c"
                                    }
                                }
                            ]
                        },
                        "init": null
                    }
                ],
                "kind": "var"
            },
            "right": {
                "type": "Identifier",
                "name": "obj"
            },
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],*/

    ['for (var {x = y} in obj);', Context.OptionDisablesWebCompat, {
      "type": "Program",
      "body": [
          {
              "type": "ForInStatement",
              "left": {
                  "type": "VariableDeclaration",
                  "declarations": [
                      {
                          "type": "VariableDeclarator",
                          "id": {
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
                          "init": null
                      }
                  ],
                  "kind": "var"
              },
              "right": {
                  "type": "Identifier",
                  "name": "obj"
              },
              "body": {
                  "type": "EmptyStatement"
              }
          }
      ],
      "sourceType": "script"
  }],
    ['for (var {x = y, z} in obj);', Context.OptionDisablesWebCompat, {
      "type": "Program",
      "body": [
          {
              "type": "ForInStatement",
              "left": {
                  "type": "VariableDeclaration",
                  "declarations": [
                      {
                          "type": "VariableDeclarator",
                          "id": {
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
                                  },
                                  {
                                      "type": "Property",
                                      "key": {
                                          "type": "Identifier",
                                          "name": "z"
                                      },
                                      "computed": false,
                                      "value": {
                                          "type": "Identifier",
                                          "name": "z"
                                      },
                                      "kind": "init",
                                      "method": false,
                                      "shorthand": true
                                  }
                              ]
                          },
                          "init": null
                      }
                  ],
                  "kind": "var"
              },
              "right": {
                  "type": "Identifier",
                  "name": "obj"
              },
              "body": {
                  "type": "EmptyStatement"
              }
          }
      ],
      "sourceType": "script"
  }],
    ['for (var {} in obj);', Context.OptionDisablesWebCompat, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ForInStatement",
          "body": {
            "type": "EmptyStatement"
          },
          "left": {
            "type": "VariableDeclaration",
            "kind": "var",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "init": null,
                "id": {
                  "type": "ObjectPattern",
                  "properties": []
                }
              }
            ]
          },
          "right": {
            "type": "Identifier",
            "name": "obj"
          }
        }
      ]
    }],
    ['for (var {x} in obj);', Context.OptionDisablesWebCompat, {
      "type": "Program",
      "body": [
          {
              "type": "ForInStatement",
              "left": {
                  "type": "VariableDeclaration",
                  "declarations": [
                      {
                          "type": "VariableDeclarator",
                          "id": {
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
                                          "type": "Identifier",
                                          "name": "x"
                                      },
                                      "kind": "init",
                                      "method": false,
                                      "shorthand": true
                                  }
                              ]
                          },
                          "init": null
                      }
                  ],
                  "kind": "var"
              },
              "right": {
                  "type": "Identifier",
                  "name": "obj"
              },
              "body": {
                  "type": "EmptyStatement"
              }
          }
      ],
      "sourceType": "script"
  }],
    ['for (var {x,} in obj);', Context.OptionDisablesWebCompat, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ForInStatement",
          "body": {
            "type": "EmptyStatement"
          },
          "left": {
            "type": "VariableDeclaration",
            "kind": "var",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "init": null,
                "id": {
                  "type": "ObjectPattern",
                  "properties": [
                    {
                      "type": "Property",
                      "kind": "init",
                      "key": {
                        "type": "Identifier",
                        "name": "x"
                      },
                      "computed": false,
                      "value": {
                        "type": "Identifier",
                        "name": "x"
                      },
                      "method": false,
                      "shorthand": true
                    }
                  ]
                }
              }
            ]
          },
          "right": {
            "type": "Identifier",
            "name": "obj"
          }
        }
      ]
    }],
    ['for (var {x, y} in obj);', Context.OptionDisablesWebCompat, {
      "type": "Program",
      "sourceType": "script",
      "body": [
        {
          "type": "ForInStatement",
          "body": {
            "type": "EmptyStatement"
          },
          "left": {
            "type": "VariableDeclaration",
            "kind": "var",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "init": null,
                "id": {
                  "type": "ObjectPattern",
                  "properties": [
                    {
                      "type": "Property",
                      "kind": "init",
                      "key": {
                        "type": "Identifier",
                        "name": "x"
                      },
                      "computed": false,
                      "value": {
                        "type": "Identifier",
                        "name": "x"
                      },
                      "method": false,
                      "shorthand": true
                    },
                    {
                      "type": "Property",
                      "kind": "init",
                      "key": {
                        "type": "Identifier",
                        "name": "y"
                      },
                      "computed": false,
                      "value": {
                        "type": "Identifier",
                        "name": "y"
                      },
                      "method": false,
                      "shorthand": true
                    }
                  ]
                }
              }
            ]
          },
          "right": {
            "type": "Identifier",
            "name": "obj"
          }
        }
      ]
    }],
    // ['for (var [...foo] in obj);', Context.OptionDisablesWebCompat, {}],
    // ['for (var [...foo] in obj);', Context.OptionDisablesWebCompat, {}],
    // ['for (var [...foo] in obj);', Context.OptionDisablesWebCompat, {}],
    // ['for (var [...foo] in obj);', Context.OptionDisablesWebCompat, {}],
    // ['for (var [...foo] in obj);', Context.OptionDisablesWebCompat, {}],
    // ['for (var [...foo] in obj);', Context.OptionDisablesWebCompat, {}],
 /* ['for (var [...foo] in obj);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "VariableDeclaration",
          "kind": "var",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "init": null,
              "id": {
                "type": "ArrayPattern",
                "elements": [
                  {
                    "type": "RestElement",
                    "argument": {
                      "type": "Identifier",
                      "name": "foo"
                    }
                  }
                ]
              }
            }
          ]
        },
        "right": {
          "type": "Identifier",
          "name": "obj"
        }
      }
    ]
  }],*/
/**
  ['for (var [foo=a] in arr);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "VariableDeclaration",
          "kind": "var",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "init": null,
              "id": {
                "type": "ArrayPattern",
                "elements": [
                  {
                    "type": "AssignmentPattern",
                    "left": {
                      "type": "Identifier",
                      "name": "foo"
                    },
                    "right": {
                      "type": "Identifier",
                      "name": "a"
                    }
                  }
                ]
              }
            }
          ]
        },
        "right": {
          "type": "Identifier",
          "name": "arr"
        }
      }
    ]
  }],
  ['for (var [foo=a, bar] in arr);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "VariableDeclaration",
          "kind": "var",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "init": null,
              "id": {
                "type": "ArrayPattern",
                "elements": [
                  {
                    "type": "AssignmentPattern",
                    "left": {
                      "type": "Identifier",
                      "name": "foo"
                    },
                    "right": {
                      "type": "Identifier",
                      "name": "a"
                    }
                  },
                  {
                    "type": "Identifier",
                    "name": "bar"
                  }
                ]
              }
            }
          ]
        },
        "right": {
          "type": "Identifier",
          "name": "arr"
        }
      }
    ]
  }],
  ['for (var [foo, bar=b] in arr);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "VariableDeclaration",
          "kind": "var",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "init": null,
              "id": {
                "type": "ArrayPattern",
                "elements": [
                  {
                    "type": "Identifier",
                    "name": "foo"
                  },
                  {
                    "type": "AssignmentPattern",
                    "left": {
                      "type": "Identifier",
                      "name": "bar"
                    },
                    "right": {
                      "type": "Identifier",
                      "name": "b"
                    }
                  }
                ]
              }
            }
          ]
        },
        "right": {
          "type": "Identifier",
          "name": "arr"
        }
      }
    ]
  }], */
 /* ['for (var [foo=a, bar=b] in arr);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "VariableDeclaration",
          "kind": "var",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "init": null,
              "id": {
                "type": "ArrayPattern",
                "elements": [
                  {
                    "type": "AssignmentPattern",
                    "left": {
                      "type": "Identifier",
                      "name": "foo"
                    },
                    "right": {
                      "type": "Identifier",
                      "name": "a"
                    }
                  },
                  {
                    "type": "AssignmentPattern",
                    "left": {
                      "type": "Identifier",
                      "name": "bar"
                    },
                    "right": {
                      "type": "Identifier",
                      "name": "b"
                    }
                  }
                ]
              }
            }
          ]
        },
        "right": {
          "type": "Identifier",
          "name": "arr"
        }
      }
    ]
  }],*/
  ['for (var [] in x);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "body": [
        {
            "type": "ForInStatement",
            "left": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": []
                        },
                        "init": null
                    }
                ],
                "kind": "var"
            },
            "right": {
                "type": "Identifier",
                "name": "x"
            },
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],
 /* ['for (var [,] in x);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "body": [
        {
            "type": "ForInStatement",
            "left": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                null
                            ]
                        },
                        "init": null
                    }
                ],
                "kind": "var"
            },
            "right": {
                "type": "Identifier",
                "name": "x"
            },
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],
  ['for (var [foo] in arr);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "VariableDeclaration",
          "kind": "var",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "init": null,
              "id": {
                "type": "ArrayPattern",
                "elements": [
                  {
                    "type": "Identifier",
                    "name": "foo"
                  }
                ]
              }
            }
          ]
        },
        "right": {
          "type": "Identifier",
          "name": "arr"
        }
      }
    ]
  }],*/
 /* ['for (var [foo,] in arr);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "VariableDeclaration",
          "kind": "var",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "init": null,
              "id": {
                "type": "ArrayPattern",
                "elements": [
                  {
                    "type": "Identifier",
                    "name": "foo"
                  }
                ]
              }
            }
          ]
        },
        "right": {
          "type": "Identifier",
          "name": "arr"
        }
      }
    ]
  }],*/
/*  ['for (var [foo,,] in arr);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "VariableDeclaration",
          "kind": "var",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "init": null,
              "id": {
                "type": "ArrayPattern",
                "elements": [
                  {
                    "type": "Identifier",
                    "name": "foo"
                  },
                  null
                ]
              }
            }
          ]
        },
        "right": {
          "type": "Identifier",
          "name": "arr"
        }
      }
    ]
  }],*//*
  ['for (var [,foo] in arr);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "VariableDeclaration",
          "kind": "var",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "init": null,
              "id": {
                "type": "ArrayPattern",
                "elements": [
                  null,
                  {
                    "type": "Identifier",
                    "name": "foo"
                  }
                ]
              }
            }
          ]
        },
        "right": {
          "type": "Identifier",
          "name": "arr"
        }
      }
    ]
  }],
  ['for (var [foo,bar] in arr);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "VariableDeclaration",
          "kind": "var",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "init": null,
              "id": {
                "type": "ArrayPattern",
                "elements": [
                  {
                    "type": "Identifier",
                    "name": "foo"
                  },
                  {
                    "type": "Identifier",
                    "name": "bar"
                  }
                ]
              }
            }
          ]
        },
        "right": {
          "type": "Identifier",
          "name": "arr"
        }
      }
    ]
  }],*/
  /*['for (var [foo,,bar] in arr);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "VariableDeclaration",
          "kind": "var",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "init": null,
              "id": {
                "type": "ArrayPattern",
                "elements": [
                  {
                    "type": "Identifier",
                    "name": "foo"
                  },
                  null,
                  {
                    "type": "Identifier",
                    "name": "bar"
                  }
                ]
              }
            }
          ]
        },
        "right": {
          "type": "Identifier",
          "name": "arr"
        }
      }
    ]
  }],*/
  ['for (a in b);', Context.OptionDisablesWebCompat, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "Identifier",
          "name": "a"
        },
        "right": {
          "type": "Identifier",
          "name": "b"
        }
      }
    ]
  }],
  ['for (a in b); for (a in b); for (a in b);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "Identifier",
          "name": "a"
        },
        "right": {
          "type": "Identifier",
          "name": "b"
        }
      },
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "Identifier",
          "name": "a"
        },
        "right": {
          "type": "Identifier",
          "name": "b"
        }
      },
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "Identifier",
          "name": "a"
        },
        "right": {
          "type": "Identifier",
          "name": "b"
        }
      }
    ]
  }],
   ['for (let a in b);', Context.Empty, {
    "type": "Program",
    "sourceType": "script",
    "body": [
      {
        "type": "ForInStatement",
        "body": {
          "type": "EmptyStatement"
        },
        "left": {
          "type": "VariableDeclaration",
          "kind": "let",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "init": null,
              "id": {
                "type": "Identifier",
                "name": "a"
              }
            }
          ]
        },
        "right": {
          "type": "Identifier",
          "name": "b"
        }
      }
    ]
  }],
   ['for (const a in b);', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ForInStatement",
            "left": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "init": null
                    }
                ],
                "kind": "const"
            },
            "right": {
                "type": "Identifier",
                "name": "b"
            },
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}],

   ['for (let in x) {}', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ForInStatement",
            "left": {
                "type": "Identifier",
                "name": "let"
            },
            "right": {
                "type": "Identifier",
                "name": "x"
            },
            "body": {
                "type": "BlockStatement",
                "body": []
            }
        }
    ],
    "sourceType": "script"
}],/*
   ['for (var a = b in c);', Context.Empty, {
    "type": "Program",
    "body": [
        {
            "type": "ForInStatement",
            "left": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "b"
                        }
                    }
                ],
                "kind": "var"
            },
            "right": {
                "type": "Identifier",
                "name": "c"
            },
            "body": {
                "type": "EmptyStatement"
            }
        }
    ],
    "sourceType": "script"
}]*/
];

pass('Statements - For In (pass)', valids);

});
