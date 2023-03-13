import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import pkg from "./package.json";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import vitePluginImp from "vite-plugin-imp";
import dayjs from "dayjs";

const { dependencies, devDependencies, name, version } = pkg;

const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    plugins: [
      react(),
      vitePluginImp({
        libList: [
          {
            libName: "@arco-design/web-react",
            style: name => {
              return [
                // 加载框架的主要样式文件 index.less
                "@arco-design/web-react/lib/style/index.less",
                // 根据name值按需加载相关组件样式
                // `@arco-design/web-react/es/${name}/style/css.js`
              ];
            },
          },
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true,
        },
      },
    },
    define: {
      __APP_ENV__: env.APP_ENV,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  };
});
