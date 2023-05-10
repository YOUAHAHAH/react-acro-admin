import {
  useCallback,
  useRef,
  useState,
  memo,
  useMemo,
  MutableRefObject,
  useEffect
} from "react";
import {
  Input,
  Button,
  Space,
  InputNumber,
  Radio,
  Select,
  DatePicker
} from "@arco-design/web-react";
import { IconSearch } from "@arco-design/web-react/icon";
import { InputItemProps, SearchBoxProps, defaultValueType } from "./searchType";
import searchBox from "./searchBox.module.less";
const ButtonGroup = Button.Group;

export const SearchBox: React.FC<SearchBoxProps> = memo(
  ({ onSearch, onReset, loading, inputList, butGroup }) => {
    const [inputValues, setInputValues] = useState<defaultValueType>({});

    const inputValuesRef: MutableRefObject<defaultValueType> =
      useRef(inputValues);

    const handleSearch = useCallback(() => {
      onSearch(inputValuesRef.current as any);
    }, [onSearch, inputValuesRef]);

    const handleReset = useCallback(() => {
      setInputValues({});
      inputValuesRef.current = {};
      onReset?.();
    }, [onReset]);

    const handleInputChange = useCallback(
      (e: string | number | undefined, id: string | number) => {
        inputValuesRef.current = {
          ...inputValuesRef.current,
          [id]: e
        };
        setInputValues({ ...inputValuesRef.current });
      },
      [setInputValues]
    );

    useEffect(() => {
      inputList.map(item => {
        if (item.defaultValue) {
          inputValuesRef.current = {
            ...inputValuesRef.current,
            [item.key]: item.defaultValue
          };
        }
      });
      setInputValues({ ...inputValuesRef.current });
    }, []);

    const renderFormItem = useCallback(
      ({
        key,
        label,
        labelWidth = "80px",
        type = "input",
        style,
        ...rest
      }: InputItemProps) => {
        const {
          style: itemStyle,
          radioGroupProps,
          selectGroupProps,
          DatePickerItemProps,
          ...restProps
        } = rest;
        const inputProps = useMemo(
          () => ({
            autoComplete: "off",
            value: inputValues[key]?.toString() ?? "",
            onChange: (e: string | number) => handleInputChange(e, key),
            style: { ...style, width: itemStyle?.width ?? "200px" },
            ...restProps
          }),
          [key, inputValues, handleInputChange]
        );

        const radioProps = {
          onChange: (e: any) => handleInputChange(e, key),
          value: inputValues[key] === undefined ? undefined : inputValues[key],
          style,
          ...radioGroupProps
        };

        const selectProps = {
          onChange: (e: any) => handleInputChange(e, key),
          value: inputValues[key] === undefined ? undefined : inputValues[key],
          style: { ...style, width: itemStyle?.width ?? "200px" },
          ...selectGroupProps
        };

        const DatePickerProps = {
          onChange: (e: any) => handleInputChange(e, key),
          value: inputValues[key] === undefined ? undefined : inputValues[key],
          style: { ...style, width: itemStyle?.width ?? "200px" },
          ...DatePickerItemProps
        };

        return (
          <div key={key} className={searchBox.searchBoxItem}>
            {label && (
              <label
                style={{ width: labelWidth }}
                className={searchBox.searchBoxLabel}
              >
                {label + "："}
              </label>
            )}
            {type === "number" ? (
              <InputNumber {...inputProps} />
            ) : type === "radio" ? (
              <Radio.Group {...radioProps} />
            ) : type === "select" ? (
              <Select {...selectProps} />
            ) : type === "DatePicker" ? (
              <DatePicker {...DatePickerProps} />
            ) : (
              <Input {...inputProps} />
            )}
          </div>
        );
      },
      [inputValues, handleInputChange]
    );

    return (
      <Space className={searchBox.searchBoxContainer}>
        {inputList.map(renderFormItem)}
        <Space style={{ marginBottom: "10px" }}>
          {butGroup?.ButtonGroup ? (
            <ButtonGroup>
              <Button
                type="primary"
                loading={loading}
                icon={<IconSearch />}
                onClick={handleSearch}
                className={searchBox.searchBtn}
                {...(butGroup?.searchBtnProps ?? {})}
              >
                {butGroup?.searchBtn ?? "搜索"}
              </Button>
              {onReset && (
                <Button
                  loading={loading}
                  onClick={handleReset}
                  {...(butGroup?.resetBtnProps ?? {})}
                >
                  {butGroup?.resetBtn ?? "重置"}
                </Button>
              )}
            </ButtonGroup>
          ) : (
            <>
              <Button
                type="primary"
                loading={loading}
                icon={<IconSearch />}
                onClick={handleSearch}
                className={searchBox.searchBtn}
                {...(butGroup?.searchBtnProps ?? {})}
              >
                {butGroup?.searchBtn ?? "搜索"}
              </Button>
              {onReset && (
                <Button
                  loading={loading}
                  onClick={handleReset}
                  {...(butGroup?.resetBtnProps ?? {})}
                >
                  {butGroup?.resetBtn ?? "重置"}
                </Button>
              )}
            </>
          )}
        </Space>
      </Space>
    );
  }
);
