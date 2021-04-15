import React from "react"
import propTypes from "prop-types"

const { Provider, Consumer } = React.createContext('default')

class Context extends React.Component {
  constructor() {
    super()
    this.state = {
      childContext: '123',
      newContext: '456',
    }
  }

  getChildContext() {
    return { value: this.state.childContext }
  }

  render() {
    return <React.Fragment>
      <div>
        <label>childContext:</label>
        <input type="text" value={this.state.childContext}
          onChange={(e) => { this.setState({ childContext: e.target.value }) }} />
      </div>
      <Child2 />
      <div>
        <label>newContext:</label>
        <input type="text" value={this.state.newContext}
          onChange={(e) => { this.setState({ newContext: e.target.value }) }} />
      </div>
      <Provider value={this.state.newContext}>
        <Child1 />
      </Provider>
    </React.Fragment>
  }
}

function Child1() {
  return <Consumer>{value => <p>newContext:{value}</p>}</Consumer>
}

class Child2 extends React.Component {
  render() {
    return <p>childContext:{this.context.value}</p>
  }
}

Child2.contextTypes = {
  value: propTypes.string
}

Context.childContextTypes = {
  value: propTypes.string
}

export default Context