import { match, throws } from 'clean-assert';
import { parseSource } from '../src/parser/parser';
import { Context } from '../src/common';

export const pass = (name: string, valids: Array<[string, Context, any]>) => {
  describe(name, () => {
    for (const [source, ctx, expected] of valids) {
      it(source, () => {
        const parser = parseSource(source, undefined, ctx);
        match(parser, expected);
      });
    }
  });
};

export const fail = (name: string, invalid: Array<[string, Context]>) => {
  describe(name, () => {
    for (const [source, ctx] of invalid) {
      it(source, () => {
        throws(() => {
          parseSource(source, undefined, ctx);
        });
      });
    }
  });
};
