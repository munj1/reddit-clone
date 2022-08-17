import { Box, Text } from "@chakra-ui/react";
import PageContent from "../../../components/Layout/PageContent";
import AboutCommunity from "../../../components/Posts/AboutCommunity";
import NewPostForm from "../../../components/Posts/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
// import { useRecoilValue } from "recoil";
// import { communityState } from "../../../atoms/communitiesAtom";
import useCommunityData from "../../../hooks/useCommunityData";

const SubmitPostPage = () => {
  // const communityStateValue = useRecoilValue(communityState);
  const { communityStateValue } = useCommunityData();
  const [user] = useAuthState(auth);
  console.log("communityStateValue", communityStateValue);

  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor={"white"}>
          <Text>Create a post</Text>
        </Box>
        {user && (
          <NewPostForm
            user={user}
            communityImageURL={communityStateValue.currentCommunity.imageURL}
          />
        )}
      </>
      <>
        {communityStateValue?.currentCommunity && (
          <AboutCommunity
            communityData={communityStateValue.currentCommunity}
          />
        )}
      </>
    </PageContent>
  );
};

export default SubmitPostPage;
