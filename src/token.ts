
/**
 * https://tc39.github.io/ecma262/#sec-ecmascript-language-source-code
 */
export const enum Token {
           /* Attribute names */Contextual              = 0b0000000000000000001 << 12 | 0b0000 << 8 | 0b00000000,
                                Reserved                = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b00000000,
                                FutureReserved          = 0b0000000000000000100 << 12 | 0b0000 << 8 | 0b00000000,
                                ResOrFutureRes          = 0b0000000000000000110 << 12 | 0b0000 << 8 | 0b00000000,
                                Invalid                 = 0b0000000000000001000 << 12 | 0b0000 << 8 | 0b00000000,
                                ASI                     = 0b0000000000000010000 << 12 | 0b0000 << 8 | 0b00000000,
                                IsLogical               = 0b0000000000000100000 << 12 | 0b0000 << 8 | 0b00000000,
               /* ECMA tokens */WhiteSpace              = 0b0000000000010000000 << 12 | 0b0000 << 8 | 0b00000000, // Note: LineTerminator and WhiteSpace are treated as one token
                                Comments                = 0b0000000000110000000 << 12 | 0b0000 << 8 | 0b00000000,
                                NumericLiteral          = 0b0000000001000000000 << 12 | 0b0000 << 8 | 0b00000000,
                                StringLiteral           = 0b0000000010000000000 << 12 | 0b0000 << 8 | 0b00000000,
                                Literal                 = 0b0000000011000000000 << 12 | 0b0000 << 8 | 0b00000000,
                                Identifier              = 0b0000000100000000000 << 12 | 0b0000 << 8 | 0b00000000,
                                IdentifierOrContextual  = 0b0000000100000000001 << 12 | 0b0000 << 8 | 0b00000000,
                                FunctionExprIdentifier  = 0b0000000101000000001 << 12 | 0b0000 << 8 | 0b00000000,
                                RegularExpression       = 0b0000001000000000000 << 12 | 0b0000 << 8 | 0b00000000,
                                Punctuator              = 0b0000010000000000000 << 12 | 0b0000 << 8 | 0b00000000,
                                Template                = 0b0000100000000000000 << 12 | 0b0000 << 8 | 0b00000000,
                      /* Misc */IsAssignOp              = 0b0001000000000000000 << 12 | 0b0000 << 8 | 0b00000000,
                                IsBinaryOp              = 0b0010000000000000000 << 12 | 0b0000 << 8 | 0b00000000,
                                IsUnaryOp               = 0b0100000000000000000 << 12 | 0b0000 << 8 | 0b00000000,
                                IsUpdateOp              = 0b1000000000000000000 << 12 | 0b0000 << 8 | 0b00000000,
                 /* Constants */Keyword                 = 0b0000000100000000111 << 12 | 0b0000 << 8 | 0b00000000,
                                NonReservedKeyword      = 0b0000000100000000101 << 12 | 0b0000 << 8 | 0b00000000,

                                Type                    = 0b0000000000000000000 << 12 | 0b0000 << 8 | 0b11111111,
                /* Precedence */PrecStart               = 0b0000000000000000000 << 12 | 0b0000  | 8 | 0b00000000,

                                Precedence              = 0b0000000000000000000 << 12 | 0b1111 << 8 | 0b00000000, // 8-11
                /* Node types */EndOfSource             = 0b0000000000000010000 << 12 | 0b0000 << 8 | 0b00000000, // Pseudo
                  /* Booleans */FalseKeyword            = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b00000001,
                                TrueKeyword             = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b00000010,
              /* Null literal */NullKeyword             = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b00000011,
            /* Template nodes */TemplateHead            = 0b0000100000000000000 << 12 | 0b0000 << 8 | 0b00000100,
                                TemplateCont            = 0b0000100000000000000 << 12 | 0b0000 << 8 | 0b00000101,
                                TemplateTail            = 0b0000100000000000000 << 12 | 0b0000 << 8 | 0b00000110,
               /* Punctuators */Arrow                   = 0b0000010000000000000 << 12 | 0b0000 << 8 | 0b00000111, // =>
                                LeftParen               = 0b0000010000000000000 << 12 | 0b0000 << 8 | 0b00001000, // (
                                LeftBrace               = 0b0000010000000000000 << 12 | 0b0000 << 8 | 0b00001001, // {
                                Period                  = 0b0000010000000000000 << 12 | 0b0000 << 8 | 0b00001010, // .
                                Ellipsis                = 0b0000010000000000000 << 12 | 0b0000 << 8 | 0b00001011, // ...
                                RightBrace              = 0b0000010000000010000 << 12 | 0b0000 << 8 | 0b00001100, // }
                                RightParen              = 0b0000010000000000000 << 12 | 0b0000 << 8 | 0b00001101, // )
                                Semicolon               = 0b0000010000000010000 << 12 | 0b0000 << 8 | 0b00001110, // ;
                                Comma                   = 0b0000010000000000000 << 12 | 0b0000 << 8 | 0b00001111, // ,
                                LeftBracket             = 0b0000010000000000000 << 12 | 0b0000 << 8 | 0b00010000, // [
                                RightBracket            = 0b0000010000000000000 << 12 | 0b0000 << 8 | 0b00010001, // ]
                                Colon                   = 0b0000010000000000000 << 12 | 0b0000 << 8 | 0b00010010, // :
                                QuestionMark            = 0b0000010000000000000 << 12 | 0b0000 << 8 | 0b00010011, // ?
                                SingleQuote             = 0b0000010000000000000 << 12 | 0b0000 << 8 | 0b00010100, // '
                                DoubleQuote             = 0b0000010000000000000 << 12 | 0b0000 << 8 | 0b00010101, // "
                                JSXClose                = 0b0000010000000000000 << 12 | 0b0000 << 8 | 0b00010110, // </
                                JSXAutoClose            = 0b0000010000000000000 << 12 | 0b0000 << 8 | 0b00010111, // />
          /* Update operators */Increment               = 0b1000010000000000000 << 12 | 0b0000 << 8 | 0b00011000, // ++
                                Decrement               = 0b1000010000000000000 << 12 | 0b0000 << 8 | 0b00011001, // --
          /* Assign operators */Assign                  = 0b0001010000000000000 << 12 | 0b0000 << 8 | 0b00011010, // =
                                ShiftLeftAssign         = 0b0001010000000000000 << 12 | 0b0000 << 8 | 0b00011011, // <<=
                                ShiftRightAssign        = 0b0001010000000000000 << 12 | 0b0000 << 8 | 0b00011100, // >>=
                                LogicalShiftRightAssign = 0b0001010000000000000 << 12 | 0b0000 << 8 | 0b00011101, // >>>=
                                ExponentiateAssign      = 0b0001010000000000000 << 12 | 0b0000 << 8 | 0b00011110, // **=
                                AddAssign               = 0b0001010000000000000 << 12 | 0b0000 << 8 | 0b00011111, // +=
                                SubtractAssign          = 0b0001010000000000000 << 12 | 0b0000 << 8 | 0b00100000, // -=
                                MultiplyAssign          = 0b0001010000000000000 << 12 | 0b0000 << 8 | 0b00100001, // *=
                                DivideAssign            = 0b0001010000000000000 << 12 | 0b0000 << 8 | 0b00100010, // /=
                                ModuloAssign            = 0b0001010000000000000 << 12 | 0b0000 << 8 | 0b00100011, // %=
                                BitwiseXorAssign        = 0b0001010000000000000 << 12 | 0b0000 << 8 | 0b00100100, // ^=
                                BitwiseOrAssign         = 0b0001010000000000000 << 12 | 0b0000 << 8 | 0b00100101, // |=
                                BitwiseAndAssign        = 0b0001010000000000000 << 12 | 0b0000 << 8 | 0b00100110, // &=
    /* Unary/binary operators */TypeofKeyword           = 0b0100010000000000010 << 12 | 0b0000 << 8 | 0b00100111,
                                DeleteKeyword           = 0b0100010000000000010 << 12 | 0b0000 << 8 | 0b00101000,
                                VoidKeyword             = 0b0100010000000000010 << 12 | 0b0000 << 8 | 0b00101001,
                                Negate                  = 0b0100010000000000000 << 12 | 0b0000 << 8 | 0b00101010, // !
                                Complement              = 0b0100010000000000000 << 12 | 0b0000 << 8 | 0b00101011, // ~
                                Add                     = 0b0110010000000000000 << 12 | 0b1001 << 8 | 0b00101100, // +
                                Subtract                = 0b0110010000000000000 << 12 | 0b1001 << 8 | 0b00101101, // -
                                InKeyword               = 0b0010010000000000010 << 12 | 0b0111 << 8 | 0b00101110,
                                InstanceofKeyword       = 0b0010010000000000010 << 12 | 0b0111 << 8 | 0b00101111,
                                Multiply                = 0b0010010000000000000 << 12 | 0b1010 << 8 | 0b00110000, // *
                                Modulo                  = 0b0010010000000000000 << 12 | 0b1010 << 8 | 0b00110001, // %
                                Divide                  = 0b0010010000000000000 << 12 | 0b1010 << 8 | 0b00110010, // /
                                Exponentiate            = 0b0010010000000000000 << 12 | 0b1011 << 8 | 0b00110011, // **
                                LogicalAnd              = 0b0010010000000100000 << 12 | 0b0010 << 8 | 0b00110100, // &&
                                LogicalOr               = 0b0010010000000100000 << 12 | 0b0001 << 8 | 0b00110101, // ||
                                StrictEqual             = 0b0010010000000000000 << 12 | 0b0110 << 8 | 0b00110110, // ===
                                StrictNotEqual          = 0b0010010000000000000 << 12 | 0b0110 << 8 | 0b00110111, // !==
                                LooseEqual              = 0b0010010000000000000 << 12 | 0b0110 << 8 | 0b00111000, // ==
                                LooseNotEqual           = 0b0010010000000000000 << 12 | 0b0110 << 8 | 0b00111001, // !=
                                LessThanOrEqual         = 0b0010010000000000000 << 12 | 0b0111 << 8 | 0b00111010, // <=
                                GreaterThanOrEqual      = 0b0010010000000000000 << 12 | 0b0111 << 8 | 0b00111011, // >=
                                LessThan                = 0b0010010000000000000 << 12 | 0b0111 << 8 | 0b00111100, // <
                                GreaterThan             = 0b0010010000000000000 << 12 | 0b0111 << 8 | 0b00111101, // >
                                ShiftLeft               = 0b0010010000000000000 << 12 | 0b1000 << 8 | 0b00111110, // <<
                                ShiftRight              = 0b0010010000000000000 << 12 | 0b1000 << 8 | 0b00111111, // >>
                                LogicalShiftRight       = 0b0010010000000000000 << 12 | 0b1000 << 8 | 0b01000000, // >>>
                                BitwiseAnd              = 0b0010010000000000000 << 12 | 0b0101 << 8 | 0b01000001, // &
                                BitwiseOr               = 0b0010010000000000000 << 12 | 0b0011 << 8 | 0b01000010, // |
                                BitwiseXor              = 0b0010010000000000000 << 12 | 0b0100 << 8 | 0b01000011, // ^
/* Variable declaration kinds */VarKeyword              = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01000100,
                                LetKeyword              = 0b0000000000000000100 << 12 | 0b0000 << 8 | 0b01000101,
                                ConstKeyword            = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01000110,
      /* Other reserved words */BreakKeyword            = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01000111,
                                CaseKeyword             = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01001000,
                                CatchKeyword            = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01001001,
                                ClassKeyword            = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01001010,
                                ContinueKeyword         = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01001011,
                                DebuggerKeyword         = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01001100,
                                DefaultKeyword          = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01001101,
                                DoKeyword               = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01001110,
                                ElseKeyword             = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01001111,
                                ExportKeyword           = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01010000,
                                ExtendsKeyword          = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01010001,
                                FinallyKeyword          = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01010010,
                                ForKeyword              = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01010011,
                                FunctionKeyword         = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01010100,
                                IfKeyword               = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01010101,
                                ImportKeyword           = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01010110,
                                NewKeyword              = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01010111,
                                ReturnKeyword           = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01011000,
                                SuperKeyword            = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01011001,
                                SwitchKeyword           = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01011010,
                                ThisKeyword             = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01011011,
                                ThrowKeyword            = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01011100,
                                TryKeyword              = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01011101,
                                WhileKeyword            = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01011110,
                                WithKeyword             = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01011111,
          /* Eval & arguments */Arguments               = 0b0000000100000000000 << 12 | 0b0000 << 8 | 0b01100000,
                                Eval                    = 0b0000000100000000000 << 12 | 0b0000 << 8 | 0b01100001,
                /* Decorators */At                      = 0b0000000100000000000 << 12 | 0b0000 << 8 | 0b01100010,
      /* Priv names / shebang */Hash                    = 0b0000000100000000000 << 12 | 0b0000 << 8 | 0b01100011,
/* Strict mode reserved words */ImplementsKeyword       = 0b0000000000000000100 << 12 | 0b0000 << 8 | 0b01100100,
                                InterfaceKeyword        = 0b0000000000000000100 << 12 | 0b0000 << 8 | 0b01100101,
                                PackageKeyword          = 0b0000000000000000100 << 12 | 0b0000 << 8 | 0b01100110,
                                PrivateKeyword          = 0b0000000000000000100 << 12 | 0b0000 << 8 | 0b01100111,
                                ProtectedKeyword        = 0b0000000000000000100 << 12 | 0b0000 << 8 | 0b01101000,
                                PublicKeyword           = 0b0000000000000000100 << 12 | 0b0000 << 8 | 0b01101001,
                                StaticKeyword           = 0b0000000000000000100 << 12 | 0b0000 << 8 | 0b01101010,
                                YieldKeyword            = 0b0000000000000000100 << 12 | 0b0000 << 8 | 0b01101011,
       /* Contextual keywords */AsKeyword               = 0b0000000000000000001 << 12 | 0b0000 << 8 | 0b01101100,
                                AsyncKeyword            = 0b0000000000000000001 << 12 | 0b0000 << 8 | 0b01101101,
                                AwaitKeyword            = 0b0000000000000000001 << 12 | 0b0000 << 8 | 0b01101110,
                                ConstructorKeyword      = 0b0000000000000000001 << 12 | 0b0000 << 8 | 0b01101111,
                                GetKeyword              = 0b0000000000000000001 << 12 | 0b0000 << 8 | 0b01110000,
                                SetKeyword              = 0b0000000000000000001 << 12 | 0b0000 << 8 | 0b01110001,
                                FromKeyword             = 0b0000000000000000001 << 12 | 0b0000 << 8 | 0b01110010,
                                OfKeyword               = 0b0000000000000000001 << 12 | 0b0000 << 8 | 0b01110011,
                  /* Comments */SingleComment           = 0b0000000000110000000 << 12 | 0b0000 << 8 | 0b01110100,
                                MultiComment            = 0b0000000000110000000 << 12 | 0b0000 << 8 | 0b01110101,
                                HTMLComment             = 0b0000000000110000000 << 12 | 0b0000 << 8 | 0b01110110,
                /* WhiteSpace */Space                   = 0b0000000000010000000 << 12 | 0b0000 << 8 | 0b01110111,
                                Tab                     = 0b0000000000010000000 << 12 | 0b0000 << 8 | 0b01111000,
                                LineFeed                = 0b0000000000010000000 << 12 | 0b0000 << 8 | 0b01111001,
                                CarriageReturn          = 0b0000000000010000000 << 12 | 0b0000 << 8 | 0b01111010,
                   /* Numbers */BigInt                  = 0b0000000001000000000 << 12 | 0b0000 << 8 | 0b01111011,
                      /* Enum */EnumKeyword             = 0b0000000000000000010 << 12 | 0b0000 << 8 | 0b01111100,
          /* Escaped keywords */EscapedStrictReserved   = 0b0000000000000000000 << 12 | 0b0000 << 8 | 0b01111101,
                                EscapedKeyword          = 0b0000000000000000000 << 12 | 0b0000 << 8 | 0b01111110,
                                JSXIdentifier           = 0b0000000000000000000 << 12 | 0b0000 << 8 | 0b01111111,
                                JSXText                 = 0b0000000000000000000 << 12 | 0b0000 << 8 | 0b10000000,
}

