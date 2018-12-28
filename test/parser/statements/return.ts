import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Return', () => {
  const inValids: Array<[string, Context]> = [
    ['return', Context.OptionDisablesWebCompat],
    [
      `var x=1;
    return x;
    var y=2;`,
      Context.OptionDisablesWebCompat
    ],
    [
      `do {
      var x=1;
      return;
      var y=2;
  } while(3);`,
      Context.OptionDisablesWebCompat
    ],
    [
      `try {
      return 1;
  } catch(e){
      return 1;
  }`,
      Context.OptionDisablesWebCompat
    ]
  ];

  fail('Statements - Return (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    // Should pass if the 'global return' option is set
    [
      'return',
      Context.OptionsGlobalReturn,
      {
        body: [
          {
            argument: null,
            type: 'ReturnStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '(function(){ return x * y })',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              id: null,
              params: [],
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ReturnStatement',
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
                ]
              },
              generator: false,
              expression: false,
              async: false
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(function(){ return x; })',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              id: null,
              params: [],
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ReturnStatement',
                    argument: {
                      type: 'Identifier',
                      name: 'x'
                    }
                  }
                ]
              },
              generator: false,
              expression: false,
              async: false
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(function(){ return; })',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              id: null,
              params: [],
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ReturnStatement',
                    argument: null
                  }
                ]
              },
              generator: false,
              expression: false,
              async: false
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Statements - Return (pass)', valids);
});
