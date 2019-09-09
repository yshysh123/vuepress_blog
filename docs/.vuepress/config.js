module.exports = {
    title: "yush的博客",
    base: '/',
    description: "don't fear the unknown",
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ["link", { rel: "manifest", href: "/manifest.json" }],
        // 更多配置可以参考 https://github.com/vuejs/vuepress/blob/master/packages/docs/docs/.vuepress/config.js
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    theme: 'reco',
    themeConfig: {
        type: 'blog',
        nav: [
            { text: "Home", link: "/", icon: "reco-home" },
            {
                text: "博文",
                icon: "reco-up",
                items: [
                    {
                        text: "React学习汇总",
                        link: "/react/"
                    },
                    {
                        text: "Nginx学习汇总",
                        link: "/nginx/"
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
        ],
        // 博客设置
        blogConfig: {
            category: {
                location: 2, // 在导航栏菜单中所占的位置，默认2
                text: '分类' // 默认 “分类”
            },
            tag: {
                location: 3, // 在导航栏菜单中所占的位置，默认3
                text: '标签' // 默认 “标签”
            }
        },
        // 搜索设置
        search: true,
        searchMaxSuggestions: 10,
        // 自动形成侧边导航
        sidebar: 'auto',
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
            appId: 'wMbg0hd0AjbWzLTsrsUS8xnC-gzGzoHsz',// your appId
            appKey: '9thlnLH4eo1g0A44fMEgBLm5', // your appKey
            placeholder: 'ヾﾉ≧∀≦)o来啊，我们一起嘤嘤嘤！！！'
        }
    },
    markdown: {
        lineNumbers: true
    },
    plugins: [
        ['@vuepress/pwa', {
            popupComponent: 'MySWUpdatePopup',
            undatePopup: {
                message: '发现新内容可用',
                buttonText: '刷新'
            }
        }],
        '@vuepress/back-to-top',
        '@vuepress/medium-zoom',
        'vuepress-plugin-cat'
    ]
}
