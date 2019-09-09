---
title: React Hooks
sidebar: true
categories: 
  - React 学习笔记
date: 2019-02-06
tags:
  - react
---

:::tip
React16.7 以后，将全面支持 react Hooks 来在函数组件中使用状态及部分生命周期功能
:::

<!-- more -->

# React Hooks

## Hook 是一项新功能提案，可让您在不编写类的情况下使用状态和其他 React 功能。

### useState

```bash
import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### useEffect

```bash
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
```

<Valine></Valine>
