let menus = [
    {
        action: "mdi-home",
        title: "首页",
        path:"/",
        items: [{ title: "首页图表", path: "home" }]
    },
    {
        action: "mdi-apps",
        title: "文章管理",
        path:"/article",
        items: [
            { title: "写文章", path: "/write" },
            { title: "文章列表",path: "/list"},
            { title: "分类", path: "/category" },
            {title: "评论", path: "/comment"}
        ]
    },
    {
        action: "mdi-account-group",
        title: "会员管理",
        path:"/user",
        items: [
            { title: "会员统计", path: "/statistics" },
            { title: "会员管理", path: "/list" }
        ]
    },
    {
        action: "mdi-currency-usd",
        title: "销售管理",
        path:"/trade",
        items: [
            { title: "交易统计", path: "/statistics" },
            { title: "订单管理", path: "/order" },
            { title: "物流管理", path: "/logistics" },
            { title: "促销管理", path: "/promotion" }
        ]
    },
    {
        action: "mdi-cog-outline",
        title: "权限管理",
        path:"/authority",
        items: [
            { title: "权限管理", path: "/list" },
            { title: "角色管理", path: "/role" },
            { title: "人员管理", path: "/member" }
        ]
    }
]

export default menus;
