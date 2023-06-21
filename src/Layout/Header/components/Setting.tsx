import { Button } from "@arco-design/web-react";
import { IconSettings } from "@arco-design/web-react/icon";

const HeaderSetting = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Button
        shape="circle"
        type="secondary"
        icon={<IconSettings />}
        onClick={() => {
          setVisible(true);
        }}
      />
    </>
  );
};

export default HeaderSetting;
