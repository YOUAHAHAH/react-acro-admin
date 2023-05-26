import { Card, Typography, Avatar } from "@arco-design/web-react";
import Calendar from "./components/calendar";

const Welcome = () => {
  return (
    <>
      <Card className="card-custom-hover-style w-full mb-[20px]" hoverable>
        <Avatar className="mr-[20px]" size={40} shape="square">
          Arco
        </Avatar>
        <Typography.Text type="primary">Mark</Typography.Text>
      </Card>
      <Calendar />
    </>
  );
};

export default Welcome;
