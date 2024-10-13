import './styles/App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { displayActions, operatorsX } from './displaySlice.js';

const limiter = 'DIGIT LIMIT MET';

const App = () => {
  const dispatch = useDispatch();
  const expression = useSelector((state) => state.expression);
  const display = useSelector((state) => state.display);

  const handleClick = (event) => {
    if (display !== limiter) {
      if (display.length < 21) {  
        dispatch(displayActions.setExpressionAndDisplay(event.target.textContent));
      } else {
        const previousDisplay = display;
        dispatch(displayActions.setDisplay(limiter));;
        setTimeout(() => {
          dispatch(displayActions.setDisplay(previousDisplay));
        }, 1000);
      }
    }
  }

  return (
    <div className='calculator'>
      <div className='expression'>{expression}</div>
      <div id='display'>{display}</div>
      <div className='keys'>
        <div id='clear' className='key' onClick={handleClick}>AC</div>
        <div id='divide' className='key operator' onClick={handleClick}>{operatorsX[0]}</div>
        <div id='multiply' className='key operator' onClick={handleClick}>{operatorsX[1]}</div>
        
        <div id='seven' className='key number' onClick={handleClick}>7</div>
        <div id='eight' className='key number' onClick={handleClick}>8</div>
        <div id='nine' className='key number' onClick={handleClick}>9</div>
        <div id='subtract' className='key operator' onClick={handleClick}>{operatorsX[2]}</div>
        
        <div id='four' className='key number' onClick={handleClick}>4</div>
        <div id='five' className='key number' onClick={handleClick}>5</div>
        <div id='six' className='key number' onClick={handleClick}>6</div>
        <div id='add' className='key operator' onClick={handleClick}>{operatorsX[3]}</div>
        
        <div id='one' className='key number' onClick={handleClick}>1</div>
        <div id='two' className='key number' onClick={handleClick}>2</div>
        <div id='three' className='key number' onClick={handleClick}>3</div>
        <div id='equals' className='key' onClick={handleClick}>=</div>
        
        <div id='zero' className='key number' onClick={handleClick}>0</div>
        <div id='decimal' className='key number' onClick={handleClick}>.</div>
      </div>
    </div>
  )
}

export default App;
