import { Context } from '../../../src/parser/common';
import { pass } from '../../test-utils';

describe('Expressions - Postfix', () => {
  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'x--',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              argument: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '--',
              prefix: false
            }
          }
        ]
      }
    ],
    [
      'x++',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              argument: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '++',
              prefix: false
            }
          }
        ]
      }
    ]
  ];

  pass('Expressions - Postfix (pass)', valids);
});
