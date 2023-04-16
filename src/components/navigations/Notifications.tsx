import { useTranslation } from "next-i18next";
import { GrNotification } from "react-icons/gr";
import RowBox from "../RowBox";
import { Text, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  box: {
    display: "flex",
  },
  text: {
    marginLeft: 4,
    marginRight: 4,
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },
}));

export default function NavNotifications() {
  const { t } = useTranslation("common");

  const { classes } = useStyles();

  return (
    <RowBox className={classes.box}>
      <GrNotification size={20} />
      <Text size={20} weight="bold" className={classes.text}>
        {t("Navigation.notifications")}
      </Text>
    </RowBox>
  );
}
