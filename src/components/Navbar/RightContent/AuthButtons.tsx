import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

const AuthButtons = () => {
  const setModalState = useSetRecoilState(authModalState);

  return (
    <>
      <Button
        variant="outline"
        height={"28px"}
        display={["none", "flex"]}
        width={["70px", "70px", "110px"]}
        mr={2}
        onClick={() => setModalState({ open: true, view: "login" })}
      >
        Log In
      </Button>
      <Button
        variant="solid"
        height={"28px"}
        display={["none", "flex"]}
        width={["70px", "70px", "110px"]}
        mr={2}
        onClick={() => setModalState({ open: true, view: "signup" })}
      >
        Sign Up
      </Button>
    </>
  );
};

export default AuthButtons;
