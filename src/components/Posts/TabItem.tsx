import { Flex, Icon, Text } from "@chakra-ui/react";
import { TabItemProps } from "./NewPostForm";

const TabItem = ({ title, icon, selected, setSelectedTab }: TabItemProps) => {
  return (
    <Flex
      justify="center"
      align="center"
      flexGrow={1}
      p="14px 0px"
      cursor="pointer"
      _hover={{ bg: "gray.50" }}
      color={selected ? "blue.500" : "gray.500"}
      borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={selected ? "blue.500" : "gray.200"}
      borderRightColor="gray.200"
      fontWeight={700}
      onClick={() => setSelectedTab(title)}
    >
      <Flex align="center" height="20px" mr="2">
        <Icon as={icon} />
      </Flex>
      <Text fontSize={"10pt"}>{title}</Text>
    </Flex>
  );
};

export default TabItem;
