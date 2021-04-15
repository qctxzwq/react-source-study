import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Layout from './Layout/index'
import Home from './pages/home'
import About from './pages/about'
import ForwardRef from './pages/forwardRef'
import Context from './pages/context'
import NoMatch from './pages/noMatch'
import ConcurrentMode from './pages/concurrentmode'


class ProRouter extends React.Component {
  render() {
    return <Router exact>
      <Route path="/" render={() =>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/forwardRef" component={ForwardRef} />
            <Route exact path="/context" component={Context} />
            <Route exact path="/concurrentMode" component={ConcurrentMode} />
            <Route component={NoMatch} />
          </Switch>
        </Layout>
      } />
    </Router>
  }
}

export default ProRouter