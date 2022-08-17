/* eslint-disable react-hooks/exhaustive-deps */
import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { firestore } from "../../../firebase/clientApp";
import { Community, communityState } from "../../../atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import CommunityNotFound from "../../../components/Community/CommunityNotFound";
import CommunityHeader from "../../../components/Community/CommunityHeader";
import PageContent from "../../../components/Layout/PageContent";
import CreatePostLink from "../../../components/Community/CreatePostLink";
import Posts from "../../../components/Posts/Posts";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import AboutCommunity from "../../../components/Posts/AboutCommunity";

type Props = {
  communityData: Community | null;
};

const CommunityPage = ({ communityData }: Props) => {
  const setCommunityStateValue = useSetRecoilState(communityState);

  useEffect(() => {
    if (!communityData) return;

    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, [communityData]);

  if (!communityData) {
    return <CommunityNotFound />;
  }

  return (
    <>
      <CommunityHeader communityData={communityData} />
      <PageContent>
        <>
          <CreatePostLink />
          <Posts communityData={communityData} />
        </>
        <>
          <AboutCommunity communityData={communityData} />
        </>
      </PageContent>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  //get community data and pass it to client

  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      ctx.query?.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(safeJsonStringify(communityDoc.data()))
          : null,
      },
    };
  } catch (e) {
    //여기에 에러가 날때 커스텀 error페이지를 띄우게 할 수도 있음
    console.log("getSSR error", e);
  }
};
export default CommunityPage;
