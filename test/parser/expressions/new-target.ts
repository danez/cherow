import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import { parseSource } from '../../../src/parser/parser';
import * as t from 'assert';

describe('Expressions - New target', () => {
  const validSyntax = [
    'new.target',
    '{ new.target }',
    '() => { new.target }',
    '() => new.target',
    'if (1) { new.target }',
    'if (1) {} else { new.target }',
    // 'while (0) { new.target }',
    //'do { new.target } while (0)',
    'function a(b = new.target){}',
    // 'class C {get x() { { new.target } }}',
    // 'class C {get x() { () => new.target }}',
    //'class C {get x() { do { new.target } while (0) }}',
    'function f() { new.target }',
    'function f() { () => new.target }',
    'function f() { if (1) { new.target } }',
    // 'function f() { while (0) { new.target } }',
    //'function f() { do { new.target } while (0) }',
    `function a(){{if(true){new.target;}}}`,
    `function abc(){ var a = b = c = 1; try {} catch([a,b,c]) { new.target;}}`,
    `function a(){ var o = { "foo" : function () { new.target}}; o.foo();}`,
    '({ set a(b = new.target){} })',
    '(function a(b = new.target){})',
    'function f() { let x = new.target; }',
    'function f() { new new.target()(); }',
    'function f() { new.target(); }'
  ];
  for (const arg of validSyntax) {
    it(`function f() {${arg}}`, () => {
      t.doesNotThrow(() => {
        parseSource(`function f() {${arg}}`, undefined, Context.OptionsNext | Context.Module);
      });
    });

    it(`var f = function() {${arg}}`, () => {
      t.doesNotThrow(() => {
        parseSource(`var f = function() {${arg}}`, undefined, Context.OptionsNext | Context.Module);
      });
    });

    it(`({m: function() {${arg}}})`, () => {
      t.doesNotThrow(() => {
        parseSource(`({m: function() {${arg}}})`, undefined, Context.OptionsNext | Context.Module);
      });
    });

    it(`({set x(_) {${arg}}})`, () => {
      t.doesNotThrow(() => {
        parseSource(`({set x(_) {${arg}}})`, undefined, Context.OptionsNext);
      });
    });

    it(`'use strict'; ({get x() {${arg}}})`, () => {
      t.doesNotThrow(() => {
        parseSource(`'use strict'; ({get x() {${arg}}})`, undefined, Context.Empty);
      });
    });

    it(`({m: function() {${arg}}})`, () => {
      t.doesNotThrow(() => {
        parseSource(`({m: function() {${arg}}})`, undefined, Context.OptionsNext | Context.Module);
      });
    });

    it(`'use strict'; ({m: function() {${arg}}})`, () => {
      t.doesNotThrow(() => {
        parseSource(`'use strict'; ({m: function() {${arg}}})`, undefined, Context.OptionsNext | Context.Module);
      });
    });
  }
  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'foo.bar',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'foo'
              },
              property: {
                type: 'Identifier',
                name: 'bar'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'a().b',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'a'
                },
                arguments: []
              },
              property: {
                type: 'Identifier',
                name: 'b'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'a[b, c]',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              computed: true,
              object: {
                type: 'Identifier',
                name: 'a'
              },
              property: {
                type: 'SequenceExpression',
                expressions: [
                  {
                    type: 'Identifier',
                    name: 'b'
                  },
                  {
                    type: 'Identifier',
                    name: 'c'
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(a[b]||(c[d]=e))',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'LogicalExpression',
              operator: '||',
              left: {
                type: 'MemberExpression',
                computed: true,
                object: {
                  type: 'Identifier',
                  name: 'a'
                },
                property: {
                  type: 'Identifier',
                  name: 'b'
                }
              },
              right: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'MemberExpression',
                  computed: true,
                  object: {
                    type: 'Identifier',
                    name: 'c'
                  },
                  property: {
                    type: 'Identifier',
                    name: 'd'
                  }
                },
                right: {
                  type: 'Identifier',
                  name: 'e'
                }
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'a&&(b=c)&&(d=e)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'LogicalExpression',
              operator: '&&',
              left: {
                type: 'LogicalExpression',
                operator: '&&',
                left: {
                  type: 'Identifier',
                  name: 'a'
                },
                right: {
                  type: 'AssignmentExpression',
                  operator: '=',
                  left: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'c'
                  }
                }
              },
              right: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'Identifier',
                  name: 'd'
                },
                right: {
                  type: 'Identifier',
                  name: 'e'
                }
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'a.if',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'a'
              },
              property: {
                type: 'Identifier',
                name: 'if'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'a.false',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'a'
              },
              property: {
                type: 'Identifier',
                name: 'false'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'set.push(existing);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                computed: false,
                object: {
                  type: 'Identifier',
                  name: 'set'
                },
                property: {
                  type: 'Identifier',
                  name: 'push'
                }
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'existing'
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'a[b, c]',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              computed: true,
              object: {
                type: 'Identifier',
                name: 'a'
              },
              property: {
                type: 'SequenceExpression',
                expressions: [
                  {
                    type: 'Identifier',
                    name: 'b'
                  },
                  {
                    type: 'Identifier',
                    name: 'c'
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'a.$._.B0',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'MemberExpression',
                computed: false,
                object: {
                  type: 'MemberExpression',
                  computed: false,
                  object: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  property: {
                    type: 'Identifier',
                    name: '$'
                  }
                },
                property: {
                  type: 'Identifier',
                  name: '_'
                }
              },
              property: {
                type: 'Identifier',
                name: 'B0'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Expressions - New target (pass)', valids);
});
