/**
 * 1. 从顶点开始遍历
 * 2. 如果有子节点，先遍历第一个子节点 （深度优先遍历）
 */
let rootFiber = require("./element.js")
let nextUnitOfWork = null

function sleep(delay) {
  for (let t = Date.now(); Date.now() - t <= delay;) { }
}

function workLoop() {
  while (nextUnitOfWork) { // 如果有待执行的单元，则执行，并返回下一个可执行单元
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }
  if (!nextUnitOfWork) {
    console.log("render 阶段结束了");
  } else {
    requestIdleCallback(workLoop, { timeout: 1000 })
  }
}

function performUnitOfWork(fiber) {
  // console.log(fiber);

  beginWork(fiber) // 处理此fiber
  // 如果有子节点
  if (fiber.child) return fiber.child
  while (fiber) {
    completeUnitOfWork(fiber)
    if (fiber.sibling) return fiber.sibling
    fiber = fiber.return
  }
}

function completeUnitOfWork(fiber) {
  console.log("结束：", fiber.key);
}

function beginWork(fiber) {
  sleep(20)
  console.log("开始：", fiber.key);
}

nextUnitOfWork = rootFiber
workLoop()







// 排序
function sort(arr) {
  if (arr.length == 0) return []
  let left = []
  let right = []
  let privt = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < privt) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return sort(left).concat(privt, sort(right))
}

// console.log(sort([1, 6, 2, 4, 9, 3, 12, 54, 1]))