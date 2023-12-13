// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

export const App = () => {
  const [count, setCount] = useState(0) // [stateVariable, setterFunction]

  const handleBtnClick = () => {
    setCount(count + 1)
    console.log(count)
  }

    return (
      <>
        <h1>Hello!</h1>
        <div>This is amazing!</div>
        <button onClick={handleBtnClick} className='btn-secondary'>
          Click Me!
        </button>
        <div>Count: {count}</div>
      </>
    )
  }

export default App;



/*{ (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>) }*/