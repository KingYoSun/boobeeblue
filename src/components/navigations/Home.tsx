import { useTranslation } from "next-i18next";
import { GrHomeRounded } from "react-icons/gr";
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

export default function NavHome() {
  const { t } = useTranslation("common");

  const { classes } = useStyles();

  return (
    <RowBox className={classes.box}>
      <GrHomeRounded size={20} />
      <Text size={20} weight="bold" className={classes.text}>
        {t("Navigation.home")}
      </Text>
    </RowBox>
  );
}
