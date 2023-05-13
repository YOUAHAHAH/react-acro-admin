import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Message } from "@arco-design/web-react";
import { IconUser, IconLock } from "@arco-design/web-react/icon";
import { connect } from "react-redux";
import { setAuthState } from "@/redux/modules/Auth/action";
import { getLogin } from "@/api/modules/login";
import logo from "@/assets/img/logo.png";
import l from "../index.module.less";

const FormItem = Form.Item;

const LoginForm = (props: any) => {
  const { setAuthState } = props;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const onsubmit = (v: any) => {
    getLogin({ ...v }).then((res: any) => {
      const { data, msg, success } = res;
      setLoading(true);
      if (success === true) {
        setAuthState({
          username: data.username,
          roles: data.roles,
          token: data.accessToken
        });
        setTimeout(() => {
          Message.success(msg);
          navigate("/welcome/index");
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
        Message.error(msg);
      }
    });
  };

  return (
    <>
      <div className={l.login_logo}>
        <img src={logo} />
        <span className={l.logo_text}>acroReact_ts</span>
      </div>
      <Form
        form={form}
        wrapperCol={{ span: 24 }}
        autoComplete="off"
        onSubmit={v => onsubmit(v)}
      >
        <FormItem
          field="username"
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
          <Button
            style={{ marginBottom: "10px" }}
            long
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            登录
          </Button>
        </FormItem>
      </Form>
    </>
  );
};

const mapDispatchToProps = { setAuthState };
export default connect(null, mapDispatchToProps)(LoginForm);
