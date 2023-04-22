import ThemeSwitch from "../ThemeSwitch";
import NavHome from "../navigations/Home";
import NavNotifications from "../navigations/Notifications";
import { Row, Spacer, useTheme } from "@nextui-org/react";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import BooBee from "../BooBee";
import HorizonalBorder from "../HorizonalBorder";
import NavSearch from "../navigations/Search";
import NavProfile from "../navigations/Profile";
import NavSettings from "../navigations/Settings";

interface SidebarLink {
  link: string;
  label: string;
  component: ReactNode;
  disabled: boolean;
}

export default function MySidebar() {
  const links: SidebarLink[] = [
    { link: "/", label: "home", component: <NavHome />, disabled: false },
    {
      link: "/search",
      label: "search",
      component: <NavSearch />,
      disabled: true,
    },
    {
      link: "/notifications",
      label: "notifications",
      component: <NavNotifications />,
      disabled: true,
    },
    {
      link: "/profile",
      label: "profile",
      component: <NavProfile />,
      disabled: true,
    },
    {
      link: "/settings",
      label: "settings",
      component: <NavSettings />,
      disabled: true,
    },
  ];

  const { theme, isDark } = useTheme();
  const router = useRouter();
  const activeLink = links.find((link) => link.link == router.asPath);
  const [active, setActive] = useState(activeLink?.link ?? links[0].link);

  return (
    <Sidebar
      backgroundColor={theme?.colors.background.value}
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          height: "100vh !important",
        },
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
      <Menu
        menuItemStyles={{
          button: {
            "&:hover": {
              backgroundColor: theme?.colors.gray200.value,
            },
          },
        }}
      >
        {links.map(
          (link) =>
            !link.disabled && (
              <MenuItem
                key={link.label}
                onClick={(e) => {
                  e.preventDefault;
                  setActive(link.link);
                  router.push(link.link);
                }}
                active={active == link.link}
                rootStyles={{
                  backgroundColor:
                    active == link.link
                      ? theme?.colors.gray100.value
                      : theme?.colors.background.value,
                }}
              >
                {link.component}
              </MenuItem>
            )
        )}
      </Menu>
      <Row justify="flex-end" style={{ paddingRight: 10 }}>
        <ThemeSwitch />
      </Row>
    </Sidebar>
  );
}
