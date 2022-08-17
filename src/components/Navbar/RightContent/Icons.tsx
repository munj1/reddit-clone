import { Flex, Icon } from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";

const Icons = () => {
  return (
    <Flex>
      <Flex
        display={["none", "none", "flex"]}
        align="center"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Flex
          mx="1.5"
          p="1"
          cursor={"pointer"}
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          fontSize="20px"
        >
          <Icon as={BsArrowUpRightCircle} />
        </Flex>
        <Flex
          mx="1.5"
          p="1"
          cursor={"pointer"}
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          fontSize="22px"
        >
          <Icon as={IoFilterCircleOutline} />
        </Flex>
        <Flex
          mx="1.5"
          p="1"
          cursor={"pointer"}
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          fontSize="22px"
        >
          <Icon as={IoVideocamOutline} />
        </Flex>
      </Flex>
      <Flex align="center">
        <Flex
          mx="1.5"
          p="1"
          cursor={"pointer"}
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          fontSize="19px"
        >
          <Icon as={BsChatDots} />
        </Flex>
        <Flex
          mx="1.5"
          p="1"
          cursor={"pointer"}
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          fontSize="20px"
        >
          <Icon as={IoNotificationsOutline} />
        </Flex>
        <Flex
          mx="1.5"
          p="1"
          cursor={"pointer"}
          borderRadius={4}
          _hover={{ bg: "gray.200" }}
          fontSize="20px"
          display={["none", "none", "flex"]}
        >
          <Icon as={GrAdd} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Icons;
