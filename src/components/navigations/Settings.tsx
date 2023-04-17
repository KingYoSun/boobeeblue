import { useTranslation } from "next-i18next";
import { MdSettings } from "react-icons/md";
import { Row, Text } from "@nextui-org/react";

export default function NavSettings() {
  const { t } = useTranslation("common");

  return (
    <Row align="center">
      <MdSettings />
      <Text size={18} weight="bold" hideIn="xs">
        {t("Navigation.settings")}
      </Text>
    </Row>
  );
}
