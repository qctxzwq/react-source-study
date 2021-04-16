import React from "react"
import "../index.css"
import "./index.css"

import { withRouter } from 'react-router-dom'

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <div className="layout">
      <div className="slide">
      <div className="item" onClick={() => {
          this.props.history.push("/children")
        }}>Children</div>
      <div className="item" onClick={() => {
          this.props.history.push("/hooks")
        }}>Hooks</div>
        <div className="item" onClick={() => {
          this.props.history.push("/suspense")
        }}>Suspense</div>
        <div className="item" onClick={() => {
          this.props.history.push("/concurrentMode")
        }}>ConcurrentMode</div>
        <div className="item" onClick={() => {
          this.props.history.push("/forwardRef")
        }}>ForwardRef</div>
        <div className="item" onClick={() => {
          this.props.history.push("/context")
        }}>Context</div>
        <div className="item" onClick={() => {
          this.props.history.push("/Home")
        }}>Home</div>
        <div className="item" onClick={() => {
          this.props.history.push("/About")
        }}>About</div>
        <div className="item" onClick={() => {
          this.props.history.push("/login")
        }}>Login</div>
      </div>
      <div className="board">
        <div className="header">
          header
        </div>
        <div className="child">
          {this.props.children}
        </div>
      </div>
    </div>
  }
}

export default withRouter(Layout)