import { useTranslation } from "next-i18next";
import { MdHomeFilled } from "react-icons/md";
import { Row, Text } from "@nextui-org/react";

export default function NavHome() {
  const { t } = useTranslation("common");

  return (
    <Row align="center">
      <MdHomeFilled />
      <Text size={18} weight="bold" hideIn="xs">
        {t("Navigation.home")}
      </Text>
    </Row>
  );
}
