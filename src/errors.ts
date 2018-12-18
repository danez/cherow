import { ParserState } from './types';

/*@internal*/
export const enum Errors {
  Unexpected,
  AlreadyDeclared,
  LexicalAlreadyDeclared,
  InvalidCatchVarBinding,
  InvalidBoundToParam,
 }

/*@internal*/
export const errorMessages: {
  [key: string]: string;
} = {
  [Errors.Unexpected]: 'Unexpected token',
  [Errors.AlreadyDeclared]: 'Identifier \'%0\' has already been declared',
  [Errors.LexicalAlreadyDeclared]: 'Lexical binding \'%0\' has already been declared',
  [Errors.InvalidCatchVarBinding]: 'The `catch` var \'%0\' can\'t be redefined',
  [Errors.InvalidBoundToParam]: '`let` or `const` can\'t be used with the same name as bound to a parameter',
 };

export function constructError(index: number, line: number, column: number, description: string): void {
  const error: any = new SyntaxError(
      `Line ${line}, column ${column}: ${description}`,
  );

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
