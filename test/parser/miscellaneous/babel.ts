import { Context } from '../../../src/common';
import { parseSource } from '../../../src/parser/parser';
import * as t from 'assert';

// Reported issues in the Babel-parser parsers that pass in Cherow

// Note: Babel-parser have AnnexB on by default, so same with this tests

for (const arg of [
  // Issue #7802
 `<!-- test --->`,
]) {

  it(`${arg}`, () => {
      t.doesNotThrow(() => {
          parseSource(`${arg}`, undefined, Context.Empty);
      });
  });

}
