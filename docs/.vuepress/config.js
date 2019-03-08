module.exports = {
  theme: "reco",
  title: "yush的博客",
  description: "网站描述",
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }], // 增加一个自定义的 favicon(网页标签的图标)
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  base: "/", // 这是部署到github相关的配置 下面会讲
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    author: "yush",
    lastUpdated: "Last Updated",
    serviceWorker: {
      updatePopup: true // Boolean | Object, 默认值是 undefined.
      // 如果设置为 true, 默认的文本配置将是:
      // updatePopup: {
      //    message: "New content is available.",
      //    buttonText: "Refresh"
      // }
    },
    sidebar: {
      "/react/": [
        {
          title: "React学习总结",
          collapsable: true,
          children: [
            "classnames",
            "propTypes",
            "react16-hooks",
            "react生命周期",
            "react_comp"
          ]
        }
      ],
      "/Interview/": [
        {
          title: "面试题汇总",
          collapsable: true,
          children: [
            "algorithm",
            "comparison",
            "DesignPatterns",
            "tips",
            "继承"
          ]
        }
      ]
    },
    nav: [
      { text: "Home", link: "/", icon: "reco-home" },
      { text: "Tags", link: "/tags/", icon: "reco-tag" },
      {
        text: "博文",
        icon: "reco-up",
        items: [
          {
            text: "React学习汇总",
            link: "/react/"
          },
          {
            text: "使用 GitHub Pages 和 VuePress 搭建网站",
            link: "/vuePress/"
          },
          {
            text: "面试题汇总",
            link: "/Interview/"
          }
        ]
      },
      {
        text: "关于",
        icon: "reco-account",
        link: "/about/"
      },
      {
        text: "GitHub",
        icon: "reco-github",
        link: "https://github.com/yshysh123"
      }
    ]
  },
  plugins: ["@vuepress/back-to-top"]
};
