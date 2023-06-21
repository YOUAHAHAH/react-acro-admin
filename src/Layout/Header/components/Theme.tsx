import { Button, Tooltip } from "@arco-design/web-react";
import { IconMoon, IconSun } from "@arco-design/web-react/icon";

const HeaderTheme = () => {
  const [theme, setTheme] = useState<boolean>(true);

  const getThemeLight = () => {
    setTheme(false);
    document.body.setAttribute("arco-theme", "dark");
  };
  const getThemeDark = () => {
    setTheme(true);
    document.body.removeAttribute("arco-theme");
  };

  return (
    <>
      <Tooltip content={theme ? "点击切换为暗黑模式" : "点击切换为亮色模式"}>
        {theme ? (
          <Button
            shape="circle"
            type="secondary"
            icon={<IconSun />}
            onClick={getThemeLight}
          />
        ) : (
          <Button
            shape="circle"
            type="secondary"
            icon={<IconMoon />}
            onClick={getThemeDark}
          />
        )}
      </Tooltip>
    </>
  );
};

export default HeaderTheme;
