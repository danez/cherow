const { concurrent, crossEnv, rimraf, series } = require('nps-utils');

function config(name) {
  return `configs/tsconfig-${name}.json`;
}

function rollup(mod, minify) {
  return package(`rollup --c --environment mod:${mod},${minify ? 'minify' : ''}`);
}

function webpack(tool, arg) {
  return crossEnv(`TS_NODE_PROJECT=\'${config('tsnode')}\' ${tool} --config webpack.config.ts ${arg}`);
}

function package(script) {
  return crossEnv(`./node_modules/.bin/${script}`);
}

module.exports = {
  scripts: {
    lint: package(`tslint --project ${config('build')}`),
    demo: {
      development: webpack('webpack-dev-server', '--hot --env.server'),
      production: webpack('webpack', '--env.production')
    },
    test: package(`TS_NODE_PROJECT=\'${config('test')}\' mocha test/**/*.ts`),
    build: {
      default: series.nps('build.before', 'build.all.default'),
      minify: series.nps('build.all.minify'),
      before: series.nps('lint', 'build.clean'),
      clean: rimraf('dist'),
      all: {
        default: concurrent.nps(
          'build.amd.default',
          'build.umd.default',
          'build.commonjs.default',
          'build.es2017.default',
          'build.es2015.default',
          'build.nativeModules.default',
          'build.system.default'
        ),
        minify: concurrent.nps(
          'build.amd.minify',
          'build.umd.minify',
          'build.commonjs.minify',
          'build.es2017.minify',
          'build.es2015.minify',
          'build.nativeModules.minify',
          'build.system.minify'
        )
      },
      amd: {
        default: rollup('amd'),
        minify: rollup('amd', true)
      },
      umd: {
        default: rollup('umd'),
        minify: rollup('umd', true)
      },
      commonjs: {
        default: rollup('commonjs'),
        minify: rollup('commonjs', true)
      },
      es2017: {
        default: rollup('es2017'),
        minify: rollup('es2017', true)
      },
      es2015: {
        default: rollup('es2015'),
        minify: rollup('es2015', true)
      },
      nativeModules: {
        default: rollup('native-modules'),
        minify: rollup('native-modules', true)
      },
      system: {
        default: rollup('system'),
        minify: rollup('system', true)
      },
    },
    ghpages: series(
      'git checkout gh-pages',
      'git merge master --no-edit',
      rimraf('*.bundle.js'),
      package('nps demo.production'),
      'git add index.html *.bundle.js',
      "git commit -m 'doc(demo): build demo'",
      'git push',
      'git checkout master'
    )
  }
};
