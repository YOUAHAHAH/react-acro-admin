import { useState } from "react";
import { Button } from "@arco-design/web-react";
import { nowDate } from "@/utils/timeConfig";
import { DownloadProps, DownloadOptions } from "./downLoadType";
import axios from "axios";

const downloadFile = async (fileOption: DownloadOptions) => {
  const {
    url,
    name,
    type,
    headers,
    http = "xhr",
    size = 10 * 1024 * 1024
  } = fileOption;

  try {
    let blobData!: Blob;
    let fileName: string = nowDate().toString();

    if (http === "xhr") {
      const response = await axios.get<Blob>(url, {
        // withCredentials: true,
        responseType: "blob",
        headers: headers ? Object.fromEntries(new Headers(headers)) : undefined
      });
      blobData = response.data;
    } else if (http === "fetch") {
      const response = await fetch(url, { headers });
      blobData = await response.blob();
    }

    if (type) {
      fileName = `${name}.${type}`;
    }

    const flowNumber = size; // 限制大小 使用流式下载
    if (blobData.size > flowNumber) {
      const chunkSize = flowNumber; // 分片大小为 10MB
      const chunks = Math.ceil(blobData.size / chunkSize); // 计算需要分多少片
      let downloadedChunks = 0; // 已下载的片数

      const stream = new ReadableStream({
        start(controller) {
          let startByte = 0;
          let endByte =
            chunkSize - 1 < blobData.size - 1
              ? chunkSize - 1
              : blobData.size - 1; // 计算每片的起始和结束字节位置

          const downloadChunk = async () => {
            try {
              const response = await axios.get<Blob>(url, {
                responseType: "blob",
                headers: {
                  Range: `bytes=${startByte}-${endByte}` // 设置 HTTP Range 头部，指定需要下载的字节范围
                }
              });
              const chunk = response.data;
              controller.enqueue(chunk); // 将下载的分片加入可读流中
              downloadedChunks++;

              if (downloadedChunks < chunks) {
                startByte = endByte + 1;
                endByte =
                  startByte + chunkSize - 1 < blobData.size - 1
                    ? startByte + chunkSize - 1
                    : blobData.size - 1;
                downloadChunk(); // 如果还有未下载的分片，则继续下载
              } else {
                controller.close(); // 如果所有分片都已下载完毕，则关闭可读流
              }
            } catch (error) {
              console.error(error);
              controller.error(error); // 如果下载出错，则将错误信息传递给可读流的错误处理函数
            }
          };

          downloadChunk(); // 开始下载第一片分片
        }
      });

      const urlObject = URL.createObjectURL(
        new Blob([stream as unknown as any], { type: blobData.type }) // 将可读流转换为 Blob 对象，并创建一个 Blob URL
      );

      const link = document.createElement("a");
      link.href = urlObject;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(urlObject);
    } else {
      const urlObject = URL.createObjectURL(blobData);
      const link = document.createElement("a");
      link.href = urlObject;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(urlObject);
    }
  } catch (error) {
    throw new Error("下载失败，请检查下载文件是否存在！");
  }
};

const Download = ({
  Btnprops,
  children,
  style,
  className,
  onSuccess,
  onError,
  fileOption,
  loading = false,
  text = "下载"
}: DownloadProps) => {
  const [isDownloading, setIsDownloading] = useState(loading);

  const handleDownload = async (event: any) => {
    setIsDownloading(true);
    event.preventDefault();
    if (!fileOption.url) {
      onError && onError(new Error("下载地址不存在"));
      return;
    }

    try {
      await downloadFile(fileOption);
      onSuccess && onSuccess(fileOption.url);
    } catch (error) {
      console.error(error);
      onError && onError(error as Error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      {children ? (
        <div onClick={handleDownload}>{children}</div>
      ) : (
        <Button
          {...Btnprops}
          onClick={handleDownload}
          loading={loading ? isDownloading : false}
          style={{ ...style }}
          className={className}
        >
          {text}
        </Button>
      )}
    </>
  );
};

/**
 *
 * @param {Iterable<number>} buffer
 * @returns base64编码
 */
const arrayBufferToBase64 = (buffer: Iterable<number>) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

export { arrayBufferToBase64 };
export default Download;
