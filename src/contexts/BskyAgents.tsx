import { BskyAgent, AtpSessionEvent, AtpSessionData } from "@atproto/api";
import React, { Dispatch, useReducer } from "react";

type BskyAgentsProviderProps = { children: React.ReactNode };

function setBskyAgent(url: string): MyBskyAgent {
  const agent: BskyAgent = new BskyAgent({
    service: url || "http://localhost:2583",
    persistSession: (evt: AtpSessionEvent, sess?: AtpSessionData) => {
      // store the session-data for reuse
    },
  });
  return { url, client: agent };
}

type MyBskyAgent = {
  url: string;
  client: BskyAgent;
};

export const BskyAgentsContext = React.createContext(
  {} as {
    agents: Array<MyBskyAgent>;
    dispatchAgent: React.Dispatch<Action>;
  }
);

type Action = {
  type: "set" | "add" | "remove";
  payload: string;
};

function reducer(
  state: Array<MyBskyAgent>,
  action: Action
): Array<MyBskyAgent> {
  switch (action?.type) {
    case "set":
      return state;
    case "add":
      return [...state, setBskyAgent(action.payload)];
    case "remove":
      return [...state.filter((agent) => agent.url !== action.payload)];
  }
}

export default function BskyAgentsContextProvider({
  children,
}: BskyAgentsProviderProps) {
  const urlStr = process.env.BSKY_AGENT_HOSTS;
  const urls = urlStr?.split(",");
  const initialState = urls?.map((url) => setBskyAgent(url)) || [];
  const [agents, dispatchAgent] = useReducer(reducer, initialState);

  return (
    <BskyAgentsContext.Provider value={{ agents, dispatchAgent }}>
      {children}
    </BskyAgentsContext.Provider>
  );
}
