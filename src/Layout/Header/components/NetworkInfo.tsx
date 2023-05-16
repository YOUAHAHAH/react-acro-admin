import { useState } from "react";
import { Button, Drawer, Tooltip, Typography } from "@arco-design/web-react";
import { IconWifi } from "@arco-design/web-react/icon";
import { useNavigator } from "@/Hooks/useNavigator";

const NetworkInfo = () => {
  const { natWerkInfo } = useNavigator();
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Tooltip content={"查看网络状态"}>
        <Button
          shape="circle"
          type="secondary"
          icon={<IconWifi />}
          onClick={() => {
            setVisible(!visible);
          }}
        />
      </Tooltip>

      <Drawer
        height={180}
        title={<span>网络状态</span>}
        visible={visible}
        placement="top"
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
      >
        {natWerkInfo.type !== "offline" ? (
          <>
            <Typography.Text type="primary">
              <div>网络状态：{natWerkInfo.type}</div>
              <div>延迟：{natWerkInfo.rtt}ms</div>
              <div>下载速度：{natWerkInfo.downlink}MB/s</div>
            </Typography.Text>
          </>
        ) : (
          <>
            <Typography.Text type="error">网络状态：离线</Typography.Text>
          </>
        )}
      </Drawer>
    </>
  );
};

export default NetworkInfo;
