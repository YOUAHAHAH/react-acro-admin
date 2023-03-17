import { useState } from "react";
import { Tabs, Radio } from "@arco-design/web-react";
const TabPane = Tabs.TabPane;
const paneStyle = {
  width: "100%",
  height: 50,
  padding: "24px 0",
  color: "#939aa3"
};
const tabs = [...new Array(30)].map((x, i) => ({
  title: `标签${i + 1}`,
  key: `key${i + 1}`,
  content: `标签${i + 1}内容`
}));

const Welcome = () => {
  const [direction, setDirection] = useState("horizontal");
  return (
    <div>
      <Radio.Group
        type="button"
        name="direction"
        value={direction}
        onChange={setDirection}
        style={{ marginBottom: 40 }}
        options={["horizontal", "vertical"]}
      ></Radio.Group>
      <Tabs defaultActiveTab="key1" style={{ height: 200 }}>
        {tabs.map((x, i) => (
          <TabPane destroyOnHide key={x.key} title={x.title}>
            <div style={paneStyle}>{`这里是${x.content}`}</div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default Welcome;
