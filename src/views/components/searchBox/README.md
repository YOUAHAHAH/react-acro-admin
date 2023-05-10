<div align="center">
  <a href="https://arco.design" target="_blank">
    <img alt="Arco Design Logo" width="200" src="https://avatars.githubusercontent.com/u/64576149?s=200&v=4"/>
  </a>
</div>

<div align="center">
  <h1>Arco Design Search</h1>
</div>

<div align="center">

基于 [Arco Design](https://arco.design/) 的 React UI 搜索组件。

</div>


# 例子

```typescript
import { useState } from "react";
import SearchBox, { defaultValueType } from "@/views/components/searchBox/src/index";
import { Message } from "@arco-design/web-react";

const ActivityCenter = () => {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const clickSearch = (
    keyword: defaultValueType,
    setLoading: { (arg0: boolean): void }
  ) => {
    setLoading(true);
    setTimeout(() => {
      Object.keys(keyword).length === 0
        ? Message.warning("暂无搜索关键词！")
        : Message.info({
            content: `${JSON.stringify(keyword)}`
          });
      setLoading(false);
    }, 300);
  };

  const clickReset = (setLoading: { (arg0: boolean): void }) => {
    setLoading(true);
    setTimeout(() => {
      Message.success("重置成功！");
      setLoading(false);
    }, 300);
  };

  const handleSearch1 = (keyword: defaultValueType) => {
    clickSearch(keyword, setLoading1);
  };

  const handleReset1 = () => {
    clickReset(setLoading1);
  };

  const handleSearch2 = (keyword: defaultValueType) => {
    clickSearch(keyword, setLoading2);
  };

  const handleReset2 = () => {
    clickReset(setLoading2);
  };

  const handleSearch3 = (keyword: defaultValueType) => {
    clickSearch(keyword, setLoading3);
  };

  const handleReset3 = () => {
    clickReset(setLoading3);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <SearchBox
        onSearch={handleSearch1}
        onReset={handleReset1}
        loading={loading1}
        inputList={[
          {
            key: "input",
            label: "输入框",
            placeholder: "Please Enter something",
            allowClear: true,
            defaultValue: "火影忍者"
          },
          {
            key: "inputNum",
            label: "数字输入框",
            labelWidth: "100px",
            placeholder: "Please Enter Number",
            type: "number",
            defaultValue: "720"
          }
        ]}
        butGroup={{
          searchBtn: "搜索1",
          resetBtn: "重置1"
        }}
      />
      <SearchBox
        onSearch={handleSearch2}
        onReset={handleReset2}
        loading={loading2}
        inputList={[
          {
            key: "select",
            label: "选择框",
            type: "select",
            defaultValue: "火影忍者",
            selectGroupProps: {
              options: [
                "火影忍者",
                "七龙珠",
                "妖精的尾巴",
                "死神来了",
                "蜡笔小新",
                "哆啦A梦"
              ],
              allowClear: true,
              placeholder: "Please select"
            }
          },
          {
            key: "radio",
            type: "radio",
            label: "单选按钮",
            defaultValue: "国漫",
            radioGroupProps: {
              options: [
                { label: "日漫", value: "日漫" },
                { label: "国漫", value: "国漫" }
              ],
              type: "button"
            }
          }
        ]}
        butGroup={{
          searchBtn: "搜索2",
          searchBtnProps: {
            shape: "round",
            type: "primary"
          },
          resetBtn: "重置2",
          resetBtnProps: {
            disabled: true,
            type: "secondary",
            status: "warning"
          }
        }}
      />
      <SearchBox
        onSearch={handleSearch3}
        onReset={handleReset3}
        loading={loading3}
        inputList={[
          {
            key: "radio",
            type: "radio",
            label: "单选按钮",
            defaultValue: "国漫",
            radioGroupProps: {
              options: [
                { label: "日漫", value: "日漫" },
                { label: "国漫", value: "国漫" }
              ]
            }
          },
          {
            key: "date",
            type: "DatePicker",
            label: "时间选择",
            defaultValue: "2000-01-01",
            DatePickerItemProps: {}
          }
        ]}
        butGroup={{
          ButtonGroup: true,
          searchBtn: "搜索2",
          searchBtnProps: {
            shape: "round",
            type: "primary",
            style: { padding: "0 8px" }
          },
          resetBtn: "重置2",
          resetBtnProps: {
            shape: "round",
            type: "primary",
            style: { padding: "0 8px" }
          }
        }}
      />
    </div>
  );
};

export default ActivityCenter;

```

# API

| 参数名    | 描述     | 类型                                | 默认值 | 版本 |
| --------- | -------- | ----------------------------------- | ------ | ---- |
| butGroup  | 按钮     | butGroup                            | `-`    | -    |
| inputList | 输入框   | InputItemProps[]                    | `-`    | -    |
| loading   | 按钮加载 | boolean                             | `-`    | -    |
| onReset   | 重置事件 | () => void                          | `-`    | -    |
| onSearch  | 搜索事件 | (keyword: defaultValueType) => void | `-`    | -    |


### InputItemProps
| 参数名             | 描述           | 类型                                                                            | 默认值  |
| ------------------ | -------------- | ------------------------------------------------------------------------------- | ------- |
| key                | 键值(唯一)     | string \| number                                                                | 必填    |
| label              | 输入框标题     | string                                                                          | `-`     |
| labelWidth         | 输入框标题宽度 | string \| number                                                                | `-`     |
| type               | 节点类型       | "input" \| "number" \| "radio" \| "select" \| "DatePicker"                      | "input" |
| style              | 节点样式       | CSSProperties                                                                   |         |
| props              |                | InputProps\| InputNumberProps\| RadioGroupProps\| SelectProps\| DatePickerProps | `-`     |
| [key: string]: any | 其它参数       | `-`                                                                             | `-`     |

```typescript
type defaultValueType = {
  [key: string]: string | number | string[] | undefined;
};

type butGroup = {
  searchBtn?: ReactNode; // 搜索按钮文本
  searchBtnProps?: ButtonProps;
  resetBtn?: ReactNode; // 重置按钮文本
  resetBtnProps?: ButtonProps;
  ButtonGroup?: boolean; // 组合按钮
};
```