// Note: this *must* be kept in sync with the enum's order.
//
// It exploits the enum value ordering, and it's necessarily a complete and
// utter hack.
//
// All to lower it to a single monomorphic array access.
export const KeywordDescTable = [
  'end of source',

  /* Constants/Bindings */
  'false', 'true', 'null',

  /* Template nodes */
  'template head', 'template body', 'template tail',

  /* Punctuator */
  '=>', '(', '{', '.', '...', '}', ')', ';', ',', '[', ']', ':', '?', '\'', '"', '</', '/>',

  /* Update operators */
  '++', '--',

  /* Assign operators */
  '=', '<<=', '>>=', '>>>=', '**=', '+=', '-=', '*=', '/=', '%=', '^=', '|=',
  '&=',

  /* Unary/binary operators */
  'typeof', 'delete', 'void', '!', '~', '+', '-', 'in', 'instanceof', '*', '%', '/', '**', '&&',
  '||', '===', '!==', '==', '!=', '<=', '>=', '<', '>', '<<', '>>', '>>>', '&', '|', '^',

  /* Variable declaration kinds */
  'var', 'let', 'const',

  /* Other reserved words */
  'break', 'case', 'catch', 'class', 'continue', 'debugger', 'default', 'do', 'else', 'export',
  'extends', 'finally', 'for', 'function', 'if', 'import', 'new', 'return', 'super', 'switch',
  'this', 'throw', 'try', 'while', 'with',

   /* Eval & arguments */
   'arguments', 'eval',

   /* Decorators */
   'at',

   /* Private names or shebang comment start */
   '#',

  /* Strict mode reserved words */
  'implements', 'interface', 'package', 'private', 'protected', 'public', 'static', 'yield',

  /* Contextual keywords */
  'as', 'async', 'await', 'constructor', 'get', 'set', 'from', 'of',

  /* Comments */
  'SingleComment', 'MultiComment', 'HTMLComment',

  /* WhiteSpace */
  'space', 'tab', 'line feed', 'carrige return',

  /* Numbers */
  'bigInt',

  /* Enum */

  'enum',

  /* Escaped keywords */

  'escaped strict reserved', 'escaped keyword',

  /* JSX */

  'JSXText', 'JSXIdentifier'
];

