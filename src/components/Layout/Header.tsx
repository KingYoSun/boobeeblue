import MainLogo from "../MainLogo";
import NavHome from "../navigations/Home";
import NavNotifications from "../navigations/Notifications";
import { ReactNode, useState } from "react";
import { createStyles, Header, Container, Group, Text } from "@mantine/core";
import RowBox from "../RowBox";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {},

  link: {
    marginLeft: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    borderRadius: theme.radius.sm,
  },
  linkActive: {
    "&, &:hover": {
      paddingLeft: 4,
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },

  rowBox: {},

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
  const router = useRouter();
  const links: HeaderLink[] = [
    { link: "/", label: "home", component: <NavHome /> },
    {
      link: "/notifications",
      label: "notifications",
      component: <NavNotifications />,
    },
  ];
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        router.push(link.link);
      }}
    >
      {link.component}
    </a>
  ));

  return (
    <Header height={60} mb={60}>
      <Container className={classes.header}>
        <RowBox className={classes.rowBox}>
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
