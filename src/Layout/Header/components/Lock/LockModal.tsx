import { Modal, Button, Form, Input } from "@arco-design/web-react";
import { connect } from "react-redux";
import { setLockState } from "@/redux/modules/Lock/action";
import { LockState } from "@/redux/Types/type";

const FormItem = Form.Item;

const LockModal = (_props: any, ref: React.Ref<unknown> | undefined) => {
  const { setLockState } = _props;
  const [visible, setVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const getModalVisible = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => ({
    getModalVisible
  }));

  const onCancel = () => {
    setVisible(!visible);
    form.resetFields();
  };

  return (
    <div>
      <Modal
        title="锁屏密码"
        className="!top-[-100px]"
        visible={visible}
        onCancel={onCancel}
        footer={null}
      >
        <Form
          form={form}
          autoComplete="off"
          onSubmit={v => {
            setLockState({ pwd: window.btoa(v.lockPwd) });
          }}
        >
          <FormItem
            label="锁屏密码"
            field="lockPwd"
            rules={[{ required: true, message: "请输入锁屏密码" }]}
          >
            <Input.Password placeholder="请输入锁屏密码" autoComplete="off" />
          </FormItem>
          <FormItem wrapperCol={{ offset: 8 }}>
            <Button className="mr-[12px]" onClick={onCancel}>
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              锁屏
            </Button>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: { Lock: LockState }) => ({
  isLock: state.Lock
});
const mapDispatchToProps = { setLockState };
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true
})(forwardRef(LockModal));
