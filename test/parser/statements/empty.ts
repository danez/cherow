import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Empty', () => {
  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      '3;;;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 3
            }
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
   ;;;;;   ;;;;;;  ;;      ;;  ;;;;;;   ;;;;;;;;  ;;    ;;     ;;;;;
   ;;;;;   ;;      ;;;;  ;;;;  ;;   ;;     ;;      ;;  ;;      ;;;;;
   ;;;;;   ;;;;    ;; ;;;; ;;  ;;;;;;      ;;       ;;;;       ;;;;;
   ;;;;;   ;;      ;;  ;;  ;;  ;;          ;;        ;;        ;;;;;
   ;;;;;   ;;;;;;  ;;      ;;  ;;          ;;        ;;        ;;;;;
   ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;`,
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'EmptyStatement'
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Statements - Do while (pass)', valids);
});
