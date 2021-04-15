import React from "react"


const TargetComponent = React.forwardRef((props, ref) => (
  <input type="text" ref={ref} />
))

class ForwardRef extends React.Component {
  constructor() {
    super()
    this.ref = React.createRef()
  }
  componentDidMount(){
    this.ref.current.value = "ref get value"
  }
  render() {
    return <div>
      <TargetComponent ref={this.ref} />
    </div>
  }
}

export default ForwardRef