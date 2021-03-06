module.exports = {
  title: 'yush的博客',
  base: '/',
  description: "don't fear the unknown",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    // 更多配置可以参考 https://github.com/vuejs/vuepress/blob/master/packages/docs/docs/.vuepress/config.js
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
  ],
  theme: 'reco',
  themeConfig: {
    type: 'blog',
    nav: [
      { text: 'Home', link: '/', icon: 'reco-home' },
      {
        text: '博文',
        icon: 'reco-up',
        items: [
          {
            text: 'JS平时记录',
            link: '/jsdoc/',
          },
          {
            text: 'React学习汇总',
            link: '/react/',
          },
          {
            text: 'Vue学习汇总',
            link: '/vue/',
          },
          {
            text: 'Nginx学习汇总',
            link: '/nginx/',
          },
          {
            text: '使用 GitHub Pages 和 VuePress 搭建网站',
            link: '/blogs/vuePress/',
          },
          {
            text: '面试题汇总',
            link: '/interview/',
          },
          {
            text: '算法&数据结构',
            link: '/algorithm/',
          },
        ],
      },
      {
        text: '关于',
        icon: 'reco-account',
        link: '/about/',
      },
      {
        text: 'GitHub',
        icon: 'reco-github',
        link: 'https://github.com/yshysh123',
      },
    ],
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '分类', // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '标签', // 默认 “标签”
      },
    },
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    sidebar: {
      '/react/': [
        {
          title: 'react学习汇总',
          collapsable: false,
          children: [
            { title: 'classnames', path: '/react/classnames' },
            { title: 'propTypes', path: '/react/propTypes' },
            { title: 'react_comp', path: '/react/react_comp' },
            { title: 'react16-hooks', path: '/react/react16-hooks' },
            { title: '单元测试', path: '/react/单元测试' },
            { title: 'react生命周期', path: '/react/react生命周期' },
            { title: 'pwa', path: '/react/pwa' },
            { title: 'fiber', path: '/react/fiber' },
          ],
        },
      ],
      '/vue/': [
        {
          title: 'vue学习汇总',
          collapsable: false,
          children: [
            { title: 'vue初始化', path: '/vue/vue初始化' },
            { title: 'vue全局api', path: '/vue/vue全局api' },
            { title: 'vue响应式原理', path: '/vue/vue响应式原理' },
            { title: 'vue异步更新机制', path: '/vue/vue异步更新机制' },
            { title: 'vue实例方法', path: '/vue/vue实例方法' },
          ],
        },
      ],
      '/nginx/': [
        {
          title: 'nginx学习汇总',
          collapsable: false,
          children: [
            { title: 'nginx介绍', path: '/nginx/nginx介绍' },
            { title: 'nginx常用配置', path: '/nginx/nginx常用配置' },
            { title: 'nginx反向代理', path: '/nginx/nginx反向代理' },
            { title: 'nginx负载均衡', path: '/nginx/nginx负载均衡' },
            { title: 'nginx命令', path: '/nginx/nginx命令' },
          ],
        },
      ],
      '/Interview/': [
        {
          title: '面试题汇总',
          collapsable: false,
          children: [
            { title: '继承', path: '/Interview/继承' },
            { title: 'algorithm', path: '/Interview/algorithm' },
            { title: 'comparison', path: '/Interview/comparison' },
            { title: 'DesignPatterns', path: '/Interview/DesignPatterns' },
            { title: 'tips', path: '/Interview/tips' },
          ],
        },
      ],
      '/algorithm/': [
        {
          title: '算法',
          collapsable: false,
          children: [
            { title: '动态规划', path: '/algorithm/动态规划' },
            { title: '链表', path: '/algorithm/链表' },
            { title: '树', path: '/algorithm/树' },
            { title: '数组', path: '/algorithm/数组' },
            { title: '贪心', path: '/algorithm/贪心' },
            { title: '字符串', path: '/algorithm/字符串' },
          ],
        },
      ],
      '/dataStructure/': [
        {
          title: '数据结构',
          collapsable: false,
          children: [{ title: '栈', path: '/dataStructure/栈' }],
        },
      ],
      '/jsdoc/': [
        {
          title: 'JS常用技巧',
          collapsable: false,
          children: [{ title: 'ast介绍', path: '/jsdoc/ast' }],
        },
      ],
      '/learn/': [
        {
          title: '每日一学',
          collapsable: false,
          children: [
            { title: '2020-10-12', path: '/learn/2020-10-12' },
            { title: '2020-10-14', path: '/learn/2020-10-14' },
            { title: '2020-10-20', path: '/learn/2020-10-20' },
            { title: '2020-10-23', path: '/learn/2020-10-23' },
            { title: '2020-10-26', path: '/learn/2020-10-26' },
            { title: '2020-11-03', path: '/learn/2020-11-03' },
            { title: '2020-11-09', path: '/learn/2020-11-09' },
          ],
        },
      ],
    },
    // 最后更新时间
    lastUpdated: '上次更新时间',
    date_format: 'yyyy-MM-dd HH:mm:ss',
    // 作者
    author: 'yush',
    // 备案号
    // record: 'xxx',
    // 项目开始时间
    startYear: '2019',
    /**
     * 密钥 (if your blog is private)
     */

    // keyPage: {
    //   keys: ['your password'],
    //   color: '#42b983',
    //   lineColor: '#42b983'
    // },

    /**
     * valine 设置 (if you need valine comment )
     */

    valineConfig: {
      appId: 'wMbg0hd0AjbWzLTsrsUS8xnC-gzGzoHsz', // your appId
      appKey: '9thlnLH4eo1g0A44fMEgBLm5', // your appKey
      placeholder: 'ヾﾉ≧∀≦)o来啊，我们一起嘤嘤嘤！！！',
    },
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: [
    [
      '@vuepress/pwa',
      {
        popupComponent: 'MySWUpdatePopup',
        undatePopup: {
          message: '发现新内容可用',
          buttonText: '刷新',
        },
      },
    ],
    '@vuepress/back-to-top',
    '@vuepress/medium-zoom',
    'vuepress-plugin-cat',
  ],
};
