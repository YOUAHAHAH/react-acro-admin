import { ButtonProps } from "@arco-design/web-react";

export interface DownloadOptions {
  url: string;
  name?: string;
  type?: string;
  http?: httpType;
  headers?: HeadersInit;
  size?: number;
}

export type DownloadProps = {
  text?: string | number;
  Btnprops?: ButtonProps;
  style?: React.CSSProperties;
  className?: string;
  onSuccess?: (url?: string) => void;
  onError?: (error: Error) => void;
  children?: React.ReactNode;
  fileOption: DownloadOptions;
  loading?: boolean;
};

/**
 * xhr axios
 * fetch
 */
export type httpType = "xhr" | "fetch";
