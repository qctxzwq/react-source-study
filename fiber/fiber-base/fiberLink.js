/**
 * 在Fiber中，很多地方都用到链表
 */

class Update {
  constructor(payload, nextUpdate) {
    this.payload = payload
    this.nextUpdate = nextUpdate
  }
}

class UpdateQueue {
  constructor() {
    this.baseState = null // 原状态
    this.firstState = null // 第一个更新状态
    this.lastUpdate = null // 最后一个更新状态
  }
  enqueueUpdate(update) {
    if (this.firstState === null) {
      this.firstState = this.lastUpdate = update
    } else {
      this.lastUpdate.nextUpdate = update
      this.lastUpdate = this.lastUpdate.nextUpdate
    }
  }
  // 1. 获取老状态，遍历链表进行更新
  forceUpdate() {
    let currentState = this.baseState || {}
    let currentUpdate = this.firstState
    while (currentUpdate) {
      let nextState = typeof currentUpdate.payload == "function" ?
        currentUpdate.payload(currentState) :
        currentUpdate.payload
      currentState = { ...currentState, ...nextState } // 使用当前更新得到新的状态
      currentUpdate = currentUpdate.nextUpdate // 找下一个节点
    }
    this.firstState = this.lastUpdate = null // 清空链表
    this.baseState = currentState
    return currentState
  }
}

// 计数器
let queue = new UpdateQueue()
queue.enqueueUpdate(new Update({ name: "zhufeng" }))
queue.enqueueUpdate(new Update({ number: 0 }))
queue.enqueueUpdate(new Update((state) => ({ number: state.number + 1 })))
queue.enqueueUpdate(new Update((state) => ({ number: state.number + 1 })))
queue.forceUpdate()
console.log(queue.baseState);
