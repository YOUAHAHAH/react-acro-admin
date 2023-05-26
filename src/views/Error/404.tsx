import { Result, Button } from "@arco-design/web-react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Result
        className="!pt-[200px] mx-auto"
        status="404"
        subTitle="Whoops, that page is gone. "
        extra={[
          <Button
            key="back"
            type="primary"
            onClick={() => navigate("/welcome/index")}
          >
            Back
          </Button>
        ]}
      ></Result>
    </div>
  );
};

export default Error404;
