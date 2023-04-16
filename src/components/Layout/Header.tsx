import MainLogo from "../MainLogo";
import NavHome from "../navigations/Home";
import { ReactNode, useState } from "react";
import { createStyles, Header, Container, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import RowBox from "../RowBox";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },

  textTop: {
    marginTop: 5,
    marginBottom: -11,
  },
  textMiddle: {
    marginBottom: -11,
  },
  textBottom: {
    marginTop: -11,
  },
}));

interface HeaderLink {
  link: string;
  label: string;
  component: ReactNode;
}

export default function NavHeader() {
  const links: HeaderLink[] = [
    { link: "/", label: "home", component: <NavHome /> },
  ];
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0]);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx({ [classes.linkActive]: active === link })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link);
      }}
    >
      {link.component}
    </a>
  ));

  return (
    <Header height={60} mb={60}>
      <Container className={classes.header}>
        <RowBox>
          <MainLogo />
          <div style={{ marginLeft: 5 }}>
            <Text
              size={18}
              weight="bold"
              variant="gradient"
              gradient={{ from: "purple", to: "pink" }}
              className={classes.textTop}
            >
              boo
            </Text>
            <Text
              size={18}
              weight="bold"
              variant="gradient"
              gradient={{ from: "pink", to: "yellow" }}
              className={classes.textMiddle}
            >
              bee.
            </Text>
            <Text
              size={18}
              weight="bold"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
              className={classes.textBottom}
            >
              blue
            </Text>
          </div>
        </RowBox>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
      </Container>
    </Header>
  );
}
