// Note! This is just an simple demo code.

export const enum ObjectState {
  None = 0,
  Method = 1 << 0,
  Computed = 1 << 1,
  Shorthand = 1 << 2,
  Generator = 1 << 3,
  Async = 1 << 4
}

/**
 * Parses object literal
 *
 * @param state Parser state
 * @param context Context masks
 * @param scope Scope state
 * @param type Binding type
 */
function parseObjectLiteral(
  state: ParserState,
  context: Context,
  scope: ScopeState | number,
  type: BindingType
): ESTree.Expression {
  nextToken(state, context);

  let key: ESTree.Expression | null = null;
  let token = state.currentToken;
  let tokenValue = state.tokenValue;
  let kind = 'init';
  let value: any;
  let protoCount = 0;
  const properties: any[] = [];

  let objState = ObjectState.None;

  while (state.currentToken !== Token.RightBrace) {
    if (state.currentToken === Token.Ellipsis) {
      properties.push(parseSpreadElement(state, context));
    } else {
      if (state.currentToken & (Token.IdentifierOrContextual | Token.Keyword)) {
        {
          token = state.currentToken;
          tokenValue = state.tokenValue;
          objState = ObjectState.None;
          key = parseIdentifier(state, context);
          if (
            state.currentToken === Token.Comma ||
            state.currentToken === Token.RightBrace ||
            state.currentToken === Token.Assign
          ) {
            // PropertyDefinition
            //    IdentifierReference
            //    CoverInitializedName
            //
            // CoverInitializedName
            //    IdentifierReference Initializer?
            objState |= ObjectState.Shorthand;
            if (token !== Token.Eval || token !== Token.Arguments) {
              validateExpression(state, context, type, token);
            }

            addVarOrLexicalName(state, context, scope, type, false, false, tokenValue);

            if (optional(state, context, Token.Assign)) {
              value = {
                type: 'AssignmentExpression',
                left: key,
                operator: '=',
                right: parseAssignmentExpression(state, context)
              };
            } else {
              value = key;
            }
          } else if (optional(state, context, Token.Colon)) {
            if (tokenValue === '__proto__') state.flags |= Flags.SeenPrototype;
            if (state.currentToken & (Token.IdentifierOrContextual | Token.Keyword)) {
              tokenValue = state.tokenValue;
              value = parseAssignmentExpression(state, context);
              addVarOrLexicalName(state, context, scope, type, false, false, tokenValue);
            } else {
              value = parseAssignmentExpression(state, context);
            }
          } else if (state.currentToken === Token.LeftBracket) {
            key = parseComputedPropertyName(state, context);
            if (token === Token.AsyncKeyword) {
              objState |= ObjectState.Async | ObjectState.Computed | ObjectState.Method;
            } else {
              if (token === Token.GetKeyword) kind = 'get';
              else if (token === Token.SetKeyword) kind = 'set';
              objState |= ObjectState.Computed & ~ObjectState.Method;
            }

            if (state.currentToken !== Token.LeftParen) report(state, Errors.Unexpected);
            value = parseMethodDeclaration(state, context, objState);
          } else if (state.currentToken === Token.LeftParen) {
            objState = objState | (ObjectState.Method & ~(ObjectState.Async | ObjectState.Generator));
            kind = 'init';
            value = parseMethodDeclaration(state, context, objState);
          } else if (token === Token.AsyncKeyword) {
            objState |= ObjectState.Async;
            if (optional(state, context, Token.Multiply)) objState |= ObjectState.Generator;
            if (state.currentToken & (Token.IdentifierOrContextual | Token.Keyword)) {
              key = parseIdentifier(state, context);
            } else if (state.currentToken & (Token.Literal | Token.StringLiteral)) {
              key = parseLiteral(state, context);
            } else if (state.currentToken === Token.LeftBracket) {
              key = parseComputedPropertyName(state, context);
            } else {
              report(state, Errors.Unexpected);
            }

            if (state.currentToken !== Token.LeftParen) report(state, Errors.Unexpected);
            objState |= ObjectState.Method | ObjectState.Async;
            kind = 'init';
            value = parseMethodDeclaration(state, context, objState);
          } else if (token === Token.GetKeyword || token === Token.SetKeyword) {
            if (token === Token.GetKeyword) kind = 'get';
            else if (token === Token.SetKeyword) kind = 'set';
            else if (state.currentToken !== Token.AsyncKeyword) report(state, Errors.Unexpected);

            if (optional(state, context, Token.Multiply)) report(state, Errors.Unexpected);
            if (state.currentToken & (Token.IdentifierOrContextual | Token.Keyword)) {
              key = parseIdentifier(state, context);
            } else if (state.currentToken & (Token.Literal | Token.StringLiteral)) {
              key = parseLiteral(state, context);
            } else if (state.currentToken === Token.LeftBracket) {
              key = parseComputedPropertyName(state, context);
            } else {
              report(state, Errors.Unexpected);
            }

            if (state.currentToken !== Token.LeftParen) report(state, Errors.Unexpected);
            objState &= ~(ObjectState.Method | ObjectState.Computed | ObjectState.Generator | ObjectState.Async);
            value = parseMethodDeclaration(state, context, objState);
          }
        }
      } else if (state.currentToken & (Token.Literal | Token.StringLiteral)) {
        tokenValue = state.tokenValue;
        key = parseLiteral(state, context);
        if (optional(state, context, Token.Colon)) {
          if (tokenValue === '__proto__') state.flags |= Flags.SeenPrototype;
          value = parseAssignmentExpression(state, context);
          addVarOrLexicalName(state, context, scope, type, false, false, tokenValue);
        } else {
          if (state.currentToken !== Token.LeftParen) report(state, Errors.Unexpected);
          value = parseMethodDeclaration(state, context, objState);
          objState |= ObjectState.Method;
        }
      } else if (state.currentToken === Token.LeftBracket) {
        key = parseComputedPropertyName(state, context);
        objState |= ObjectState.Computed & ~(ObjectState.Async | ObjectState.Generator);
        kind = 'init';
        if (state.currentToken === Token.Colon) {
          nextToken(state, context);
          value = parseAssignmentExpression(state, context);
        } else {
          objState |= ObjectState.Method;
          if (state.currentToken !== Token.LeftParen) report(state, Errors.Unexpected);
          value = parseMethodDeclaration(state, context, objState);
        }
      } else if (state.currentToken & Token.Multiply) {
        nextToken(state, context);
        if (state.currentToken & (Token.IdentifierOrContextual | Token.Keyword)) {
          token = state.currentToken;
          objState &= ~(ObjectState.Method | ObjectState.Async);
          key = parseIdentifier(state, context);
          if (state.currentToken === Token.LeftParen) {
            value = parseMethodDeclaration(state, context, objState | ObjectState.Generator);
            objState |= ObjectState.Method | ObjectState.Generator;
          } else {
            if (token === Token.AsyncKeyword) report(state, Errors.Unexpected);
            if (token === Token.GetKeyword || token === Token.SetKeyword) report(state, Errors.Unexpected);
            if (token === Token.Colon) report(state, Errors.Unexpected);
            report(state, Errors.Unexpected);
          }
        } else if (state.currentToken & (Token.Literal | Token.StringLiteral)) {
          key = parseLiteral(state, context);
          value = parseMethodDeclaration(state, context, objState | ObjectState.Generator);
          objState |= ObjectState.Method;
        } else if (state.currentToken & Token.LeftBracket) {
          key = parseComputedPropertyName(state, context);
          value = parseMethodDeclaration(state, context, objState | ObjectState.Generator);
          objState |= ObjectState.Method | ObjectState.Computed;
        } else {
          report(state, Errors.Unexpected);
        }
      } else {
        report(state, Errors.Unexpected);
      }

      if (state.flags & Flags.SeenPrototype) ++protoCount;

      properties.push({
        type: 'Property',
        key,
        value,
        kind,
        computed: (objState & ObjectState.Computed) !== 0,
        method: (objState & ObjectState.Method) !== 0,
        shorthand: (objState & ObjectState.Shorthand) !== 0
      });
    }
    optional(state, context, Token.Comma);
  }

  expect(state, context, Token.RightBrace);

  if (protoCount === 1) state.flags &= ~Flags.SeenPrototype;

  return {
    type: 'ObjectExpression',
    properties
  };
}
