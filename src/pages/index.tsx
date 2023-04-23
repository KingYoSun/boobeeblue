import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MySearchInput from "@/components/SearchInput";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { FormElement, Grid, Spacer } from "@nextui-org/react";
import useSWR from "swr";
import axios, { AxiosRequestConfig } from "axios";
import { useTranslation } from "next-i18next";
import SearchResultComp, { SearchResult } from "@/components/SearchResult";

type Action = {
  type: "set" | "addOld" | "addNew" | "remove" | "reset";
  payload: Array<SearchResult>;
};

interface Props {
  locale: any;
}

export default function Page({ locale }: Props) {
  const { t } = useTranslation("common");

  const reducer = (state: Array<SearchResult>, action: Action) => {
    switch (action?.type) {
      case "set":
        return action.payload;
      case "addOld":
        const addArrOld = action.payload.filter(
          (item) => !state.find((stateItem) => stateItem.cid == item.cid)
        );
        return [...addArrOld, ...state];
      case "addNew":
        const addArrNew = action.payload.filter(
          (item) => !state.find((stateItem) => stateItem.cid == item.cid)
        );
        return [...state, ...addArrNew];
      case "remove":
        return state.filter(
          (item) =>
            !action.payload.find((nestedItem) => nestedItem.cid == item.cid)
        );
      case "reset":
        return [];
    }
  };

  const [searchResults, dispatchSearchResults] = useReducer(reducer, []);

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

    if (!!data) {
      dispatchSearchResults({ type: "set", payload: JSON.parse(data) });
    }
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
      <Spacer y={0.5} />
      <Grid.Container gap={1} justify="center">
        {searchResults.map((item) => (
          <Grid key={item.cid} xs={12}>
            <SearchResultComp searchResult={item} locale={locale} />
          </Grid>
        ))}
      </Grid.Container>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
    locale,
  },
});
