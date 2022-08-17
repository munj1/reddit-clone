import { Flex } from "@chakra-ui/react";
import { Auth, User } from "firebase/auth";

import AuthModal from "../../Modal/Auth/AuthModal";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type Props = {
  user?: User;
  auth?: Auth;
};

const RightContent = ({ user, auth }: Props) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} auth={auth} />
      </Flex>
    </>
  );
};

export default RightContent;
