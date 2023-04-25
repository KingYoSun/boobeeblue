import SearchResultComp, { SearchResult } from "./SearchResult";
import React, { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";

interface Props {
  items: Array<SearchResult>;
  loadNextPage: () => Promise<any>;
  locale: string;
}

interface ItemProps {
  index: number;
  post: SearchResult;
}

export default function Timeline({ items, loadNextPage, locale }: Props) {
  const loadMore = useCallback(() => {
    loadNextPage();
  }, [loadNextPage]);

  const Item = ({ index, post }: ItemProps) => (
    <SearchResultComp searchResult={post} locale={locale} />
  );

  return (
    <Virtuoso
      style={{
        height: "90%",
      }}
      useWindowScroll
      data={items}
      endReached={loadMore}
      itemContent={(index, post) => Item({ index, post })}
    />
  );
}
