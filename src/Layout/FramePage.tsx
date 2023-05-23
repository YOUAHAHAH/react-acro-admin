import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, Space } from "@arco-design/web-react";
import { routerArray } from "@/router/index";
import l from "./index.module.less";

const FramePage = () => {
  const { pathname } = useLocation();
  const [frameSrc, setFrameSrc] = useState<string>();
  const [outside, setOutside] = useState<boolean>(false);

  useEffect(() => {
    routerArray.map(item => {
      item.children?.map(i => {
        if (i.meta?.isOutsideLink === true && pathname === i.path) {
          setOutside(true);
          setFrameSrc(i.meta?.frameSrc);
          window.open(i.meta?.frameSrc);
        } else if (i.meta?.isLink === true && pathname === i.path) {
          setOutside(false);
          setFrameSrc(i.meta?.frameSrc);
        }
      });
    });
  }, [pathname]);

  return (
    <>
      {outside ? (
        <Space size={40}>
          <Link href={frameSrc} target="_blank" rel="noreferrer">
            {frameSrc}🍒🍉🍊
          </Link>
        </Space>
      ) : (
        <iframe src={frameSrc} className={l.frame_iframe}></iframe>
      )}
    </>
  );
};

export default FramePage;
