import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MySearchInput from "@/components/SearchInput";
import React, { useCallback, useEffect, useState, useReducer } from "react";
import { FormElement, Spacer } from "@nextui-org/react";
import axios, { AxiosRequestConfig } from "axios";
import { useTranslation } from "next-i18next";
import Timeline from "@/components/Timeline";
import { SearchResult } from "@/components/SearchResult";
import useSWR from "swr";

interface Props {
  locale: any;
}

type ActionType = "set" | "addNew" | "remove" | "reset" | "none";

type Action = {
  type: ActionType;
  payload: Array<SearchResult>;
};

interface FetcherProps {
  type: ActionType;
  url: string;
}

interface FetcherReturn {
  type: ActionType;
  json: string;
}

export default function Page({ locale }: Props) {
  const { t } = useTranslation("common");

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const reducer = (state: Array<SearchResult>, action: Action) => {
    switch (action?.type) {
      case "set":
        setOffset(action.payload.length);
        return [...action.payload];
      case "addNew":
        const addArrNew = action.payload.filter(
          (item) => !state.find((stateItem) => stateItem.cid == item.cid)
        );
        setOffset(offset + addArrNew.length);
        return [...state, ...addArrNew];
      case "remove":
        return state.filter(
          (item) =>
            !action.payload.find((nestedItem) => nestedItem.cid == item.cid)
        );
      case "reset":
        setOffset(0);
        return [];
      case "none":
        return state;
    }
  };

  const [items, dispatchItems] = useReducer(reducer, []);

  const bgsBaseUrl = process.env.BGS_BASE_URL;
  const searchUrl = "/meili/search";

  // TODO: axios to ky
  const fetcher = ({ type, url }: FetcherProps): Promise<FetcherReturn> => {
    if (type == "none")
      return Promise.resolve({
        type,
        json: "",
      });
    const config: AxiosRequestConfig = {
      baseURL: bgsBaseUrl,
      params: {
        q: input,
        o: offset,
      },
    };
    return axios.get(url, config).then((res) => {
      return {
        type,
        json: res.data,
      };
    });
  };

  const { data, mutate, error, isValidating } = useSWR(
    { type: "none", url: searchUrl },
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

    if (!!data?.json && !!data?.type)
      dispatchItems({ type: data.type, payload: JSON.parse(data.json) });
  }, [data, error, isValidating, t]);

  const onClickSearch = () => {
    if (!bgsBaseUrl) {
      console.log(`BGS_URL: ${bgsBaseUrl}`);
      alert(t("Search.Errors.bgsHostNotExist"));
      return;
    }

    console.log(`search search!: ${input}`);
    mutate(fetcher({ type: "set", url: searchUrl }));
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
        loadNextPage={() => mutate(fetcher({ type: "addNew", url: searchUrl }))}
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
