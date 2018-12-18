import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Declarations - Let', () => {

  const inValids: Array < [string, Context] > = [

    // Bindings

    ['const a = b, a = c', Context.Empty],
    ['const a = b; const a = c', Context.Empty],
    ['let a = b; const a = c', Context.Empty],
    ['const a = b; let a = c', Context.Empty],
    ['var x = a; let x = b;', Context.Empty],
    ['var x = a; const x = b;', Context.Empty],
    ['let x = a; let x = b;', Context.Empty],
    ['let x = a; const x = b;', Context.Empty],
    ['var x; let x;', Context.Empty],
    ['let x; var x;', Context.Empty],
    ['let x; { var x; }', Context.Empty],

     // Bindings - Blockstatement

     ['let x; { var x; var y; }', Context.Empty],
     ['let x; { var x; }', Context.Empty],

    // General

    ['let class = foo', Context.Empty],
    ['let break = foo', Context.Empty],
];

fail('Statements - Switch (fail)', inValids);


  // valid tests
  const valids: Array < [string, Context, any] > = [
    ['let foo;', Context.Empty, {
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
              "kind": "let"
          }
      ],
      "sourceType": "script"
  }],
    ['let foo = bar;', Context.Empty, {
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
              "kind": "let"
          }
      ],
      "sourceType": "script"
  }]
];

pass('Declarations - Const (pass)', valids);

});
