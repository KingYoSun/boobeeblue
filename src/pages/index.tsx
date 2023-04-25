import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MySearchInput from "@/components/SearchInput";
import React, { useCallback, useState } from "react";
import { FormElement, Spacer } from "@nextui-org/react";
import axios, { AxiosRequestConfig } from "axios";
import { useTranslation } from "next-i18next";
import Timeline from "@/components/Timeline";
import { SearchResult } from "@/components/SearchResult";

interface Props {
  locale: any;
}

export default function Page({ locale }: Props) {
  const { t } = useTranslation("common");

  const [items, setItems] = useState<Array<SearchResult>>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const bgsBaseUrl = process.env.BGS_BASE_URL;
  const searchUrl = "/meili/search";

  // TODO: axios to ky
  const fetcher = async (url: string) => {
    const config: AxiosRequestConfig = {
      baseURL: bgsBaseUrl,
      params: {
        q: input,
        o: offset,
      },
    };
    setLoading(true);
    await axios.get(url, config).then((res) => {
      const data = JSON.parse(res.data);
      console.log("data!: ", data.length, data);
      const addNewItems = data.filter(
        (post: SearchResult) =>
          items.length == 0 || !items.find((item) => item.cid == post.cid)
      );
      setOffset(offset + addNewItems.length);
      setItems([...items, ...addNewItems]);
      setLoading(false);
    });
  };

  const onChangeSearch = useCallback((e: React.ChangeEvent<FormElement>) => {
    setInput(e.target.value);
  }, []);

  const onClickSearch = () => {
    if (!bgsBaseUrl) {
      console.log(`BGS_URL: ${bgsBaseUrl}`);
      alert(t("Search.Errors.bgsHostNotExist"));
      return;
    }

    setOffset(0);
    setItems([]);

    console.log(`search search!: ${input}`);

    fetcher(searchUrl);
    return null;
  };

  return (
    <>
      <MySearchInput
        value={input}
        loadingFlg={loading}
        onChangeSearch={onChangeSearch}
        onClickSearch={onClickSearch}
      />
      <Spacer y={0.5} />
      <Timeline
        items={items}
        loadNextPage={() => fetcher(searchUrl)}
        locale={locale}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
    locale,
  },
});
