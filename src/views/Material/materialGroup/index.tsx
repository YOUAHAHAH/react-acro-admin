import { useEffect, useRef, useState } from "react";
import {
  List,
  Result,
  Table,
  Typography,
  TableColumnProps
} from "@arco-design/web-react";
import { IconSearch } from "@arco-design/web-react/icon";
import dayjs from "dayjs";
import { queryGroupSite } from "@/api/modules/material";
import SearchBox, {
  defaultValueType
} from "@/components/SearchBox/src/index";
import MessageCom from "@/components/Message/src";
import ModalGroup from "./modalGroup";
import { useConfigTable } from "@/Hooks/useColumn";
import { typeF } from "@/utils/baseFun";

type size = "small" | "default" | "middle" | "mini" | undefined;

const columns: TableColumnProps<any>[] = [
  {
    title: "Id",
    dataIndex: "id",
    align: "center",
    fixed: "left"
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
    render: (col: string) => {
      return dayjs(col).format("YYYY-MM-DD HH:mm:ss");
    },
    align: "center"
  },
  {
    title: "更新时间",
    dataIndex: "updatedAt",
    render: (col: string) => {
      return dayjs(col).format("YYYY-MM-DD HH:mm:ss");
    },
    align: "center"
  }
];

const tableProps = {
  border: true,
  borderCell: true,
  hover: true,
  stripe: true
};

const MaterialGroup = () => {
  const ModalRef = useRef<any>();
  const [data, setData] = useState([]);
  const [resetData, setResetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const [tableSize, setTableSize] = useState<size>("default");
  const [columnsValue, setColumnsValue] = useState(columns);

  const handleSearch = (keyword: defaultValueType) => {
    setLoading(true);
    const searchData = data.filter(
      (item: { id: string }) => item.id === typeF(keyword.input, "number")
    );
    Object.keys(keyword).length === 0
      ? (setLoading(false),
        MessageCom({
          type: "warning",
          props: {
            content: "暂无搜索关键词！"
          }
        }) as any)()
      : setTimeout(() => {
          setLoading(false);
          setData(searchData);
        }, 300);
  };

  const handleReset = () => {
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
      setData(resetData);
      setLoading(false);
    }, 300);
  };

  const getApi = () => {
    setLoading(true);
    queryGroupSite()
      .then(res => {
        const { ok, result }: any = res;
        if (ok) {
          const data = result.map((item: { key: string; id: string }) => {
            item.key = item.id;
            return item;
          });
          setLoading(false);
          setData(data);
          setResetData(data);
        }
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <SearchBox
          onSearch={handleSearch}
          onReset={handleReset}
          loading={loading}
          inputList={[
            {
              key: "input",
              label: "ID",
              labelWidth: "30px",
              placeholder: "Please Enter ID",
              allowClear: true
            }
          ]}
          butGroup={{
            searchBtn: "搜索",
            resetBtn: "重置",
            searchBtnProps: {
              style: { marginRight: "8px" }
            }
          }}
        />
        {useConfigTable({
          setTableSize: setTableSize,
          setColumnsValue: setColumnsValue,
          loading: loading,
          columns: columnsValue
        })}
      </div>

      <Table
        loading={loading}
        columns={columnsValue}
        data={data}
        {...tableProps}
        size={tableSize}
        expandedRowRender={(record: any) => {
          const meta =
            record.meta?.length === undefined ? 0 : record.meta.length;
          return meta !== 0 ? (
            <List
              key={record.id}
              size="small"
              dataSource={record.meta}
              render={(
                item: { author: string; description: string },
                index: number
              ) => {
                return (
                  <List.Item key={index}>
                    <span>
                      <Typography.Text code>{item.author}</Typography.Text>
                      {item.description}
                    </span>
                    <span
                      className="list-demo-actions-icon"
                      onClick={() => {
                        setDataItem(item);
                        ModalRef.current?.ModalmaterialGroupDetail();
                      }}
                    >
                      <IconSearch />
                    </span>
                  </List.Item>
                );
              }}
            />
          ) : (
            <Result status={null} title="暂未查询到团队站点"></Result>
          );
        }}
      />

      <ModalGroup ModalRef={ModalRef} item={dataItem} />
    </>
  );
};

export default MaterialGroup;
