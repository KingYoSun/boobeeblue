import ThemeSwitch from "../ThemeSwitch";
import NavHome from "../navigations/Home";
import NavNotifications from "../navigations/Notifications";
import { Navbar, useTheme } from "@nextui-org/react";
import { useRouter } from "next/router";
import { MutableRefObject, ReactNode, useState } from "react";
import BooBee from "../BooBee";
import NavSearch from "../navigations/Search";
import NavProfile from "../navigations/Profile";
import NavSettings from "../navigations/Settings";

interface NavbarLink {
  link: string;
  label: string;
  component: ReactNode;
  disabled: boolean;
}

export default function MyNavbar() {
  const links: NavbarLink[] = [
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

  const { isDark } = useTheme();
  const router = useRouter();
  const [active, setActive] = useState(links[0].link);

  // variant="floating" cause Hydration error
  return (
    <Navbar isBordered={isDark} variant="floating">
      <Navbar.Brand>
        <BooBee />
      </Navbar.Brand>
      <Navbar.Content
        enableCursorHighlight
        activeColor="secondary"
        variant="underline"
        style={{
          paddingLeft: 10,
          paddingRight: 10,
        }}
        gap={9}
      >
        {links.map(
          (link) =>
            !link.disabled && (
              <Navbar.Item
                key={link.label}
                isActive={link.link == active}
                css={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={(e) => {
                  e.preventDefault;
                  setActive(link.link);
                  router.push(link.link);
                }}
              >
                {link.component}
              </Navbar.Item>
            )
        )}
      </Navbar.Content>
      <Navbar.Content>
        <ThemeSwitch />
      </Navbar.Content>
    </Navbar>
  );
}
