/**
 * 1. 为什么需要fiber
 * 2. fiber代码
 * 3. 这种遍历是递归调用，执行栈会越来越深，且不可中断，中断恢复会特别困难
 */

let root = {
  key: "A1",
  children: [
    {
      key: "B1",
      children: [
        { key: "C1", children: [] },
        { key: "C2", children: [] }
      ]
    },
    {
      key: "B2",
      children: []
    }
  ]
}
function walk(vdom) {
  doWork(vdom)
  // 深度优先遍历
  vdom.children.forEach(child => {
    walk(child)
  });
}

function doWork(vdom) {
  console.log(vdom.key);
}

walk(root)
