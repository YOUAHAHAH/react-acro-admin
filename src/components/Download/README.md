<div align="center">
  <a href="https://arco.design" target="_blank">
    <img alt="Arco Design Logo" width="200" src="https://avatars.githubusercontent.com/u/64576149?s=200&v=4"/>
  </a>
</div>

<div align="center">
  <h1>Arco Design Search</h1>
</div>

<div align="center">

基于 [Arco Design](https://arco.design/) 的 React UI 下载组件。

</div>

# 例子

```typescript
import { Link } from "@arco-design/web-react";
import DownloadFile from "@/components/Download/src/index";

const Download = () => {
  return (
    <div className="flex items-center">
      <DownloadFile
        fileOption={{
          url: "https://avatars.githubusercontent.com/u/101163308?v=4",
          name: "acroReact_ts"
        }}
        onSuccess={url => console.log(url)}
        onError={error => console.error("Download failed: ", error)}
      />

      <DownloadFile
        fileOption={{
          url: "https://avatars.githubusercontent.com/u/101163308?v=4",
          name: "acroReact_ts"
        }}
        onSuccess={url => console.log(url)}
        onError={error => console.error("Download failed: ", error)}
      >
        <Link>下载</Link>
      </DownloadFile>
    </div>
  );
};

export default Download;

```

# API

| 参数名     | 描述          | 类型                      | 默认值 | 版本 |
| ---------- | ------------- | ------------------------- | ------ | ---- |
| text       | 默认按钮文本  | string \| number          | `下载` | -    |
| style      | 节点样式      | React.CSSProperties       | `-`    | -    |
| Btnprops   | 默认按钮props | ButtonProps               | `-`    | -    |
| onSuccess  | 成功回调      | (url?: string) => void;   | `-`    | -    |
| onError    | 失败回调      | (error: Error) => void;   | `-`    | -    |
| children   | 自定义节点    | React.ReactNode;          | `-`    | -    |
| fileOption | 下载props     | DownloadOptions(url:必填) | `-`    | -    |
| loading    | 加载状态      | boolean                   | false  | -    |


### DownloadOptions

| 参数名  | 描述                                           | 类型             | 默认值           |
| ------- | ---------------------------------------------- | ---------------- | ---------------- |
| url     | 地址(必填)                                     | string \| number | 必填             |
| name    | 文件名称                                       | string           | `-`              |
| type    | 文件类型                                       | string           | `-`              |
| http    | 请求类型                                       | httpType         | `-`              |
| headers | 请求头                                         | HeadersInit      | `-`              |
| size    | 请求分片文件大小(默认文件超过10MB采用流式下载) | number           | 10 * 1024 * 1024 |




```typescript
type httpType = "xhr" | "fetch";
```
