---
title: pwa
sidebar: true
categories:
  - React 学习笔记
date: 2020-07-28
tags:
  - react
---

:::tip
PWA 是 Progressive Web App 的英文缩写， 翻译过来就是渐进式增强 WEB 应用， 是 Google 在 2016 年提出的概念，2017 年落地的 web 技术。目的就是在移动端利用提供的标准化框架，在网页应用中实现和原生应用相近的用户体验的渐进式网页应用。
本文主要讲述如何在 react 项目&& create-react-app 项目中使用 PWA。
:::

<!-- more -->

# PWA 介绍

PWA 并不是单指某一项技术，你更可以把它理解成是一种思想和概念，目的就是对标原生 app，将 Web 网站通过一系列的 Web 技术去优化它，提升其安全性，性能，流畅性，用户体验等各方面指标，最后达到用户就像在用 app 一样的感觉。

PWA 中包含的核心功能及特性如下：

1. Web App Manifest
2. Service Worker
3. Cache API 缓存
4. Push&Notification 推送与通知
5. Background Sync 后台同步
6. 响应式设计

## 安装 PWA 所需依赖

```bash
 yarn add workbox-webpack-plugin -D
```

## workbox-webpack-plugin 介绍

wokbox 是用于向 web 应用程序添加离线支持的 JavaScript 库。

## 项目中使用

### CRA 中使用

因为 CRA 已经默认内置了 workbox-webpack-plugin，但是配置不是我们需要的配置，所以要先将它删除，然后在进行添加我们自己的配置

```javascript
config = removePreWorkboxWebpackPluginConfig(config);
config.plugins.push(workboxWebpackPlugin);

// 此函数用来找出 默认配置中的 WorkboxWebpackPlugin， 并把它删除
function removePreWorkboxWebpackPluginConfig(config) {
  const preWorkboxPluginIndex = config.plugins.findIndex((element) => {
    return Object.getPrototypeOf(element).constructor.name === 'GenerateSW';
  });
  if (preWorkboxPluginIndex !== -1) {
    config.plugins.splice(preWorkboxPluginIndex, 1);
  }
  return config;
}
```

workbox-webpack-plugin 有 2 种使用方法。

### 直接使用 wrokbox 创建的 pwa 文件，每次打包时自动将 workbox 文件重写 service-worker

```javascript
// webpack配置
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const workboxWebpackPlugin = new WorkboxWebpackPlugin.InjectManifest({
  swSrc: path.join(process.cwd(), '/src/sw.js'),
  swDest: 'service-worker.js', // 输出 Service worker 文件
});
// sw.js
importScripts('https://g.alicdn.com/kg/workbox/3.3.0/workbox-sw.js');
workbox.setConfig({
  modulePathPrefix: 'https://g.alicdn.com/kg/workbox/3.3.0/',
});
let currentCacheNames = Object.assign(
  { precacheTemp: workbox.core.cacheNames.precache + '-temp' },
  workbox.core.cacheNames
);

currentCacheNames.cdnLong = 'qiniuCdnLong';
currentCacheNames.cdn = 'qiniucdn';
currentCacheNames.html = 'html';
currentCacheNames.font = 'font';

// 预缓存策略
workbox.precaching.precacheAndRoute(self.__precacheManifest || [], {
  ignoreUrlParametersMatching: [/\./],
  cleanUrls: false,
});

// 对主HTML进行缓存，策略是network优先
workbox.routing.registerRoute(
  new RegExp('/'),
  workbox.strategies.networkFirst({
    cacheName: currentCacheNames.html,
    plugins: [
      // Force Cache
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200], // One or more status codes that a Response can have and be considered cacheable.
      }),
    ],
  })
);
// 长线资源
workbox.routing.registerRoute(
  new RegExp('https://(fp|static).cdn.com/middle'),
  workbox.strategies.cacheFirst({
    cacheName: currentCacheNames.cdnLong,
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10, // 最大的缓存数，超过之后则走 LRU 策略清除最老最少使用缓存
      }),
    ],
  })
);
// 业务线脚本
workbox.routing.registerRoute(
  new RegExp('.*.(?:js|css|png|jpe?g)'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: currentCacheNames.cdn,
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60, // 最大的缓存数，超过之后则走 LRU 策略清除最老最少使用缓存
      }),
    ],
  })
);
// 字体
workbox.routing.registerRoute(
  new RegExp('.*.(?:ttf)'),
  workbox.strategies.cacheFirst({
    cacheName: currentCacheNames.font,
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20, // 最大的缓存数，超过之后则走 LRU 策略清除最老最少使用缓存
      }),
    ],
  })
);

// 添加缓存
self.addEventListener('install', (event) => {
  console.log('install');
  // 跳过 waiting 状态，然后会直接进入 activate 阶段
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      let validCacheSet = new Set(Object.values(currentCacheNames));
      return Promise.all([
        // 更新所有客户端 Service Worker
        self.clients.claim(),
        cacheNames
          .filter(function(cacheName) {
            return !validCacheSet.has(cacheName);
          })
          .map(function(cacheName) {
            console.log('deleting cache', cacheName);
            return caches.delete(cacheName);
          }),
      ]);
    })
  );
});
// 可以在各业务线自己实现sw文件的更新策略
self.addEventListener('message', (event) => {
  const replyPort = event.ports[0];
  const message = event.data;
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self
        .skipWaiting()
        .then(() => replyPort.postMessage({ error: null }))
        .catch((error) => replyPort.postMessage({ error }))
    );
  }
});
```

