import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'
import Home from './pages/Home/index'

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Home></Home>
				</Route>
			</Switch>
		</Router>
	)
}

export default App
