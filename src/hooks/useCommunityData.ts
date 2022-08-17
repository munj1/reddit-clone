/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  Community,
  CommunitySnippets,
  communityState,
} from "../atoms/communitiesAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { authModalState } from "../atoms/authModalAtom";
import { useRouter } from "next/router";

const useCommunityData = () => {
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user] = useAuthState(auth);
  const router = useRouter();

  //특정 하나의 커뮤니티 대상으로 join, leave 해야하지
  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    //is user signed in? (if not => open auth modal)
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    if (isJoined) {
      //are they joined?
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      //get users snippets
      const mySnippetsRef = collection(
        firestore,
        "users",
        user.uid,
        "communitySnippet"
      );
      const snippetDocs = await getDocs(mySnippetsRef);
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      // console.log("here are snippets", snippets);

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippets[],
        snippetsFetched: true,
      }));
    } catch (e) {
      console.log("getMySnippets error: ", e);
      setError(e.message);
    }
    setLoading(false);
  };

  const getCommunityData = async (communityId: string) => {
    try {
      const communityDocRef = doc(firestore, "communities", communityId);
      const communityDoc = await getDoc(communityDocRef);
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          id: communityDoc.id,
          ...communityDoc.data(),
        } as Community,
      }));
    } catch (error) {
      console.log("getComunityData", error);
    }
  };
  useEffect(() => {
    const { communityId } = router.query;

    if (communityId && !communityStateValue?.currentCommunity) {
      getCommunityData(communityId as string);
    }
  }, [router?.query, communityStateValue?.currentCommunity]);

  useEffect(() => {
    if (!user) {
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [],
        snippetsFetched: false,
      }));
      return;
    }
    getMySnippets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const joinCommunity = async (communityData: Community) => {
    setLoading(true);
    //batch write
    //creating a new community snip pets
    // updating the numberOfMembers +1
    try {
      const batch = writeBatch(firestore);

      const newSnippet: CommunitySnippets = {
        communityId: communityData.id,
        imageURL: communityData?.imageURL || "",
        isModerator: user?.uid === communityData.creatorId,
      };

      batch.set(
        doc(firestore, "users", user.uid, "communitySnippet", communityData.id),
        newSnippet
      );

      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });

      await batch.commit();

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (e: any) {
      console.error("joinCommunity Error", e);
      setError(e.message);
    }
    setLoading(false);
  };
  const leaveCommunity = async (communityId: string) => {
    setLoading(true);
    //batch write
    //deleting a new community snip pets
    // updating the numberOfMembers -1
    //update recoil state = communityState.mySnippets
    try {
      const batch = writeBatch(firestore);

      batch.delete(
        doc(firestore, "users", user.uid, "communitySnippet", communityId)
      );

      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (e: any) {
      console.error("joinCommunity Error", e);
      setError(e.message);
    }
    setLoading(false);
  };

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};

export default useCommunityData;
