import { useState, useCallback, useEffect, useContext } from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from "react-sortable-hoc";
import { Checkbox } from "@arco-design/web-react";
import { IconDragDotVertical } from "@arco-design/web-react/icon";
import ColumnContext from "@/views/Material/materialGroup/ColumnContext";

const DragHandle = SortableHandle(() => <IconDragDotVertical />);

const SortableComponent = (props: { columns: any }) => {
  const { columns } = props;
  const { setColumnsValue } = useContext(ColumnContext);
  const [tableColumns, setTableColumns] = useState(columns);
  const [state, setState] = useState(() => {
    const titleArr: string[] = columns.map(
      (column: { title: string }) => column.title
    );
    return { items: titleArr, checkedValue: Array(titleArr.length).fill(true) };
  });
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(true);

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
      setTableColumns((item: any) => {
        const newItems = [...item];
        newItems.splice(newIndex, 0, newItems.splice(oldIndex, 1)[0]);
        setColumnsValue(newItems);
        return newItems;
      });
    },
    [state.items, setColumnsValue]
  );

  const getIndex = (items: string[], value: string) => {
    let index;
    items.map((item, i) => {
      if (item === value) return (index = i);
    });
    return index;
  };

  const SortableItem = SortableElement(({ value }: any) => (
    <li key={`item-${value}`} style={{ zIndex: "999999" }}>
      <span style={{ cursor: "grab" }}>
        <DragHandle />
      </span>
      <Checkbox
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
      >
        {value}
      </Checkbox>
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

  useEffect(() => {
    const checkedCount = state.checkedValue.filter(Boolean).length;
    setCheckAll(checkedCount === state.checkedValue.length);
    setIndeterminate(
      checkedCount > 0 && checkedCount < state.checkedValue.length
    );
  }, [state.checkedValue]);

  return (
    <>
      <Checkbox
        onChange={(checked: boolean) => {
          setState(({ items }) => {
            return { items, checkedValue: Array(items.length).fill(checked) };
          });
        }}
        checked={checkAll}
        indeterminate={indeterminate}
      >
        列展示
      </Checkbox>
      <SortableList items={sortedItems} onSortEnd={onSortEnd} useDragHandle />
    </>
  );
};

export default SortableComponent;
