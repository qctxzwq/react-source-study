import Component from "../React/component"
import { diff, diffNode } from "./diff"
const ReactDom = {
  render
}

function render(vnode, container, dom) {
  return diff(dom, vnode, container)
}

export function createComponent(component, props) {
  let inst
  if (component.prototype && component.prototype.render) {
    // 类组件，创建实例返回
    inst = new component(props)
  } else {
    // 函数式组件，将之扩展成类组件，方便统一管理
    inst = new Component(props)
    inst.constructor = component
    inst.render = function () {
      return this.constructor(props)
    }
  }
  return inst
}

export function renderComponent(component) {
  let base
  const renderer = component.render() // jsx 对象

  // 生命周期方法
  if (component.base && component.componentWillUpdate) {
    component.componentWillUpdate()
  }

  if (!component.base && component.componentDidMount) {
    component.componentDidMount()
  }

  // base = _render(renderer)
  base = diffNode(component.base, renderer)
  component.base = base

  console.log(component);
  if (component.base) {
    if (component.componentDidUpdate) component.componentDidUpdate()
  } else if (component.componentDidMount) {
    component.componentDidMount()
  }

  // if (component.base && component.base.parentNode) {
  //   component.base.parentNode.replaceChild(base, component.base)
  // }
  component.base = base
}

export function setComponentProps(component, props) {
  // 生命周期方法
  if (!component.base) {
    if (component.componentWillMount) component.componentWillMount()
  } else if (component.componentWillReceiveProps) {
    component.componentWillReceiveProps(props)
  }
  // 设置组件属性
  component.props = props
  // 渲染组件
  renderComponent(component)
}

function _render(vnode) {
  console.log(vnode);

  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') return
  if (typeof vnode === 'number') vnode = String(vnode)
  if (typeof vnode === 'string') {
    const textNode = document.createTextNode(vnode)
    return textNode
  }
  // 如果tag为函数，则渲染组件
  if (typeof vnode.tag === 'function') {
    // 创建组件
    const component = createComponent(vnode.tag, vnode.attrs)
    // 设置组件的属性
    setComponentProps(component, vnode.attrs)
    // 组件渲染的节点对象返回
    return component.base
  }

  const { tag, attrs } = vnode
  const dom = document.createElement(tag)
  if (attrs) {
    Object.keys(attrs).forEach(key => {
      const value = attrs[key]
      setAttribute(dom, key, value)
    })
  }
  // 渲染子节点
  vnode.childrens && vnode.childrens.forEach(child => render(child, dom))
  return dom
}

export function setAttribute(dom, key, value) {
  // 如果属性为类名
  if (key === 'className') key = 'class'
  // 如果属性为事件
  if (/on\w+/.test(key)) {
    key = key.toLowerCase()
    dom[key] = value
  } else if (key === 'style') {
    // 属性为css样式
    if (!value || typeof value === 'string') {
      dom.style.cssText = value || ''
    } else if (value && typeof value === 'object') {
      for (let k in value) {
        if (typeof value[k] === 'number') {
          dom.style[k] = value[k] + 'px'
        } else {
          dom.style[k] = value[k]
        }
      }
    }
  } else {
    // 其他属性
    if (key in dom) {
      dom[key] = value || ''
    }
    if (value) {
      dom.setAttribute(key, value)
    } else {
      dom.removeAttribute(key)
    }
  }
}


export default ReactDom