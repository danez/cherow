import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Throw', () => {

  const inValids: Array<[string, Context]> = [
    ['throw\n1', Context.OptionDisablesWebCompat],
  ];

  fail('Statements - Throw (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'throw foo;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ThrowStatement',
            argument: {
              type: 'Identifier',
              name: 'foo'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'throw foo',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ThrowStatement',
            argument: {
              type: 'Identifier',
              name: 'foo'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'throw 12',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ThrowStatement',
            argument: {
              type: 'Literal',
              value: 12
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'throw x * y',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ThrowStatement',
            argument: {
              type: 'BinaryExpression',
              operator: '*',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              right: {
                type: 'Identifier',
                name: 'y'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Statements - Throw (pass)', valids);
});
