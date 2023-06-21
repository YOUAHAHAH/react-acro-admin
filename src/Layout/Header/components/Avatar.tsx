import { Dropdown, Menu, Avatar } from "@arco-design/web-react";
import { IconExport, IconUser, IconLock } from "@arco-design/web-react/icon";
import LockModal from "./Lock/LockModal";
import { listAvatar } from "@/Layout/type";

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

const HeaderAvatar = () => {
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

export default HeaderAvatar;
