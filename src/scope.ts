
/**
 * Scope flags
 */
export const enum Scopee {
  Empty     = 0,
  For       = 1,
  Block     = 2,
  Arguments = 4,
  Catch     = 8,
  Switch    = 16.
}

/**
 * Create a scope
 */

 export class Scope {
   // A list of var-declared names in the current lexical scope
  vars: any;
  // A list of lexical var-declared names in the current lexical scope
  lexvar: any;
  // A list of lexically-declared names in the current lexical scope
  lexical: any;
  constructor() {
    this.vars = {};
    this.lexvar = {};
    this.lexical = {
      '#': undefined,
       mask: Scopee.Block,
       func: {},
    }
  }
 }
