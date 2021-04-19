import React from "react"

class Input extends React.Component {
  state = {
    name: "jokcy"
  }
  handleChange = e => {
    this.setState({
      name: e.target.value
    })
  }
  render() {
    return <div>
      <input type="text" onChange={this.handleChange} value={this.state.name} />
    </div>
  }
}

class List extends React.Component {
  state = {
    a: 2,
    b: 3,
    c: 4
  }
  handleClick = () => {
    this.setState(oldState => {
      console.log(oldState);
      const { a, b, c } = oldState
      return {
        a: a * a,
        b: b * b,
        c: c * c
      }
    })
  }
  render() {
    const { a, b, c } = this.state
    return [
      <div key="a">{a}</div>,
      <div key="b">{b}</div>,
      <div key="c">{c}</div>,
      <button key="button" onClick={this.handleClick}>
        click me
      </button>
    ]
  }
}

class DOMRender extends React.Component {
  render() {
    return <div>
      <Input />
      <List />
    </div>
  }
}

export default DOMRender