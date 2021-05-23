---
title: vue响应式原理
sidebar: true
categories:
  - Vue学习汇总
date: 2021-04-12
tags:
  - vue
---

:::tip
Vue 的响应式原理
:::

<!-- more -->

# Vue 响应式原理是怎么实现的？

回答：

- 响应式的核心是通过 Object.defineProperty 拦截对数据的访问和设置

- 响应式的数据分为两类：
  - 对象，循环遍历对象的所有属性，为每个属性设置 getter、setter，以达到拦截访问和设置的目的，如果属性值依旧为对象，则递归为属性值上的每个 key 设置 getter、setter
    - 访问数据时（obj.key)进行依赖收集，在 dep 中存储相关的 watcher
    - 设置数据时由 dep 通知相关的 watcher 去更新
  - 数组，增强数组的那 7 个可以更改自身的原型方法，然后拦截对这些方法的操作
    - 添加新数据时进行响应式处理，然后由 dep 通知 watcher 去更新
    - 删除数据时，也要由 dep 通知 watcher 去更新

# methods、computed 和 watch 有什么区别？

## 使用场景

- methods 一般用于封装一些较为复杂的处理逻辑（同步、异步）
- computed 一般用于封装一些简单的同步逻辑，将经过处理的数据返回，然后显示在模版中，以减轻模版的重量
- watch 一般用于当需要在数据变化时执行异步或开销较大的操作

## 区别

### methods VS computed

如果在一次渲染中，有多个地方使用了同一个 methods 或 computed 属性，methods 会被执行多次，而 computed 的回调函数则只会被执行一次。

通过阅读源码我们知道，在一次渲染中，多次访问 computedProperty，只会在第一次执行 computed 属性的回调函数，后续的其它访问，则直接使用第一次的执行结果（watcher.value），而这一切的实现原理则是通过对 watcher.dirty 属性的控制实现的。而 methods，每一次的访问则是简单的方法调用（this.xxMethods）。

### computed VS watch

通过阅读源码我们知道，computed 和 watch 的本质是一样的，内部都是通过 Watcher 来实现的，其实没什么区别，非要说区别的化就两点：1、使用场景上的区别，2、computed 默认是懒执行的，切不可更改。

### methods VS watch

methods 和 watch 之间其实没什么可比的，完全是两个东西，不过在使用上可以把 watch 中一些逻辑抽到 methods 中，提高代码的可读性。
