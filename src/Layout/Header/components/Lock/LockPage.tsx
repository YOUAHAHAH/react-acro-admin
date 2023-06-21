import { weekDay, nowDate } from "@/utils/timeConfig";
import { Button, Form, Input, Message } from "@arco-design/web-react";
import { IconUnlock } from "@arco-design/web-react/icon";
import { connect } from "react-redux";
import { loseLockState } from "@/redux/modules/Lock/action";
import l from "@/Layout/index.module.less";

const FormItem = Form.Item;

const LockPage = (props: any) => {
  const { isLock, loseLockState } = props;
  const navigate = useNavigate();
  const [houers, setHouers] = useState<string | number>();
  const [minutes, setMinutes] = useState<string | number>();
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);
  const [lock, setLock] = useState<boolean>(false);
  const [form] = Form.useForm();

  const getTimer = () => {
    const time: Date = new Date();
    setHouers(time.getHours() < 10 ? "0" + time.getHours() : time.getHours());
    setMinutes(
      time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
    );
    setTimer(
      setInterval(() => {
        getTimer();
      }, 1000)
    );
  };

  useEffect(() => {
    getTimer();
    clearInterval(Number(timer));
  }, [minutes, houers]);

  return (
    <>
      <div className={l.lock_page}>
        <div className={l.lock_page_unlock}>
          <IconUnlock />
          <span
            onClick={() => {
              setLock(true);
            }}
          >
            点击解锁
          </span>
        </div>
        <div className={l.lock_page_time}>
          <div className={l.houers}>
            <span>{houers}</span>
          </div>
          <div className={l.minutes}>
            <span>{minutes}</span>
          </div>
        </div>
        <div className={l.lock_page_footer}>
          <span>
            {nowDate("YYYY-MM-DD")}
            {weekDay()}
          </span>
        </div>
      </div>

      {lock ? (
        <div className={l.blur_page}>
          <div className={l.blur_page_enter}>
            <Form
              form={form}
              autoComplete="off"
              onSubmit={v => {
                if (window.atob(isLock.pwd) === v.lockPwd) {
                  loseLockState();
                } else {
                  Message.error({
                    content: "密码错误！",
                    closable: true
                  });
                }
              }}
            >
              <FormItem
                label="锁屏密码"
                field="lockPwd"
                rules={[{ required: true, message: "请输入锁屏密码" }]}
              >
                <Input.Password
                  placeholder="请输入锁屏密码"
                  autoComplete="off"
                />
              </FormItem>
              <FormItem wrapperCol={{ offset: 8 }}>
                <Button
                  className="mr-[12px]"
                  type="text"
                  onClick={() => {
                    form.resetFields();
                    setLock(false);
                  }}
                >
                  取消
                </Button>
                <Button
                  className="mr-[12px]"
                  type="text"
                  onClick={() => {
                    loseLockState();
                    navigate("/login");
                  }}
                >
                  返回登录
                </Button>
                <Button type="text" htmlType="submit">
                  进入
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  isLock: state.Lock
});
const mapDispatchToProps = { loseLockState };
export default connect(mapStateToProps, mapDispatchToProps)(LockPage);
