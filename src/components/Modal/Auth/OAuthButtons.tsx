import { Button, Image, Text, VStack } from "@chakra-ui/react";
import { auth } from "../../../firebase/clientApp";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const OAuthButtons = () => {
  const [signInWithGoogle, _, loading, error] = useSignInWithGoogle(auth);

  return (
    <VStack width="100%" mb="4">
      <Button
        width={"100%"}
        variant="oauth"
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image
          src="/images/googlelogo.png"
          alt="googlelogo"
          height={"20px"}
          mr="4"
        />
        Continue with Google
      </Button>
      <Button width={"100%"} variant="oauth">
        Some Other Provider
      </Button>
      {error && (
        <Text textAlign={"center"} color="red" fontSize="10pt">
          {error?.message}
        </Text>
      )}
    </VStack>
  );
};

export default OAuthButtons;
