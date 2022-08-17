/* eslint-disable react-hooks/exhaustive-deps */
import PageContent from "../../../../components/Layout/PageContent";
import PostItem from "../../../../components/Posts/PostItem";
import usePosts from "../../../../hooks/usePosts";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../../firebase/clientApp";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Post } from "../../../../atoms/postsAtom";
import AboutCommunity from "../../../../components/Posts/AboutCommunity";
import useCommunityData from "../../../../hooks/useCommunityData";
import Comments from "../../../../components/Posts/Comments/Comments";

const PostPage = () => {
  const { onDeletePost, onVote, postStateValue, setPostStateValue } =
    usePosts();
  const router = useRouter();
  const { communityStateValue } = useCommunityData();

  const [user] = useAuthState(auth);
  const fetchPost = async (postId: string) => {
    try {
      const postDocRef = doc(firestore, "posts", postId);
      const postDoc = await getDoc(postDocRef);
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
      }));
    } catch (err) {
      console.error("fetchPost error", err);
    }
  };

  useEffect(() => {
    const { pid } = router.query;

    if (pid && !postStateValue?.selectedPost) {
      fetchPost(pid as string);
    }
  }, [router?.query, postStateValue?.selectedPost]);

  return (
    <PageContent>
      <>
        {postStateValue.selectedPost && (
          <PostItem
            post={postStateValue.selectedPost}
            onVote={onVote}
            onDeletePost={onDeletePost}
            userIsCreator={postStateValue.selectedPost?.creatorId === user?.uid}
            userVoteValue={
              postStateValue.postVotes.find(
                (vote) => vote.postId === postStateValue.selectedPost?.id
              )?.voteValue
            }
          />
        )}

        <Comments
          user={user}
          selectedPost={postStateValue?.selectedPost}
          communityId={postStateValue?.selectedPost?.communityId}
        />
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

export default PostPage;
