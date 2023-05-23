<div align="center">
  <a href="https://arco.design" target="_blank">
    <img alt="Arco Design Logo" width="200" src="https://avatars.githubusercontent.com/u/64576149?s=200&v=4"/>
  </a>
</div>

<div align="center">
  <h1>Arco Design Search</h1>
</div>

<div align="center">

基于 [Arco Design](https://arco.design/react/components/message) 的 React UI 消息提示组件。

</div>

# 例子

```typescript
import { useEffect, useState } from "react";
import MessageCom from "@/views/components/message/src/index";
import {
  Button,
  Space,
  Icon,
  Divider,
  Tooltip,
  Message
} from "@arco-design/web-react";
import {
  IconExclamationCircle,
  IconFaceSmileFill
} from "@arco-design/web-react/icon";
import axios from "axios";

const IconFont = Icon.addFromIconFontCn({
  src: "//at.alicdn.com/t/font_180975_26f1p759rvn.js"
});

const MessageList = () => {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const request = async () => {
    const startTime = Date.now();
    const data: string[] = [];
    const response = await axios
      .get("https://api.apiopen.top/api/sentences")
      .then(res => {
        data.push(res.data.result.from, res.data.result.name);
      });
    const endTime = Date.now();
    const delay = Math.max(0, endTime - startTime + 2000); // 计算延迟时间参数
    return { delay, data };
  };

  useEffect(() => {
    Message.config({
      maxCount: 2,
      duration: 1000
    });
  }, []);

  return (
    <>
      <Space size="large">
        <Button
          onClick={MessageCom({
            type: "info",
            props: { content: "This is an info message!" }
          })}
          type="primary"
        >
          Info
        </Button>
        <Button
          onClick={MessageCom({
            type: "success",
            props: {
              content: "This is an info message!"
            }
          })}
          type="primary"
          status="success"
        >
          Success
        </Button>
        <Button
          onClick={MessageCom({
            type: "warning",
            props: {
              content: "This is an info message!"
            }
          })}
          type="primary"
          status="warning"
        >
          Warning
        </Button>
        <Button
          onClick={MessageCom({
            type: "error",
            props: {
              content: "This is an info message!"
            }
          })}
          type="primary"
          status="danger"
        >
          Error
        </Button>
        <Button
          onClick={MessageCom({
            type: "normal",
            props: {
              content: "This is an info message!"
            }
          })}
          type="secondary"
        >
          Normal
        </Button>
      </Space>
      <Divider orientation={"left"}>自定义图标</Divider>
      <Space size="large">
        <Button
          onClick={MessageCom({
            type: "info",
            props: {
              content: "This is an info message!",
              icon: <IconFont type="icon-info" />
            }
          })}
          type="primary"
        >
          Info
        </Button>
        <Button
          onClick={MessageCom({
            type: "success",
            props: {
              content: "This is an info message!",
              icon: <IconFont type="icon-success" />
            }
          })}
          type="primary"
          status="success"
        >
          Success
        </Button>
        <Button
          onClick={MessageCom({
            type: "warning",
            props: {
              content: "This is an info message!",
              icon: <IconFont type="icon-warning" />
            }
          })}
          type="primary"
          status="warning"
        >
          Warning
        </Button>
        <Button
          onClick={MessageCom({
            type: "error",
            props: {
              content: "This is an info message!",
              icon: <IconFont type="icon-error" />
            }
          })}
          type="primary"
          status="danger"
        >
          Error
        </Button>
        <Button
          onClick={MessageCom({
            type: "normal",
            props: {
              content: "This is an info message!",
              icon: <IconFaceSmileFill />
            }
          })}
          type="secondary"
        >
          Normal
        </Button>
      </Space>
      <Divider orientation={"left"}>更新全局提醒内容</Divider>
      <Space size="large">
        <Button
          loading={loading1}
          onClick={() => {
            setLoading1(true);
            setTimeout(() => {
              setLoading1(false);
            }, 2000);
            (
              MessageCom({
                type: "loading",
                loadingProps: {
                  loadingContent: "Will update after 2 seconds...",
                  delay: 2000,
                  loadingId: "1"
                },
                props: {
                  id: "1",
                  content: "Update success!"
                }
              }) as any
            )();
          }}
          type="primary"
        >
          Update message
        </Button>
        <Button
          loading={loading2}
          onClick={async () => {
            const { delay, data } = await request();
            setLoading2(true);
            setTimeout(() => {
              setLoading2(false);
            }, delay);
            (
              MessageCom({
                type: "loading",
                props: { id: "2", content: `${data[0]},${data[1]}` },
                loadingProps: {
                  loadingId: "2",
                  loadingContent: "每日诗句请求中！",
                  delay: delay
                }
              }) as any
            )();
          }}
        >
          模拟请求
          <Tooltip content="因为请求时间太短所以在默认基础上加了2s">
            <IconExclamationCircle
              style={{ color: "rgb(var(--arcoblue-6))" }}
            />
          </Tooltip>
        </Button>
      </Space>
      <Divider orientation={"left"}>显示关闭按钮</Divider>
      <Space size="large">
        <Button
          onClick={MessageCom({
            type: "info",
            props: {
              content: "This is an info message!",
              closable: true,
              duration: 10000
            }
          })}
          type="primary"
        >
          Info
        </Button>
        <Button
          onClick={MessageCom({
            type: "success",
            props: {
              content: "This is an info message!",
              closable: true,
              duration: 10000
            }
          })}
          type="primary"
          status="success"
        >
          Success
        </Button>
        <Button
          onClick={MessageCom({
            type: "warning",
            props: {
              content: "This is an info message!",
              closable: true,
              duration: 10000
            }
          })}
          type="primary"
          status="warning"
        >
          Warning
        </Button>
        <Button
          onClick={MessageCom({
            type: "error",
            props: {
              content: "This is an info message!",
              closable: true,
              duration: 10000
            }
          })}
          type="primary"
          status="danger"
        >
          Error
        </Button>
        <Button
          onClick={MessageCom({
            type: "normal",
            props: {
              content: "This is an info message!",
              closable: true,
              duration: 10000
            }
          })}
          type="secondary"
        >
          Normal
        </Button>
      </Space>
      <Divider orientation={"left"}>关闭所有消息</Divider>
      <Space size="large">
        <Button onClick={MessageCom({ type: "clear" })} type="secondary">
          直接关闭所有消息
        </Button>
        <Button
          onClick={MessageCom({
            type: "clear",
            props: { content: "关闭成功", feedBack: true }
          })}
          type="secondary"
        >
          关闭消息提示
        </Button>
      </Space>
    </>
  );
};

export default MessageList;
```

# API

| 参数名       | 描述              | 类型             | 默认值   | 版本 |
| ------------ | ----------------- | ---------------- | -------- | ---- |
| type         | 消息类型          | msgType          | `"info"` | -    |
| props        | MessageApi        | messageItemProps | `-`      | -    |
| loadingProps | MessageLoadingApi | msgLoadingProps  | `-`      | -    |

### MessageApi

| 参数名               | 描述                                                          | 类型                            | 默认值                    | 版本   |
| -------------------- | ------------------------------------------------------------- | ------------------------------- | ------------------------- | ------ |
| closable             | 是否显示关闭按钮                                              | boolean                         | `-`                       | -      |
| showIcon             | 是否显示图标                                                  | boolean                         | `true`                    | -      |
| duration             | 自动关闭的时间，单位为 `ms`                                   | number                          | `3000`                    | -      |
| id                   | 当前消息的唯一标识，可以用来更新消息                          | string                          | `-`                       | -      |
| transitionClassNames | 消息弹出动画的类名，见 react-transition-group 的 `classNames` | string                          | `-`                       | -      |
| position             | 消息的位置，分为 `top` 上方和 `bottom` 下方                   | 'top' \| 'bottom'               | `-`                       | -      |
| icon                 | 自定义图标                                                    | ReactNode                       | `-`                       | -      |
| className            | 节点类名                                                      | string \| string[]              | `-`                       | -      |
| content              | 消息内容                                                      | ReactNode \| string **(必填)**  | `-`                       | -      |
| style                | 节点样式                                                      | CSSProperties                   | `-`                       | -      |
| transitionTimeout    | 动画持续时间，见 react-transition-group 的 `timeout`          | {enter?: number;exit?: number;} | `{enter: 100, exit: 300}` | 2.43.0 |
| onClose              | 关闭时的回调                                                  | () => void                      | `-`                       | -      |
| feedBack             | 是否显示清理所有消息成功提示                                  | boolean                         |
| `-`                  | -                                                             |

### 全局设置

`Message.config(options)` 这个全局设置在自己的组件内使用即可

| 参数名       |        描述        |        类型         |                默认值 |
| ------------ | :----------------: | :-----------------: | --------------------: |
| maxCount     |    最大通知数量    |      `number`       |                   `-` |
| getContainer |   放置通知的容器   | `() => HTMLElement` | `() => document.body` |
| duration     | 通知自动关闭的时间 |      `number`       |                `3000` |
| prefixCls    |      类名前缀      |      `string`       |                `arco` |

```typescript
type msgType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "normal"
  | "loading"
  | "clear";

type msgLoadingProps = {
  loadingId?: string;
  loadingContent: ReactNode | string;
  loadingStyle?: CSSProperties;
  loadingClassName?: string | string[];
  loadingTransitionClassNames?: string;
  loadingTransitionTimeout?: {
    enter?: number;
    exit?: number;
  };
  loadingShowIcon?: boolean;
  loadingIcon?: ReactNode;
  loadingDuration?: number;
  loadingPosition?: "top" | "bottom";
  loadingClosable?: boolean;
  loadingOnClose?: () => void;
  delay?: number;
};
```
