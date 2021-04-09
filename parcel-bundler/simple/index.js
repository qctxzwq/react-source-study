import React from "./React"
import ReactDom from "./react-dom"
// const ele = (
//   <div className="active" title="123">
//     hello, <span>React</span>
//   </div>
// )

// function Home() {
//   return <div>这是一个Home组件</div>
// }

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 0
    }
  }
  componentWillMount(){
    console.log("将要挂载");
  }
  componentWillUpdate(){
    console.log("将要更新");
  }
  componentDidMount() {
    console.log("组件加载完成");
    for (let i = 0; i < 100; i++) {
      this.setState((prevState) => {
        return {
          num:prevState.num+1
        }
      })
    }
  }
  handleClick() {
    this.setState({
      num: this.state.num + 1
    })
  }
  render() {
    return (
      <div>
        {this.state.num}
        <button onClick={this.handleClick.bind(this)}>点</button>
      </div>
    )
  }
}
// console.log(<Home />);
{/* <Home name={"zhangsan"} /> */ }
ReactDom.render(<Home name={"zhangsan"} />, document.querySelector("#root"))
