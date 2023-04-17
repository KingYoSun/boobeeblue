import { useTranslation } from "next-i18next";
import { MdSearch } from "react-icons/md";
import { Row, Text } from "@nextui-org/react";

export default function NavSearch() {
  const { t } = useTranslation("common");

  return (
    <Row align="center">
      <MdSearch />
      <Text size={18} weight="bold" hideIn="xs">
        {t("Navigation.search")}
      </Text>
    </Row>
  );
}
