import { useTheme as useNextTheme } from "next-themes";
import { Switch, useTheme } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MdDarkMode, MdSunny } from "react-icons/md";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useNextTheme();
  const { isDark } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Switch
      shadow
      checked={isDark}
      size="xl"
      onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
      icon={isDark ? <MdDarkMode /> : <MdSunny />}
    />
  );
};

export default ThemeSwitch;
