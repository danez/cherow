import { Context } from '../../../src/parser/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Empty', () => {
  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'debugger',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'DebuggerStatement'
          }
        ]
      }
    ],
    [
      'debugger;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'DebuggerStatement'
          }
        ]
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
