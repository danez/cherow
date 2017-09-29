export const enum Errors {
    Unexpected,
    UnexpectedToken,
    UnterminatedComment,
    UnterminatedString,
    UnterminatedRegExp,
    UnicodeOutOfRange,
    InvalidUnicodeEscapeSequence,
    StrictOctalEscape,
    InvalidEightAndNine,
    StrictOctalLiteral,
    MissingShebangExclamation,
    DuplicateRegExpFlag,
    UnexpectedTokenRegExp,
    UnexpectedTokenRegExpFlag,
    BadImportCallArity,
    StrictFunction,
    BadContinue,
    IllegalBreak,
    MultipleDefaultsInSwitch,
    IllegalReturn,
    NoCatchOrFinally,
    NewlineAfterThrow,
    StrictModeWith,
    DefaultRestProperty,
    PropertyAfterRestProperty,
    BadGetterArity,
    BadSetterArity,
    BadSetterRestParameter,
    DefaultRestParameter,
    IllegalUseStrict,
    ParameterAfterRestParameter,
    StrictFunctionName,
    UnexpectedNewTarget,
    MetaNotInFunctionBody,
    DeclarationMissingInitializer,
    InvalidVarInitForOf,
    InvalidLHSInForLoop,
    UninitalizedBindingPatternForInit,
    InvalidLHSInForIn,
    StrictLHSAssignment,
    InvalidLHSInAssignment,
    UnexpectedArrow,
    MissingAsImportSpecifier,
    NoAsAfterImportNamespace,
    InvalidModuleSpecifier,
    NonEmptyJSXExpression,
    ExpectedJSXClosingTag,
    AdjacentJSXElements,
    UnknownJSXChildKind,
    InvalidJSXAttributeValue,
    InvalidBinaryDigit,
    InvalidOctalDigit,
    StrictDelete,
    StrictLHSPrefix,
    StrictLHSPostfix,
    StrictFormalParameter,
    UnexpectedFromKeyword,
    ExportDeclAtTopLevel,
    ImportDeclAtTopLevel,
    MissingMsgDeclarationAfterExport,
    MissingMsgDeclarationAfterImport,
    ExpectedNamedOrNamespaceImport,
    MissingExportFromKeyword,
    NotAnAsyncGenerator,
    ForAwaitNotOf,
    ExportImportInModuleCode,
    LetInLexicalBinding,
    MissingVariableName,
    InvalidStartOfExpression,
    UnexpectedComma,
    DuplicateProtoProperty,
    StrictParamDupe,
    MissingExponent,
    ExpectedHexDigits,
    InvalidHexEscapeSequence,
    ConstructorSpecialMethod,
    BadSuperCall,
    DuplicateConstructor,
    StaticPrototype,
    ConstructorIsAsync,
    MissingClassName,
    ClassDeclarationNoName,
    FunctionDeclarationNoName,
    UnexpectedRest,
    InvalidTrailingComma,
    UnexpectedRestElement,
    InvalidContextualKeyword,
    LineBreakAfterAsync,
    InvalidEscapedReservedWord,
    MissingArrowAfterParentheses,
    InvalidShorthandPropertyAssignment,
    InvalidParenthesizedPattern,
    DuplicateIdentifier,
    DuplicateBinding,
    Redeclaration,
    GeneratorInLegacyContext,
    AsyncGeneratorInLegacyContext,
    AsyncInLegacyContext,
    UnknownLabel,
    InvalidOrUnexpectedToken,
    UnsupportedObjectSpread,
    InvalidLHSInArrow,
    InvalidNewTargetContext,
    UnexpectedReservedWord,
    InvalidShorthandProperty,
    TemplateOctalLiteral,
    UnterminatedTemplate,
    UnexpectedEOS,
    UnexpectedStrictReserved,
    YieldReservedWord,
    YieldInParameter,
    GeneratorParameter,
    StrictParamName,
    DisallowedInContext,
    IllegalArrowInParamList,
    UnexpectedBigIntLiteral,
    UnNamedClassStmt,
    UnNamedFunctionStmt,
    InvalidStrictExpPostion,
    InvalidStrictLexical,
    MissingInitializer,
    InvalidLabeledForOf,
    InvalidVarDeclInForIn,
    InvalidRestOperatorArg,
    InvalidNoctalInteger
}

