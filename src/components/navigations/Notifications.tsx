import { useTranslation } from "next-i18next";
import { GrNotification } from "react-icons/gr";
import { Row, Text } from "@nextui-org/react";

export default function NavNotifications() {
  const { t } = useTranslation("common");

  return (
    <Row align="baseline">
      <GrNotification />
      <Text size={18} weight="bold" hideIn="xs">
        {t("Navigation.notifications")}
      </Text>
    </Row>
  );
}
