import ThemeSwitch from "../ThemeSwitch";
import NavHome from "../navigations/Home";
import NavNotifications from "../navigations/Notifications";
import { Row, Spacer, useTheme } from "@nextui-org/react";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import BooBee from "../BooBee";
import HorizonalBorder from "../HorizonalBorder";

interface SidebarLink {
  link: string;
  label: string;
  component: ReactNode;
}

interface Props {
  height: number;
}

export default function MySidebar({ height }: Props) {
  const links: SidebarLink[] = [
    { link: "/", label: "home", component: <NavHome /> },
    {
      link: "/notifications",
      label: "notifications",
      component: <NavNotifications />,
    },
  ];

  const { theme, isDark } = useTheme();
  const router = useRouter();
  const [active, setActive] = useState(links[0].link);

  return (
    <div style={{ display: "flex", height: "100%", direction: "ltr" }}>
      <Sidebar
        backgroundColor={theme?.colors.background.value}
        rootStyles={{
          borderRightStyle: "none",
          boxShadow: isDark
            ? "0 12px 25px 8px rgb(255 255 255 / 0.2)"
            : "0 12px 25px 8px rgb(104 112 118 / 0.2)",
        }}
      >
        <Spacer y={0.5} />
        <Row justify="flex-start" align="center" style={{ paddingLeft: 40 }}>
          <BooBee />
        </Row>
        <Spacer y={0.5} />
        <HorizonalBorder />
        <Menu>
          {links.map((link) => (
            <MenuItem
              key={link.label}
              onClick={(e) => {
                e.preventDefault;
                setActive(link.link);
                router.push(link.link);
              }}
              active={active == link.link}
            >
              {link.component}
            </MenuItem>
          ))}
        </Menu>
        <Row justify="flex-end" style={{ paddingRight: 10 }}>
          <ThemeSwitch />
        </Row>
      </Sidebar>
    </div>
  );
}
