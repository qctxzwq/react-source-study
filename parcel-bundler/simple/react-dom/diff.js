import { setAttribute, setComponentProps, createComponent } from "./index"
export function diff(dom, vnode, container) {
  // 对比节点的变化
  const ret = diffNode(dom, vnode)
  if (container) {
    container.appendChild(ret)
  }
  return ret
}
export function diffNode(dom, vnode) {
  let out = dom
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') return
  if (typeof vnode === 'number') vnode = String(vnode)
  if (typeof vnode === 'string') {
    if (dom && dom.nodeType === 3) {
      if (dom.textContent !== vnode) {
        // 更新文本内容
        dom.textContent = vnode
      }
    } else {
      out = document.createTextNode(vnode)
      if (dom && dom.parentNode) {
        dom.parentNode.replaceNode(out, dom)
      }
    }
    return out
  }
  if (typeof vnode.tag === 'function') {
    return diffComponent(out, vnode)
  }
  // 非文本DOM节点
  if (!dom) {
    out = document.createElement(vnode.tag)
  }

  if ((vnode.childrens && vnode.childrens.length > 0) || (out.childNodes && out.childNodes.length > 0)) {
    diffChildren(out, vnode.childrens)
  }
  diffAttribute(out, vnode)
  return out
}

function diffComponent(dom, vnode) {

  let component = dom
  // 如果组件没有变化，重新设置props
  if (component && component.constructor === vnode.tag) {
    // 重新设置props
    setComponentProps(component, vnode.attrs)
    // 复制
    dom = component.base
  } else {
    // 组件发生变化
    if (component) {
      // 先移除旧的组件
      unmountComponent(component)
      component = null
    }
    // 创建新的组件
    component = createComponent(vnode.tag, vnode.attrs)
    // 设置组件属性
    setComponentProps(component, vnode.attrs)
    // 给当前组件挂在base
    dom = component.base
  }
  return dom
}

function unmountComponent(component) {
  removeNode(component.base)
}

function removeNode(dom) {
  if (dom && dom.parentNode) {
    dom.parentNode.removeNode(dom)
  }
}

function diffChildren(dom, vchildren) {
  const domChildren = dom.childNodes;
  const children = []
  const keyed = {}
  if (domChildren.length > 0) {
    domChildren.forEach(item => {
      // 获取key
      const key = item.key;
      if (key) {
        // 如果key存在,保存到对象中
        keyed[key] = item;
      } else {
        // 如果key不存在,保存到数组中
        children.push(item)
      }
    })
  }
  
  if (vchildren && vchildren.length > 0) {
    let min = 0
    let childrenLen = children.length
    vchildren.forEach((vchild, i) => {
      const {key} = vchild
      let child
      if (key) {
        if (keyed[key]) {
          child = keyed[key]
          keyed[key] = undefined
        }
      } else if (childrenLen > min) {
        // 如果没有key，则优先找类型相同的节点
        for (let j = min; j < childrenLen; j++) {
          let c = children[j]
          if (c) {
            child = c
            children[j] = undefined
            if (j === childrenLen - 1) childrenLen--
            if (j === min) min++
            break
          }
        }
      }

      // 对比
      child = diffNode(child, vchild)
      const f = domChildren[i]

      if (child && child !== dom && child !== f) {
        if (!f) {
          dom.appendChild(child)
        } else if (child === f.nextSibling) {
          removeNode(f)
        } else {
          dom.insertBefore(child, f)
        }
      }
    })
  }
}

function diffAttribute(dom, vnode) {
  const oldAttrs = {}
  const newAttrs = vnode.attrs
  const domAttrs = dom.attributes
  for (let key in domAttrs) {
    oldAttrs[key] = domAttrs[key]
  }

  // 比较新旧属性
  // 新旧属性对比，不在新的属性中，则删除
  for (let key in oldAttrs) {
    if (!(key in newAttrs)) {
      setAttribute(dom, key, undefined)
    }
  }

  // 新旧属性都有值，则更新值
  for (let key in newAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      setAttribute(dom, key, newAttrs[key])
    }
  }
}