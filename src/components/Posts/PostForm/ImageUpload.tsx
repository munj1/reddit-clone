import { Button, Flex, Image, Stack } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useRef } from "react";

type Props = {
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile?: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
  setSelectedFile: Dispatch<SetStateAction<string>>;
};

const ImageUpload = ({
  onSelectImage,
  selectedFile,
  setSelectedTab,
  setSelectedFile,
}: Props) => {
  const selctedFileRef = useRef<HTMLInputElement>();
  return (
    <Flex justify="center" align="center" width="100%" direction="column">
      {selectedFile ? (
        <>
          <Image
            src={selectedFile}
            alt="uploaded image"
            maxW={"400px"}
            maxHeight="400px"
          />
          <Stack direction="row" mt="4">
            <Button height="28px" onClick={() => setSelectedTab("Post")}>
              Back to Post
            </Button>
            <Button
              height="28px"
              variant="outline"
              onClick={() => setSelectedFile("")}
            >
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          justify="center"
          align="center"
          p={20}
          border="1px dashed"
          borderColor={"gray.200"}
          w="100%"
          borderRadius={4}
        >
          <Button
            variant="outline"
            height="28px"
            onClick={() => selctedFileRef.current?.click()}
          >
            Upload
          </Button>
          <input
            type="file"
            ref={selctedFileRef}
            hidden
            onChange={onSelectImage}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default ImageUpload;
