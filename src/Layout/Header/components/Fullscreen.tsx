import { useState, useEffect } from "react";
import { Button, Tooltip } from "@arco-design/web-react";
import {
  IconFullscreenExit,
  IconFullscreen
} from "@arco-design/web-react/icon";
import { beFull, exitFull, checkFull } from "@/Hooks/useFull";

const HeaderFullscreen = () => {
  const [full, setFull] = useState<boolean>(false);

  useEffect(() => {
    window.onresize = function () {
      if (!checkFull()) {
        setFull(false);
      }
    };
  }, []);

  return (
    <>
      <Tooltip content={full ? "点击退出全屏模式" : "点击切换全屏模式"}>
        {full ? (
          <Button
            shape="circle"
            type="secondary"
            icon={<IconFullscreenExit />}
            onClick={() => {
              setFull(!full);
              exitFull();
            }}
          />
        ) : (
          <Button
            shape="circle"
            type="secondary"
            icon={<IconFullscreen />}
            onClick={() => {
              setFull(!full);
              beFull();
            }}
          />
        )}
      </Tooltip>
    </>
  );
};

export default HeaderFullscreen;
