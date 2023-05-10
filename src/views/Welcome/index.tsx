import { Card, Typography, Avatar } from "@arco-design/web-react";
import Calendar from "./components/calendar";

const Welcome = () => {
  return (
    <>
      <Card
        style={{ width: "100%", marginBottom: "20px" }}
        className="card-custom-hover-style"
        hoverable
      >
        <Avatar size={40} shape="square" style={{ marginRight: "20px" }}>
          Arco
        </Avatar>
        <Typography.Text type="primary">Mark</Typography.Text>
      </Card>
      <Calendar />
    </>
  );
};

export default Welcome;
