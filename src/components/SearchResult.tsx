import { Card, Text, User, Badge } from "@nextui-org/react";
import React, { useState, useContext, useCallback } from "react";
import { BskyAgentsContext } from "@/contexts/BskyAgents";
import { AppBskyFeedDefs } from "@atproto/api";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type FacetFeature = {
  $type: "app.bsky.richtext.facet#mention" | "app.bsky.richtext.facet#link";
  url?: string;
  did?: string;
};

type Facet = {
  features: Array<FacetFeature>;
  index: {
    byteEnd: number;
    byteStart: number;
  };
};

type EmbedImage = {
  alt: string;
  image: {
    $type: "blob";
    mimeType: string;
    ref: {
      $link: string;
    };
    size: number;
  };
};

type Embed = {
  $type: "app.bsky.embed.images";
  images: Array<EmbedImage>;
};

type ReplyTo = {
  cid: string;
  uri: string;
};

type Reply = {
  parent: ReplyTo;
  root: ReplyTo;
};

type Post = {
  $type: "app.bsky.feed.post";
  createdAt: string;
  text: string;
  reply?: Reply;
  embed?: Embed;
  facets?: Array<Facet>;
};

type User = {
  CreatedAt: string;
  DeletedAt: string;
  Did: string;
  Handle: string;
  ID: number;
  PDS: number;
  UpdatedAt: string;
};

export type SearchResult = {
  cid: string;
  createdAt: number;
  post: Post;
  tid: string;
  user: User;
};

interface Props {
  searchResult: SearchResult;
  locale?: any;
  style?: any;
}

export interface ThreadDataSchema {
  thread:
    | AppBskyFeedDefs.ThreadViewPost
    | AppBskyFeedDefs.NotFoundPost
    | { $type: string; [k: string]: unknown };
  [k: string]: unknown;
}

export default function SearchResultComp({
  searchResult,
  locale,
  style,
}: Props) {
  const { agents, dispatchAgent } = useContext(BskyAgentsContext);

  const PDSs = agents.map((agent) => agent.url);
  const pdsUrl = PDSs[searchResult.user.PDS - 1];
  const agent = agents.find((item) => item.url == pdsUrl);
  const [loaded, setLoaded] = useState(true);

  const stagingUrl = `https://staging.bsky.app/profile/${
    searchResult.user.Handle
  }/post/${searchResult.tid.replace("app.bsky.feed.post/", "")}`;

  const [data, setData] = useState<ThreadDataSchema | undefined>(undefined);

  // Authentication Required
  const getPostThread = useCallback(
    async (searchResult: SearchResult) => {
      const queryParams = {
        uri: `at://${searchResult.user.Did}/$${searchResult.tid}`,
        depth: 0,
      };
      let res;
      try {
        res = await agent?.client.getPostThread(queryParams);
      } catch (error) {
        console.log(pdsUrl, error);
      } finally {
        // console.log("response post!: ", res, agent?.url);
        setData(res?.data);
      }
    },
    [agent?.client, pdsUrl]
  );

  /*
  useEffect(() => {
    (async () => await Promise.all([getPostThread(searchResult)]))();
  }, [getPostThread, searchResult]);
  */

  type BadgeColor = "primary" | "warning";
  const pdsBadgeColors: Array<BadgeColor> = ["warning", "primary"];

  const pdsText = (searchResult: SearchResult) => (
    <Badge variant="bordered" color={pdsBadgeColors[searchResult.user.PDS - 1]}>
      {new URL(pdsUrl).hostname}
    </Badge>
  );

  const timeFromNow = (searchResult: SearchResult) => {
    if (locale == "ja") moment.locale("ja");
    return moment(searchResult.post.createdAt).fromNow();
  };

  return (
    <div
      style={{
        paddingTop: 10,
        paddingBottom: 10,
        ...style,
      }}
    >
      <Card
        variant="bordered"
        isHoverable
        isPressable
        onClick={() => {
          window.open(stagingUrl, "_blank");
        }}
      >
        {loaded ? (
          <Card.Header>
            <User src="" name={`@${searchResult.user.Handle}`} />
            {pdsText(searchResult)}
            <Badge variant="dot" css={{ mx: "$2" }} />
            <Text>{timeFromNow(searchResult)}</Text>
          </Card.Header>
        ) : (
          <Card.Header>
            <Skeleton circle containerClassName="avatar-skeleton" />
            <Skeleton width={150} style={{ marginLeft: "5px" }} />
            <Skeleton width={100} style={{ marginLeft: "3px" }} />
            <Badge variant="dot" css={{ mx: "$2" }} />
            <Skeleton width={70} />
          </Card.Header>
        )}
        {loaded ? (
          <Card.Body css={{ py: "$3" }}>
            <Text>{searchResult.post.text}</Text>
          </Card.Body>
        ) : (
          <Card.Body css={{ py: "$3" }}>
            <Skeleton width="100%" count={3} />
          </Card.Body>
        )}
      </Card>
    </div>
  );
}
