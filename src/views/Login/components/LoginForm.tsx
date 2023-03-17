import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "@arco-design/web-react";
import { IconUser, IconLock } from "@arco-design/web-react/icon";
import logo from "@/assets/img/logo.png";
import l from "../index.module.less";

const FormItem = Form.Item;

const LoginForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onsubmit = (v: any) => {
    console.log(v);
    // navigate("/welcome/index");
  };

  return (
    <>
      <div className={l.login_logo}>
        <img src={logo} />
        <span className={l.logo_text}>ACRO-ADMIN</span>
      </div>
      <Form
        form={form}
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        onSubmit={v => onsubmit(v)}
      >
        <FormItem
          field="name"
          rules={[{ required: true, message: "用户名不能为空" }]}
        >
          <Input prefix={<IconUser />} placeholder="admin / user" />
        </FormItem>
        <FormItem
          field="password"
          rules={[{ required: true, message: "密码不能为空" }]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder="123456"
            autoComplete="false"
          />
        </FormItem>
        <FormItem field="checkBox">
          <div>
            <Checkbox>记住密码</Checkbox>
          </div>
        </FormItem>
        <FormItem>
          <Button long type="primary" htmlType="submit">
            登录
          </Button>
        </FormItem>
      </Form>
    </>
  );
};

export default LoginForm;
