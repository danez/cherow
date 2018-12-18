import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Try', () => {

    const inValids: Array < [string, Context] > = [

      // Bindings - Acorn

      ['try {} catch (foo) { var foo; }', Context.Empty],
      ['try {} catch (foo) { let foo; }', Context.Empty],
      ['try {} catch (foo) { try {} catch (_) { var foo; } }', Context.Empty],
      ['try {} catch ([foo]) { var foo; }', Context.OptionsWebCompat],
      ['try {} catch ({ foo }) { var foo; }', Context.Empty],
      ['try {} catch ({ a: foo, b: { c: [foo] } }) {}', Context.Empty],
      ['try {} catch (foo) { function foo() {} }', Context.Empty],

      // Bindings - Acorn

      ['try {} catch (e) { const e = x; }', Context.Empty],
      ['try {} catch (e) { const e = x; }', Context.Empty],
      ['try {} catch (e) { var e = x; }', Context.Empty],
      ['try {} catch (e) { let e = x; }', Context.OptionsWebCompat],
      ['try { var foo = 1; } catch (e) {} let foo = 1;', Context.Empty],
      ['try {} catch (foo) { let foo = 1; }', Context.Empty],
      ['try {} catch (e) { const e = x; }', Context.Empty],
      ['try {} catch (e) { const e = x; }', Context.Empty],
      ['try {} catch (e) { const e = x; }', Context.Empty],
  ];

  fail('Statements - Try (fail)', inValids);

  // valid tests
  const valids: Array < [string, Context, any] > = [
    ['try {} catch (foo) {} var foo;', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "TryStatement",
              "block": {
                  "type": "BlockStatement",
                  "body": []
              },
              "handler": {
                  "type": "CatchClause",
                  "param": {
                      "type": "Identifier",
                      "name": "foo"
                  },
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  }
              },
              "finalizer": null
          },
          {
              "type": "VariableDeclaration",
              "declarations": [
                  {
                      "type": "VariableDeclarator",
                      "id": {
                          "type": "Identifier",
                          "name": "foo"
                      },
                      "init": null
                  }
              ],
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }],
    ['try {} catch (foo) {} let foo;', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "TryStatement",
              "block": {
                  "type": "BlockStatement",
                  "body": []
              },
              "handler": {
                  "type": "CatchClause",
                  "param": {
                      "type": "Identifier",
                      "name": "foo"
                  },
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  }
              },
              "finalizer": null
          },
          {
              "type": "VariableDeclaration",
              "declarations": [
                  {
                      "type": "VariableDeclarator",
                      "id": {
                          "type": "Identifier",
                          "name": "foo"
                      },
                      "init": null
                  }
              ],
              "kind": "let"
          }
      ],
      "sourceType": "script"
  }],
    ['try {} catch (foo) { { let foo; } }', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "TryStatement",
              "block": {
                  "type": "BlockStatement",
                  "body": []
              },
              "handler": {
                  "type": "CatchClause",
                  "param": {
                      "type": "Identifier",
                      "name": "foo"
                  },
                  "body": {
                      "type": "BlockStatement",
                      "body": [
                          {
                              "type": "BlockStatement",
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
                                              "init": null
                                          }
                                      ],
                                      "kind": "let"
                                  }
                              ]
                          }
                      ]
                  }
              },
              "finalizer": null
          }
      ],
      "sourceType": "script"
  }],
    ['try {} catch (foo) { function x() { var foo; } }', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "TryStatement",
              "block": {
                  "type": "BlockStatement",
                  "body": []
              },
              "handler": {
                  "type": "CatchClause",
                  "param": {
                      "type": "Identifier",
                      "name": "foo"
                  },
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
                          }
                      ]
                  }
              },
              "finalizer": null
          }
      ],
      "sourceType": "script"
  }],
    ['try {} catch (foo) { function x(foo) {} }', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "TryStatement",
              "block": {
                  "type": "BlockStatement",
                  "body": []
              },
              "handler": {
                  "type": "CatchClause",
                  "param": {
                      "type": "Identifier",
                      "name": "foo"
                  },
                  "body": {
                      "type": "BlockStatement",
                      "body": [
                          {
                              "type": "FunctionDeclaration",
                              "id": {
                                  "type": "Identifier",
                                  "name": "x"
                              },
                              "params": [
                                  {
                                      "type": "Identifier",
                                      "name": "foo"
                                  }
                              ],
                              "body": {
                                  "type": "BlockStatement",
                                  "body": []
                              },
                              "generator": false,
                              "expression": false,
                              "async": false
                          }
                      ]
                  }
              },
              "finalizer": null
          }
      ],
      "sourceType": "script"
  }],
    ['var foo; try {} catch (_) { let foo; }', Context.Empty, {
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
                      "init": null
                  }
              ],
              "kind": "var"
          },
          {
              "type": "TryStatement",
              "block": {
                  "type": "BlockStatement",
                  "body": []
              },
              "handler": {
                  "type": "CatchClause",
                  "param": {
                      "type": "Identifier",
                      "name": "_"
                  },
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
                                          "name": "foo"
                                      },
                                      "init": null
                                  }
                              ],
                              "kind": "let"
                          }
                      ]
                  }
              },
              "finalizer": null
          }
      ],
      "sourceType": "script"
  }],
    ['try {} catch(e) { try {} catch (e) {} }', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "TryStatement",
              "block": {
                  "type": "BlockStatement",
                  "body": []
              },
              "handler": {
                  "type": "CatchClause",
                  "param": {
                      "type": "Identifier",
                      "name": "e"
                  },
                  "body": {
                      "type": "BlockStatement",
                      "body": [
                          {
                              "type": "TryStatement",
                              "block": {
                                  "type": "BlockStatement",
                                  "body": []
                              },
                              "handler": {
                                  "type": "CatchClause",
                                  "param": {
                                      "type": "Identifier",
                                      "name": "e"
                                  },
                                  "body": {
                                      "type": "BlockStatement",
                                      "body": []
                                  }
                              },
                              "finalizer": null
                          }
                      ]
                  }
              },
              "finalizer": null
          }
      ],
      "sourceType": "script"
  }],
    ['try {} catch (e) { { let e = x; } }', Context.Empty, {
      "type": "Program",
      "body": [
          {
              "type": "TryStatement",
              "block": {
                  "type": "BlockStatement",
                  "body": []
              },
              "handler": {
                  "type": "CatchClause",
                  "param": {
                      "type": "Identifier",
                      "name": "e"
                  },
                  "body": {
                      "type": "BlockStatement",
                      "body": [
                          {
                              "type": "BlockStatement",
                              "body": [
                                  {
                                      "type": "VariableDeclaration",
                                      "declarations": [
                                          {
                                              "type": "VariableDeclarator",
                                              "id": {
                                                  "type": "Identifier",
                                                  "name": "e"
                                              },
                                              "init": {
                                                  "type": "Identifier",
                                                  "name": "x"
                                              }
                                          }
                                      ],
                                      "kind": "let"
                                  }
                              ]
                          }
                      ]
                  }
              },
              "finalizer": null
          }
      ],
      "sourceType": "script"
  }],
  ];

pass('Statements - Try (pass)', valids);

});
