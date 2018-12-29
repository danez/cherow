'use strict';
import { readdirSync, lstatSync, readFileSync, existsSync } from 'fs';
import { join, dirname, relative } from 'path';
import { parse } from '../../src/parser/parser';
import expectations from './expectations';

const test262Parser = require('test262-parser');

const xfail = new Set(expectations.xfail.files);
const xfailFeatures = new Set(expectations.xfail.features);
const xpassDespiteFeatures = new Set(expectations.xfail.xpassDespiteFeatures);

const testDir = join(dirname(require.resolve('test262/package.json')), 'test');

function walk(dir: any, fileHandler: any) {
  for (const f of readdirSync(dir)) {
    const full = join(dir, f);
    if (lstatSync(full).isDirectory()) {
      walk(full, fileHandler);
    } else {
      fileHandler(full);
    }
  }
}

describe('test262 tests', () => {
  walk(testDir, (f: any) => {
    if (!f.endsWith('.js') || f.endsWith('_FIXTURE.js')) {
      return;
    }
    const shortName = relative(testDir, f);

    it(shortName, () => {
      const contents = readFileSync(f, 'utf8');
      const data = test262Parser.parseFile({ file: shortName, contents });

      const isModule = data.attrs.flags.module;
      const shouldFail =
        data.attrs.negative != null && (data.attrs.negative.phase === 'parse' || data.attrs.negative.phase === 'early');

      const xfailed =
        xfail.has(shortName) ||
        (!shouldFail &&
          data.attrs.features != null &&
          data.attrs.features.some((feat: any) => xfailFeatures.has(feat)) &&
          !xpassDespiteFeatures.has(shortName));

      let failed;
      try {
        // TODO location sanity checks
        if (isModule) {
          parse(data.contents, { module: true });
        } else if (data.attrs.flags.onlyStrict) {
          parse('"use strict";\n' + data.contents);
        } else if (data.attrs.flags.noStrict) {
          parse(data.contents);
        } else {
          parse('"use strict";\n' + data.contents);
          parse(data.contents);
        }
        failed = false;
      } catch (er) {
        failed = true;
      }

      if (xfailed) {
        //  expect(failed).to.not.be(shouldFail);
      } else {
        //expect(failed).to.be(shouldFail);
      }
    });
  });
});

describe('test262 expectations sanity', () => {
  describe('named tests exist', () => {
    for (let file of expectations.xfail.xpassDespiteFeatures.concat(expectations.xfail.files)) {
      it('existence of ' + file, () => {
        //  expect(existsSync(join(testDir, file))).to.be.ok();
      });
    }
  });

  describe('xpassDespiteFeatures tests have a forbidden feature', () => {
    for (let file of expectations.xfail.xpassDespiteFeatures) {
      it('features of ' + file, () => {
        const contents = readFileSync(join(testDir, file), 'utf8');
        const data = test262Parser.parseFile({ file, contents });
        //   expect(Array.isArray(data.attrs.features)).to.be.ok();
        //  expect(data.attrs.features.some((feat: any) => xfailFeatures.has(feat))).to.be.ok();
      });
    }
  });
});
