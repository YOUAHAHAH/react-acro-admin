import { QRCodeRenderersOptions } from "qrcode";

export interface opts extends QRCodeRenderersOptions {
  errorCorrectionLevel?: "H" | "Q" | "M" | "L";
  quality?: number;
  margin?: number;
  color?: any;
  type?: string;
}

export interface customOpt {
  content: string;
  radio: string;
  type: string;
  optionsHook: {
    color: {
      dark: string;
      light: string;
    };
  };
}

export interface ctxProps {
  backgroundColor?: string;
  font?: string;
  textColor?: string;
  text?: string | number;
  onMouseDown?: any;
  onMouseUp?: any;
  generate?: boolean;
}
