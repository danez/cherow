// Note! This is just an simple demo code. No validation is done!

export const enum ObjectState {
  None      = 0,
  Method    = 1 << 0,
  Computed  = 1 << 1,
  Shorthand = 1 << 2,
  Generator = 1 << 3,
  Async     = 1 << 4
}
function parseObjectLiteral(state: ParserState, context: Context): any {

  nextToken(state, context);

  let key: any;
  let currentToken = state.currentToken;
  let tokenValue = state.tokenValue;
  let kind = 'init';
  let value: any;
  const properties: any[] = [];

  let objState = ObjectState.None;

  while (state.currentToken !== Token.RightBrace) {

    if (state.currentToken & (Token.IdentifierOrContextual | Token.Keyword)) { {
        currentToken = state.currentToken;
        tokenValue = state.tokenValue;
        key = parseIdentifier(state, context);
        if (state.currentToken === Token.Comma ||
            state.currentToken === Token.RightBrace ||
            state.currentToken === Token.Assign) {
          if (optional(state, context, Token.Assign)) {
              value = {
                type: 'AssignmentExpression',
                left: key,
                operator: '=',
                right: parseAssignmentExpression(state, context),
             }
             objState = ObjectState.Shorthand;
          } else {
            objState = ObjectState.Shorthand;
            value = key
          }

        } else if (optional(state, context, Token.Colon)) {
            objState &= ~ObjectState.Shorthand;
            if (state.currentToken & (Token.IdentifierOrContextual | Token.Keyword)) {
              value = parseAssignmentExpression(state, context);
            } else if (state.currentToken === Token.LeftBracket) {
              // TODO!
            } else if (state.currentToken === Token.LeftBrace) {
              // TODO!
            } else {
                value = parseAssignmentExpression(state, context);
            }

        } else if (state.currentToken === Token.LeftBracket) {
            key = parseComputedPropertyName(state, context);
            if (currentToken === Token.GetKeyword) kind = 'get';
            else if (currentToken === Token.SetKeyword) kind = 'set';
            objState &= ~(ObjectState.Method | ObjectState.Computed);
            if (state.currentToken !== Token.LeftParen) report(state, Errors.Unexpected);
            value = parseMethodDeclaration(state, context, objState);
        } else if (state.currentToken === Token.LeftParen) {
            objState &= ~(ObjectState.Async | ObjectState.Generator);
            kind = 'init';
            value = parseMethodDeclaration(state, context, objState);
            objState |= ObjectState.Method;
        } else if (currentToken === Token.AsyncKeyword) {
                if (optional(state, context, Token.Multiply)) {
                  objState |= ObjectState.Generator
                }

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
        } else if (currentToken === Token.GetKeyword || currentToken === Token.SetKeyword) {

              if (currentToken === Token.GetKeyword) kind = 'get';
              else if (currentToken === Token.SetKeyword) kind = 'set';
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

    } else if (state.currentToken === Token.Ellipsis) {
      // TODO!
    } else if (state.currentToken & (Token.Literal | Token.StringLiteral)) {
        key = parseLiteral(state, context);
          if (optional(state, context, Token.Colon)) {
            value = parseAssignmentExpression(state, context);
          }  else {
            if (state.currentToken !== Token.LeftParen) report(state, Errors.Unexpected);
            value = parseMethodDeclaration(state, context, objState);
            objState |= ObjectState.Method;
          }

    } else if (state.currentToken === Token.LeftBracket) {
        key = parseComputedPropertyName(state, context);
        objState |= ObjectState.Computed &~(ObjectState.Async | ObjectState.Generator);
        kind = 'init';
        if (state.currentToken === Token.Colon) {
            nextToken(state, context);
            value = parseAssignmentExpression(state, context);
        } else {
          objState |= ObjectState.Method;
          if (state.currentToken !== Token.LeftParen) report(state, Errors.Unexpected);
          value = parseMethodDeclaration(state, context, objState);
        }
    } else if (state.currentToken  & Token.Multiply) {
        nextToken(state, context)
        if (state.currentToken & (Token.IdentifierOrContextual | Token.Keyword)) {
          currentToken = state.currentToken;
          key = parseIdentifier(state, context);
            if (state.currentToken === Token.LeftParen) {
              value = parseMethodDeclaration(state, context, objState | ObjectState.Generator);
              objState |= ObjectState.Method;
              objState |= ObjectState.Generator;
            } else {
              if (currentToken === Token.AsyncKeyword) report(state, Errors.Unexpected);
              if (currentToken === Token.GetKeyword || currentToken === Token.SetKeyword) report(state, Errors.Unexpected);
              if (currentToken === Token.Colon) report(state, Errors.Unexpected);

              report(state, Errors.Unexpected);
                // TODO!
            }
        } else if (state.currentToken & (Token.Literal | Token.StringLiteral)) {
          key = parseLiteral(state, context);
          value = parseMethodDeclaration(state, context, objState | ObjectState.Generator);
          objState |= ObjectState.Method;
          objState &= ~(ObjectState.Async | ObjectState.Generator);
        } else if (state.currentToken & Token.LeftBracket) {
          key = parseComputedPropertyName(state, context);
          value = parseMethodDeclaration(state, context, objState | ObjectState.Generator);
          objState |= (ObjectState.Method | ObjectState.Computed);
        } else {
          report(state, Errors.Unexpected);
        }
    } else {
      report(state, Errors.Unexpected);
    }
    optional(state, context,Token.Comma);
    properties.push({
      type: 'Property',
      key,
      value,
      kind,
      computed: (objState & ObjectState.Computed) !== 0,
      method: (objState & ObjectState.Method) !== 0,
      shorthand: (objState & ObjectState.Shorthand) !== 0,
    });
  }
  expect(state, context, Token.RightBrace);

  return {
    type: 'ObjectExpression',
    properties,
  };
}
