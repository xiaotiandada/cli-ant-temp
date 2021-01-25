import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'

import { selectUser, selectMode, initUser, setUser, setMode } from '../../store/userSlice';
import logo from '../../logo.svg';


const StyledTitle = styled.h1`
  color: ${({ theme }) => theme.text1};
`
const StyledText = styled.p`
  color: ${({ theme }) => theme.text1};
`


const Home: React.FC = () => {
  const user: any = useSelector(selectUser)
  const storeThemeMode: any = useSelector(selectMode)
  const dispatch = useDispatch()

  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(initUser())
  }, [ dispatch ])


  useEffect(() => {
    setTimeout(() => {
      console.log('useEffect user', user)
    }, 300)
  }, [ user ])

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
        <StyledTitle>{t('swap')}</StyledTitle>
        <StyledText>
          Edit <code>src/App.tsx</code> and save to reload.
        </StyledText>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StyledText>Theme Mode: { storeThemeMode }</StyledText>
        <br/>
        <div>
          <button onClick={ handleInit }>init</button>
          <button onClick={ handleClear }>clear</button>
          <button onClick={ () => i18n.changeLanguage('en') }>en</button>
          <button onClick={ () => i18n.changeLanguage('zh-CN') }>zh</button>
          <button onClick={ () => dispatch(setMode({ mode: 'defaultMode' })) }>Default Mode</button>
          <button onClick={ () => dispatch(setMode({ mode: 'darkMode' })) }>Dark Mode</button>
        </div>
      </header>
    </div>
  );
}

export default Home;
