import { useState } from "react";
import SearchBox, { defaultValueType } from "@/components/SearchBox/src/index";
import MessageCom from "@/components/Message/src/index";

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
        ? (
            MessageCom({
              type: "warning",
              props: {
                content: "暂无搜索关键词！"
              }
            }) as any
          )()
        : (
            MessageCom({
              type: "info",
              props: {
                content: `${JSON.stringify(keyword)}`
              }
            }) as any
          )();
      setLoading(false);
    }, 300);
  };

  const clickReset = (setLoading: { (arg0: boolean): void }) => {
    setLoading(true);
    setTimeout(() => {
      (
        MessageCom({
          type: "success",
          props: {
            content: "重置成功！"
          }
        }) as any
      )();
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
    <div className="flex flex-col">
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
            labelWidth: "120px",
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
