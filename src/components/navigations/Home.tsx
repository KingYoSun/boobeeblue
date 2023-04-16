import { useTranslation } from "next-i18next";
import { GrHomeRounded } from "react-icons/gr";
import RowBox from "../RowBox";
import { Text } from "@mantine/core";

export default function NavHome() {
  const { t } = useTranslation("common");

  return (
    <RowBox>
      <GrHomeRounded />
      <Text size={20} weight="bold">
        {t("Navigation.home")}
      </Text>
    </RowBox>
  );
}