### 自动创建 service-worker 文件，内部封装，精简参数

```javascript
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
new WorkboxWebpackPlugin.GenerateSW({
  importWorkboxFrom: 'local',
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      // To match cross-origin requests, use a RegExp that matches
      // the start of the origin:
      urlPattern: new RegExp('^https://api'),
      handler: 'staleWhileRevalidate',
      options: {
        // Configure which responses are considered cacheable.
        cacheableResponse: {
          statuses: [200],
        },
      },
    },
    {
      urlPattern: new RegExp('^https://cdn'),
      // Apply a network-first strategy.
      handler: 'networkFirst',
      options: {
        // Fall back to the cache after 2 seconds.
        networkTimeoutSeconds: 2,
        cacheableResponse: {
          statuses: [200],
        },
      },
    },
  ],
});
```

## 入口 PWA 开启

```javascript
// 进行 service-wroker 注册
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const sw = navigator.serviceWorker;
    /**
     * 卸载
     */
    function unRegister() {
      sw.getRegistration('sw').then((registration) => {
        // 手动注销
        registration.unregister();
        // 清除缓存
        window.caches &&
          caches.keys &&
          caches.keys().then((keys) => {
            keys.forEach(function(key) {
              caches.delete(key);
            });
          });
      });
    }
    // 这里可以通过后端接口来进行一个拦截
    navigator.serviceWorker
      .register('./service-wroker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.error('Error during service worker registration:', e);
        unRegister();
      });
  });
}
```

## 数据接口缓存

由上文可以看到，我们对长线 js、静态资源的处理方案是 cacheFirst，对业务线脚本采用的是 staleWhileRevalidate，对 API、HTML 请求采取的是 networkFirst
到此我们已经实现了资源的离线缓存，但是 API 这层我们能不能在进行一层前端统一缓存呢？

### rxjs 修饰符使用

#### merge

特点：merge 把多个 observable 同时处理，这跟 concat 一次处理一个 observable 是完全不一样的，由于是同时处理行为会变得较为复杂。
merge 的逻辑有点像是 OR(||)，就是当两个 observable 其中一个被触发时都可以被处理，这很常用在一个以上的按钮具有部分相同的行为。
同样 既有静态方法，又有实例方法

例：

```javascript
rxjs
  .merge(interval(500).pipe(take(3)), interval(300).pipe(take(6)))
  .subscribe((val) => console.log(val));
// 6 3 6 6 3...
```

### axios 改造

```javascript
public getCatch(url: string, config?: AxiosRequestConfig) {
  let params = config ? this.convertObj(config.params) : ''
  const urlNew = `${url}&${params}`
  return browserGetStringPreference(urlNew, 'noDataDev', 0).pipe(
    map(response => {
      return response !== 'noDataDev' && typeof response === 'string'
        ? JSON.parse(response)
        : response
    })
  )
}

public get<T>(url: string, config?: AxiosRequestConfig) {
  const apiNew = this.subscription(
    this.client.get<T>(url, {
      headers: {
        Authorization: getToken(),
        appVersion: getClientVersion(),
        eventtime: Date.now(),
      },
      ...config,
    }),
    url,
    config
  )
  const getCatch = new Observable<T>(subscriber => {
    this.getCatch(url, config).subscribe(res => {
      if (res === 'noDataDev') {
        subscriber.complete()
      } else {
        subscriber.next(res)
        subscriber.complete()
      }
    })
  })
  return merge(apiNew, getCatch)
}
```

上述代码可以看出，我们从缓存（Native&&localstorge）中读取数据，同时从接口中获取数据，当缓存数据返回后，渲染 DOM，接口数据返回后，去更新缓存。而且由于 merge 操作符的存在，
如果 Native 缓存返回时间大于接口返回时间，我们就会从接口中去读取数据。

<Valine></Valine>
