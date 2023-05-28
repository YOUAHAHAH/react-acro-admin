import { Link } from "@arco-design/web-react";
import DownloadFile, {
  arrayBufferToBase64
} from "@/components/Download/src/index";
import { useState } from "react";

const Download = () => {
  const [imageData, setImageData] = useState("");

  fetch("https://avatars.githubusercontent.com/u/101163308?v=4")
    .then(response => response.arrayBuffer())
    .then(buffer => {
      const base64Flag = "data:image/jpeg;base64,";
      const imageStr = arrayBufferToBase64(buffer);
      setImageData(base64Flag + imageStr);
    });

  return (
    <div className="flex items-center">
      <DownloadFile
        className="mr-[10px]"
        text="根据文件地址下载"
        fileOption={{
          url: "https://avatars.githubusercontent.com/u/101163308?v=4",
          name: "react-acro-admin"
        }}
        onSuccess={url => console.log(url)}
        onError={error => console.error("Download failed: ", error)}
      />
      <DownloadFile
        fileOption={{
          url: "https://avatars.githubusercontent.com/u/101163308?v=4",
          name: "react-acro-admin"
        }}
        onSuccess={url => console.log(url)}
        onError={error => console.error("Download failed: ", error)}
      >
        <Link>不同标签展示下载</Link>
      </DownloadFile>
      <img src={imageData} alt="Example" />;
    </div>
  );
};

export default Download;
