import { useEffect, useState } from "react";
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
        用户当前分数
        <Typography.Text type="primary">Mark</Typography.Text>
      </Card>
      {/* <div style={{ display: "flex", width: "100%" }}> */}
      <Calendar />
      {/* <MoveAbout /> */}
      {/* </div> */}
    </>
  );
};

export default Welcome;
