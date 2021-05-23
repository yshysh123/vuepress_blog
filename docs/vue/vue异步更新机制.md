---
title: vue异步更新机制
sidebar: true
categories:
  - Vue学习汇总
date: 2021-04-12
tags:
  - vue
---

:::tip
vue 异步更新机制
:::

<!-- more -->

# Vue 的异步更新机制是如何实现的？

Vue 的异步更新机制的核心是利用了浏览器的异步任务队列来实现的，首选微任务队列，宏任务队列次之。

当响应式数据更新后，会调用 dep.notify 方法，通知 dep 中收集的 watcher 去执行 update 方法，watcher.update 将 watcher 自己放入一个 watcher 队列（全局的 queue 数组）。

然后通过 nextTick 方法将一个刷新 watcher 队列的方法（flushSchedulerQueue）放入一个全局的 callbacks 数组中。

如果此时浏览器的异步任务队列中没有一个叫 flushCallbacks 的函数，则执行 timerFunc 函数，将 flushCallbacks 函数放入异步任务队列。如果异步任务队列中已经存在 flushCallbacks 函数，等待其执行完成以后再放入下一个 flushCallbacks 函数。

flushCallbacks 函数负责执行 callbacks 数组中的所有 flushSchedulerQueue 函数。

flushSchedulerQueue 函数负责刷新 watcher 队列，即执行 queue 数组中每一个 watcher 的 run 方法，从而进入更新阶段，比如执行组件更新函数或者执行用户 watch 的回调函数。

完整的执行过程其实就是今天源码阅读的过程。

# Vue 的 nextTick API 是如何实现的？

Vue.nextTick 或者 vm.\$nextTick 的原理其实很简单，就做了两件事：

1. 将传递的回调函数用 try catch 包裹然后放入 callbacks 数组
2. 执行 timerFunc 函数，在浏览器的异步任务队列放入一个刷新 callbacks 数组的函数
