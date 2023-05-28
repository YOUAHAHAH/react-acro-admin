import Download, { arrayBufferToBase64 } from "./download";
import { DownloadOptions, DownloadProps, httpType } from "./downLoadType";

const DownloadFile = Download;

export default DownloadFile;
export { arrayBufferToBase64 };
export type { DownloadOptions, DownloadProps, httpType };
