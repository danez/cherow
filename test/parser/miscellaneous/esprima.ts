import { Context } from '../../../src/parser/common';
import { parseSource } from '../../../src/parser/parser';
import * as t from 'assert';

// Reported issues in the Esprima parsers that pass in Cherow

for (const arg of [
  `var [ a, , b ] = list
 [ b, a ] = [ a, b ]`,
  // Issue #1917
  `var AsyncGeneratorFunction = Object.getPrototypeOf(async function* () {}).constructor;`,
  // Issue #1828
  `ident /* multiline
  comment */ -->`
]) {
  // With AnnexB
  it(`${arg}`, () => {
    t.doesNotThrow(() => {
      parseSource(`${arg}`, undefined, Context.Empty);
    });
  });

  // Without AnnexB
  it(`${arg}`, () => {
    t.doesNotThrow(() => {
      parseSource(`${arg}`, undefined, Context.OptionDisablesWebCompat);
    });
  });
}
