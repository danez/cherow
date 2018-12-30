/*@internal*/
export const enum Errors {
  Unexpected
}

/*@internal*/
export const errorMessages: {
  [key: string]: string;
} = {
  [Errors.Unexpected]: 'Unexpected token'
};

export function constructError(index: number, line: number, column: number, description: string): void {
  const error: any = new SyntaxError(`Line ${line}, column ${column}: ${description}`);

  error.index = index;
  error.line = line;
  error.column = column;
  error.description = description;
  return error;
}

export function report(index: number, line: number, column: number, type: Errors, ...params: string[]): any {
  const message = errorMessages[type].replace(/%(\d+)/g, (_: string, i: number) => params[i]);
  const error = constructError(index, line, column, message);
  throw error;
}
