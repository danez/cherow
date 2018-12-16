import { Flags } from './common';
import { Token } from './token';
import { Comment } from './estree';

export class State {
  public index: number;
  public column: number;
  public line: number;
  public startIndex: number;
  public source: string;
  public length: number;
  public currentChar: number;
  public flags: Flags;
  public token: Token;
  public tokens: Token[];
  public tokenRegExp: any;
  public tokenValue: any;
  public comments: Comment[];
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
      this.token = Token.EndOfSource;
      this.tokenRegExp = undefined;
      this.tokens = [];
      this.comments = [];
  }
}
