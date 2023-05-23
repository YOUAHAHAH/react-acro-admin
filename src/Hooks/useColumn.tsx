import { useState, useCallback } from "react";
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
  IconSettings,
  IconDragDotVertical
} from "@arco-design/web-react/icon";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";

const DragHandle = SortableHandle(() => <IconDragDotVertical />);

// const getIndex = (items: string[], value: string) => {
//   let index;
//   items.map((item, i) => {
//     if (item === value) return (index = i);
//   });
//   return index;
// };

/**
 *
 * @param props
 * setTableSize: 改变表格大小
 * setColumnsValue: 改变表头顺序
 * columns: 表头
 * loading: 加载状态
 * @returns 返回一个表格设置组件
 */
const useConfigTable = (props: {
  setTableSize: Function;
  setColumnsValue: Function;
  loading: boolean;
  columns: any;
}) => {
  const { setTableSize, setColumnsValue, loading, columns } = props;
  /**
   * fold: 展开 折叠
   */
  const [fold, setFold] = useState(false);
  /**
   * items: 拖拽标题(表头)
   * checkedValue: 是否展示 默认为展示
   */
  const [state, setState] = useState(() => {
    const titleArr: string[] = columns?.map(
      (column: { title: string }) => column.title
    );
    return { items: titleArr, checkedValue: Array(titleArr.length).fill(true) };
  });
  /**
   * indeterminate: 半选状态
   */
  // const [indeterminate, setIndeterminate] = useState(false);
  /**
   * checkAll: 列展示 默认为展示
   */
  // const [checkAll, setCheckAll] = useState(true);

  const handleExpend = () => {
    setFold(!fold);
  };

  const onSortEnd = useCallback(
    ({ oldIndex, newIndex }: any) => {
      setState(({ items, checkedValue }) => {
        const newItems = [...items];
        const newCheckedValue = [...checkedValue];
        newItems.splice(newIndex, 0, newItems.splice(oldIndex, 1)[0]);
        newCheckedValue.splice(
          newIndex,
          0,
          newCheckedValue.splice(oldIndex, 1)[0]
        );
        return { items: newItems, checkedValue: newCheckedValue };
      });
      setColumnsValue((item: any) => {
        const newItems = [...item];
        newItems.splice(newIndex, 0, newItems.splice(oldIndex, 1)[0]);
        return newItems;
      });
    },
    [state.items, setColumnsValue]
  );

  const SortableItem = SortableElement(({ value }: any) => (
    <li key={`item-${value}`} style={{ zIndex: "999999", margin: "5px" }}>
      <span style={{ cursor: "move", margin: "0 10px" }}>
        <DragHandle />
      </span>
      {/* <Checkbox
        checked={
          state.checkedValue[getIndex(state.items, value) as unknown as number]
        }
        onChange={(checked: boolean) => {
          setState(({ items, checkedValue }) => {
            const result = [...checkedValue];
            const index = getIndex(items, value) as unknown as number;
            result[index] = checked;
            return { items, checkedValue: result };
          });
        }}
      > */}
      {value}
      {/* </Checkbox> */}
    </li>
  ));

  const sortedItems = state.items.map((value, index) => (
    <SortableItem key={`item-${index}`} index={index} value={value} />
  ));

  const SortableList = SortableContainer(({ items }: any) => {
    return (
      <ul style={{ display: "flex", flexDirection: "column" }}>{items}</ul>
    );
  });

  // useEffect(() => {
  //   const checkedCount = state.checkedValue.filter(Boolean).length;
  //   setCheckAll(checkedCount === state.checkedValue.length);
  //   setIndeterminate(
  //     checkedCount > 0 && checkedCount < state.checkedValue.length
  //   );
  // }, [state.checkedValue]);

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
                {/* <Checkbox
                  onChange={(checked: boolean) => {
                    setState(({ items }) => {
                      return {
                        items,
                        checkedValue: Array(items.length).fill(checked)
                      };
                    });
                  }}
                  checked={checkAll}
                  indeterminate={indeterminate}
                >
                  列展示
                </Checkbox> */}
                <SortableList
                  items={sortedItems}
                  onSortEnd={onSortEnd}
                  useDragHandle
                />
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

export { useConfigTable };
