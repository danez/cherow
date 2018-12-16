import { ScopeState } from './types';

/**
 * Scope flags
 */
export const enum ScopeFlags {
  Empty     = 0,
  For       = 1,
  Block     = 2,
  Arguments = 4,
  Catch     = 8,
  Switch    = 16.
}

/**
 * Create a block scope
 */
export function createBlockScope(): ScopeState {
  return {
    // A list of var-declared names in the current lexical scope
    vars: {},
     // A list of lexical var-declared names in the current lexical scope
    lexvar: {},
    // A list of lexically-declared names in the current lexical scope
    lexical: {
      '#': undefined,
      type: ScopeFlags.Block,
      funcs: {},
    },
  };
}

 /**
 * Create a child scope. Inherit values from the parent scope
 */
export function createChildScope(parentScope: ScopeState, masks: ScopeFlags): ScopeState {
  return {
    // A list of var-declared names in the current lexical scope
    vars: parentScope.vars,
     // A list of lexical var-declared names in the current lexical scope
    lexvar: parentScope.lexvar,
    // A list of lexically-declared names in the current lexical scope
    lexical: {
      '#': parentScope.lexical,
      type: masks,
      funcs: [],
    },
  };
}
