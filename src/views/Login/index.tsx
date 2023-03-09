import { NavigateFunction, useNavigate } from "react-router-dom";
import { Button } from "@arco-design/web-react";

const Login = () => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <>
      <Button
        type='primary'
        onClick={() => {
          navigate("/welcome/index");
        }}>
        登录
      </Button>
    </>
  );
};

export default Login;
