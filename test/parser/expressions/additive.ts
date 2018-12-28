import { Context } from '../../../src/parser/common';
import { pass } from '../../test-utils';

describe('Expressions - Additive', () => {
  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      '--a',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              operator: '--',
              argument: {
                type: 'Identifier',
                name: 'a'
              },
              prefix: true
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Expressions - Additive', valids);
});
