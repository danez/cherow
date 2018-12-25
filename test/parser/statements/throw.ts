import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Throw', () => {
  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'throw\n1',
      Context.Empty,
      {
        body: [
          {
            argument: {
              type: 'Literal',
              value: 1
            },
            type: 'ThrowStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
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
