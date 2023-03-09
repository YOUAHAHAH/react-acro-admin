import { useState } from "react";
import {
  Button,
  Radio,
  Pagination,
  Table,
  Switch,
  Space,
  Typography,
  ConfigProvider,
  Drawer,
} from "@arco-design/web-react";
import { IconSettings } from "@arco-design/web-react/icon";
import zhCN from "@arco-design/web-react/es/locale/zh-CN";
import enUS from "@arco-design/web-react/es/locale/en-US";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Salary",
    dataIndex: "salary",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];
const data = [
  {
    key: "1",
    name: "Jane Doe",
    salary: 23000,
    address: "32 Park Road, London",
    email: "jane.doe@example.com",
  },
  {
    key: "2",
    name: "Alisa Ross",
    salary: 25000,
    address: "35 Park Road, London",
    email: "alisa.ross@example.com",
  },
  {
    key: "3",
    name: "Kevin Sandra",
    salary: 22000,
    address: "31 Park Road, London",
    email: "kevin.sandra@example.com",
  },
];

const HeaderSetting = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [locale, setLocale] = useState("zh-CN");
  const [hideOnSinglePage, setHideOnSinglePage] = useState(true);
  function getLocale() {
    switch (locale) {
      case "zh-CN":
        return zhCN;

      case "en-US":
        return enUS;

      default:
        return zhCN;
    }
  }
  return (
    <>
      <Button
        shape='circle'
        type='secondary'
        icon={<IconSettings />}
        onClick={() => {
          setVisible(true);
        }}
      />
      <ConfigProvider
        locale={getLocale()}
        tablePagination={{
          hideOnSinglePage,
        }}>
        <Drawer
          width={332}
          title={<span>Basic Information </span>}
          visible={visible}
          onOk={() => {
            setVisible(false);
          }}
          onCancel={() => {
            setVisible(false);
          }}>
          <Radio.Group
            value={locale}
            options={["zh-CN", "en-US"]}
            name='locale'
            type='button'
            mode='fill'
            onChange={setLocale}
            style={{ marginBottom: 40 }}
          />
          <Pagination
            total={200}
            showTotal
            sizeCanChange
            style={{ marginBottom: 20, marginRight: 40, minWidth: 550 }}
          />
          <Space style={{ marginBottom: 10 }}>
            <Typography.Text>tablePagination.hideOnSinglePage</Typography.Text>
            <Switch
              checked={hideOnSinglePage}
              onChange={checked => setHideOnSinglePage(checked)}
            />
          </Space>
          <Table columns={columns} data={data} />
        </Drawer>
      </ConfigProvider>
    </>
  );
};

export default HeaderSetting;
