import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import pkg from "./package.json";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import vitePluginImp from "vite-plugin-imp";
import { viteMockServe } from "vite-plugin-mock";
import picocolors from "picocolors";
import dayjs from "dayjs";

const { dependencies, devDependencies, name, version } = pkg;

const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), "");
  const prodMock = true;

  console.log(
    picocolors.bold(
      picocolors.green(
        `👏欢迎使用${picocolors.blue(
          "[acroReact_ts]"
        )}，如果您感觉不错，记得点击后面链接给个star哦💖 https://github.com/YOUAHAHAH/acroReact_ts`
      )
    )
  );

  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    server: {
      hmr: true,
      // 是否开启 https
      https: false,
      // 端口号
      port: Number(env.VITE_PORT),
      host: "0.0.0.0"
    },
    plugins: [
      react(),
      vitePluginImp({
        libList: [
          {
            libName: "@arco-design/web-react",
            style: _name => {
              return [
                // 加载框架的主要样式文件 index.less
                "@arco-design/web-react/lib/style/index.less"
                // 根据name值按需加载相关组件样式
                // `@arco-design/web-react/es/${name}/style/css.js`
              ];
            }
          }
        ]
      }),
      viteMockServe({
        mockPath: "mock",
        localEnabled: command === "serve",
        prodEnabled: command !== "serve" && prodMock,
        injectCode: `
            import { setupProdMockServer } from './mockProdServer';
            setupProdMockServer();
          `,
        logger: false
      })
    ],

    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true
        }
      }
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  };
});
