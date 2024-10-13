import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  previousExpression: '',
  expression: '',
  previousDisplay: '',
  display: '0'
}

export const operatorsX = ['/', 'x', '-', '+'];
const operatorsDot = ['/', '⋅', '-', '+'];

const formatOperator = (operator) => operator === 'x' ? '⋅' : operator;

const evaluateExpression = (expression) => {
  return new Function(`return ${expression.replace(/--/, '-').replace(/⋅/, '*')}`)();
};

const displaySlice = createSlice({
  name: 'display',
  initialState,
  reducers: {
    setDisplay: (state, action) => {
      state.display = action.payload;
    },
    setExpressionAndDisplay: (state, action) => {
      state.previousExpression = state.expression;
      state.previousDisplay = state.display;

      switch(action.payload) {
        case 'AC':
          state.expression = '';
          state.display = '0';
          break;
        case operatorsX[0]:
        case operatorsX[1]:
        case operatorsX[2]:
        case operatorsX[3]:
          if (state.previousExpression.includes('=')) {
            state.previousExpression = state.previousExpression.slice(state.previousExpression.indexOf('=') + 1);
          }
    
          const lastChar = state.previousExpression.slice(-1);
          const secondLastChar = state.previousExpression.slice(-2, -1);
          
          state.display = action.payload;
          if ([...operatorsDot, '.'].includes(lastChar)) {
            if (action.payload === '-' && !isNaN(secondLastChar) && (operatorsDot.includes(lastChar))) {
              state.expression = state.previousExpression + formatOperator(action.payload);
              break;
            } else if (action.payload === '-' && lastChar === '-') {
              state.expression =  state.previousExpression;
              break;
            } else if (isNaN(secondLastChar)) {
              state.expression =  state.previousExpression.slice(0, -2) + formatOperator(action.payload);
              break;
            }
            state.expression =  state.previousExpression.slice(0, -1) + formatOperator(action.payload);
            break;
          }
        
          state.expression =  state.previousExpression + formatOperator(action.payload);
          break;
        case '.':
          if (!state.display.includes(action.payload)) {  
            state.expression = state.expression.includes('=') ? '0.' : ((state.previousExpression === '' || operatorsX.includes(state.display)) ? state.previousExpression + '0.' : state.previousExpression + '.');
            state.display = (operatorsX.includes(state.previousDisplay) || state.previousExpression.includes('=')) ? '0.' : state.previousDisplay + '.';  
          }
          break;
        case '=':
          if (state.expression && !state.expression.includes('=') && !['/', '.', '⋅'].includes(state.expression[0]) && ![...operatorsDot, '.'].includes(state.expression[state.expression.length - 1])) {  
            state.expression = state.previousExpression + `=${evaluateExpression(state.previousExpression)}`;
            state.display = evaluateExpression(state.previousExpression).toString();
          }
          break;
        default: // number
          state.expression = (state.previousExpression.includes('=') || (state.previousExpression.startsWith('0') && !state.previousExpression.includes('.') && !operatorsDot.includes(state.previousExpression[state.previousExpression.length - 1]))) ? action.payload : state.previousExpression + action.payload;
          state.display = (state.previousExpression.includes('=') || operatorsX.includes(state.previousDisplay) || (state.previousDisplay.startsWith('0') && !state.previousDisplay.includes('.'))) ? action.payload : state.previousDisplay + action.payload;
      }
    }
  }
});

export const displayReducer = displaySlice.reducer;
export const displayActions = displaySlice.actions;