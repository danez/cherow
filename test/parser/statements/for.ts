import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - For', () => {

  const inValids: Array < [string, Context] > = [

    // Bindings

   ['for (let x;;) { var x; }', Context.OptionDisablesWebCompat],
   ['for (const x = y;;) { var x; }', Context.OptionDisablesWebCompat],
   ['for (let x in y) { var x; }', Context.OptionDisablesWebCompat],
   ['for (const x in y) { var x; }', Context.OptionDisablesWebCompat],
   ['for (let x of y) { var x; }', Context.OptionDisablesWebCompat],
   ['for (let a, b, x, d;;) { var foo; var bar; { var doo, x, ee; } }', Context.OptionDisablesWebCompat],
];

fail('Statements - For (fail)', inValids);

  // valid tests
const valids: Array < [string, Context, any] > = [

  ['for (var a;;) { let a; }', Context.OptionDisablesWebCompat, {
  "type": "Program",
  "body": [
      {
          "type": "ForStatement",
          "init": {
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
              "kind": "var"
          },
          "test": null,
          "update": null,
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
                                  "name": "a"
                              },
                              "init": null
                          }
                      ],
                      "kind": "let"
                  }
              ]
          }
      }
  ],
  "sourceType": "script"
}]
];

pass('Statements - For (pass)', valids);

});
