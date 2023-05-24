import { useState } from "react";
import { Button, Form, Modal, Input } from "@arco-design/web-react";
import { ctxProps } from "../type";
import Hook from "./hook";

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 17
  }
};

const options: ctxProps = {
  backgroundColor: "#eee",
  font: "bold 20px Arial",
  textColor: "#333",
  text: Math.floor(Math.random() * 999901 + 100000),
  generate: false
};

const Scraping = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [visible1, setVisible1] = useState<boolean>(false);
  const [hookData, setHookData] = useState<ctxProps>();

  const CustomHook = ({
    backgroundColor,
    font,
    textColor,
    text,
    generate
  }: ctxProps) => {
    const handleMouseDown = (e: any) => {
      if (e.button === 0) {
        const canvas = e.target;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        e.target.onmousemove = (m: any) => {
          const x = m.clientX - canvas.offsetLeft;
          const y = m.clientY - canvas.offsetTop;
          ctx.clearRect(x - 230, y - 160, 20, 20);
        };
      }
    };
    const handleMouseUp = (e: any) => {
      if (e.button === 0) {
        e.target.onmousemove = null;
      }
    };

    return (
      <Hook
        backgroundColor={backgroundColor}
        font={font}
        textColor={textColor}
        text={text}
        generate={generate}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    );
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        自定义刮刮乐
      </Button>
      <Modal
        title="自定义刮刮乐"
        style={{ top: -100 }}
        visible={visible}
        onCancel={() => {
          setVisible(!visible);
          form.resetFields();
        }}
        footer={null}
      >
        <Modal
          title="生成刮刮乐"
          style={{ textAlign: "center", top: -100 }}
          visible={visible1}
          onCancel={() => {
            setVisible1(!visible1);
          }}
          footer={null}
        >
          {hookData && <CustomHook {...hookData} />}
        </Modal>
        <Form
          form={form}
          {...formItemLayout}
          autoComplete="off"
          onSubmit={v => {
            setHookData({
              backgroundColor: v.backgroundColor,
              textColor: v.textColor,
              font: v.font,
              text: v.text
            });
            setVisible1(true);
          }}
        >
          <FormItem label="刮刮乐内容" field="text">
            <Input
              style={{ width: 300 }}
              placeholder="请输入刮刮乐内容"
              autoComplete="off"
              max={400}
              min={100}
            />
          </FormItem>
          <FormItem label="背景颜色选择" field="backgroundColor">
            <Input type="color" style={{ width: 100 }} autoComplete="off" />
          </FormItem>
          <FormItem label="文字颜色选择" field="textColor">
            <Input type="color" style={{ width: 100 }} autoComplete="off" />
          </FormItem>
          <FormItem wrapperCol={{ offset: 7 }}>
            <Button
              style={{ marginRight: 12 }}
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
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
        <CustomHook {...options} />
      </div>
    </>
  );
};

export default Scraping;
