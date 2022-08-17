import { Alert, AlertIcon, Flex, Text } from "@chakra-ui/react";
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
// import { AiFillCloseCircle } from "react-icons/ai";
import { IconType } from "react-icons/lib";
import TabItem from "./TabItem";
import { Dispatch, SetStateAction, useState } from "react";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";
import { Post } from "../../atoms/postsAtom";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../../firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import useSelectFile from "../../hooks/useSelectFile";

const formTabs = [
  { title: "Post", icon: IoDocumentText },
  { title: "Images & Video", icon: IoImageOutline },
  { title: "Link", icon: BsLink45Deg },
  { title: "Poll", icon: BiPoll },
  { title: "Talk", icon: BsMic },
];

export type TabItemProps = {
  title: string;
  icon: IconType;
  selected: boolean;
  setSelectedTab: Dispatch<SetStateAction<string>>;
};

type Props = {
  user: User;
  communityImageURL?: string;
};

const NewPostForm = ({ user, communityImageURL }: Props) => {
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  // const [selectedFile, setSelectedFile] = useState<string>();
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();
  const { communityId } = router.query;

  const handleCreatePost = async () => {
    // create new post object => type Post
    // console.log("communityImageURL", communityImageURL);
    const newPost: Post = {
      communityId: communityId as string,
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
      //           id?: string;
      //   imageURL?: string;
      communityImageURL: communityImageURL || "",
    };

    setLoading(true);
    // store the post in db
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), newPost);
      //check for selecctedFile (if it exists, store it in stoarage)
      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");

        // getDownLoadURL (return imageURL) -> update post doc by adding imageURL
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, { imageURL: downloadURL });
      }
      //redirect user back to the communityPage using router
      router.back();
    } catch (err: any) {
      console.error("handleCreatePost error", err);
      setError(true);
    }
    setLoading(false);
  };

  // const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const reader = new FileReader();

  //   if (event.target?.files?.[0]) {
  //     reader.readAsDataURL(event.target.files[0]);
  //   }

  //   reader.onload = (readerEvent) => {
  //     if (readerEvent.target?.result) {
  //       setSelectedFile(readerEvent.target.result as string);
  //     }
  //   };
  // };

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Flex direction="column" bg="white" borderRadius="4" mt="2">
      <Flex width="100%">
        {formTabs.map((tab) => {
          return (
            <TabItem
              key={tab.title}
              title={tab.title}
              icon={tab.icon}
              selected={tab.title === selectedTab}
              setSelectedTab={setSelectedTab}
            />
          );
        })}
      </Flex>

      <Flex p="4">
        {selectedTab === "Post" && (
          <TextInputs
            textInputs={textInputs}
            onChange={onTextChange}
            handleCreatePost={handleCreatePost}
            loading={loading}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            onSelectImage={onSelectFile}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
          />
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Text mr={2}>Error creating post</Text>
        </Alert>
      )}
    </Flex>
  );
};

export default NewPostForm;
