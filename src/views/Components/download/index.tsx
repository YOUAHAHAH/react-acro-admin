import { Link } from "@arco-design/web-react";
import DownloadFile from "@/components/Download/src/index";

const Download = () => {
  return (
    <div className="flex items-center">
      <DownloadFile
        fileOption={{
          url: "https://avatars.githubusercontent.com/u/101163308?v=4",
          name: "acroReact_ts"
        }}
        onSuccess={url => console.log(url)}
        onError={error => console.error("Download failed: ", error)}
      />

      <DownloadFile
        fileOption={{
          url: "https://avatars.githubusercontent.com/u/101163308?v=4",
          name: "acroReact_ts"
        }}
        onSuccess={url => console.log(url)}
        onError={error => console.error("Download failed: ", error)}
      >
        <Link>下载</Link>
      </DownloadFile>
    </div>
  );
};

export default Download;
