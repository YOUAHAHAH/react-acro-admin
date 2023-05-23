import { useEffect, useImperativeHandle, useState } from "react";
import { Modal, Descriptions } from "@arco-design/web-react";

const modalGroup = (props: { ModalRef: any; item: any }) => {
  const { ModalRef, item } = props;
  const [visible, setVisible] = useState(false);
  const [itemData, setItemData] = useState<any>();

  useImperativeHandle(ModalRef, () => ({
    // ModalmaterialGroupDetail 暴露给父组件的方法
    ModalmaterialGroupDetail: () => {
      setVisible(!visible);
    }
  }));

  useEffect(() => {
    const arr = Object.keys(item).map(k => ({ label: k, value: item[k] }));
    setItemData(arr.slice(0, 5));
  }, [visible]);

  return (
    <Modal
      title="Modal Title"
      visible={visible}
      onCancel={() => {
        setVisible(!visible);
      }}
      onOk={() => {
        setVisible(!visible);
      }}
    >
      <Descriptions
        column={1}
        data={itemData}
        labelStyle={{ paddingRight: 36 }}
      />
    </Modal>
  );
};

export default modalGroup;
