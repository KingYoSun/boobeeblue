import ThemeSwitch from "../ThemeSwitch";
import NavHome from "../navigations/Home";
import NavNotifications from "../navigations/Notifications";
import { Navbar, Text, useTheme } from "@nextui-org/react";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import BooBee from "../BooBee";

interface NavbarLink {
  link: string;
  label: string;
  component: ReactNode;
}

export default function MyNavbar() {
  const links: NavbarLink[] = [
    { link: "/", label: "home", component: <NavHome /> },
    {
      link: "/notifications",
      label: "notifications",
      component: <NavNotifications />,
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
      >
        {links.map((link) => (
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
        ))}
      </Navbar.Content>
      <Navbar.Content>
        <ThemeSwitch />
      </Navbar.Content>
    </Navbar>
  );
}
