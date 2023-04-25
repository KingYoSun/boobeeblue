import { FormElement, Input, Loading, Row } from "@nextui-org/react";
import { MdSearch } from "react-icons/md";
import { useTranslation } from "next-i18next";
import React from "react";

interface Props {
  value: string;
  loadingFlg: boolean;
  onChangeSearch: (e: React.ChangeEvent<FormElement>) => void;
  onClickSearch: () => void;
}

export default function MySearchInput({
  value,
  loadingFlg,
  onChangeSearch,
  onClickSearch,
}: Props) {
  const { t } = useTranslation("common");

  return (
    <Row justify="center" css={{ marginTop: "$12", width: "100%" }}>
      <Input
        id="searchInput"
        initialValue={value}
        clearable
        bordered
        color="primary"
        width="100%"
        labelPlaceholder={`${t("Search.inputPlaceholder")}`}
        contentRight={loadingFlg ? <Loading /> : <MdSearch />}
        onChange={(e) => {
          onChangeSearch(e);
        }}
        onKeyPress={(e) => {
          if (e.key == "Enter") {
            e.preventDefault();
            onClickSearch();
            document.getElementById("searchInput")?.blur();
          }
        }}
      />
    </Row>
  );
}
