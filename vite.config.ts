import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import pkg from "./package.json";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import vitePluginImp from "vite-plugin-imp";
import { viteMockServe } from "vite-plugin-mock";
import { visualizer } from "rollup-plugin-visualizer";
import picocolors from "picocolors";
import dayjs from "dayjs";

const { dependencies, devDependencies, name, version } = pkg;

const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

/** 设置别名 */
const alias: Record<string, string> = {
  "@": pathResolve("src"),
  "@build": pathResolve("build")
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), "");
  const prodMock = true;

  console.log(
    picocolors.bold(
      picocolors.green(
        `👏欢迎使用${picocolors.blue(
          "[react-acro-admin]"
        )}，如果您感觉不错，记得点击后面链接给个star哦💖 https://github.com/YOUAHAHAH/react-acro-admin`
      )
    )
  );

  return {
    base: "./",
    resolve: {
      alias
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
      }),
      visualizer({
        gzipSize: true,
        brotliSize: true,
        emitFile: false,
        sourcemap: true,
        filename: "test.html", //分析图生成的文件名
        open: true //如果存在本地服务端口，将在打包后自动展示
      })
    ],

    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true // 支持内联 JavaScript
        }
      }
    },

    build: {
      minify: "terser", // build配置项minify没有配置，默认是esbuild，需要配置为terser
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }, // 清除console和debugger
      sourcemap: false,
      chunkSizeWarningLimit: 4000, // 消除打包大小超过500kb警告
      rollupOptions: {
        external: [
          // "@arco-design/web-react/es/input-number",
          // "@arco-design/web-react/es/date-picker"
        ],
        input: {
          index: pathResolve("index.html")
        },
        // 静态资源分拆打包
        output: {
          manualChunks(id: string | string[]) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    },

    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  };
});
