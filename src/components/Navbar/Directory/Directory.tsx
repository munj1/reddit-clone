import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
// import { TiHome } from "react-icons/ti";
import useDirectory from "../../../hooks/useDirectory";
import Communities from "./Communities";

const UserMenu = () => {
  const { directoryState, toggleMenuOpen } = useDirectory();

  return (
    <Menu isOpen={directoryState?.isOpen}>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        mr={2}
        ml={[0, 0, 2]}
        onClick={toggleMenuOpen}
      >
        <Flex
          align="center"
          justify="space-between"
          width={["auto", "auto", "auto", "200px"]}
        >
          <Flex align="center">
            {directoryState?.selectedMenuItem?.imageURL ? (
              <Image
                boxSize={"24px"}
                src={directoryState.selectedMenuItem.imageURL}
                alt="icon"
                borderRadius={"full"}
                mr="2"
              />
            ) : (
              <Icon
                as={directoryState.selectedMenuItem.icon}
                fontSize={24}
                mr={[1, 1, 2]}
                color={directoryState.selectedMenuItem.iconColor}
              />
            )}

            <Flex display={["none", "none", "none", "flex"]}>
              <Text fontSize="10pt" fontWeight={700}>
                {directoryState?.selectedMenuItem?.displayText}
              </Text>
              {/* TODO : Icon will change depending on the current community */}
              {/* by custom react hook */}
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      {/* TODO: get user's community list */}
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
