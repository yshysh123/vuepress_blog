---
title: vue初始化
sidebar: true
categories:
  - Vue学习汇总
date: 2021-04-12
tags:
  - vue
---

:::tip
Vue init 的时候都发生了什么
:::

<!-- more -->

1. 处理组件配置项

2. 初始化组件实例的关系属性，比如 $parent、$children、$root、$refs 等

3. 处理自定义事件

4. 调用 beforeCreate 钩子函数

5. 初始化组件的 inject 配置项，得到 ret[key] = val 形式的配置对象，然后对该配置对象进行响应式处理，并代理每个 key 到 vm 实例上

6. 数据响应式，处理 props、methods、data、computed、watch 等选项

7. 解析组件配置项上的 provide 对象，将其挂载到 vm.\_provided 属性上

8. 调用 created 钩子函数

9. 如果发现配置项上有 el 选项，则自动调用 $mount 方法，也就是说有了 el 选项，就不需要再手动调用 $mount 方法，反之，没提供 el 选项则必须调用 \$mount

10. 接下来则进入挂载阶段
