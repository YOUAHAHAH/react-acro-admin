import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Image } from "@arco-design/web-react";
import { IconEye, IconDownload } from "@arco-design/web-react/icon";
import h from "./index.module.less";

const hook = (props: any) => {
  const { text, opts, type, tag } = props;
  const [url, setUrl] = useState<string>();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    tag === "img"
      ? QRCode.toString(text, opts, function (err, string) {
          if (err) throw err;
          setUrl(
            "data:image/svg+xml;charset=utf-8," + encodeURIComponent(string)
          );
        })
      : QRCode.toCanvas(text, opts, function (err: any, canvas: any) {
          if (err) throw err;
          const container = document.getElementById("container");
          container?.appendChild(canvas);
        });
  }, []);

  return (
    <div className={h.card}>
      {tag === "img" ? (
        <Image
          src={url}
          title={type === "text" ? text : null}
          actions={[
            <button
              key="1"
              className="image-demo-action-item"
              onClick={_e => {
                setVisible(true);
              }}
            >
              <IconEye />
            </button>,
            <button key="2" className="image-demo-action-item">
              <a href={url} download={url}>
                <IconDownload />
              </a>
            </button>
          ]}
          previewProps={{
            visible,
            onVisibleChange: _e => {
              setVisible(false);
            }
          }}
          width={200}
          footerPosition="inner"
          alt="lamp3"
        />
      ) : (
        <div id="container"></div>
      )}
    </div>
  );
};

export default hook;
