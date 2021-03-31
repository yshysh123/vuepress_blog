---
title: 小技巧
sidebar: true
date: 2021-03-15
categories:
  - 面试题汇总
tags:
  - browser
  - interview
---

:::tip
记录一些平时面试过程中的错题
:::

<!-- more -->

# this

```js
function Person(name) {
  this.name = name;
  this.getName = () => this.name;
}
const cat = new Person('jing');
console.log(cat.getName()); //jing
const { getName } = cat;
console.log(getName()); //jing
```
