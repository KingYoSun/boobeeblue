import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MySearchInput from "@/components/SearchInput";
import React, { useCallback, useEffect, useState } from "react";
import { FormElement } from "@nextui-org/react";
import useSWR from "swr";
import axios, { AxiosRequestConfig } from "axios";
import { useTranslation } from "next-i18next";

export default function Page() {
  const { t } = useTranslation("common");

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bgsBaseUrl = process.env.BGS_BASE_URL;

  const fetcher = (url: string) => {
    const config: AxiosRequestConfig = {
      baseURL: bgsBaseUrl,
      params: {
        q: input,
      },
    };
    return axios.get(url, config).then((res) => res.data);
  };
  const { data, mutate, error, isValidating } = useSWR(
    "/meili/search",
    fetcher
  );

  const onChangeSearch = useCallback((e: React.ChangeEvent<FormElement>) => {
    setInput(e.target.value);
  }, []);

  useEffect(() => {
    if (isValidating) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (!!error) {
      alert(`${t("Search.Errors.error")}: ${JSON.stringify(error)}`);
    }

    console.log("searched!: ", data);
  }, [data, error, isValidating, t]);

  const onClickSearch = () => {
    if (!bgsBaseUrl) {
      console.log(`BGS_URL: ${bgsBaseUrl}`);
      alert(t("Search.Errors.bgsHostNotExist"));
      return;
    }

    mutate();

    console.log(`search search!: ${input}`);
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
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
