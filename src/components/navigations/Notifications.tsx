import { useTranslation } from "next-i18next";
import { MdNotifications } from "react-icons/md";
import { Row, Text } from "@nextui-org/react";

export default function NavNotifications() {
  const { t } = useTranslation("common");

  return (
    <Row align="center">
      <MdNotifications />
      <Text size={18} weight="bold" hideIn="xs">
        {t("Navigation.notifications")}
      </Text>
    </Row>
  );
}
