import { Context } from '../../../src/parser/common';
import { pass, fail } from '../../test-utils';

describe('Module - Export', () => {
  const inValids: Array<[string, Context]> = [
    ['export foo', Context.Strict | Context.Module],
    ['export {', Context.Strict | Context.Module],
    ['export async;', Context.Strict | Context.Module],
    ['var a; export { a,', Context.Strict | Context.Module],
    ['var a, b; export { a as , b};', Context.Strict | Context.Module],
    ['export { , };', Context.Strict | Context.Module],
    // ['export default;', Context.Strict | Context.Module],
    ['export default var x = 7;', Context.Strict | Context.Module],
    ['export *;', Context.Strict | Context.Module],
    ['export * from;', Context.Strict | Context.Module],
    ["export default from 'module.js';", Context.Strict | Context.Module],
    ['export { for }', Context.Strict | Context.Module],
    ['export { for as foo }', Context.Strict | Context.Module],
    ['export {try};', Context.Strict | Context.Module],
    ['export *', Context.Strict | Context.Module],
    ['export { default }', Context.Strict | Context.Module],
    ['export B, * as A, { C, D } from "test";', Context.Strict | Context.Module],
    ['function foo() { }; export [ foo ];', Context.Strict | Context.Module],
    ['function foo() { }; () => { export { foo }; }', Context.Strict | Context.Module],
    ['function foo() { }; export { foo as 100 };', Context.Strict | Context.Module],
    ['export { if as foo }', Context.Strict | Context.Module],
    ['export default function(){}; export default function(){};', Context.Strict | Context.Module],
    ['export let a = 1, a = 2;', Context.Strict | Context.Module],
    ['export const a = 1, a = 2;', Context.Strict | Context.Module],
    ['export let ...x = y', Context.Strict | Context.Module],
    ['export ...x = y', Context.Strict | Context.Module],
    ['export default ...x = y', Context.Strict | Context.Module],
    ['export var foo = x foo', Context.Strict | Context.Module],
    ['export const a = 1, a = 2;', Context.Strict | Context.Module],
    ['export const foo = x foo', Context.Strict | Context.Module],
    ['export {x, y} foo', Context.Strict | Context.Module],
    ['export {x, y} from "x" foo', Context.Strict | Context.Module],
    ['export * from "x" foo', Context.Strict | Context.Module],
    ['export * as x from "x" foo', Context.Strict | Context.Module],
    //   ['export default await', Context.Strict | Context.Module],
    //   ['export default await z', Context.Strict | Context.Module],
    ['export var let = x;', Context.Strict | Context.Module],
    ['export foo;', Context.Strict | Context.Module],
    ['var foo, bar; export {foo, ...bar}', Context.Strict | Context.Module],
    ['var foo, bar; export {[foo]}', Context.Strict | Context.Module],
    ['var foo, bar; export {{foo}}', Context.Strict | Context.Module],
    ['var foo, bar, x; export {{foo: x}}', Context.Strict | Context.Module],
    ['var foo; export {foo(){}}', Context.Strict | Context.Module],
    ['var foo; export {[foo]}', Context.Strict | Context.Module],
    ['var foo; export {[foo](){}}', Context.Strict | Context.Module],
    ['var foo; export {async foo(){}}', Context.Strict | Context.Module],
    ['export {new}', Context.Strict | Context.Module],
    ['var foo; export {foo: new}', Context.Strict | Context.Module],
    ['var foo; export {[foo]}', Context.Strict | Context.Module],
    ['var foo; export {[foo]}', Context.Strict | Context.Module],
    ['var foo; export {[foo]}', Context.Strict | Context.Module],
    ['var foo; export {[foo]}', Context.Strict | Context.Module],
    ['export default x; export {y as default};', Context.Strict | Context.Module],
    ['var x, y; export default x; export {y as default};', Context.Strict | Context.Module],
    ['export {x}; export let [x] = y;', Context.Strict | Context.Module],
    ['export let [x] = y; export {x};', Context.Strict | Context.Module],
    ['export {x}; export let [...x] = y;', Context.Strict | Context.Module],
    ['export {x}; export let {...x} = y;', Context.Strict | Context.Module],
    ['var x, y; export default x; export {y as default};', Context.Strict | Context.Module],
    ['var x, y; export default x; export {y as default};', Context.Strict | Context.Module],
    ['var x, y; export default x; export {y as default};', Context.Strict | Context.Module],
    ['var a; export {a, a}', Context.Strict | Context.Module],
    ['var a, b; export {a, b, a}', Context.Strict | Context.Module],
    ['var a, b; export {b, a, a}', Context.Strict | Context.Module],
    ['var a, b; export {a, a, b}', Context.Strict | Context.Module],
    ['var a, b; export {a, b as a}', Context.Strict | Context.Module],
    ['export let [x, x] = y;', Context.Strict | Context.Module],
    ['export function x(){}; export let [x] = y;', Context.Strict | Context.Module],
    ['export let [x] = y; export function x(){};', Context.Strict | Context.Module],
    ['export let x = y, [x] = y;', Context.Strict | Context.Module],
    ['export let x = y, [...x] = y;', Context.Strict | Context.Module],
    ['export let x = y, {...x} = y;', Context.Strict | Context.Module],
    ['export var a = x, a = y;', Context.Strict | Context.Module],
    ['var a; export {a}; export {a};', Context.Strict | Context.Module],
    ['var a,b; export {a, b}; export {a};', Context.Strict | Context.Module],
    ['var a,b; export {b, a}; export {a};', Context.Strict | Context.Module],
    ['var a,b; export {a}; export {a, b};', Context.Strict | Context.Module],
    ['export {b as a}; export {a};', Context.Strict | Context.Module],
    ['export {a}; export {b as a};', Context.Strict | Context.Module],
    ['var a; export {b as a};', Context.Strict | Context.Module],
    ['export {a as b};', Context.Strict | Context.Module],
    ['export let foo; export let foo;', Context.Strict | Context.Module],
    ['export var foo; export let foo;', Context.Strict | Context.Module],
    ['export {a}; export {b as a};', Context.Strict | Context.Module],
    ['export {a}; export {c as d};', Context.Strict | Context.Module],
    ['export {b as a}; export {a};', Context.Strict | Context.Module],
    ['export {c as d}; export {a};', Context.Strict | Context.Module]
  ];

  fail('Declarations - Functions (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'var foo; export {foo as new}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'foo'
                }
              }
            ]
          },
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'foo'
                },
                exported: {
                  type: 'Identifier',
                  name: 'new'
                }
              }
            ],
            declaration: null
          }
        ]
      }
    ],
    [
      'export {a as b}; var a;',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'a'
                },
                exported: {
                  type: 'Identifier',
                  name: 'b'
                }
              }
            ],
            declaration: null
          },
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'a'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'var a; export {a as b};',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'a'
                }
              }
            ]
          },
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'a'
                },
                exported: {
                  type: 'Identifier',
                  name: 'b'
                }
              }
            ],
            declaration: null
          }
        ]
      }
    ],
    [
      'export {foo}; function foo() {};',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'foo'
                },
                exported: {
                  type: 'Identifier',
                  name: 'foo'
                }
              }
            ],
            declaration: null
          },
          {
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: []
            },
            async: false,
            generator: false,
            expression: false,
            id: {
              type: 'Identifier',
              name: 'foo'
            }
          },
          {
            type: 'EmptyStatement'
          }
        ]
      }
    ],
    [
      'function f() {}; f(); export { f };',
      Context.Strict | Context.Module,
      {
        body: [
          {
            async: false,
            body: {
              body: [],
              type: 'BlockStatement'
            },
            expression: false,
            generator: false,
            id: {
              name: 'f',
              type: 'Identifier'
            },
            params: [],
            type: 'FunctionDeclaration'
          },
          {
            type: 'EmptyStatement'
          },
          {
            expression: {
              arguments: [],
              callee: {
                name: 'f',
                type: 'Identifier'
              },
              type: 'CallExpression'
            },
            type: 'ExpressionStatement'
          },
          {
            declaration: null,
            source: null,
            specifiers: [
              {
                exported: {
                  name: 'f',
                  type: 'Identifier'
                },
                local: {
                  name: 'f',
                  type: 'Identifier'
                },
                type: 'ExportSpecifier'
              }
            ],
            type: 'ExportNamedDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      'export * from "module";',
      Context.Strict | Context.Module,
      {
        body: [
          {
            source: {
              type: 'Literal',
              value: 'module'
            },
            type: 'ExportAllDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      'export {a as b, c as d} from "module";',
      Context.Strict | Context.Module,
      {
        body: [
          {
            declaration: null,
            source: {
              type: 'Literal',
              value: 'module'
            },
            specifiers: [
              {
                exported: {
                  name: 'b',
                  type: 'Identifier'
                },
                local: {
                  name: 'a',
                  type: 'Identifier'
                },
                type: 'ExportSpecifier'
              },
              {
                exported: {
                  name: 'd',
                  type: 'Identifier'
                },
                local: {
                  name: 'c',
                  type: 'Identifier'
                },
                type: 'ExportSpecifier'
              }
            ],
            type: 'ExportNamedDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      'export default [];',
      Context.Strict | Context.Module,
      {
        body: [
          {
            declaration: {
              elements: [],
              type: 'ArrayExpression'
            },
            type: 'ExportDefaultDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      'export const joo = 42;',
      Context.Strict | Context.Module,
      {
        body: [
          {
            declaration: {
              declarations: [
                {
                  id: {
                    name: 'joo',
                    type: 'Identifier'
                  },
                  init: {
                    type: 'Literal',
                    value: 42
                  },
                  type: 'VariableDeclarator'
                }
              ],
              kind: 'const',
              type: 'VariableDeclaration'
            },
            source: null,
            specifiers: [],
            type: 'ExportNamedDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    //['export async function async() { }',Context.Strict | Context.Module, {}],
    [
      'export let document = { }',
      Context.Strict | Context.Module,
      {
        body: [
          {
            declaration: {
              declarations: [
                {
                  id: {
                    name: 'document',
                    type: 'Identifier'
                  },
                  init: {
                    properties: [],
                    type: 'ObjectExpression'
                  },
                  type: 'VariableDeclarator'
                }
              ],
              kind: 'let',
              type: 'VariableDeclaration'
            },
            source: null,
            specifiers: [],
            type: 'ExportNamedDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      'export default () => 3',
      Context.Strict | Context.Module,
      {
        body: [
          {
            declaration: {
              async: false,
              body: {
                type: 'Literal',
                value: 3
              },
              expression: true,
              generator: false,
              id: null,
              params: [],
              type: 'ArrowFunctionExpression'
            },
            type: 'ExportDefaultDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      'export var x = 1;',
      Context.Strict | Context.Module,
      {
        body: [
          {
            declaration: {
              declarations: [
                {
                  id: {
                    name: 'x',
                    type: 'Identifier'
                  },
                  init: {
                    type: 'Literal',
                    value: 1
                  },
                  type: 'VariableDeclarator'
                }
              ],
              kind: 'var',
              type: 'VariableDeclaration'
            },
            source: null,
            specifiers: [],
            type: 'ExportNamedDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      'export default 3;',
      Context.Strict | Context.Module,
      {
        body: [
          {
            declaration: {
              type: 'Literal',
              value: 3
            },
            type: 'ExportDefaultDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      'export default (function fName() { return 7; });',
      Context.Strict | Context.Module,
      {
        body: [
          {
            declaration: {
              async: false,
              body: {
                body: [
                  {
                    argument: {
                      type: 'Literal',
                      value: 7
                    },
                    type: 'ReturnStatement'
                  }
                ],
                type: 'BlockStatement'
              },
              expression: false,
              generator: false,
              id: {
                name: 'fName',
                type: 'Identifier'
              },
              params: [],
              type: 'FunctionExpression'
            },
            type: 'ExportDefaultDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    // ['var x; export { x as a }; export { x as b };',Context.Strict | Context.Module, {}],
    // ['var x; export { x as a }; export { x as b };',Context.Strict | Context.Module, {}],
    [
      'var x; export { x as a }; export { x as b };',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'x'
                },
                init: null
              }
            ],
            kind: 'var'
          },
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'a'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: null
          },
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'b'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export default [x] = y',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'AssignmentExpression',
              left: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'x'
                  }
                ]
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'y'
              }
            }
          }
        ]
      }
    ],
    [
      'let foo, bar; export {foo, bar}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'foo'
                },
                init: null
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'bar'
                },
                init: null
              }
            ],
            kind: 'let'
          },
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'foo'
                },
                local: {
                  type: 'Identifier',
                  name: 'foo'
                }
              },
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'bar'
                },
                local: {
                  type: 'Identifier',
                  name: 'bar'
                }
              }
            ],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export default () => x',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ArrowFunctionExpression',
              id: null,
              params: [],
              body: {
                type: 'Identifier',
                name: 'x'
              },
              generator: false,
              expression: true,
              async: false
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export default function(){} foo',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              id: null,
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              generator: false,
              expression: false,
              async: false
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'foo'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export default function *f(){} foo',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: false,
              generator: true,
              expression: false,
              id: {
                type: 'Identifier',
                name: 'f'
              }
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'foo'
            }
          }
        ]
      }
    ],
    // ['export * from "foo"', Context.Strict | Context.Module, {}],
    // ['export * from "foo"', Context.Strict | Context.Module, {}],
    // ['export * from "foo"', Context.Strict | Context.Module, {}],
    // ['export * from "foo"', Context.Strict | Context.Module, {}],
    [
      'export * from "foo"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportAllDeclaration',
            source: {
              type: 'Literal',
              value: 'foo'
            }
          }
        ]
      }
    ],
    [
      'export * from "foo"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportAllDeclaration',
            source: {
              type: 'Literal',
              value: 'foo'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export {}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: null
          }
        ]
      }
    ],
    [
      'export {x}; var x;',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'x'
                },
                exported: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            declaration: null
          },
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'var x; export {x as a}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'x'
                },
                init: null
              }
            ],
            kind: 'var'
          },
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'a'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'var x; export {x,}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'x'
                },
                init: null
              }
            ],
            kind: 'var'
          },
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'x'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export {x} from "foo"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'x'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'foo'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export {x as a} from "foo"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'a'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'foo'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export {x,} from "foo"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'x'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'foo'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'var x; export {x as a,}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          },
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'x'
                },
                exported: {
                  type: 'Identifier',
                  name: 'a'
                }
              }
            ],
            declaration: null
          }
        ]
      }
    ],
    [
      'var x,y; export {x, y}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'x'
                },
                init: null
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'y'
                },
                init: null
              }
            ],
            kind: 'var'
          },
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'x'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'y'
                },
                local: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'var x,y; export {x as a, y as b}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'x'
                },
                init: null
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'y'
                },
                init: null
              }
            ],
            kind: 'var'
          },
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'a'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'b'
                },
                local: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'var x,y; export {x, y,}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'x'
                },
                init: null
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'y'
                },
                init: null
              }
            ],
            kind: 'var'
          },
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'x'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'y'
                },
                local: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'var x,y; export {x as a, y as b,}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'x'
                },
                init: null
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'y'
                },
                init: null
              }
            ],
            kind: 'var'
          },
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'a'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'b'
                },
                local: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export var x',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  init: null
                }
              ],
              kind: 'var'
            },
            specifiers: [],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export var x, y',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  init: null
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  init: null
                }
              ],
              kind: 'var'
            },
            specifiers: [],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export var x = 10, y = 20',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  init: {
                    type: 'Literal',
                    value: 10
                  }
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  init: {
                    type: 'Literal',
                    value: 20
                  }
                }
              ],
              kind: 'var'
            },
            specifiers: [],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export let x',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  init: null
                }
              ],
              kind: 'let'
            },
            specifiers: [],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export let x, y',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  init: null
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  init: null
                }
              ],
              kind: 'let'
            },
            specifiers: [],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    //  ['export const x, y', Context.Strict | Context.Module, {}],
    /*
  ['export let [...x] = y', Context.Strict | Context.Module, {
    "type": "Program",
    "body": [
        {
            "type": "ExportNamedDeclaration",
            "declaration": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "x"
                                    }
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "y"
                        }
                    }
                ],
                "kind": "let"
            },
            "specifiers": [],
            "source": null
        }
    ],
    "sourceType": "module"
}],
  ['export let a, [...x] = y', Context.Strict | Context.Module, {
    "type": "Program",
    "body": [
        {
            "type": "ExportNamedDeclaration",
            "declaration": {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "a"
                        },
                        "init": null
                    },
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "RestElement",
                                    "argument": {
                                        "type": "Identifier",
                                        "name": "x"
                                    }
                                }
                            ]
                        },
                        "init": {
                            "type": "Identifier",
                            "name": "y"
                        }
                    }
                ],
                "kind": "let"
            },
            "specifiers": [],
            "source": null
        }
    ],
    "sourceType": "module"
}],
  ['export let {...x} = y', Context.Strict | Context.Module, {
    "type": "Program",
    "sourceType": "module",
    "body": [
      {
        "type": "ExportNamedDeclaration",
        "source": null,
        "specifiers": [],
        "declaration": {
          "type": "VariableDeclaration",
          "kind": "let",
          "declarations": [
            {
              "type": "VariableDeclarator",
              "init": {
                "type": "Identifier",
                "name": "y"
              },
              "id": {
                "type": "ObjectPattern",
                "properties": [
                  {
                    "type": "RestElement",
                    "argument": {
                      "type": "Identifier",
                      "name": "x"
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  }],*/
    [
      'export function* f(){}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              id: {
                type: 'Identifier',
                name: 'f'
              },
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              generator: true,
              expression: false,
              async: false
            },
            specifiers: [],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export default function(){}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              id: null,
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              generator: false,
              expression: false,
              async: false
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export default function* f(){}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              id: {
                type: 'Identifier',
                name: 'f'
              },
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              generator: true,
              expression: false,
              async: false
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export default function f(){}; export {f};',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: false,
              generator: false,
              expression: false,
              id: {
                type: 'Identifier',
                name: 'f'
              }
            }
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'f'
                },
                exported: {
                  type: 'Identifier',
                  name: 'f'
                }
              }
            ],
            declaration: null
          }
        ]
      }
    ],
    [
      'export let a = 1;',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 1
                  },
                  id: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'export default function(){};',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              id: null,
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              generator: false,
              expression: false,
              async: false
            }
          },
          {
            type: 'EmptyStatement'
          }
        ],
        sourceType: 'module'
      }
    ]
  ];

  pass('Module - Export', valids);
});
