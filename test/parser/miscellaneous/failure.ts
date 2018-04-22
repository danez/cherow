import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Miscellaneous - Failure', () => {

    const programs = [
        `class default`,
        `while 1 break;`,
        `while true break;`,
        `var x += 1;`,
        `if (false) let
    [a] = 0;`,
        `/*`,
        `/*\r\n`,
        `/*\r`,
        `/*\r\n`,
        `/*\u2028`,
        `/*\u2029`,
        `\\`,
        `\\x`,
        `\\o`,
        `\\u1`,
        `\\u12`,
        `a\\uz`,
        `a\\o`,
        `＊`,
        `\\uD800\\x62`,
        `1.a`,
        `1.e+`,
        `08a`,
        `3in[]`,
        `3x0`,
        `\\ua`,
        `1 + { t:t `,
        `1 + {`,
        `i #= 0`,
        `\n\n\n{`,
        `{ get 2 }`,
        '{ set 1 }',
        `function t(if) { }`,
        `\u200C = []`,
        `do { x } *`,
        `var`,
        '0B',
        '0B1a',
        '0B9',
        '( { get x() {} } = 0)',
        'x \n is y',
        'function hello() {\'use strict\'; ({ i: 10, s(eval) { } }); }',
        'function a() { "use strict"; ({ b(t, t) { } }); }',
      //  "\"use strict\"; ({ v: eval } = obj)",
        'for (let x = 42 in list) process(x);',
        'let [this] = [10]',
        'let {this} = x',
        'let [function] = [10]',
        '"use strict"; (eval, a) => 42',
        //"function foo(a, a = 2) {}",
        '"use strict"; (a) => 00',
        '() <= 42',
        '(10, 20) => 00',
        'void { [1, 2]: 3 };',
        '({ obj:20 }) = 42',
        '[2] = 42',
        '"\\u{FFZ}"',
        '"\\u{FFFF"',
        '([function] = [10])',
        '([this] = [10])',
        '({this} = x)',
        'var x = {this}',
        `**`,
        `#=`,
        `\\u{}`,
        `\\u{FFFF`,
        `("\\u{}")`,
        `/./a`,
        `enum : 0`,
        //    `({get +:3})`,
        `{ ;  ;  `,
        `a b`,
        `try { } catch() {}`,
        `/*\r\n*/]`,
        `//\r\n]`,
        `\r]`,
        `/*hello`,
        `try {} catch (answer()) {} `,
        `for(;;)`,
        `for (let [] = 0, {};;);`,
        `for (let [];;);`,
        `for (var i, i2 in {});`,
        `if.a;`,
        `a if`,
        `"\\ux";`,
        `0O`,
        `0O1a`,
        `/test`,
        `3 = 4`,
        `var x = "`,
        `({[a,b]:0})`,
        `"use strict"; eval => 42`,
        `function t(false) { }`,
        `continue`,
        `if(false) doThis(); else`,
        `x: while (true) { (function () { continue x; }); }`,
        `function hello() {'use strict'; eval = 10; }`,
        `x %*= y`,
        'a => {}()',
        `async function foo(await) { }`,
        `async function foo() { return {await} }`,
        `(async\nfunction foo() { })`,
        `(async function await() { })`,
        `(async function foo(await) { })`,
        `(async function foo() { return {await} })`,
        `async\n() => a`,
        `async ()\n=> a`,
        `async ({await}) => 1`,
        `async ({a: await}) => 1`,
        `[a += b] = []`,
        `({async get foo() { }})`,
        `({async foo() { var await }})`,
        `class A {async get foo() { }}`,
        `class A {async foo() { return {await} }}`,
        `await a`,
        `async () => await`,
        `async function foo(a = await b) {}`,
        `([a.a]) => 42`,
        `function *g() { (x = yield) => {} }`,
        `( { get x() {} } = 0)`,
        `for (let x = 42 in list) process(x);`,
        `yield v`,
        `let [this] = [10]`,
        `([function] = [10])`,
        `({this} = x)`,
        `var x = {this}`,
        `class A extends yield B { }`,
        `function a() 1 // expression closure is not supported`,
        `({ 5 }) => {}`,
        `({ get test() { } }) => 42`,
        `let [function] = x`,
        `function* y({yield}) {}`,
        `[...x in y] = []`,
        `function* foo(a = class extends (yield b) {}) {}`,
        `class A { get constructor() {} }`,
        `(function ({ a(){} }) {})`,
        `class A extends B { constructor() { super } }`,
        `\\u{110000}`,
        `(function () { yield 10 })`,
        `function* f([...{ x }, y] = [1, 2, 3]) {};`,
        `function _13_1_16_fun(eval) { 'use strict'; }`,
        `super`,
        `"use strict"; bar: function x() {}`,
        `0 = 0;`,
        `[a] *= 0;`,
        `for([0] of 0);`,
        `\\u{FFFFFFF}")`,
        `for(const a = 0, b;;);`,
        `for (var x of []) function* g() {}`,
        `let [...x = []] = [];`,
        `if (false) ; else const x = null;`,
        `class A { static set prototype() {} }`,
        `for(;;) labelA: labelB: labelC: function f(){}`,
        `label: continue label;`,
        `label: while(0) { function f(){ continue label; } }`,
        `function* g(){ ([a = yield]) => 0; }`,
        `for(let a;;) label: function f(){}`,
        `labelA: break labelB;`,
        'export',
        'import',
        'for (;;) const x = 10;',
        `(x) => {} + 2`,
        `for (let [...foo, bar] in qux);`,
        `();`,
        `for (let x of y, z) {}`,
        `(a, ...b);`,
        `[ a -= 12 ] = 12;`,
        `(((a, ...b)))`,
        `(((...a)))`,
        `for(const let = 0;;);`,
        `function f(){ const a; }`,
        `label: continue label;`,
        `x = { set f(...y) {} }`,
        'if (x) async function f() {}',
        //"f = async ((x)) => x",
        '(async function foo() { await })',
        'async () => await',
        '({async foo() { await }})',
        '(class {async foo() { await }})',
        'async function foo(a = await b) {}',
        '(async function foo(a = await b) {})',
        'async (a = await b) => {}',
        'async function wrapper() {\nasync (a = await b) => {}\n}',
        '({async foo(a = await b) {}})',
        '(class {async foo(a = await b) {}})',
        'async function foo(a = class extends (await b) {}) {}',
        'await a',
        'async await => 1',
//        "async ([await]) => 1",
        'async a\n=> a',
        'async ()\n=> a',
        'async ({a = b})',
        '(async function foo() { return {await} })',
    ];

    for (const arg of programs) {
        it(`${arg}`, () => {
            t.throws(() => {
                parse(`${arg}`, undefined, Context.Empty);
            });
        });
    }
});