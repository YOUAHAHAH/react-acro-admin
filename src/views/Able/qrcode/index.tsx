import { useState } from "react";
import {
  Button,
  Form,
  Modal,
  Input,
  Radio,
  Tooltip
} from "@arco-design/web-react";
import { IconInfoCircle } from "@arco-design/web-react/icon";
import { opts, customOpt } from "../type";
import Hook from "./hook";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 17
  }
};

const options1: opts = {
  color: {
    dark: "#55D187",
    light: "#2d8cf0"
  }
};
const options3: opts = {
  color: {
    dark: "#50BFFF",
    light: "#FBB91A"
  }
};
const options4: opts = {
  type: "image/jpeg",
  quality: 0.3,
  color: {
    dark: "#7FD0E9",
    light: "#FDFDFD"
  }
};

const Qrcode = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [visible1, setVisible1] = useState<boolean>(false);
  const [qrCodeType, setQrCodeType] = useState<string>("text");
  const [hookData, setHookData] = useState<customOpt>({
    content: "",
    radio: "",
    type: "",
    optionsHook: {
      color: {
        dark: "#ffffff",
        light: "#ffffff"
      }
    }
  });

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        自定义二维码
      </Button>
      <Modal
        className="!top-[-100px]"
        title="自定义二维码"
        visible={visible}
        onCancel={() => {
          setVisible(!visible);
          form.resetFields();
        }}
        footer={null}
      >
        <Modal
          className="!top-[-100px] !text-center"
          title="生成二维码"
          visible={visible1}
          onCancel={() => {
            setVisible1(!visible1);
          }}
          footer={null}
        >
          <Hook
            text={hookData.content}
            tag={hookData.radio}
            type={hookData.type}
            opts={hookData.optionsHook}
          />
        </Modal>
        <Form
          form={form}
          {...formItemLayout}
          autoComplete="off"
          onSubmit={v => {
            setHookData({
              content: v.content,
              radio: v.radio,
              type: v.type,
              optionsHook: {
                color: {
                  dark: v.darkColor,
                  light: v.lightColor
                }
              }
            });
            setVisible1(true);
          }}
        >
          <FormItem
            label="二维码类型"
            field="type"
            rules={[{ required: true, message: "请选择二维码类型" }]}
          >
            <RadioGroup type="button" onChange={setQrCodeType}>
              <Radio value="text">文本</Radio>
              <Radio value="link">链接</Radio>
            </RadioGroup>
          </FormItem>
          {qrCodeType === "text" ? (
            <FormItem
              label="二维码内容"
              field="content"
              rules={[{ required: true, message: "请输入内容" }]}
            >
              <Input
                className="!w-[200px]"
                placeholder="请输入内容"
                autoComplete="off"
              />
            </FormItem>
          ) : (
            <FormItem
              label="二维码链接"
              field="content"
              rules={[{ required: true, message: "请输入链接地址" }]}
            >
              <Input
                className="!w-[200px]"
                placeholder="请输入链接地址"
                autoComplete="off"
              />
            </FormItem>
          )}
          <FormItem label="颜色选择" field="darkColor">
            <Input
              className="!w-[100px]"
              type="color"
              placeholder="请输入颜色选择"
              autoComplete="off"
            />
          </FormItem>
          <FormItem label="颜色选择" field="lightColor">
            <Input
              className="!w-[100px]"
              type="color"
              placeholder="请输入颜色选择"
              autoComplete="off"
            />
          </FormItem>
          <FormItem
            label="生成类型"
            field="radio"
            rules={[{ required: true, message: "请选择二维码生成类型" }]}
          >
            <RadioGroup>
              <Radio value="img">img</Radio>
              <Radio value="canvas">canvas</Radio>
              <Tooltip content="image类型可以下载">
                <IconInfoCircle />
              </Tooltip>
            </RadioGroup>
          </FormItem>
          <FormItem wrapperCol={{ offset: 7 }}>
            <Button
              className="mr-[12px]"
              onClick={() => {
                setVisible(!visible);
                form.resetFields();
              }}
            >
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              完成
            </Button>
          </FormItem>
        </Form>
      </Modal>
      <div className="flex flex-wrap">
        <Hook text={"测试数据"} tag={"img"} opts={options1} type={"text"} />
        <Hook text={"https://www.baidu.com"} tag={"img"} type={"link"} />
        <Hook
          text={"https://github.com/YOUAHAHAH"}
          tag={"img"}
          opts={options3}
        />
        <Hook
          text={"https://avatars.githubusercontent.com/u/101163308?v=4"}
          tag={"img"}
          opts={options4}
        />
      </div>
    </>
  );
};

export default Qrcode;
