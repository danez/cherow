import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Switch', () => {

    const inValids: Array < [string, Context] > = [

      // Bindings

      ['switch (x) { case a: let foo; break; case b: let foo; break; }', Context.OptionDisablesWebCompat],
      ['switch (x) { case a: let foo; break; default: let foo; break; }', Context.OptionDisablesWebCompat],
      ['switch (x) { case a: let foo; break; case b: var foo; break; }', Context.OptionDisablesWebCompat],
      ['switch (x) { case a: var foo; break; case b: let foo; break; }', Context.OptionDisablesWebCompat],
      ['switch (x) { case a: let foo; break; case b: const foo = x; break; }', Context.OptionDisablesWebCompat],
      ['switch (x) { case a: const foo = x; break; case b: let foo; break; }', Context.OptionDisablesWebCompat],
      ['switch (x) { case a: const foo = x; break; case b: const foo = x; break; }', Context.OptionDisablesWebCompat],
      ['switch (x) { case a: const foo = x; break; case b: var foo = x; break; }', Context.OptionDisablesWebCompat],
      ['switch (x) { case a: var foo = x; break; case b: const foo = x; break; }', Context.OptionDisablesWebCompat],
      ['switch (x) { case 0: var foo = 1 } let foo = 1;', Context.OptionDisablesWebCompat],
      ['switch (x) {case a: const f = x; break; case b: function f(){}; break; }', Context.Empty],
      ['switch (x) {case a: function f(){}; break; case b: let f; break; }', Context.Empty],
      ['switch (x) {case a: function f(){}; break; case b: let f; break; }', Context.OptionDisablesWebCompat],
  ];

  fail('Statements - Switch (fail)', inValids);

  // valid tests
  const valids: Array < [string, Context, any] > = [
    ['switch (answer) { case a: let b = c; break; }', Context.OptionsRanges | Context.OptionsLoc, {
      "type": "Program",
      "body": [
          {
              "type": "SwitchStatement",
              "discriminant": {
                  "type": "Identifier",
                  "name": "answer"
              },
              "cases": [
                  {
                      "type": "SwitchCase",
                      "test": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "consequent": [
                          {
                              "type": "VariableDeclaration",
                              "declarations": [
                                  {
                                      "type": "VariableDeclarator",
                                      "id": {
                                          "type": "Identifier",
                                          "name": "b"
                                      },
                                      "init": {
                                          "type": "Identifier",
                                          "name": "c"
                                      }
                                  }
                              ],
                              "kind": "let"
                          },
                          {
                              "type": "BreakStatement",
                              "label": null
                          }
                      ]
                  }
              ]
          }
      ],
      "sourceType": "script"
  }],
     ['switch (x) { case a: var foo; break; default: var foo; break; }', Context.OptionsRanges | Context.OptionsLoc, {
      "type": "Program",
      "body": [
          {
              "type": "SwitchStatement",
              "discriminant": {
                  "type": "Identifier",
                  "name": "x"
              },
              "cases": [
                  {
                      "type": "SwitchCase",
                      "test": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "consequent": [
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
                              "type": "BreakStatement",
                              "label": null
                          }
                      ]
                  },
                  {
                      "type": "SwitchCase",
                      "test": null,
                      "consequent": [
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
                              "type": "BreakStatement",
                              "label": null
                          }
                      ]
                  }
              ]
          }
      ],
      "sourceType": "script"
  }],
    ['switch (x) { case a: var foo; break; case b: var foo; break; }', Context.OptionsRanges | Context.OptionsLoc, {
      "type": "Program",
      "body": [
          {
              "type": "SwitchStatement",
              "discriminant": {
                  "type": "Identifier",
                  "name": "x"
              },
              "cases": [
                  {
                      "type": "SwitchCase",
                      "test": {
                          "type": "Identifier",
                          "name": "a"
                      },
                      "consequent": [
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
                              "type": "BreakStatement",
                              "label": null
                          }
                      ]
                  },
                  {
                      "type": "SwitchCase",
                      "test": {
                          "type": "Identifier",
                          "name": "b"
                      },
                      "consequent": [
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
                              "type": "BreakStatement",
                              "label": null
                          }
                      ]
                  }
              ]
          }
      ],
      "sourceType": "script"
  }]
];

pass('Statements - Switch (pass)', valids);

});
