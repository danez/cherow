import { Context } from '../../../src/parser/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Async Generator Functions', () => {
  const inValids: Array<[string, Context]> = [['(async function *f(a, a) {})', Context.Strict]];

  fail('Expressions - Async Generator Functions', inValids);

  // valid tests

  const valids: Array<[string, Context, any]> = [
    [
      'x=async function *f(){ var f }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '=',
              right: {
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
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
                            name: 'f'
                          }
                        }
                      ]
                    }
                  ]
                },
                async: true,
                generator: true,
                expression: false,
                id: {
                  type: 'Identifier',
                  name: 'f'
                }
              }
            }
          }
        ]
      }
    ]
  ];

  pass('Expressions - Async Generator Functions (pass)', valids);
});
