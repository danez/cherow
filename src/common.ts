
export const enum Context {
  Empty                  = 0,
  OptionsRaw             = 1 << 0,
  OptionsNext            = 1 << 1,
  OptionsLoc             = 1 << 2,
  OptionsRanges          = 1 << 3,
  OptionsJSX             = 1 << 4,
  OptionDisablesWebCompat  = 1 << 5,
  OptionsGlobalReturn    = 1 << 6,
  OptionsCollectComments = 1 << 7,
  OptionsExperimental    = 1 << 8,
  OptionsNative          = 1 << 9,
  OptionsTokenize        = 1 << 10,
  ExpressionStart        = 1 << 11,
  InGenerator            = 1 << 12,
  InAsync                = 1 << 13,
  InArguments            = 1 << 14,
  Strict                 = 1 << 15,
  Module                 = 1 << 16,
  TaggedTemplate         = 1 << 17,
  SuperProperty          = 1 << 18,
  InClass                = 1 << 19,
  NewTarget              = 1 << 20,
  InFunctionBody         = 1 << 21,
  DisallowIn             = 1 << 22,
  Global                 = 1 << 23,
  DisallowGenerator      = 1 << 24,
  ScopeRoot              = 1 << 25,
  Statement              = 1 << 26,
  InConstructor          = 1 << 27,
  InMethod               = 1 << 28,
  SuperCall              = 1 << 29

}

export const enum Flags {
  Empty               = 0,
  LineTerminator      = 1 << 0,
  SeenPrototype        = 1 << 1,

}

// Expression origin
export const enum ExpressionOrigin {
  Expression = 1,
  MemberExpression = 2,
  Primary = 3,
  Update = 4,
  Ternary = 5,
  Unary = 6,
  Sequences = 7
}

// Binding type
export const enum BindingType {
  Empty     = 0,
  Arguments = 1 << 0,
  Variable  = 1 << 1,
  Let       = 1 << 2,
  Const     = 1 << 3,
  Class     = 1 << 4
}

// Binding origin
export const enum BindingOrigin {
  Empty         = 0,
  Statement     = 1 << 0,
  For           = 1 << 1,
  Export        = 1 << 2,
  Catch         = 1 << 3,
  AsyncArgs     = 1 << 4,
  FunctionArgs  = 1 << 5,
  Class         = 1 << 6,
}

// Scope flags
export const enum ScopeFlags {
  Empty         = 0,
  ForStatement  = 1,
  Block         = 2,
  FunctionArgs  = 3,
  CatchClause   = 4,
  Switch        = 5
}

// Tracking eval and arguments
export const enum EvalOrArguments {
  Disallowed = 0,
  Allowed = 1,
}


