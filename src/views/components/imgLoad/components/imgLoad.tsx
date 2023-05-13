import { useEffect, useRef, useState } from "react";
import { Tabs, Typography } from "@arco-design/web-react";
import InOb from "@/views/components/imgLoad/src/index";
import w from "./index.module.less";
import loadingImg from "@/assets/img/loading.png";

const TabPane = Tabs.TabPane;

const imgLoad = () => {
  const [activeTab, setActiveTab] = useState("1");
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    imgRefs.current = Array.from({ length: 30 }).map(() => null);
  }, []);

  return (
    <Tabs activeTab={activeTab} onChange={setActiveTab}>
      <TabPane key="1" title="Tab 1">
        <Typography.Paragraph>
          <div className={w.card_list}>
            {Array(30)
              .fill(null)
              .map((_, index) => {
                return (
                  <div key={index} className={w.item}>
                    <img
                      src={loadingImg}
                      ref={imgRef => {
                        (imgRefs.current[index] as HTMLImageElement | null) =
                          imgRef;
                      }}
                      data-src="https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/bd3eb13533fa828bf709f145fb1f4134970a5a69.jpg"
                    />
                  </div>
                );
              })}
            <InOb imgRefs={imgRefs} />
          </div>
        </Typography.Paragraph>
      </TabPane>
      <TabPane key="2" title="Tab 2">
        <Typography.Paragraph>Content of Tab Panel 2</Typography.Paragraph>
      </TabPane>
      <TabPane key="3" title="Tab 3">
        <Typography.Paragraph>Content of Tab Panel 3</Typography.Paragraph>
      </TabPane>
    </Tabs>
  );
};

export default imgLoad;
