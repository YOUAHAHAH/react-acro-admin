import {
  ButtonProps,
  DatePickerProps,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  SelectProps
} from "@arco-design/web-react";
import { CSSProperties, ReactNode } from "react";

export declare interface InputItemProps {
  key: string | number;
  label?: string;
  labelWidth?: string | number;
  type?: "input" | "number" | "radio" | "select" | "DatePicker";
  style?: CSSProperties;
  props?:
    | InputProps
    | InputNumberProps
    | RadioGroupProps
    | SelectProps
    | DatePickerProps;
  [key: string]: unknown;
}

export declare interface defaultValueType {
  [key: string]: string | number | string[] | undefined;
}

export declare interface butGroup {
  searchBtn?: ReactNode;
  searchBtnProps?: ButtonProps;
  resetBtn?: ReactNode;
  resetBtnProps?: ButtonProps;
  ButtonGroup?: boolean;
}

export type SearchBoxProps = {
  // onSearch: (keyword: { [key: string]: string | number }) => void;
  onSearch: (keyword: defaultValueType) => void;
  onReset?: () => void;
  loading?: boolean;
  inputList: InputItemProps[];
  defaultValue?: defaultValueType;
  butGroup?: butGroup;
};
