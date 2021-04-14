import { ELEMENT_TEXT } from "./constants"
/**
 * 创建元素（虚拟DOM）的方法
 * @param {*} type 元素的类型
 * @param {*} config 配置对象 属性 key ref
 * @param  {array | any} children 所有的子集对象
 */
function createElement(type, config, ...children) {
  delete config._self
  delete config._source // 表示这个元素在哪行哪列
  return {
    type,
    props: {
      ...config, // 做文本节点兼容
      children: children.map(child => {
        return typeof child === "object" ? child : {
          type: ELEMENT_TEXT,
          props: { text: child, children: [] }
        }
      })
    }
  }
}

const React = {
  createElement
}

export default React