// Normal object is much faster than Object.create(null), even with typeof check to avoid Object.prototype interference
export const descKeywordTable: {[key: string]: Token} = {
this: Token.ThisKeyword,
function: Token.FunctionKeyword,
if: Token.IfKeyword,
return: Token.ReturnKeyword,
var: Token.VarKeyword,
else: Token.ElseKeyword,
for: Token.ForKeyword,
new: Token.NewKeyword,
in: Token.InKeyword,
typeof: Token.TypeofKeyword,
while: Token.WhileKeyword,
case: Token.CaseKeyword,
break: Token.BreakKeyword,
try: Token.TryKeyword,
catch: Token.CatchKeyword,
delete: Token.DeleteKeyword,
throw: Token.ThrowKeyword,
switch: Token.SwitchKeyword,
continue: Token.ContinueKeyword,
default: Token.DefaultKeyword,
instanceof: Token.InstanceofKeyword,
do: Token.DoKeyword,
void: Token.VoidKeyword,
finally: Token.FinallyKeyword,
arguments: Token.Arguments,
async: Token.AsyncKeyword,
await: Token.AwaitKeyword,
class: Token.ClassKeyword,
const: Token.ConstKeyword,
constructor: Token.ConstructorKeyword,
debugger: Token.DebuggerKeyword,
enum: Token.EnumKeyword,
eval: Token.Eval,
export: Token.ExportKeyword,
extends: Token.ExtendsKeyword,
false: Token.FalseKeyword,
from: Token.FromKeyword,
get: Token.GetKeyword,
implements: Token.ImplementsKeyword,
import: Token.ImportKeyword,
interface: Token.InterfaceKeyword,
let: Token.LetKeyword,
null: Token.NullKeyword,
of: Token.OfKeyword,
package: Token.PackageKeyword,
private: Token.PrivateKeyword,
protected: Token.ProtectedKeyword,
public: Token.PublicKeyword,
set: Token.SetKeyword,
static: Token.StaticKeyword,
super: Token.SuperKeyword,
true: Token.TrueKeyword,
with: Token.WithKeyword,
yield: Token.YieldKeyword,
as: Token.AsKeyword,
};
