import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode[];
};

const PageContent = ({ children }: Props) => {
  // 배경 - 좌우합친 박스 - 왼쪽 , 오른쪽
  return (
    <Flex justify="center" p="16px 0px">
      <Flex width="95%" justify="center" maxWidth="860px">
        {/* Left side */}
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
        >
          {children[0]}
        </Flex>

        {/* Right side */}
        <Flex
          direction="column"
          display={{ base: "none", md: "flex" }}
          flexGrow={1}
        >
          {children[1]}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageContent;
