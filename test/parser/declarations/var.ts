import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Declarations - Let', () => {

  const inValids: Array < [string, Context] > = [

    // Bindings

    ['var a = b; const a = c', Context.Empty],
    ['const a = b; var a = c', Context.Empty],

    // Bindings - Blockstatement

    ['{ let x; var x; }', Context.Empty],


    // General

    ['var class = foo', Context.Empty],
    ['var break = foo', Context.Empty],

    // Strict mode only

    ['var implements = foo', Context.Strict],
];

fail('Statements - Switch (fail)', inValids);


  // valid tests
  const valids: Array < [string, Context, any] > = [
    ['var x; { let x; var y; }', Context.Empty, {
      "type": "Program",
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
          },
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
                                  "name": "x"
                              },
                              "init": null
                          }
                      ],
                      "kind": "let"
                  },
                  {
                      "type": "VariableDeclaration",
                      "declarations": [
                          {
                              "type": "VariableDeclarator",
                              "id": {
                                  "type": "Identifier",
                                  "name": "y"
                              },
                              "init": null
                          }
                      ],
                      "kind": "var"
                  }
              ]
          }
      ],
      "sourceType": "script"
  }],
    ['var foo;', Context.Empty, {
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
          }
      ],
      "sourceType": "script"
  }],
    ['var foo = bar;', Context.Empty, {
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
                          "type": "Identifier",
                          "name": "bar"
                      }
                  }
              ],
              "kind": "var"
          }
      ],
      "sourceType": "script"
  }]
];

pass('Declarations - Const (pass)', valids);

});
