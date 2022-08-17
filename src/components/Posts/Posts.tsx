import { Community } from "../../atoms/communitiesAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/clientApp";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import usePosts from "../../hooks/usePosts";
import { Post } from "../../atoms/postsAtom";
import PostItem from "./PostItem";
import { Stack } from "@chakra-ui/react";
import PostLoader from "./PostLoader";

type Props = {
  communityData: Community;
};

const Posts = ({ communityData }: Props) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  } = usePosts();

  const getPosts = async () => {
    try {
      setLoading(true);
      //get posts for this community
      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({ ...prev, posts: posts as Post[] }));

      console.log(posts);
    } catch (err) {
      console.log("getPosts error", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityData]);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue?.posts?.map((post) => (
            <PostItem
              post={post}
              key={post.id}
              onVote={onVote}
              onSelectPost={onSelectPost}
              onDeletePost={onDeletePost}
              userIsCreator={post.creatorId === user?.uid}
              userVoteValue={
                postStateValue.postVotes.find((vote) => vote.postId === post.id)
                  ?.voteValue
              }
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export default Posts;
