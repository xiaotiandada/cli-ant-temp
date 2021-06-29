import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';
import Account from './views/Account';
import Nav from './components/Nav'

function App() {
  return (
    <>
      <Nav></Nav>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Account></Account>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
