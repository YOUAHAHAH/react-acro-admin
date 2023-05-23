import { useState } from "react";
import MessageCom from "@/views/components/message/src/index";
import { Button, Space, Icon, Divider, Tooltip } from "@arco-design/web-react";
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
      {/* <Divider orientation={"left"}>分组消息合并</Divider>
      <Space size="large">
        <Button
          onClick={MessageCom({
            type: "success",
            props: {
              content: "This is an info message!",
              grouping: true,
              closable: true
            }
          })}
          type="primary"
        >
          Info
        </Button>
      </Space> */}
    </>
  );
};

export default MessageList;
