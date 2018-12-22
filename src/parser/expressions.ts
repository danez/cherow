// Note! This is just an simple demo code. No validation is done!

function parseObjectLiteral(state: ParserState, context: Context): any {

  nextToken(state, context);

  let key: any;
  let currentToken = state.currentToken;
  let tokenValue = state.tokenValue;
  let method = false;
  let kind = 'init';
  let computed = false;
  let value: any;
  let shorthand = false;
  let isGenerator = false;
  let isAsync = false;
  const properties: any[] = [];

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
             shorthand = true;
          } else {
            shorthand = true;
            value = key
          }

        } else if (optional(state, context, Token.Colon)) {
          shorthand = false;
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
            method = false;
            computed = false;
            if (state.currentToken !== Token.LeftParen) report(state, Errors.Unexpected);
            value = parseMethodDeclaration(state, context, isGenerator /* isGenerator */, isAsync);
        } else if (state.currentToken === Token.LeftParen) {
            isAsync = false;
            isGenerator = false;
            kind = 'init';
            value = parseMethodDeclaration(state, context, isGenerator, isAsync);
            method = true;
        } else if (currentToken === Token.AsyncKeyword) {
                if (optional(state, context, Token.Multiply)) isGenerator = true

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
          method = true;
          isAsync = true;
          kind = 'init';
          value = parseMethodDeclaration(state, context, isGenerator /* isGenerator */, isAsync);
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
              isGenerator = false;
              isAsync = false;
              method = false;
              value = parseMethodDeclaration(state, context, isGenerator /* isGenerator */, isAsync);
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
            value = parseMethodDeclaration(state, context, false /* isGenerator */, isAsync);
            method = true;
          }

    } else if (state.currentToken === Token.LeftBracket) {
        key = parseComputedPropertyName(state, context);
        computed = true;
        isGenerator = false;
        isAsync = false;
        kind = 'init';
        method = state.currentToken === Token.LeftParen;
        if (state.currentToken === Token.Colon) {
            nextToken(state, context);
            value = parseAssignmentExpression(state, context);
        } else {
          if (state.currentToken !== Token.LeftParen) report(state, Errors.Unexpected);
          value = parseMethodDeclaration(state, context, false /* isGenerator */, isAsync);
        }
    } else if (state.currentToken  & Token.Multiply) {
        nextToken(state, context)
        if (state.currentToken & (Token.IdentifierOrContextual | Token.Keyword)) {
          currentToken = state.currentToken;
          key = parseIdentifier(state, context);
            if (state.currentToken === Token.LeftParen) {
              value = parseMethodDeclaration(state, context, true /* isGenerator */, isAsync);
              method = true;
              isGenerator = true;
            } else {
              if (currentToken === Token.AsyncKeyword) report(state, Errors.Unexpected);
              if (currentToken === Token.GetKeyword || currentToken === Token.SetKeyword) report(state, Errors.Unexpected);
              if (currentToken === Token.Colon) report(state, Errors.Unexpected);

              report(state, Errors.Unexpected);
                // TODO!
            }
        } else if (state.currentToken & (Token.Literal | Token.StringLiteral)) {
          key = parseLiteral(state, context);
          value = parseMethodDeclaration(state, context, true /* isGenerator */, isAsync);
          method = true;
          isAsync = false;
          isGenerator = false;
        } else if (state.currentToken & Token.LeftBracket) {
          key = parseComputedPropertyName(state, context);
          value = parseMethodDeclaration(state, context, true /* isGenerator */, isAsync);
          method = true;
          computed = true;
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
      computed,
      method,
      shorthand,
    });
  }
  expect(state, context, Token.RightBrace);

  return {
    type: 'ObjectExpression',
    properties,
  };
}
