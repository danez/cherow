import { ParserState } from './types';

/*@internal*/
export const enum Errors {
  Unexpected,
  AlreadyDeclared,
  InvalidDuplicateBinding,
  InvalidCatchVarBinding,
  StrictFunction,
  SloppyFunction,
  InvalidLetInStrict,
  UndeclaredExportedBinding
}

/*@internal*/
export const errorMessages: {
  [key: string]: string;
} = {
  [Errors.Unexpected]: 'Unexpected token',
  [Errors.AlreadyDeclared]: "Identifier '%0' has already been declared",
  [Errors.InvalidDuplicateBinding]: "Duplicate binding '%0'",
  [Errors.InvalidCatchVarBinding]: "The `catch` var '%0' can't be redefined",
  [Errors.StrictFunction]: 'In strict mode code, functions can only be declared at top level or inside a block',
  [Errors.SloppyFunction]:
    'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
  [Errors.InvalidLetInStrict]: "let can't be a variable name in strict mode",
  [Errors.UndeclaredExportedBinding]: "Exported binding '%0' is not declared"
};

export function constructError(index: number, line: number, column: number, description: string): void {
  const error: any = new SyntaxError(`Line ${line}, column ${column}: ${description}`);

  error.index = index;
  error.line = line;
  error.column = column;
  error.description = description;
  return error;
}

export function report(parser: ParserState, type: Errors, ...params: string[]): any {
  const { index, line, column } = parser;
  const message = errorMessages[type].replace(/%(\d+)/g, (_: string, i: number) => params[i]);
  const error = constructError(index, line, column, message);
  throw error;
}
