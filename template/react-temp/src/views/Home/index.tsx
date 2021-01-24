import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';

import { selectUser, initUser, setUser } from '../../store/userSlice';
import logo from '../../logo.svg';

const Home: React.FC = () => {
  const user: any = useSelector(selectUser)
  const dispatch = useDispatch()

  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(initUser())
    setTimeout(() => {
      console.log('useEffect user', user)
    }, 300)
  }, [ dispatch, user ])

  const handleClear = () => {
    dispatch(setUser({}))
  }
  const handleInit = () => {
    dispatch(initUser())
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{t('swap')}</h1>
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
        <div>
          <button onClick={ handleInit }>init</button>
          <button onClick={ handleClear }>clear</button>
          <button onClick={ () => i18n.changeLanguage('en') }>en</button>
          <button onClick={ () => i18n.changeLanguage('zh-CN') }>zh</button>
        </div>
      </header>
    </div>
  );
}

export default Home;
