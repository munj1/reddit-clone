import { Flex, Image } from "@chakra-ui/react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import Directory from "./Directory/Directory";
import useDirectory from "../../hooks/useDirectory";
import { defaultMenuItem } from "../../atoms/directoryMenuAtom";

const Navbar = () => {
  const [user] = useAuthState(auth);
  // loading, error
  const { onSelectMenuItem } = useDirectory();
  return (
    <Flex
      bg="white"
      height={"44px"}
      padding="6px 12px"
      justify={{ md: "space-between" }}
    >
      <Flex
        align={"center"}
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        cursor={"pointer"}
        onClick={() => onSelectMenuItem(defaultMenuItem)}
      >
        <Image src="/images/redditFace.svg" height="30px" alt="logo image" />
        <Image
          src="/images/redditText.svg"
          height="46px"
          alt="logo text"
          display={["none", "none", "unset"]}
        />
      </Flex>

      {user && <Directory />}
      <SearchInput user={user} />

      <RightContent user={user} auth={auth} />
    </Flex>
  );
};

export default Navbar;
