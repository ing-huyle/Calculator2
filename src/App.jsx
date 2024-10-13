import './styles/App.scss';
import { useState } from 'react';

const App = () => {
  const operatorsX = ['/', 'x', '-', '+'];
  const operatorsDot = ['/', '⋅', '-', '+'];
  const [expression, setExpression] = useState('');
  const [display, setDisplay] = useState('0');

  const handleClickAC = () => {
    setExpression('');
    setDisplay('0');
  }

  const handleClickOperator = (event) => {
    const operator = event.target.textContent;
    const formatOperator = (operator) => operator === 'x' ? '⋅' : operator;

    setExpression((prev) => {
      if (prev.includes('=')) {
        prev = prev.slice(prev.indexOf('=') + 1);
      }

      const lastChar = prev.slice(-1);
      const secondLastChar = prev.slice(-2, -1);

      if ([...operatorsDot, '.'].includes(lastChar)) {
        if (operator === '-' && !isNaN(secondLastChar) && (operatorsDot.includes(lastChar))) {
          return prev + formatOperator(operator);
        } else if (operator === '-' && lastChar === '-') {
          return prev;
        } else if (isNaN(secondLastChar)) {
          return prev.slice(0, -2) + formatOperator(operator);
        }
        return prev.slice(0, -1) + formatOperator(operator);
      }
    
      return prev + formatOperator(operator);
    });

    setDisplay(operator);
  }

  const handleClickNumber = (event) => {
    const number = event.target.textContent;
    const limiter = 'DIGIT LIMIT MET';

    if (display !== limiter) {
      if (display.length < 22) {
        setExpression((prev) => (prev.includes('=') || (prev.startsWith('0') && !prev.includes('.') && !operatorsDot.includes(prev[prev.length - 1]))) ? number : prev + number);
        setDisplay((prev) => (expression.includes('=') || operatorsX.includes(prev) || (prev.startsWith('0') && !prev.includes('.'))) ? number : prev + number);
      } else {
        const previousDisplay = display;
        setDisplay(limiter);
        setTimeout(() => setDisplay(previousDisplay), 1000);
      }
    }
  };

  const handleClickDecimal = () => {
    if (!display.includes('.')) {
      setExpression((prev) => expression.includes('=') ? '0.' : ((prev === '' || operatorsX.includes(display)) ? prev + '0.' : prev + '.'));
      setDisplay((prev) => (operatorsX.includes(prev) || expression.includes('=')) ? '0.' : prev + '.');
    }
  };

  const handleClickEquals = () => {
    const evaluateExpression = (expression) => {
      return new Function(`return ${expression.replace(/--/, '-').replace(/⋅/, '*')}`)();
    };

    if (expression && !expression.includes('=') && !['/', '.', '⋅'].includes(expression[0]) && ![...operatorsDot, '.'].includes(expression[expression.length - 1])) {
      setExpression((prev) => prev + `=${evaluateExpression(prev)}`);
      setDisplay(evaluateExpression(expression).toString());
    }
  }

  return (
    <div className='calculator'>
      <div className='expression'>{expression}</div>
      <div id='display'>{display}</div>
      <div className='keys'>
        <div id='clear' className='key' onClick={handleClickAC}>AC</div>
        <div id='divide' className='key operator' onClick={handleClickOperator}>{operatorsX[0]}</div>
        <div id='multiply' className='key operator' onClick={handleClickOperator}>{operatorsX[1]}</div>
        
        <div id='seven' className='key number' onClick={handleClickNumber}>7</div>
        <div id='eight' className='key number' onClick={handleClickNumber}>8</div>
        <div id='nine' className='key number' onClick={handleClickNumber}>9</div>
        <div id='subtract' className='key operator' onClick={handleClickOperator}>{operatorsX[2]}</div>
        
        <div id='four' className='key number' onClick={handleClickNumber}>4</div>
        <div id='five' className='key number' onClick={handleClickNumber}>5</div>
        <div id='six' className='key number' onClick={handleClickNumber}>6</div>
        <div id='add' className='key operator' onClick={handleClickOperator}>{operatorsX[3]}</div>
        
        <div id='one' className='key number' onClick={handleClickNumber}>1</div>
        <div id='two' className='key number' onClick={handleClickNumber}>2</div>
        <div id='three' className='key number' onClick={handleClickNumber}>3</div>
        <div id='equals' className='key' onClick={handleClickEquals}>=</div>
        
        <div id='zero' className='key number' onClick={handleClickNumber}>0</div>
        <div id='decimal' className='key number' onClick={handleClickDecimal}>.</div>
      </div>
    </div>
  )
}

export default App;
