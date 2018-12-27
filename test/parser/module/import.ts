import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Module - Export', () => {
  const inValids: Array<[string, Context]> = [
    ['import {a, a} from "c"', Context.Strict | Context.Module],
    ['import {a, b, a} from "c"', Context.Strict | Context.Module],
    ['import {a, b, a} from "c"', Context.Strict | Context.Module],
    ['import {b, a, a} from "c"', Context.Strict | Context.Module],
    ['import {a, a, b} from "c"', Context.Strict | Context.Module],
    ['import {a, b as a} from "c"', Context.Strict | Context.Module],
    ['import a, {a} from "c"', Context.Strict | Context.Module],
    ['import a, {b as a} from "c"', Context.Strict | Context.Module],
    ['import {a, a as a} from "c"', Context.Strict | Context.Module],
    ['import a, * as a from "c"', Context.Strict | Context.Module],
    ['import {a} from "c"; import {a} from "c";', Context.Strict | Context.Module],
    ['import {a} from "c"; import {b, a} from "c"', Context.Strict | Context.Module],
    ['import {a} from "c"; import {b as a} from "c"', Context.Strict | Context.Module],
    ['import {a} from "c"; import a from "c"', Context.Strict | Context.Module],
    ['import {a} from "c"; import {b as a} from "c"', Context.Strict | Context.Module],
    ['import {a} from "c"; import {a as a} from "c"', Context.Strict | Context.Module],
    ['import a from "c"; import * as a from "c"', Context.Strict | Context.Module]
  ];

  fail('Module - Export (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'import {a, b} from "c"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'a'
                },
                imported: {
                  type: 'Identifier',
                  name: 'a'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'b'
                },
                imported: {
                  type: 'Identifier',
                  name: 'b'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'c'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'import * as a from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportNamespaceSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'a'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'import x, * as a from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportDefaultSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ImportNamespaceSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'a'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'import {} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'import "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'import {x} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'x'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ]
      }
    ],
    [
      'import {x,} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'x'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ]
      }
    ],
    [
      'import {x as z} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'z'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'import {x as z,} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'z'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ]
      }
    ],
    [
      'import {x, z} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'x'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'z'
                },
                imported: {
                  type: 'Identifier',
                  name: 'z'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'import {x, z,} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'x'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'z'
                },
                imported: {
                  type: 'Identifier',
                  name: 'z'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'import {x as a, z} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'a'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'z'
                },
                imported: {
                  type: 'Identifier',
                  name: 'z'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ]
      }
    ],
    [
      'import {x, z as b} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'x'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'b'
                },
                imported: {
                  type: 'Identifier',
                  name: 'z'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'import {x as a, z as b} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'a'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'b'
                },
                imported: {
                  type: 'Identifier',
                  name: 'z'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'import {x as a, z as b,} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'a'
                },
                imported: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'b'
                },
                imported: {
                  type: 'Identifier',
                  name: 'z'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ],
        sourceType: 'module'
      }
    ]
  ];

  pass('Module - Export', valids);
});
