import { Link } from "@arco-design/web-react";
import DownloadFile from "@/components/Download/src/index";

const Download = () => {
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
        className="mr-[10px]"
        text="下载状态"
        loading={true}
        fileOption={{
          url: "https://avatars.githubusercontent.com/u/101163308?v=4",
          name: "react-acro-admin"
        }}
        onSuccess={url => console.log(url)}
        onError={error => console.error("Download failed: ", error)}
      />
      <DownloadFile
        className="mr-[10px]"
        text="下载方式"
        fileOption={{
          url: "https://avatars.githubusercontent.com/u/101163308?v=4",
          name: "react-acro-admin",
          http: "fetch"
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
    </div>
  );
};

export default Download;
