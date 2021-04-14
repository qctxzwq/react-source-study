import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Layout from './layout/index'
import Home from './pages/home'
import About from './pages/about'
import Login from './pages/login.js'
import NoMatch from './pages/noMatch'

class ProRouter extends React.Component {
  render() {
    return <Router exact>
      <Route path="/login" component={Login} />
      <Route path="/" render={() =>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/about" component={About} />
            <Route component={NoMatch} />
          </Switch>
        </Layout>
      } />
    </Router>
  }
}

export default ProRouter