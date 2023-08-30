import { MockMethod } from "vite-plugin-mock";

const ableRouter = {
  path: "/able",
  meta: {
    title: "功能",
    rank: 11,
    isChildren: true,
    icon: "IconCommon",
    auth: ["admin"]
  },
  children: [
    {
      path: "/able/qrcode",
      meta: {
        requiresAuth: true,
        title: "二维码",
        key: "qrcode"
      }
    },
    {
      path: "/able/scraping",
      meta: {
        requiresAuth: true,
        title: "刮刮乐",
        key: "scraping"
      }
    }
  ]
};

const componentsRouter = {
  path: "/components",
  meta: {
    title: "组件",
    rank: 12,
    isChildren: true,
    icon: "IconApps",
    auth: ["user", "admin"]
  },
  children: [
    {
      path: "/components/searchBox",
      meta: {
        requiresAuth: true,
        title: "搜索组件",
        key: "searchBox"
      }
    },
    {
      path: "/components/message",
      meta: {
        requiresAuth: true,
        title: "消息提示",
        key: "message"
      }
    },
    {
      path: "/components/download",
      meta: {
        requiresAuth: true,
        title: "下载组件",
        key: "download"
      }
    }
  ]
};

const echartsRouter = {
  path: "/echarts",
  meta: {
    title: "测试图表",
    rank: 2,
    isChildren: true,
    icon: "IconCommon",
    auth: ["admin"]
    // icon: <IconFont type="icon-hot" />
  },
  children: [
    {
      path: "/echarts/test",
      meta: {
        requiresAuth: true,
        title: "测试图表",
        key: "echarts",
        keepAlive: true
      }
    }
  ]
};

const linkRouter = {
  path: "/link",
  meta: {
    title: "外部链接",
    rank: 99,
    isChildren: true,
    icon: "IconLink",
    auth: ["admin"]
  },
  children: [
    {
      path: "/link/react",
      meta: {
        requiresAuth: true,
        title: "React文档(内嵌)",
        key: "react",
        frameSrc: "https://react.docschina.org/",
        isLink: true
      }
    },
    {
      path: "/link/acro",
      meta: {
        requiresAuth: true,
        title: "acro(外链)",
        frameSrc: "https://arco.design/react/docs/start",
        key: "acro",
        isOutsideLink: true
      }
    }
  ]
};

const materialRouter = {
  path: "/material",
  meta: {
    title: "物料管理",
    rank: 15,
    isChildren: true,
    icon: "IconExperiment",
    auth: ["admin"]
  },
  children: [
    {
      path: "/material/materialGroup",
      meta: {
        requiresAuth: true,
        title: "团队查询",
        key: "materialGroup",
        keepAlive: true
      }
    }
  ]
};

const menuRouter = {
  path: "/menu",
  meta: {
    title: "嵌套菜单",
    rank: 14,
    isChildren: true,
    icon: "IconUnorderedList",
    auth: ["admin"]
  },
  children: [
    {
      path: "/menu/menu1",
      meta: {
        requiresAuth: true,
        title: "菜单1",
        key: "menu1"
      }
    },
    {
      path: "/menu/menu2",
      meta: {
        requiresAuth: true,
        title: "菜单2",
        key: "menu2",
        isChildren: true
      },
      children: [
        {
          path: "/menu/menu2/menu21",
          meta: {
            requiresAuth: true,
            title: "菜单2-1",
            key: "menu21"
          }
        },
        {
          path: "/menu/menu2/menu22",
          meta: {
            requiresAuth: true,
            title: "菜单2-2",
            key: "menu22"
          }
        },
        {
          path: "/menu/menu2/menu23",
          meta: {
            requiresAuth: true,
            title: "菜单2-3",
            key: "menu23"
          }
        }
      ]
    },
    {
      path: "/menu/menu3",
      meta: {
        requiresAuth: true,
        title: "菜单3",
        key: "menu3"
      }
    }
  ]
};

const welcomeRouter = {
  path: "/welcome/index",
  meta: {
    title: "首页",
    rank: 1,
    isChildren: false,
    icon: "IconHome",
    auth: ["user", "admin"]
  },
  children: [
    {
      path: "/welcome/index",
      meta: {
        requiresAuth: true,
        title: "首页",
        key: "welcome"
      }
    }
  ]
};

export default [
  {
    url: "/getAsyncRoutes",
    method: "get",
    response: () => {
      return {
        success: true,
        msg: "获取成功",
        data: [
          ableRouter,
          componentsRouter,
          echartsRouter,
          linkRouter,
          materialRouter,
          menuRouter,
          welcomeRouter
        ]
      };
    }
  }
] as MockMethod[];
