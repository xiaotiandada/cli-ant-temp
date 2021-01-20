import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { selectUser, initUser, setUser } from '../../store/userSlice';
import logo from '../../logo.svg';

const Home: React.FC = () => {
  const user: any = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
    setTimeout(() => {
      console.log('useEffect user', user)
    }, 300)
  }, [ dispatch, user ])

  const handleClear = () => {
    dispatch(setUser({}))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br/>
        <button onClick={ handleClear }>clear</button>
      </header>
    </div>
  );
}

export default Home;
