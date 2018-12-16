# Cherow

[![NPM version](https://img.shields.io/npm/v/cherow.svg?style=flat-square)](https://www.npmjs.com/package/cherow)
[![Gitter chat](https://img.shields.io/gitter/room/Cherow/cherow.svg?style=flat-square)](https://gitter.im/cherow/cherow)
[![CircleCI](https://img.shields.io/circleci/project/github/cherow/cherow/master.svg?style=flat-square)](https://circleci.com/gh/cherow/cherow)
[![Coverage Status](https://img.shields.io/coveralls/github/cherow/cherow/master.svg?style=flat-square)](https://coveralls.io/github/cherow/cherow?branch=master)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Code Quality: Javascript](https://img.shields.io/lgtm/grade/javascript/g/cherow/cherow.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/cherow/cherow/context:javascript)
[![Total Alerts](https://img.shields.io/lgtm/alerts/g/cherow/cherow.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/cherow/cherow/alerts)

A very fast and lightweight, standards-compliant, self-hosted javascript parser with high focus on both performance and stability.

## [Demo](https://cherow.github.io/cherow/) and [Benchmark](https://cherow.github.io/cherow/performance/)


## Features

* Conforms to the standard ECMAScript® 2019 [(ECMA-262 9th Edition)](https://tc39.github.io/ecma262/) language specification (*draft*)
* Support for all stage 3 proposals via option.
* JSX support via option.
* Experimental feature support via option.
* Optionally track syntactic node locations
* Modular
* Emits an [ESTree-compatible](https://github.com/estree/estree) abstract syntax tree.
* Very well tested (~46 000 [unit tests](https://github.com/cherow/cherow/tree/master/test) with [full code coverage)](https://coveralls.io/github/cherow/cherow))
* Supports all module loaders
* Lightweight - ~70 KB minified (*18 kb smaller than Acorn*)

## ESNext features

`Stage 3` features support. These need to be enabled with the `next` option.

* [Import()](https://github.com/tc39/proposal-dynamic-import)
* [Class field declarations for JavaScript](https://github.com/tc39/proposal-class-fields)
* ~~[Numeric Separators](https://github.com/tc39/proposal-numeric-separator)~~ (removed in 2.0, since it was back down to stage 2)
* [Private methods and getter/setters for JavaScript classes](https://github.com/tc39/proposal-private-methods)
* [BigInt](https://github.com/tc39/proposal-bigint)
* [Import.meta](https://github.com/tc39/proposal-import-meta)

## Experimental features

Experimental features support as in `NodeJS`. These need to be enabled with the `experimental` option.

* [Decorators](https://github.com/tc39/proposal-decorators)
* [Do-expressions](https://github.com/tc39/proposal-do-expressions)

## API

Cherow generates AST according to [ESTree AST format](https://github.com/estree/estree), and can be used to perform [syntactic analysis](https://en.wikipedia.org/wiki/Parsing) (parsing) of a JavaScript program, and with ES2015 and later a JavaScript program can be either [a script or a module](http://www.ecma-international.org/ecma-262/8.0/index.html#sec-ecmascript-language-scripts-and-modules).

The `parse` method exposed by Cherow takes an optional `options` object which allows you to specify whether to parse in [`script`](http://www.ecma-international.org/ecma-262/8.0/#sec-parse-script) mode (the default) or in [`module`](http://www.ecma-international.org/ecma-262/8.0/#sec-parsemodule) mode.


Here is a quick example to parse a script:

```js

cherow.parseScript('x = async() => { for await (x of xs); }');

// or

cherow.parse('x = async() => { for await (x of xs); }');

```

This will return when serialized in json:

```js
{
    body: [{
        expression: {
            left: {
                name: 'x',
                type: 'Identifier'
            },
            operator: '=',
            right: {
                async: true,
                body: {
                    body: [{
                        await: true,
                        body: {
                            type: 'EmptyStatement',
                        },
                        left: {
                            name: 'x',
                            type: 'Identifier',
                        },
                        right: {
                            name: 'xs',
                            type: 'Identifier',
                        },
                        type: 'ForOfStatement',
                    }],
                    type: 'BlockStatement'
                },
                expression: false,
                generator: false,
                id: null,
                params: [],
                type: 'ArrowFunctionExpression'
            },
            type: 'AssignmentExpression'
        },
        type: 'ExpressionStatement'
    }],
    sourceType: 'script',
    type: 'Program'
}
```

## Options

The second argument allows you to specify various options:

| Option        | Description |
| ----------- | ------------------------------------------------------------ |
| `module`          | Enable module syntax |
| `loc`             | Attach line/column location information to each node |
| `ranges`          | Append start and end offsets to each node |
| `globalReturn`    | Allow return in the global scope |
| `skipShebang`     | Allow to skip shebang - '#' |
| `impliedStrict`   | Enable strict mode initial enforcement |
| `next`            | Enable stage 3 support (*ESNext*)  |
| `jsx`             | Enable React JSX parsing  |
| `tolerant`        | Create a top-level error array containing all "skipped" errors |
| `source`          | Set to true to record the source file in every node's `loc` object when the `loc option` is set.  |
| `experimental`    | Enable experimental features
| `raw`             | Attach raw property to each literal node    |
| `rawIdentifier`   | Attach raw property to each identifier node    |
| `node`            | Allow to bypass scoping when run in a NodejS environment |

## Builds

Cherow contains 3 different builds:

| Name        | Description |
| ----------- | ------------------------------------------------------------ |
| `Stable`    | Stable release |
| `Next`      | Has the `next` option enabled by default, and support all latest ECMAScript proposals. |
| `Bleeding`  | The active development branch. You can and will expect bugs with this branch because it's not stable |

## Contributing

If you feel something could've been done better, please do feel free to file a pull request with the changes.

Read our guidelines [here](CONTRIBUTING.md)

## Bug reporting

If you caught a bug, don't hesitate to report it in the issue tracker. From the moment I respond to you, it will take maximum 60 minutes before the bug is fixed.

Note that I will try to respond to you within one hour. Sometimes it can take a bit longer. I'm not allways online. And if I find out it
will take more then 60 minutes to solve your issue, you will be notified.

I know how irritating it can be if you are writing code and encounter bugs in your dependencies. And even more frustrating if you need to wait weeks or days.


## Rationale

Existing parsers have many issues with them:

* `Acorn` is the most commonly used tool out there because of its support for recent ES standards, but it's slow and it often is too permissive in what it accepts. It's also not optimized for handheld devices.

* `Esprima` is a little faster than Acorn, but it's almost never updated, and their test suite has too many invalid tests. It also doesn't support recent ES standards.

* `Babylon` is highly coupled to Babel, and is comparatively very slow and buggy, and failing to correctly handle even stable ECMAScript standard features.

None of these parsers would fare any chance against the official Test262 suite, and most fail a substantial number of them.

We figured we could *try* do better. *We* are used in plural form because Cherow is developed by a main developer and two
others "*behind the scenes*" that contributes with their knowledge whenever it's necessary.

## Benchmark


![](./media/benchmark.png)
