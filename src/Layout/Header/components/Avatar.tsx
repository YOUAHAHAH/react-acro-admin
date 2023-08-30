import { Dropdown, Menu, Avatar } from "@arco-design/web-react";
import { IconExport, IconUser, IconLock } from "@arco-design/web-react/icon";
import LockModal from "./Lock/LockModal";
import { listAvatar } from "@/Layout/type";
import Cookies from "js-cookie";
import { ACRO_AUTH_TOKEN } from "@/redux/Types/mutation-types";
import { connect } from "react-redux";
import { loseAuthState } from "@/redux/modules/Auth/action";

type LockRef = React.MutableRefObject<null> & {
  getModalVisible: () => void;
};

const list: listAvatar[] = [
  {
    key: "1",
    label: "个人中心",
    icon: <IconUser className="mr-[5px]" />
  },
  {
    key: "2",
    label: "锁定屏幕",
    icon: <IconLock className="mr-[5px]" />
  },
  {
    key: "3",
    label: "退出登录",
    icon: <IconExport className="mr-[5px]" />
  }
];

const HeaderAvatar = (props: { loseAuthState: any }) => {
  const { loseAuthState } = props;
  const navigate = useNavigate();
  const lockRef = useRef<LockRef>();

  const useLockModal = () => {
    lockRef.current?.getModalVisible();
  };

  const onClick = (key: string) => {
    if (key === "1") {
      console.log(111);
    } else if (key === "2") {
      useLockModal();
    } else if (key === "3") {
      loseAuthState();
      navigate("/login");
    }
  };

  return (
    <>
      <Dropdown
        droplist={
          <Menu>
            {list.map((item: listAvatar) => {
              return (
                <Menu.Item
                  key={item.key}
                  onClick={() => {
                    onClick(item.key);
                  }}
                >
                  {item.icon}
                  {item.label}
                </Menu.Item>
              );
            })}
          </Menu>
        }
        trigger="click"
        position="br"
      >
        <Avatar size={32}>Arco</Avatar>
      </Dropdown>
      <LockModal ref={lockRef} />
    </>
  );
};

const mapDispatchToProps = { loseAuthState };
export default connect(null, mapDispatchToProps)(HeaderAvatar);
