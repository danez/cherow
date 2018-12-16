export const enum Scopee {
  Empty     = 0,
  For       = 1,
  Block     = 2,
  Arguments = 4,
  Catch     = 8,
  Switch    = 16.
}

export function createScope() {
  return {
    // A list of var-declared names in the current lexical scope
    var: {},
    // A list of lexical var-declared names in the current lexical scope
    lexvar: {},
    // A list of lexically-declared names in the current lexical scope
    lexical: {
      '#': undefined,
      mask: Scopee.Block,
      func: {},
    }
  };
}
