import * as ESTree from './estree';
import { Parser } from './parser';
import { Context } from './flags';

export type OnComment = void | ESTree.Comment[] | (
    (type: string, value: string, start: number, end: number) => any
);

export interface Options {
    comments ?: OnComment;
    plugins ?: any[];
    next ?: boolean;
    ranges ?: boolean;
    offset ?: boolean;
    source ?: boolean;
    loc ?: boolean;
    jsx ?: boolean;
    raw ?: boolean;
    tolerant ?: boolean;
}

function parse(source: string, context: Context, options: Options | void) {

    const comments: OnComment = [];
    let cherow: any = Parser;

    if (options != null) {
        if (options.next) context |= Context.OptionsNext;
        if (options.jsx) context |= Context.OptionsJSX;
        if (options.ranges) context |= Context.OptionsRanges;
        if (options.raw) context |= Context.OptionsRaw;
        if (options.loc) context |= Context.OptionsLoc;
        if (options.ranges) context |= Context.OptionsRanges;
        if (options.source) context |= Context.OptionsSource;
        if (options.tolerant) context |= Context.OptionsTolerant;

        if (options.comments) {
            context |= Context.OptionsComments;
            //comments = options.comments;
        }

        // TODO! Cache this, and make sure the extended class are extended
        // once, and reused across parses.
        if (options.plugins) {
            for (const plugin of options.plugins) {
                cherow = plugin(Parser);
            }
        }
    }

    const parser = new cherow(source, comments);

    const node: ESTree.Program = {
        type: 'Program',
        sourceType: context & Context.Module ? 'module' : 'script',
        body: context & Context.Module
        ? parser.parseModuleItemList(context)
        : parser.parseStatementList(context)
    };

    if (context & Context.OptionsRanges) {
        node.start = 0;
        node.end = source.length;
    }

    if (context & Context.OptionsLoc) {

        node.loc = {
            start: {
                line: 1,
                column: 0,
            },
            end: {
                line: parser.line,
                column: parser.column
            }
        };

        if (context & Context.OptionsSource) {
            (node.loc as any).source = parser.fileName;
        }
    }

    if (context & Context.OptionsComments) {
        node.comments = parser.comments;
    }

    return node;
}

export const parseScript = (source: string, options ?: Options) => {
    return parse(source, Context.TopLevel, options);
};

export const parseModule = (source: string, options ?: Options) => {
    return parse(source, Context.Strict | Context.Module | Context.TopLevel, options);
};