---
title: React fiber
sidebar: true
categories:
  - React 学习笔记
date: 2021-05-10
tags:
  - react
---

:::tip
react fiber
:::

<!-- more -->

## 为什么 React16 采用 fiber 架构

当需要被渲染的节点很多时，有存在大量的 JS 计算，因为 GUI 渲染线程 和 JS 执行线程 是互斥的，所以在 JS 计算的时候就会停止浏览器界面渲染行为，导致页面感觉卡顿。React 15 版本的 Stack Reconciler 过程是基于树的深度遍历的递归过程（遇到自定义组件就会一直的递归下去，直到最原始的 HTML 标签），Stack Reconciler 的递归一旦进入调用栈就无法中断或暂停，如果当组件嵌套很深或数量极多，在 16ms 内无法完成就势必造成浏览器丢帧导致卡顿。

其解决方案就是将 同步的更新变成可中断的异步更新，但 15 版本架构不支持异步更新，所以 React 团队决定撸起袖子重写，折腾了两年多终于在 2017/3 发布了 V16 版本。

## Fiber Node 结构

```js
function FiberNode(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode
) {
  // Instance
  this.tag = tag; // FiberNode类型，目前总有25种类型，常用的就是FunctionComponent 和 ClassComponent
  this.key = key; //和组件Element中的key一致
  this.elementType = null;
  this.type = null; //Function|String|Symbol|Number|Object
  this.stateNode = null; //FiberRoot|DomElement|ReactComponentInstance等绑定的其他对象

  // Fiber
  this.return = null; // FiberNode|null 父级FiberNode
  this.child = null; // FiberNode|null 第一个子FiberNode
  this.sibling = null; // FiberNode|null 相邻的下一个兄弟节点
  this.index = 0; //当前父fiber中的位置

  this.ref = null; //和组件Element中的ref一致

  this.pendingProps = pendingProps; // Object 新的props
  this.memoizedProps = null; // Object 处理后的新props
  this.updateQueue = null; // UpdateQueue 即将要变更的状态
  this.memoizedState = null; //Object 处理后的新state
  this.dependencies = null;

  this.mode = mode; // number
  // 普通模式，同步渲染，React15-16的生产环境使用
  // 并发模式，异步渲染，React17的生产环境使用
  // 严格模式，用来检测是否存在废弃API，React16-17开发环境使用
  // 性能测试模式，用来检测哪里存在性能问题，React16-17开发环境使用

  // Effects
  this.flags = NoFlags;
  this.subtreeFlags = NoFlags;
  this.deletions = null; // render阶段的diff过程检测到fiber的子节点如果有需要被删除的节点

  this.lanes = NoLanes; //如果fiber.lanes不为空，则说明该fiber节点有更新
  this.childLanes = NoLanes; //判断当前子树是否有更新的重要依据，若有更新，则继续向下构建，否则直接复用已有的fiber树

  this.alternate = null; //FiberNode|null 候补节点，缓存之前的Fiber节点，与双缓存机制相关，后续讲解
}
```

所有 fiber 对象都是 FiberNode 实例，通过 tag 来标识类型。通过 createFiber 初始化 FiberNode 节点，代码如下

```js
const createFiber = function(
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode
): Fiber {
  // $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
  return new FiberNode(tag, pendingProps, key, mode);
};
```

## 协调阶段

### beginWork

1. 执行组件 render，获取返回的 jsx

- 在 class 组件，会执行实例化，处理 state，调用挂载前生命周期钩子等等。最后执行 render，获取返回的 jsx。
- 在 function 组件，会执行组件的构造函数，里面包括了 hooks 的一系列调用，最后获取返回的 jsx。

2. 对返回的 jsx 执行 reconcile（也就是俗称的 diff），记录差异

- 根据 diff 生成当前 fiber 的子节点，并标记上对应的 flag（更新、删除、移动）。
- 这个生成的子节点，会返回出去，赋值给 currentWorkFiber，然后上层函数 workLoopSync 进行下一轮遍历，执行这个新生成的 fiber 节点。

### completeWork

当遍历到叶子节点，会执行 completeWork，对 fiber tree 进行一个回溯，回到这个叶子节点的父节点，在发现有 sibling 兄弟节点时，会将兄弟节点重新赋值给 currentWorkFiber，以便上层 workLoopSync 函数遍历。

1. 生成 dom 节点，并把子孙 dom 节点插入进去。组成一个虚拟 dom 树
2. 处理 props
3. 把所有含有副作用的 fiber 节点用 firstEffect 和 lastEffect 链接起来，组成一个链表，以便在 commit 时去遍历执行。

## 提交阶段

在 completeWork 执行到 root 根节点时，证明所有的工作已经完成，就会执行 commitRoot，它又分为三个阶段：
将上一个阶段计算出来的需要处理的副作用(Effects)(包括需要操作的 dom 更新和需要调用的生命周期钩子)一次性执行了。这个阶段必须同步执行（更准确应为调度），不能被打断。

1. before mutation(执行 dom 操作前)
   调用挂载前的生命周期钩子，比如 getSnapshotBeforeUpdate，调度 useEffect。
2. mutation(执行 dom 操作)
   执行 dom 操作，如果有组件被删除，那么还会调用被删除组件的 componentWilUnmount 或 useLayoutEffect 的销毁函数
