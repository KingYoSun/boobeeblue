import { useTranslation } from "next-i18next";
import { GrHomeRounded } from "react-icons/gr";
import { Row, Text } from "@nextui-org/react";

export default function NavHome() {
  const { t } = useTranslation("common");

  return (
    <Row align="baseline">
      <GrHomeRounded />
      <Text size={18} weight="bold" hideIn="xs">
        {t("Navigation.home")}
      </Text>
    </Row>
  );
}
