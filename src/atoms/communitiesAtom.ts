import { Timestamp } from "@google-cloud/firestore";
import { atom } from "recoil";

export interface Community {
  id: string;
  numberOfMembers: number;
  creatorId: string;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}

export interface CommunitySnippets {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

interface CommunityState {
  mySnippets: CommunitySnippets[];
  currentCommunity?: Community;
  snippetsFetched: boolean;
}

export const communityState = atom<CommunityState>({
  key: "communityState",
  default: {
    mySnippets: [],
    snippetsFetched: false,
  },
});
