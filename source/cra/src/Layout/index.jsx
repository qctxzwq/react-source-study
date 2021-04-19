import React from "react"
import { Menu } from 'antd';
import "../index.css"
import "./index.css"

import { withRouter } from 'react-router-dom'

const { SubMenu, Item } = Menu;

class Layout extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     react: false
  //   }
  // }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.log(error, errorInfo);
  }

  render() {
    return <div className="layout">
      <div className="slide">
        <Menu
          defaultSelectedKeys={['domrender']}
          defaultOpenKeys={['reactdom']}
          mode="inline"
          onClick={(key) => { this.props.history.push("/" + key.key) }}
        >
          <SubMenu key="react1" title="react1">
            <Item key="children">children</Item>
            <Item key="hooks">hooks</Item>
            <Item key="suspense">suspense</Item>
            <Item key="concurrentMode">concurrentMode</Item>
            <Item key="forwardRef">forwardRef</Item>
            <Item key="context">context</Item>
            <Item key="Home">Home</Item>
            <Item key="About">concurrentMode</Item>
            <Item key="login">login</Item>
          </SubMenu>
          <SubMenu key="reactdom" title="reactdom">
            <Item key="domrender">domrender</Item>
            <Item key="6">6</Item>
            <Item key="7">7</Item>
            <Item key="8">8</Item>
          </SubMenu>
        </Menu>
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