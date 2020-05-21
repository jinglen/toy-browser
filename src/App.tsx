import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home/index'

const App: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={Home} exact />
      </Switch>
    </HashRouter>
  )
}

export default App
