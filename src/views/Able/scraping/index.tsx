import { useState, useRef, useEffect } from "react";
import { Button, Form, Modal, Input, Divider } from "@arco-design/web-react";
import { ctxProps } from "../type";
import Hook from "./hook";
import SignatureCanvas from "react-signature-canvas";

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 17
  }
};

const Scraping = () => {
  const [form] = Form.useForm();
  const sigCanvasRef = useRef<SignatureCanvas | null>(null);
  const [options, setOptions] = useState<ctxProps>({
    backgroundColor: "#eee",
    font: "bold 20px Arial",
    textColor: "#333",
    text: Math.floor(Math.random() * 999901 + 100000),
    generate: false
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [visible1, setVisible1] = useState<boolean>(false);
  const [hookData, setHookData] = useState<ctxProps>();
  const [signImg, setSignImg] = useState<string>("");
  const [showImg, setShowImg] = useState<boolean>(false);
  const [clearCanvas, setClearCanvas] = useState(false);

  /**
   * 刷新
   */
  const handleRefresh = () => {
    setClearCanvas(true);
  };

  /**
   * 签字确认
   */
  const handleSignature = () => {
    setSignImg(sigCanvasRef.current?.toDataURL("image/png") || "");
    setShowImg(true);
  };

  /**
   * 清除
   */
  const handleClearSign = () => {
    sigCanvasRef.current?.clear();
    setSignImg("");
    setShowImg(false);
  };

  /**
   * 下载图片
   */
  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = signImg;
    link.download = "signature.png";
    link.click();
  };

  useEffect(() => {
    if (clearCanvas) {
      setClearCanvas(false);
    }
  }, [clearCanvas]);

  return (
    <>
      <Divider orientation={"left"}>刮刮乐</Divider>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
        className="mr-[10px]"
      >
        自定义刮刮乐
      </Button>
      <Button onClick={handleRefresh}>刷新</Button>
      <div className="flex flex-wrap mt-[10px]">
        <Hook {...options} clear={clearCanvas} />
      </div>
      <Divider orientation={"left"}>手写签名</Divider>
      <Button onClick={handleSignature} type="primary" className="mr-[10px]">
        签字确认
      </Button>
      <Button onClick={handleClearSign} className="mr-[10px]">
        清除
      </Button>
      {showImg ? (
        <Button onClick={handleDownloadImage} type="primary" status="success">
          下载图片
        </Button>
      ) : null}
      <div className="flex flex-wrap mt-[10px]">
        <SignatureCanvas
          ref={sigCanvasRef}
          penColor="#000"
          backgroundColor="#EEEEEE"
          canvasProps={{ width: 400, height: 200 }}
        />
        {signImg && (
          <img width={400} height={200} src={signImg} className="ml-[10px]" />
        )}
      </div>

      <Modal
        className="!top-[-100px]"
        title="自定义刮刮乐"
        visible={visible}
        onCancel={() => {
          setVisible(!visible);
          form.resetFields();
        }}
        footer={null}
      >
        <Modal
          className="!text-center !top-[-100px]"
          title="生成刮刮乐"
          visible={visible1}
          onCancel={() => {
            setVisible1(!visible1);
          }}
          footer={null}
        >
          {hookData && <Hook {...hookData} />}
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
              className="!w-[300px]"
              placeholder="请输入刮刮乐内容"
              autoComplete="off"
              max={400}
              min={100}
            />
          </FormItem>
          <FormItem label="背景颜色选择" field="backgroundColor">
            <Input className="!w-[100px]" type="color" autoComplete="off" />
          </FormItem>
          <FormItem label="文字颜色选择" field="textColor">
            <Input className="!w-[100px]" type="color" autoComplete="off" />
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
    </>
  );
};

export default Scraping;
