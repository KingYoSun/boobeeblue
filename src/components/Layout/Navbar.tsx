import MainLogo from "../MainLogo";
import ThemeSwitch from "../ThemeSwitch";
import NavHome from "../navigations/Home";
import NavNotifications from "../navigations/Notifications";
import { Navbar, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";

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

  const router = useRouter();
  const [active, setActive] = useState(links[0].link);

  return (
    <Navbar isBordered variant="floating">
      <Navbar.Brand>
        <MainLogo />
        <div style={{ marginLeft: 5 }}>
          <Text
            h1
            size={22}
            weight="bold"
            css={{
              textGradient: "45deg, $purple600 -20%, $pink600 100%",
              marginBottom: -15,
            }}
          >
            boo
          </Text>
          <Text
            h1
            size={22}
            weight="bold"
            css={{
              textGradient: "45deg, $yellow600 -20%, $red600 100%",
              marginTop: -15,
              marginBottom: -15,
            }}
          >
            bee.
          </Text>
          <Text
            size={22}
            weight="bold"
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
              marginTop: -15,
            }}
          >
            blue
          </Text>
        </div>
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight variant="underline">
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
