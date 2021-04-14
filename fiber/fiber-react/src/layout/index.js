import React from "react"

class Layout extends React.Component {
  render() {
    return <div>
      <div>标题</div>
      {this.props.children}
    </div>
  }
}

export default Layout