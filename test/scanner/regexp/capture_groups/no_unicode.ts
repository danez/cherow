import * as assert from 'clean-assert';
import * as t from 'assert';
//import { ValidatorState, validateRegExp } from '../../../../src/regexp';
import { Context } from '../../../../src/utilities';
import * as ESTree from '../../../../src/estree';

describe.skip('RegExp named capture groups', () => {

    describe.skip('Failure', () => {

        const invalidSyntax = [
            '/(?<a>a)(?<a>a)/',
            '/(?<a>a)\\k<b>/',
            '/(?<)/',
            '/(?a/',
            '/(?<a>.)\\k/',
            '/(?<a>a)(?<b>b)(?<a>a)/',
            '/(?<>a)/',
            '/(?<aa)/',
            '/(?<42a>a)/',
            '/(?<:a>a)/',
            '/(?<a:>a)/',
            '/(?<a>a)(?<a>a)/',
            '/(?<a>a)(?<b>b)(?<a>a)/',
            '/(?<a>.)\\k/',
            '/(?<a>.)\\k<a/',
            '/(?<a>.)\\k<b>/',
            '/(?<a>a)\\k<ab>/',
            '/(?<ab>a)\\k<a>/',
            '/\\k<a>(?<ab>a)/',
            '/\\k<a(?<a>a)/',
            '/\\k<a>(?<b>x)/',
            '/\\k<a>(?<b>x)/',
            '/\\k<a(?<a>.)/',
            '/\\k(?<a>.)/',
            '/(?<𐒤>a)/',
            '/(?<❤>a)/',
            '/(?<a\\u{10FFFF}>.)/',
            '/(?<a\uDCA4>.)/',
            '/(?<a\uD801>.)/',
            '/(?<a\uDCA4>.)/',
            '/(?<name\\p{ASCII_Hex_Digit}>.)/',
            '/(?<name>)\\k<name\\p{ASCII_Hex_Digit}>/',
            '/(?<\\u0000>)/',
            '/(?<a\\u{104A4}>.)/',
            '/(?<\\u0041bc\\u0041>)\\k<\\u0041bc\\u0041>/',
            '/(?<$𐒤>a)/',
            '(?<a\u{104A4}>.)',
        ];
        for (const arg of invalidSyntax) {

            it(`${arg}`, () => {

                t.throws(() => {
                    validateRegExp(`${arg}`, ValidatorState.Empty);
                });
            });
        }
    });

    describe.skip('Pass', () => {
        const validSyntax = [
            '(?<\u{0041}>.)',
            '/\k<a>(?<a>b)\w\k<a>/',
            '/\k<a>(?<a>b)\w\k<a>/',
            '/(a)/',
            '/(?:a)/',
            '/(?<a>)/',
            '/\\k/',
            '/\\k/',
            '/(?<a>)/',
            '/\\k/',
            '/^f\w\w(?<=\woo)/',
            '/(?<=abc)\w\w\w/',
            '/(?<=a.c)\w\w\w/',
            '/(?<=a\wc)\w\w\w/',
            '/(?<=a[a-z])\w\w\w/',
            '/(?<=a[a-z][a-z])\w\w\w/',
            '/(?<=a[a-z]{2})\w\w\w/',
            '/(?<=a{1})\w\w\w/',
            '/(?<=a{1}b{1})\w\w\w/',
            '/(?<=a{1}[a-z]{2})\w\w\w/',
            '/(?<=[a|b|c]*)[^a|b|c]{3}/',
            '/(?<=\w*)[^a|b|c]{3}/',
            '/(?<=^abc)def/',
            '/(?<=^[a-c]{3})def/',
            '/(?<=^[a-c]{3})def/',
            '/(?<=^)\w+(?<=$)/',
            '/(?<=^[^a-c]{3})def/',
            '/"^foooo(?<=^o*)$/',
            '/^foooo(?<=^fo*)/',
            '/^(f)oo(?<=^\\1o+)$/',
            '/^(f)oo(?<=^\\1o+)$/',
            '/^(f)oo(?<=^\\11o+).$/',
            '/^f\w\w(?<=\woo)/',
            '/(?<=^\w+)def/',
            '/(?<=^\w+)def/',
            '/(?<=\b)[d-f]{3}/',
            '/(?<=\B)\w{3}/',
            '/(?<=\B)(?<=c(?<=\w))\w{3}/',
            '/(?<=\b)[d-f]{3}/',
            '/(?<=(c))def/',
            '/(?<=(\w{2}))def/',
            '/(?<=(\w(\w)))def/',
            '/(?<name>a)/',
            '/(?<$>)(?<_>)/',
            '/(?<a>)\\1/',
            '/(?<b>b)\k<a>(?<a>a)\k<b>/',
            '/(?<a>a)(?<b>b)\k<a>/',
            '/(?<a>a)(?<b>b)\k<a>|(?<c>c)/',
            '/(?<=(?<a>\w){3})f/',
            '/(?<a>a)/',
            '/(?<a42>a)/',
            '/(?<_>a)/',
            '/(?<$>a)/',
            '/.(?<$>a)./',
            '/.(?<a>a)(.)/',
            '/.(?<a>a)(?<b>.)/',
            '/.(?<a>\w\w)/',
            '/(?<a>\w\w\w)/',
            '/(?<a>\w\w)(?<b>\w)/',
            '/(?<a42>a)',
            '/(?<_>a)/',
            '/(?<$>a)/',
            '/.(?<$>a)./',
            '/.(?<a>a)(.)/',
            '/.(a)./',
            '/(a)/',
            '/(a)/',
            '/.(a)./',
            '/.(a)(.)/',
            '/.(a)(.)/',
            '/.(\w\w)/',
            '/(\w\w\w)/',
            '/(\w\w)(\w)/',
            '/(?<a>\w\w)(?<b>\w)/',
            '/(?<a>\w\w\w)/',
            '/.(?<a>a)(?<b>.)/',
            '/(?<$>a)/',
            '/(?<_>a)/',
            '/(?<a42>a)/',
            '/(?<a>a)/',
            '/(.)(?<a>a)\\1\\2/',
            '/(.)(?<a>a)(?<b>\\1)(\\2)/',
            '/(?<lt><)a/',
            '/(?<gt>>)a/',
            '/(?<_\u200C>a)/',
            '/(?<_\u200D>a)/',
            '/(?<ಠ_ಠ>a)/',
        ];
        for (const arg of validSyntax) {

            it(`${arg}`, () => {

                t.doesNotThrow(() => {
                    validateRegExp(`${arg}`, ValidatorState.Empty);
                });
            });
        }
    });
});