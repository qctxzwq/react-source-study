import { TAG_ROOT } from "../constants/index"
import { scheduleRoot } from "./scheduleRoot"
/**
 * render 把元素渲染到容器内部
 */
function render(element, container) {
  console.log(element);

  let rootFiber = {
    tag: TAG_ROOT, // 每一个fiber会有一个tag标识 此元素的类型
    stateNode: container, // 一般情况下，如果这个怨怒是原生节点，stateNode会指向真是的DOM元素
    // children是一个数组，值为虚拟DOM，而不是fiber
    props: { children: [element] } // 这个fiber的属性对象，放的是里面要渲染的元素
  }
  scheduleRoot(rootFiber)
}

const ReactDOM = {
  render
}

export default ReactDOM