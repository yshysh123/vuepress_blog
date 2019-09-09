/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "9d851685dc5ff1a26f20efb9b7dccd5b"
  },
  {
    "url": "about/index.html",
    "revision": "d39bbdcb889e470560d0bd69a24db22b"
  },
  {
    "url": "assets/css/0.styles.f8dab867.css",
    "revision": "ea5875e72caeed92423ab726cf9adcbe"
  },
  {
    "url": "assets/img/home-bg.7b267d7c.jpg",
    "revision": "7b267d7ce30257a197aeeb29f365065b"
  },
  {
    "url": "assets/img/mobx.8dd180e2.png",
    "revision": "8dd180e21ab8be96330ca2ea0f8e507c"
  },
  {
    "url": "assets/img/mulu.2071a4ec.png",
    "revision": "2071a4ecdd6cca837d458296cf96f6c5"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/vue.ee7e8e35.png",
    "revision": "ee7e8e353ea3ca1a853fe933ab9987f0"
  },
  {
    "url": "assets/js/1.0f9dc0b5.js",
    "revision": "b427b830101a81d6b823c2fe9a90a0bb"
  },
  {
    "url": "assets/js/10.1d07dff1.js",
    "revision": "fd4a5533ae13efd7128a8184a0447b4b"
  },
  {
    "url": "assets/js/11.34af9760.js",
    "revision": "1470c27a365ab47a1e26e58906ed3970"
  },
  {
    "url": "assets/js/12.f778fffd.js",
    "revision": "b8ba06f8c24f7a02736de765e211423c"
  },
  {
    "url": "assets/js/13.d9dee8cc.js",
    "revision": "bcc1a7d13250d84007e1b4a56bab8667"
  },
  {
    "url": "assets/js/14.20a6fa44.js",
    "revision": "733b02fbce0e31583ce2298e41e9ba86"
  },
  {
    "url": "assets/js/15.d0d5c198.js",
    "revision": "081d98f1ececb7652d75b5abbe739dec"
  },
  {
    "url": "assets/js/16.09233dbe.js",
    "revision": "7e0a793c53a58e0a491876ebe66cb7b5"
  },
  {
    "url": "assets/js/17.b5f2863c.js",
    "revision": "673ec80bad95701a44d65d35042b637f"
  },
  {
    "url": "assets/js/18.6f772418.js",
    "revision": "175b164561d0c418f1605299d536444d"
  },
  {
    "url": "assets/js/19.0e6d262f.js",
    "revision": "82ff42b161832763d5f2ebefed62328c"
  },
  {
    "url": "assets/js/20.acd4676b.js",
    "revision": "7815564d975b10fd579e8975b65ded20"
  },
  {
    "url": "assets/js/21.36a42e1c.js",
    "revision": "cee1b082d41353c84adb4d8ad6c9a40c"
  },
  {
    "url": "assets/js/22.25f677bb.js",
    "revision": "6269ad6dcd31797574782e8965ff7c33"
  },
  {
    "url": "assets/js/23.524c304e.js",
    "revision": "c7f2ce3dd4204483af2d1a45c85112f5"
  },
  {
    "url": "assets/js/24.0573f9f7.js",
    "revision": "0723e3fa4f475e96f52cf91e692bd8ca"
  },
  {
    "url": "assets/js/25.f57953c8.js",
    "revision": "ce011da4c8f4a503d4e9036060427742"
  },
  {
    "url": "assets/js/26.8627630f.js",
    "revision": "9509a97ffadd264f9a7eac3df17d1f4e"
  },
  {
    "url": "assets/js/27.05624016.js",
    "revision": "a9659f0e7b8b8d55b00bc8f11b4aef5f"
  },
  {
    "url": "assets/js/28.be0075be.js",
    "revision": "630b91a493348b0e218c4a6f3dac3f02"
  },
  {
    "url": "assets/js/29.421ebaa7.js",
    "revision": "43422ddf46bcafd77a579a58c9881d07"
  },
  {
    "url": "assets/js/3.4eb1cce0.js",
    "revision": "f3d5256fa7b0c20ca43f9da4a415a3b7"
  },
  {
    "url": "assets/js/30.0f5fe549.js",
    "revision": "bc27b57c44d41ee106946e4c961bc56f"
  },
  {
    "url": "assets/js/31.cdf55e7b.js",
    "revision": "ed30c5f2629eba189209ea86a330a578"
  },
  {
    "url": "assets/js/4.5a1f06fe.js",
    "revision": "1e2cda159fef2497a1dd0fd663e47c0b"
  },
  {
    "url": "assets/js/5.75cd4566.js",
    "revision": "5a129e502685991321f0a25d91aba436"
  },
  {
    "url": "assets/js/6.a46ab9e6.js",
    "revision": "65f74f1392474ab4e9610328ce4ddf73"
  },
  {
    "url": "assets/js/7.1c184a8d.js",
    "revision": "9c5deab481ae4e658b7bb9949bb311ce"
  },
  {
    "url": "assets/js/8.a87c8361.js",
    "revision": "a3d52727fdc820432c91934889c65136"
  },
  {
    "url": "assets/js/9.b8ae2bd2.js",
    "revision": "d4ebfe3804ea1c486460d3cd3a726faf"
  },
  {
    "url": "assets/js/app.79b65bb8.js",
    "revision": "9891606328a4c7f6046a81ff75bf6856"
  },
  {
    "url": "bg.png",
    "revision": "ba89cc1a737ad9700247c94fe1606fb8"
  },
  {
    "url": "category/index.html",
    "revision": "982255e71a65e5590e1b37a292d85965"
  },
  {
    "url": "category/Nginx 学习笔记.html",
    "revision": "e1ea23d308d4f3444c7b5bf41f64258b"
  },
  {
    "url": "category/React 学习笔记.html",
    "revision": "216687b416a166b44bd47e38cca6c600"
  },
  {
    "url": "index.html",
    "revision": "b77ca8eab7025042df7e1912a540d6a1"
  },
  {
    "url": "Interview/algorithm.html",
    "revision": "bb07bfed77c6e4429be4e8cb44f71ae0"
  },
  {
    "url": "Interview/comparison.html",
    "revision": "c9e700413c5aa8a278565c7531f5bc6b"
  },
  {
    "url": "Interview/DesignPatterns.html",
    "revision": "271cfbe455207d0f72f41ee4b91f006a"
  },
  {
    "url": "Interview/index.html",
    "revision": "326034adb59fbc101cdebec9b15b73aa"
  },
  {
    "url": "Interview/tips.html",
    "revision": "a79fdbbac921958227bd07c9a3a4a5f4"
  },
  {
    "url": "Interview/继承.html",
    "revision": "3966a8d90872b50a7c136b3e4ffba8ba"
  },
  {
    "url": "nginx/index.html",
    "revision": "97221c2b851b3717b9c2b749f04edf88"
  },
  {
    "url": "nginx/nginx介绍.html",
    "revision": "305f2215a64fe38ec70ab18e5ecb668f"
  },
  {
    "url": "nginx/nginx反向代理.html",
    "revision": "b91311416794de9ffaa939770c1ddf7d"
  },
  {
    "url": "nginx/nginx命令.html",
    "revision": "08bf4be73fdae719b915109cbabc5408"
  },
  {
    "url": "nginx/nginx常用配置.html",
    "revision": "79dac118e1270415d785bdfbb519961d"
  },
  {
    "url": "nginx/nginx负载均衡.html",
    "revision": "d22a5de4d781ac49a7536ccec2fe975d"
  },
  {
    "url": "react/classnames.html",
    "revision": "2e58b7d7c29f6b790b0c42450cbb2d97"
  },
  {
    "url": "react/index.html",
    "revision": "9e62931cd3b819654fcb5f30a0504034"
  },
  {
    "url": "react/propTypes.html",
    "revision": "606df0ac48ea9238eb6a8c8d16a33445"
  },
  {
    "url": "react/react_comp.html",
    "revision": "977150680159ab9bf7fd89b6387b2f18"
  },
  {
    "url": "react/react16-hooks.html",
    "revision": "25f1e0e7b489b5747ba5b34a7fb7685e"
  },
  {
    "url": "react/react单元测试.html",
    "revision": "f7b6fbb5df2d8557275c95c528b0c87c"
  },
  {
    "url": "react/react生命周期.html",
    "revision": "435219c0c1bab98f1a38e6a998806adb"
  },
  {
    "url": "tag/algorithm.html",
    "revision": "0165c8098fa42480e4a08eb9f2362937"
  },
  {
    "url": "tag/css.html",
    "revision": "faee022f2d0375d85fd1569ab824e7b1"
  },
  {
    "url": "tag/index.html",
    "revision": "aa0b925522b568f9de0bf69cddc3fe28"
  },
  {
    "url": "tag/interview.html",
    "revision": "036614e1cc2a99b349e2da85a0187091"
  },
  {
    "url": "tag/nginx.html",
    "revision": "32dc4e78110ecbd0324e6bb424f11e50"
  },
  {
    "url": "tag/react.html",
    "revision": "9f8be9e9288d55d511a01ef6fc6e4a81"
  },
  {
    "url": "tag/vue.html",
    "revision": "8078d0f28e72605acf823aab61e5ee2a"
  },
  {
    "url": "tag/vuepress.html",
    "revision": "59f9b3beadcf5cdd4bd84310c013df74"
  },
  {
    "url": "tag/单元测试.html",
    "revision": "5d44df0abecfa69ccf47ebf0a23cde70"
  },
  {
    "url": "vuePress/index.html",
    "revision": "824e933f7e4f1efbff1302da2f5be564"
  },
  {
    "url": "头像.png",
    "revision": "b55736c62a1c3d1f7ba1d27443a52c36"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
