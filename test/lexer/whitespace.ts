import * as t from 'assert';
import { Context } from '../../src/common';
import { scan } from '../../src/lexer';
import { Token, KeywordDescTable } from '../../src/token';

describe('src/scanner/seek', () => {
  describe('seek()', () => {
    context('script', () => run(false));
    context('module', () => run(true));
  });

  function run(isModule: boolean) {
    interface Opts {
      source: string;
      hasNext: boolean;
      line: number;
      column: number;
    }

    function pass(name: string, opts: Opts) {
      it(name, () => {
        const parser = scan(opts.source);
        const token = parser(Context.None);
        t.deepEqual(
          {
            //                seek: seek(parser, isModule ? Context.Module : Context.Empty),
            //hasNext: hasNext(parser),
            line: token.line,
            column: token.column
          },
          {
            //seek: opts.seek, hasNext: opts.hasNext,
            line: opts.line,
            column: opts.column
          }
        );
      });
    }

    function passAll(name: (lt: string) => string, opts: (lt: string) => Opts) {
      pass(name('line feed'), opts('\n'));
      pass(name('carriage return'), opts('\r'));
      pass(name('Windows newline'), opts('\r'));
      pass(name('line separators'), opts('\u2028'));
      pass(name('paragraph separators'), opts('\u2029'));
    }

    pass('skips nothing', {
      source: '',
      //  seek: Seek.None,
      hasNext: false,
      line: 1,
      column: 0
    });

    pass('skips spaces', {
      source: '        ',
      // seek: Seek.SameLine,
      hasNext: false,
      line: 1,
      column: 8
    });

    pass('skips tabs', {
      source: '\t\t\t\t\t\t\t\t',
      //  seek: Seek.SameLine,
      hasNext: false,
      line: 1,
      column: 8
    });

    pass('skips vertical tabs', {
      source: '\v\v\v\v\v\v\v\v',
      //seek: Seek.SameLine,
      hasNext: false,
      line: 1,
      column: 8
    });

    passAll(
      lt => `skips ${lt}s`,
      lt => ({
        source: `${lt}${lt}${lt}${lt}${lt}${lt}${lt}${lt}`,
        // seek: Seek.NewLine,
        hasNext: false,
        line: 9,
        column: 0
      })
    );

    pass('skips mixed whitespace', {
      source: '    \t \r\n \n\r \v\f\t ',
      // seek: Seek.NewLine,
      hasNext: false,
      line: 4,
      column: 5
    });

    passAll(
      () => 'skips single line comments with line feed',
      lt => ({
        source: `  \t // foo bar${lt}  `,
        //      seek: Seek.NewLine,
        hasNext: false,
        line: 2,
        column: 2
      })
    );

    passAll(
      lt => `skips multiple multiline comments with ${lt}`,
      lt => ({
        source: `  \t /* foo bar${lt} *//* baz*/ ${lt} /**/`,
        //seek: Seek.NewLine,
        hasNext: false,
        line: 3,
        column: 5
      })
    );

    passAll(
      lt => `skips multiline comments with ${lt}`,
      lt => ({
        source: `  \t /* foo * /* bar ${lt} */  `,
        // seek: Seek.NewLine,
        hasNext: false,
        line: 2,
        column: 5
      })
    );

    passAll(
      lt => `skips multiple single line comments with ${lt}`,
      lt => ({
        source: `  \t // foo bar${lt} // baz ${lt} //`,
        //seek: Seek.NewLine,
        hasNext: false,
        line: 3,
        column: 3
      })
    );

    if (isModule) {
    }
  }
});
