import { useTranslation } from "next-i18next";
import { MdPerson } from "react-icons/md";
import { Row, Text } from "@nextui-org/react";

export default function NavProfile() {
  const { t } = useTranslation("common");

  return (
    <Row align="center">
      <MdPerson />
      <Text size={18} weight="bold" hideIn="xs">
        {t("Navigation.profile")}
      </Text>
    </Row>
  );
}
