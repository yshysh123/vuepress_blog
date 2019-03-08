---
title: classnames
sidebar: true
date: 2019-02-06
categories: React 学习笔记
tags:
  - react
  - css
---

:::tip
classnames 是我们在根据变量判断 class 时常用的类库
:::

<!-- more -->

# classnames

## 安装

```bash
yarn add classnames
```

## 普通使用

```bash
import classNames from 'classNames';

classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'
classNames({ foo: true, bar: false }); // => 'foo'
```

## ES6 中动态使用（UI 组件开发）

```bash
import classNames from 'classNames';

let prefixCls = 'button';
classNames({
  [`${prefixCls}-primary`]: true,
  [`${prefixCls}-warning`]: true,
  [`${prefixCls}-success`]: true,
  [`${prefixCls}-error`]: true,
  [`${prefixCls}-default`]: true,
  [`${prefixCls}-normal`]: true,
  [`${prefixCls}-info`]: true,
  [`${prefixCls}-disabled`]: true,
  [`${prefixCls}-loading`]: true,
});
```

## 在 react 中使用

```bash
import classNames from 'classNames';

render() {
  let prefixCls = 'button';
  const className= classNames(prefixCls, {
    [`${prefixCls}-primary`]: true,
    [`${prefixCls}-warning`]: true,
    [`${prefixCls}-success`]: true,
    [`${prefixCls}-error`]: true,
    [`${prefixCls}-default`]: true,
    [`${prefixCls}-normal`]: true,
    [`${prefixCls}-info`]: true,
    [`${prefixCls}-disabled`]: true,
    [`${prefixCls}-loading`]: true,
  };
  return <button className={className}>Hello World</button>;
}
```

<Valine></Valine>
