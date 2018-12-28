import { Context } from '../../../src/parser/common';
import { pass, fail } from '../../test-utils';

describe('Module - Export', () => {
  const inValids: Array<[string, Context]> = [
    ['import foo', Context.Strict | Context.Module],
    ['import', Context.Strict | Context.Module],
    ['import;', Context.Strict | Context.Module],
    ['import {}', Context.Strict | Context.Module],
    ['import {} from;', Context.Strict | Context.Module],
    ["import {,} from 'a';", Context.Strict | Context.Module],
    ["import {b,,} from 'a';", Context.Strict | Context.Module],
    ["import {a as function} from 'a';", Context.Strict | Context.Module],
    ["import {b,,c} from 'a';", Context.Strict | Context.Module],
    ["import {b,c,,} from 'a';", Context.Strict | Context.Module],
    ["import * As a from 'a'", Context.Strict | Context.Module],
    ["import / as a from 'a'", Context.Strict | Context.Module],
    ["import * as b, a from 'a'", Context.Strict | Context.Module],
    ["import a as b from 'a'", Context.Strict | Context.Module],
    ["import a, b from 'a'", Context.Strict | Context.Module],
    ["import from 'foo';", Context.Strict | Context.Module],
    ["import 'a',", Context.Strict | Context.Module],
    ['import { };', Context.Strict | Context.Module],
    ['import {;', Context.Strict | Context.Module],
    ['import };', Context.Strict | Context.Module],
    ['import { , };', Context.Strict | Context.Module],
    ["import { , } from 'foo';", Context.Strict | Context.Module],
    ['import { a } from;', Context.Strict | Context.Module],
    ["import { a } 'foo';", Context.Strict | Context.Module],
    ["import , from 'foo';", Context.Strict | Context.Module],
    ["import a , from 'foo';", Context.Strict | Context.Module],
    ["import a { b, c } from 'foo';", Context.Strict | Context.Module],
    ['import { null } from "null', Context.Strict | Context.Module],
    ['import foo, from "bar";', Context.Strict | Context.Module],
    ['import default from "foo"', Context.Strict | Context.Module],
    ['import {bar}, {foo} from "foo";', Context.Strict | Context.Module],
    ['import {bar}, foo from "foo"', Context.Strict | Context.Module],
    ["{import a from 'b';}", Context.Strict | Context.Module],
    ["import { {} } from 'foo';", Context.Strict | Context.Module],
    ["import { !d } from 'foo';", Context.Strict | Context.Module],
    ["import { 123 } from 'foo';", Context.Strict | Context.Module],
    ["import { [123] } from 'foo';", Context.Strict | Context.Module],
    ["import { foo as {a: b = 2} } from 'foo';", Context.Strict | Context.Module],
    ["import { foo as !d } from 'foo';", Context.Strict | Context.Module],
    ["import { foo as [123] } from 'foo';", Context.Strict | Context.Module],
    ["import { foo as {a: b = 2} } from 'foo';", Context.Strict | Context.Module],
    ["import { a as enum } from 'foo';", Context.Strict | Context.Module],
    ["import { x }, def from 'foo';", Context.Strict | Context.Module],
    ["import {x}, {y} from 'foo';", Context.Strict | Context.Module],
    ["import * as x, * as y from 'foo';", Context.Strict | Context.Module],
    ["import * as x, {y} from 'foo';", Context.Strict | Context.Module],
    ['import default from "foo"', Context.Strict | Context.Module],
    ['import foo from bar', Context.Strict | Context.Module],
    ['import * 12', Context.Strict | Context.Module],
    ['import {a as b, e as l 12', Context.Strict | Context.Module],
    ['import cherow from ;', Context.Strict | Context.Module],
    ['import cherow from 12', Context.Strict | Context.Module],
    ['import cherow from []', Context.Strict | Context.Module],
    ['import foo, bar from "foo.js";', Context.Strict | Context.Module],
    ['import { foo }, * as ns1 from "foo.js";', Context.Strict | Context.Module],
    ['import [ foo ] from "foo.js";', Context.Strict | Context.Module],
    ['import { foo as ', Context.Strict | Context.Module],
    ['import { foo as switch } from "module";', Context.Strict | Context.Module],
    ['import { foo, , } from "module";', Context.Strict | Context.Module],
    ['import * as a in b from "foo";', Context.Strict | Context.Module],
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
      'import {} from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [],
            source: {
              type: 'Literal',
              value: 'y'
            }
          }
        ]
      }
    ],
    [
      'import e, {f as g, h as i, j} from "module";',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportDefaultSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'e'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'g'
                },
                imported: {
                  type: 'Identifier',
                  name: 'f'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'i'
                },
                imported: {
                  type: 'Identifier',
                  name: 'h'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'j'
                },
                imported: {
                  type: 'Identifier',
                  name: 'j'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'module'
            }
          }
        ]
      }
    ],
    [
      'import {n, o as p} from "module";',
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
                  name: 'n'
                },
                imported: {
                  type: 'Identifier',
                  name: 'n'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'p'
                },
                imported: {
                  type: 'Identifier',
                  name: 'o'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'module'
            }
          }
        ]
      }
    ],
    [
      'import { as, get, set, from } from "baz"',
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
                  name: 'as'
                },
                imported: {
                  type: 'Identifier',
                  name: 'as'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'get'
                },
                imported: {
                  type: 'Identifier',
                  name: 'get'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'set'
                },
                imported: {
                  type: 'Identifier',
                  name: 'set'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'from'
                },
                imported: {
                  type: 'Identifier',
                  name: 'from'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'baz'
            }
          }
        ]
      }
    ],
    [
      'import x, * as ns from "foo"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
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
                  name: 'ns'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'foo'
            }
          }
        ]
      }
    ],
    [
      'import $ from "foo"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportDefaultSpecifier',
                local: {
                  type: 'Identifier',
                  name: '$'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'foo'
            }
          }
        ]
      }
    ],
    [
      'import * as d from "module";',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportNamespaceSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'd'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'module'
            }
          }
        ]
      }
    ],
    [
      'import {n, o as p} from "module";',
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
                  name: 'n'
                },
                imported: {
                  type: 'Identifier',
                  name: 'n'
                }
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'p'
                },
                imported: {
                  type: 'Identifier',
                  name: 'o'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'module'
            }
          }
        ]
      }
    ],
    [
      'import icefapper from "await"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportDefaultSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'icefapper'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'await'
            }
          }
        ]
      }
    ],
    [
      'import x from "y"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
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
