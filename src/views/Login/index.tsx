import LoginForm from "./components/LoginForm";
import l from "./index.module.less";

const Login = () => {
  return (
    <div className={l.login_container}>
      <div className={l.login_form}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
