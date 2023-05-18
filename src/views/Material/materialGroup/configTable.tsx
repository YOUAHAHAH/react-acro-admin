import { useContext, useState } from "react";
import {
  Button,
  Dropdown,
  Tooltip,
  Menu,
  Breadcrumb
} from "@arco-design/web-react";
import {
  IconToBottom,
  IconToRight,
  IconSort,
  IconSettings
} from "@arco-design/web-react/icon";
import Draggable from "@/views/Material/materialGroup/draggable";
import ColumnContext from "./ColumnContext";

const ConfigTable = (props: { setTableSize: Function; loading: boolean }) => {
  const { setTableSize, loading } = props;
  const { columnsValue } = useContext(ColumnContext);
  const [fold, setFold] = useState(false);

  const handleExpend = () => {
    setFold(!fold);
  };

  return (
    <Breadcrumb separator={"|"}>
      <Breadcrumb.Item>
        <Tooltip content={fold ? "展开" : "折叠"}>
          <Button
            shape="circle"
            type="secondary"
            icon={fold ? <IconToRight /> : <IconToBottom />}
            onClick={handleExpend}
            disabled={loading}
          />
        </Tooltip>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Tooltip content="密度">
          <Dropdown
            trigger="click"
            droplist={
              <Menu
                defaultValue={"default"}
                onClickMenuItem={key => {
                  setTableSize(key);
                }}
              >
                <Menu.Item key="default">默认</Menu.Item>
                <Menu.Item key="middle">中</Menu.Item>
                <Menu.Item key="small">小</Menu.Item>
                <Menu.Item key="mini">迷你</Menu.Item>
              </Menu>
            }
          >
            <Button
              shape="circle"
              type="secondary"
              icon={<IconSort />}
              disabled={loading}
            />
          </Dropdown>
        </Tooltip>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Tooltip content="列设置">
          <Dropdown
            trigger="click"
            droplist={
              <Menu style={{ width: "160px", padding: "10x" }}>
                <Draggable columns={columnsValue} />
              </Menu>
            }
          >
            <Button
              shape="circle"
              type="secondary"
              icon={<IconSettings />}
              disabled={loading}
            />
          </Dropdown>
        </Tooltip>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default ConfigTable;
