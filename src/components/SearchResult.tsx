import { Card, Text, User, Badge, Image } from "@nextui-org/react";
import { useState, useContext, useEffect, useCallback } from "react";
import { BskyAgentsContext } from "@/contexts/BskyAgents";
import { Record as FeedRecord } from "@atproto/api/dist/client/types/app/bsky/feed/post";
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

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
}

export default function SearchResultComp({ searchResult }: Props) {
  //console.log(searchResult);
  const { agents, dispatchAgent } = useContext(BskyAgentsContext);
  const PDSs = agents.map((agent) => agent.url);
  const pdsUrl = PDSs[searchResult.user.PDS - 1];
  const agent = agents.find((item) => item.url == pdsUrl);

  const [post, setPost] = useState<FeedRecord | undefined>(undefined);
  const [user, setUser] = useState<ProfileViewDetailed | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const getPost = useCallback(
    async (searchResult: SearchResult) => {
      const queryParams = {
        /** The handle or DID of the repo. */
        repo: searchResult.user.Did,
        /** The NSID of the record collection. */
        collection: "app.bsky.feed.post",
        /** The key of the record. */
        rkey: searchResult.tid.replace("app.bsky.feed.post/", ""),
        /** The CID of the version of the record. If not specified, then return the most recent version. */
        cid: searchResult.cid,
      };
      let res;
      try {
        res = await agent?.client.getPost(queryParams);
      } catch (error) {
        console.log(pdsUrl, error);
      } finally {
        // console.log("response post!: ", res, agent?.url);
        setPost(res?.value);
      }
    },
    [agent?.client, pdsUrl]
  );

  // Authenication Required
  async function getUser(searchResult: SearchResult) {
    const queryParams = {
      actor: searchResult.user.Did,
    };
    let res;
    try {
      res = await agent?.client.getProfile(queryParams);
    } catch (error) {
      console.log(pdsUrl, error);
    } finally {
      console.log("response profile!: ", res, agent?.url);
      // setUser(res?.data);
    }
  }

  useEffect(() => {
    (async () => await Promise.all([getPost(searchResult)]))();
  }, [getPost, searchResult]);

  type BadgeColor = "primary" | "warning";
  const pdsBadgeColors: Array<BadgeColor> = ["warning", "primary"];

  const pdsText = (searchResult: SearchResult) => (
    <Badge variant="bordered" color={pdsBadgeColors[searchResult.user.PDS - 1]}>
      {new URL(pdsUrl).hostname}
    </Badge>
  );

  return (
    <Card>
      <Card.Header>
        <User src="" name={`@${searchResult.user.Handle}`} />
        {pdsText(searchResult)}
      </Card.Header>
      <Card.Body css={{ py: "$3" }}>
        <Text>{searchResult.post.text}</Text>
      </Card.Body>
    </Card>
  );
}