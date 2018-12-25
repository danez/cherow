import { Flags } from './common';
import { Comment } from './estree';
import { Token } from './token';

export class State {
  public index: number;
  public column: number;
  public line: number;
  public startIndex: number;
  public source: string;
  public length: number;
  public currentChar: number;
  public flags: Flags;
  public previousToken: Token;
  public currentToken: Token;
  public tokens: Token[];
  public tokenRegExp: any;
  public tokenValue: any;
  public comments: Comment[];
  public exportedNames: any;
  public exportedBindings: any;
  public assignable: boolean;
  public get tokenRaw(): string {
    return this.source.slice(this.startIndex, this.index);
  }

  constructor(source: string) {
    this.index = 0;
    this.column = 0;
    this.startIndex = 0;
    this.line = 1;
    this.source = source || '';
    this.length = source.length;
    this.flags = Flags.Empty;
    this.tokenValue = '';
    this.currentChar = source.charCodeAt(0);
    this.previousToken = Token.EndOfSource;
    this.currentToken = Token.EndOfSource;
    this.tokenRegExp = undefined;
    this.assignable = true;
    this.tokens = [];
    this.comments = [];
    this.exportedNames = {};
    this.exportedBindings = {};
  }
}