3. layout(执行 dom 操作后)
   切换 fiber tree（将 workFiberTree 替换更新前的 currentRenderTree，也就是新节点树替换旧树）
   调用 componentDidUpdate | componentDidMount 或者 useLayoutEffect 的回调函数。
   layout 结束后，执行之前调度的 useEffect 的创建和销毁函数。

总结上文，fiberWorkFn——协调阶段，在 beginWork（深度优先遍历、diff 记录差异）和 completeWork 去交替执行每个 fiber，在 commitRoot 时，我们称之为提交阶段。

## workInProgress 双缓冲机制

如何创建

```js
// This is used to create an alternate fiber to do work on.
export function createWorkInProgress(current: Fiber, pendingProps: any): Fiber {
  let workInProgress = current.alternate;
  if (workInProgress === null) {
    workInProgress = createFiber(
      current.tag,
      pendingProps,
      current.key,
      current.mode
    );
    // 以下两句很关键
    workInProgress.alternate = current;
    current.alternate = workInProgress;
    // do something else ...
  } else {
    // do something else ...
  }
  // do something else ...
  return workInProgress;
}
```

首先 workInProgress 一个 Fiber 节点，当前节点的 alternate 为空时，通过 createFiber 创建，每次状态更新都会产生新的 workInProgress Fiber 树，通过 current 与 workInProgress 的替换完成 dom 更新，简单来说当 workInProgress Tree 内存中构建完成后直接替换 Fiber Tree 的做法，就是刚刚提到的 双缓冲机制。

## 整体流程

1. 第一部分从 用户操作引起 setState 被调用以后，把接收的 React Element 转换为 Fiber 节点，并为其设置优先级，创建 Update，根据 Fiber 的优先级加入到 Update 相应的位置，这部分主要是做一些初始数据的准备。

2. 第二部分主要是三个函数：scheduleWork、requestWork、performWork，即调度工作、申请工作、正式工作三部曲，React 16 新增的异步调度的功能则在这部分实现，这部分就是 Schedule 阶段，完成调度主要靠 scheduleCallbackWithExpriation 这个方法。scheduleCallbackWithExpriation 这个方法在不同环境，实现不一样，chrome 等览器中使用 requestIdleCallback API，没有这个 API 的浏览器中，通过 requestAnimationFrame 模拟一个 requestIdleCallback，任务调度的过程是：在任务队列中选出高优先级的 fiber node 执行，调用 requestIdleCallback 获取所剩时间，若执行时间超过了 deathLine，或者突然插入更高优先级的任务，则执行中断，保存当前结果，修改 tag 标记一下，设置为 pending 状态，迅速收尾并再调用一个 requestIdleCallback，等主线程释放出来再继续。执行到 performWorkOnRoot 时，第二部分结束。

3. 第三部分基本就是 Fiber Reconciler ，分为 2 个阶段:第一阶段 Render/recocilation Phase（协调阶段），遍历所有的 Fiber 节点，通过 Diff 算法计算所有更新工作，产出 EffectList 给到 commit Phase 使用，这部分的核心是 beginWork 函数；然后进入 Commit Phase（提交阶段），这个阶段不能被打断，不再赘述。

## 任务调度的过程

在任务队列中选出高优先级的 fiber node 执行，调用 requestIdleCallback 获取所剩时间，若执行时间超过了 deathLine，或者突然插入更高优先级的任务，则执行中断，保存当前结果，修改 fiber node 的 tag 标记，设置为 pending 状态，迅速收尾并再调用一个 requestIdleCallback，等主线程释放出来再继续恢复任务执行时，检查 tag 是被中断的任务，会接着继续做任务或者重做。

## 总结

react 的组件架构是由一个个 fiber 组成的树组成，他的工作流程就是遍历 fiber tree 去执行每一个工作单元。分为协调阶段(深度遍历并 diff 产生新树、执行 hooks 链表并收集 effect 并链成链表）和提交阶段（处理 effect 链表，执行完毕切换渲染树）。

fiber 有新旧两棵树，一个是 current fiber，是已经渲染在界面上的。一个是 work fiber，由当前的更新触发而在内存中构建的。构建完成，work fiber 就会替换 cur fiber，然后经过提交阶段完成更新，在 dom 操作完成后渲染到界面上。

一个页面就是一个 fiber，这个页面的 child 就是 render 函数中的组件或者 element，都会有他们自己的 sibling,child,return(父级)，如果是 hook 组件会在该 fiber 中的 memoizedState 属性保存它自己的 hooks 链表，在协调阶段通过执行 hooks 链表得到 effect 链表。协调阶段时，requestIdleCallback 在主线程的空闲期执行低优先级的任务，requestAnimationFrame 执行高优先级任务，requestIdleCallback 执行完一个 fiber 的更新后，若下一个任务执行时间超过了 deathLine，或者突然插入更高优先级的任务，则执行中断，保存当前结果，修改 fiber node 的 tag 标记，设置为 pending 状态，恢复任务执行时，检查 tag 是被中断的任务，会接着继续做任务或者重做。当全部完成时进入提交阶段在提交阶段（不能被打断、同步、遍历）执行 effect 链表、调度 Effect、操作 DOM、执行周期函数，完成切换、渲染。