export const ErrorMessages: {
    [key: string]: string
} = {
    [Errors.Unexpected]: 'Unexpected token',
    [Errors.UnexpectedToken]: 'Unexpected token \'%0\'',
    [Errors.UnterminatedComment]: 'Unterminated comment',
    [Errors.UnterminatedString]: 'Unterminated string literal',
    [Errors.UnterminatedRegExp]: 'Unterminated regular expression literal',
    [Errors.UnicodeOutOfRange]: 'Unicode escape code point out of range',
    [Errors.InvalidUnicodeEscapeSequence]: 'Invalid Unicode escape sequence',
    [Errors.StrictOctalEscape]: 'Octal escapes are not allowed in strict mode',
    [Errors.InvalidEightAndNine]: 'Escapes \\8 or \\9 are not syntactically valid escapes',
    [Errors.StrictOctalLiteral]: 'Octal literals are not allowed in strict mode',
    [Errors.MissingShebangExclamation]: 'Missing exclamation in shebang',
    [Errors.DuplicateRegExpFlag]: 'Duplicate flags supplied to RegExp constructor %0',
    [Errors.UnexpectedTokenRegExp]: 'Unexpected regular expression',
    [Errors.UnexpectedTokenRegExpFlag]: 'Unexpected regular expression flag',
    [Errors.BadImportCallArity]: 'Dynamic import must have one specifier as an argument',
    [Errors.StrictFunction]: 'In strict mode code, functions can only be declared at top level or inside a block',
    [Errors.BadContinue]: 'Continue must be inside loop or switch statement',
    [Errors.IllegalBreak]: 'Unlabeled break must be inside loop or switch',
    [Errors.IllegalReturn]: 'Illegal return statement',
    [Errors.MultipleDefaultsInSwitch]: 'More than one default clause in switch statement',
    [Errors.NoCatchOrFinally]: 'Missing catch or finally after try',
    [Errors.NewlineAfterThrow]: 'Illegal newline after throw',
    [Errors.StrictModeWith]: 'Strict mode code may not include a with statement',
    [Errors.DefaultRestProperty]: 'Unexpected token =',
    [Errors.BadGetterArity]: 'Getter must not have any formal parameters',
    [Errors.BadSetterArity]: 'Setter must have exactly one formal parameter',
    [Errors.BadSetterRestParameter]: 'Setter function argument must not be a rest parameter',
    [Errors.DefaultRestParameter]: 'Unexpected token =',
    [Errors.IllegalUseStrict]: 'Illegal \'use strict\' directive in function with non-simple parameter list',
    [Errors.ParameterAfterRestParameter]: 'Rest parameter must be last formal parameter',
    [Errors.UnexpectedRestElement]: 'Unexpected Rest element',
    [Errors.StrictFunctionName]: 'Function name may not be eval or arguments in strict mode code',
    [Errors.UnexpectedNewTarget]: 'new.target expression is not allowed here',
    [Errors.MetaNotInFunctionBody]: 'new.target must be in the body of a function',
    [Errors.DeclarationMissingInitializer]: 'Missing initializer in %0 declaration',
    [Errors.InvalidLHSInForLoop]: 'Invalid left-hand side in for-loop',
    [Errors.InvalidVarInitForOf]: 'Invalid variable declaration in for-of statement',
    [Errors.UninitalizedBindingPatternForInit]: 'Binding pattern appears without initializer in for statement init',
    [Errors.InvalidLHSInForIn]: 'Invalid left-hand side in for-in',
    [Errors.PropertyAfterRestProperty]: 'Unexpected token',
    [Errors.StrictLHSAssignment]: 'Eval or arguments can\'t be assigned to in strict mode code',
    [Errors.InvalidLHSInAssignment]: 'Invalid left-hand side in assignment',
    [Errors.UnexpectedArrow]: 'No line break is allowed before \'=>\'',
    [Errors.MissingArrowAfterParentheses]: 'Missing => after parentheses',
    [Errors.UnexpectedRest]: 'Unexpected token ...',
    [Errors.MissingAsImportSpecifier]: 'Missing \'as\' keyword in import namespace specifier',
    [Errors.NoAsAfterImportNamespace]: 'Missing \'as\' keyword after import namespace',
    [Errors.InvalidModuleSpecifier]: 'Invalid module specifier',
    [Errors.NonEmptyJSXExpression]: 'JSX attributes must only be assigned a non-empty  \'expression\'',
    [Errors.ExpectedJSXClosingTag]: 'Expected corresponding JSX closing tag for %0',
    [Errors.AdjacentJSXElements]: 'Adjacent JSX elements must be wrapped in an enclosing tag',
    [Errors.UnknownJSXChildKind]: 'Unknown JSX child kind %0',
    [Errors.InvalidJSXAttributeValue]: 'JSX value should be either an expression or a quoted JSX text',
    [Errors.InvalidBinaryDigit]: 'Invalid binary digit',
    [Errors.InvalidOctalDigit]: 'Invalid octal digit',
    [Errors.StrictDelete]: 'Delete of an unqualified identifier in strict mode.',
    [Errors.StrictLHSPrefix]: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
    [Errors.StrictLHSPostfix]: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
    [Errors.ExportDeclAtTopLevel]: 'Export declarations may only appear at top level of a module',
    [Errors.ImportDeclAtTopLevel]: 'Import declarations may only appear at top level of a module',
    [Errors.UnexpectedFromKeyword]: 'Expexted \'from\'',
    [Errors.MissingMsgDeclarationAfterExport]: 'Missing declaration after \'export\' keyword',
    [Errors.MissingMsgDeclarationAfterImport]: 'Missing declaration after \'import\' keyword',
    [Errors.ExpectedNamedOrNamespaceImport]: 'Expected named imports or namespace import after comma',
    [Errors.MissingExportFromKeyword]: 'Missing keyword from after import clause',
    [Errors.UnsupportedObjectSpread]: 'Unsupported Object rest spread',
    [Errors.NotAnAsyncGenerator]: 'Invalid async generator',
    [Errors.ForAwaitNotOf]: 'For await loop should be used with \'of\'',
    [Errors.ExportImportInModuleCode]: '%0 may only be used with module code',
    [Errors.LetInLexicalBinding]: 'let is disallowed as a lexically bound name',
    [Errors.MissingVariableName]: 'Missing variable name',
    [Errors.InvalidStartOfExpression]: 'Invalid start of an expression',
    [Errors.UnexpectedComma]: 'Unexpected token ,',
    [Errors.DuplicateProtoProperty]: 'Duplicate __proto__ fields are not allowed in object literals',
    [Errors.StrictParamDupe]: 'Strict mode function may not have duplicate parameter names',
    [Errors.MissingExponent]: 'Float tail must contain digits',
    [Errors.ExpectedHexDigits]: 'Expected hexadecimal digits',
    [Errors.InvalidHexEscapeSequence]: 'Invalid hexadecimal escape sequence',
    [Errors.ConstructorSpecialMethod]: 'Class constructor may not be an accessor',
    [Errors.InvalidTrailingComma]: 'Unexpeced ,',
    [Errors.BadSuperCall]: 'super() is only valid in derived class constructors',
    [Errors.DuplicateConstructor]: 'A class may only have one constructor',
    [Errors.ConstructorIsAsync]: 'Class constructor may not be an async method',
    [Errors.StaticPrototype]: 'Classes may not have static property named prototype',
    [Errors.ClassDeclarationNoName]: 'Class declaration must have a name in this context',
    [Errors.FunctionDeclarationNoName]: 'Function declaration must have a name in this context',
    [Errors.InvalidContextualKeyword]: 'A contextual keyword must not contain escaped characters',
    [Errors.LineBreakAfterAsync]: 'No line break is allowed after async',
    [Errors.InvalidEscapedReservedWord]: 'Keyword must not contain escaped characters',
    [Errors.InvalidShorthandPropertyAssignment]: 'Shorthand property assignments are only valid in destructuring patterns',
    [Errors.InvalidParenthesizedPattern]: 'Invalid parenthesized pattern',
    [Errors.DuplicateIdentifier]: '\'%0\' has already been declared ',
    [Errors.DuplicateBinding]: 'Duplicate binding',
    [Errors.Redeclaration]: 'Label \'%0\' has already been declared',
    [Errors.UnknownLabel]: 'Undefined label \'%0\'',
    [Errors.AsyncGeneratorInLegacyContext]: 'Async and async Generator declarations are not allowed in legacy contexts',
    [Errors.AsyncInLegacyContext]: 'Async declarations are not allowed in legacy contexts',
    [Errors.GeneratorInLegacyContext]: 'Generator declarations are not allowed in legacy contexts',
    [Errors.InvalidOrUnexpectedToken]: 'Invalid or unexpected token',
    [Errors.InvalidLHSInArrow]: ' Invalid left-hand side in arrow function parameters',
    [Errors.InvalidNewTargetContext]: 'new.target expression is not allowed here',
    [Errors.UnexpectedReservedWord]: 'Unexpected reserved word',
    [Errors.InvalidShorthandProperty]: '\'%0\' can not be used as shorthand property',
    [Errors.TemplateOctalLiteral]: 'Octal escape sequences are not allowed in template strings.',
    [Errors.UnterminatedTemplate]: 'Unterminated template literal',
    [Errors.UnexpectedEOS]: 'Unexpected end of input',
    [Errors.UnexpectedStrictReserved]: 'Unexpected strict mode reserved word',
    [Errors.YieldReservedWord]: 'yield is a reserved word inside generator functions',
    [Errors.YieldInParameter]: 'Yield expression not allowed in formal parameter',
    [Errors.GeneratorParameter]: 'Generator parameters must not contain yield expressions',
    [Errors.StrictParamName]: 'The identifier \'eval\' or \'arguments\' must not be in binding position in strict mode',
    [Errors.DisallowedInContext]: '\'%0\' may not be used as an identifier in this context',
    [Errors.IllegalArrowInParamList]: 'Illegal arrow function parameter list',
    [Errors.UnexpectedBigIntLiteral]: 'Unexpected BigInt literal',
    [Errors.UnNamedClassStmt]: 'Class statement requires a name',
    [Errors.UnNamedFunctionStmt]: 'Function statement requires a name',
    [Errors.InvalidStrictExpPostion]: 'The identifier \'%0\' must not be in expression position in strict mode',
    [Errors.InvalidStrictLexical]: 'Lexical declarations must not have a binding named "let"',
    [Errors.MissingInitializer]: 'Missing initializer',
    [Errors.InvalidLabeledForOf]: 'The body of a for-of statement must not be a labeled function declaration',
    [Errors.InvalidVarDeclInForIn]: 'Invalid variable declaration in for-in statement',
    [Errors.InvalidRestOperatorArg]: 'Invalid rest operator\'s argument',
    [Errors.InvalidNoctalInteger]: 'Unexpected noctal integer literal',
};

function constructError(msg: string, column: number): Error {
    let error: Error = new Error(msg);
    try {
        throw error;
    } catch (base) {
        // istanbul ignore else
        if (Object.create && Object.defineProperty) {
            error = Object.create(base);
            Object.defineProperty(error, 'column', {
                value: column
            });
        }
    }
    // istanbul ignore next
    return error;
}
export function createError(type: Errors, loc: any, ...params: string[]): Error {
    const description = ErrorMessages[type].replace(/%(\d+)/g, (_: string, i: number) => params[i]);
    const error: any = constructError('Line ' + loc.line + ': ' + description, loc.column);
    error.index = loc.index;
    error.lineNumber = loc.line;
    error.description = description;
    return error;
}