import { ReactNode, CSSProperties } from "react";
import { MessageProps } from "@arco-design/web-react";

export declare type msgType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "normal"
  | "loading"
  | "clear";

export declare type msgLoadingProps = {
  loadingId?: string;
  loadingContent: ReactNode | string;
  loadingStyle?: CSSProperties;
  loadingClassName?: string | string[];
  loadingTransitionClassNames?: string;
  loadingTransitionTimeout?: {
    enter?: number;
    exit?: number;
  };
  loadingShowIcon?: boolean;
  loadingIcon?: ReactNode;
  loadingDuration?: number;
  loadingPosition?: "top" | "bottom";
  loadingClosable?: boolean;
  loadingOnClose?: () => void;
  delay?: number;
};

export interface msgItemProps extends MessageProps {
  feedBack?: boolean;
  grouping?: boolean;
}

export type msgProps = {
  type?: msgType;
  props?: msgItemProps;
  loadingProps?: msgLoadingProps;
  // initialCount?: number;
};
