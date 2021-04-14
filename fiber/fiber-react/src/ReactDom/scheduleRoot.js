/**
 * scheduleRoot 从根节点渲染和调度
 * 两个阶段
 * diff阶段 对比新旧的虚拟DOM，进行增量灯芯或创建，render阶段
 * 这个阶段可能比较花时间，可以对我们的任务进行拆分，拆分的维度虚拟DOM
 * commit阶段，进行DOM更新创建阶段，此阶段不能暂停
 */
export function scheduleRoot(rootFiber) {
  console.log(rootFiber);

}