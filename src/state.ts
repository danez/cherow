import { Token } from './token';
import { Flags } from './common';

export class State {
  public index: number;
  public column: number;
  public line: number;
  public start: number;
  public source: string;
  public length: number;
  public currentChar: number;
  public flags: Flags;
  public token: Token;
  public tokens: any;
  public tokenRaw: string | null;
  public tokenRegExp: any;
  public tokenValue: any;
  constructor(source: string) {
      this.index = 0;
      this.column = 0;
      this.start = 0;
      this.line = 1;
      this.source = source || '';
      this.length = source.length;
      this.flags = Flags.Empty;
      this.tokenValue = '';
      this.currentChar = source.charCodeAt(0);
      this.token = Token.EndOfSource;
      this.tokenRaw = null;
      this.tokenRegExp = undefined;
      this.tokens = [];
  }
}
