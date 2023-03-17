import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import l from "./index.module.less";

const Login = () => {
  const navigate = useNavigate();

  return (
    // <>
    //   <Button
    //     type="primary"
    //     onClick={() => {
    //       navigate("/welcome/index");
    //     }}
    //   >
    //     登录
    //   </Button>
    // </>
    <div className={l.login_container}>
      <div className={l.login_form}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
