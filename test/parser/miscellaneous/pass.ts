import { Context } from '../../../src/common';
import { parseSource } from '../../../src/parser/parser';
import * as t from 'assert';

for (const arg of [
  "async()",
  "async(async(async(async())))",
  "async(bull_sjit)",
  "function foo() {}; ",
  "({ *method() { function() {} }})",
  "{ var {foo=3} = {}; }; ",
  "function foo() {}; ",
  "(a)=>{};",
  '(a, b => {}, a => a + 1)',
  '(a, []) => {}',
  '(x, y = 9, z) => {}',
  '({a = 42}) => {}',
  '() => {}',
  '({[import(y=x)]: x} = {})',
  'import(x).then()',
  'x = import(x)',
  'import(y=x)',
  'import(1)',
  `if (a) {
    b();
    c();
    d();
} else {
    e();
    f();
    g();
}`,
  `a.b('c').
  d('e',
      /*@ngInject*/
      function(f) {
          return f;
      }).
  g('h',
      /*@ngInject*/
      function(i) {
          return i;
      })`,
  `a >>= 1`,
  '({ get: 1 })',
  'a = (b, c)',
  `{;}
  a();
  {};
  {
      {};
  };
  b();
  {}`,
  '({a: b = c = 1} = 2)',
  'a && (() => {});',
  '[...a[1]] = 2;',
  `(function () {
  }(1,2,3))`,
  // `a: while (true) { break a }`,
  `function a({ b, c }){}`,
  '(a) => b;',
  '({2e308:1})',
  `new a("aa, [bb]", 'return aa;');
  new a("aa, {bb}", 'return aa;');
  new a("[[aa]], [{bb}]", 'return aa;');`,
  '1;',
  //'[a, ...{0: b}] = 1',
  `var a, b, c, d;
  a = (b(), c(), d()) ? 1 : 2;`,
  `(function() {
    return 1;
    var a = 2;
}());`,
  `new (function () {
    var a = 1;
});`,
  '({yield})',
  '[{a=1},{a=2}] = 3',
  'typeof (1, a, 2)',
  '({ *a() {} })',
  'do {} while (false) a();',
//  '({ __proto__: null, get __proto__(){} })',
  'function a() { new.target; }',
  'a * b % c',
  '({set a(b) {}})',
  `if (a) {
  } else {
      b();
  }`,
  '[a, b] = [b, a]',
  'for (var [a, b] in c);',
  `(function () {
    if (a != true) {
        b();
    }
    if (a != false) {
        b();
    }
}());`,
  `function a() {
    // If foo is null or undefined, this should be an exception
    var {a,b} = c;
}`,
  'new a(b, ...c, d)',
  'switch (a) { case 1: /* perfect */ b() }',
  `for (var a in b)
  // do not optimize it
  (function () {
    c('d');
  }());`,
  '((a))()',
  `// reported from issue #60
  void function () {
    var a;  // this foo should be dropped
    a = function () {  // this should be transformed to non-assignment expression
      return 1;
    };
  }.b(this);`,
  '(function({a}){})',
  'a > b',
  '[a.b=b] = c',
  `(function() {
    1, 2, 3;
}());`,
  `if (true) a()
  ; else;`,
  `/**/ function a() {/**/function b() {}}`,
  `(function () {
    if (false) {
        var a = 1;
    }
    b();
}());`,
  '(a => a)',
  'for (a.in in a);',
  '({a, a: 1, b})',
  `(function () {
    a(typeof b !== 'c');
}());`,
  'a[b]',
  'var yield;',
  '[a, ...b] = c',
  '() => (a) = 1',
  `(function () {
    void 1;
}());`,
  '([,,])=>1',
  `while (a) {
    {
        b();
        b();
    }
}`,
  'function* a() {}',
  `(function () {
    var a = 1;  // should not hoist this
    arguments[2] = 3;
    (function () {
        eval('');
    }());
}());`,
  '(function(){ return })',
  `a(
    b(c, c),
    d(c, c),
    e(c, c)
  );`,
  `(function () {
    var a = 1;
    with (b) {
        a += a += 2;  // 'i' lookup can be observed by obj's getter.
    }
}());`,
  'for (const a of b) c(a);',
  'a = { set: 1 }',
  'a+(b(), c(), d())  // do not transform because of global getter',
  '1.492417830e-10',
  ' ',
  `switch (a) {
    default:
      // do not optimize it
      (function () {
        b('c');
      }());
    }`,
  'function a([ b, c ]){}',
  'if (true) a(); else;',
  `(function () {
    -1;
}());`,
  'let {a} = b',
  '(a) => ((b, c) => (a, b, c))',
  'for({a=1} in b);',
  `for (;a();) {
    if (b()) c();
    else break;
    d();
    e();
}`,
  'let {a,} = 1',
  `while (true) { break // Comment
    a; }`,
  '1e100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  'a.b(b, c)',
  '({get __proto__() {}, set __proto__(a) {}})',
  '[a, {b: {c = 1}}] = d',
  'for(a,b,c;;);',
  '(a) = 1',
  '({["__proto__"]:1, ["__proto__"]:2})',
  '() => () => 1',
  `(function () {
    function a() {
        var b = 1;
        return b;
    }
}());`,
  '[a,,] = 1',
  `(function a() {
    b(typeof a() == 'c');
}());`,
  'function a({}) {}',
  'try {} catch ({a = 1}) {}',
  'a = { get null() {} }',
  '[]',
  '(a = b("100")) == a ',
  `function a(b, c) {
    var d = 1, e = f, f = d + e, g = h();
    return b + c;
}`,
  `// Do not remove first if consequent block
  if (a) {
      if (b) { true; }
  } else {
      false;
  }`,
  'a = b; ',
  'function a([a=1]) {}',
  `(function() {
    if (a) return b;
    return c;
  }());`,
  `'use strict';
  {
      var a = 1;
      b();
      {
          b();
          b();
      }
  }`,
  '1 + 2 << (3)',
  '!(a=b)',
  'let;',
  'let [a,] = 1;',
  '({ set false(a) { a } })',
  'a - b',
  'for(const a = 1;;);',
  `var a;
  if (b()) {
      a();
  } else {
      a();
  }`,
  'a -= 1',
  'yield => 1',
  'var let',
  'a = false;',
  '(function(){ return; })',
  'function a() {"use strict"; ({ b: 1, b: 2 }) }',
  'a = a += 1',
  `({
    a,
    a:a,
    a:a=a,
    [a]:{a},
    a:b()[a],
    a:this.a
} = 1);`,
  '((((((((((((((((((((((((((((((((((((((((a)))))))))))))))))))))))))))))))))))))))) = 1',
  `function a() {
    b();
    c();
    return d();
}
function e() {
    b();
    c();
    throw new f();
}`,
  '1 /*The*/ /*Answer*/',
  '((a))((a))',
  '({ set a([{b = 1}]){}, })',
  '(a, b, c && d) && e;',
  'a(.1)',
  'a = []',
  'for (var {j}=x; j<10; ++j) { foo = j }',
  'for (let {j}=x; j<10; ++j) { let [foo] = [j] }',
  'for (j in x) { let [foo] = [j] }',
  'for (let j in x) { let foo = j }',
  'var {foo=3} = {}',
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
