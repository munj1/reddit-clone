import { CheckIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { User } from "firebase/auth";

type Props = {
  user?: User;
};

const SearchInput = ({ user }: Props) => {
  return (
    <Flex flexGrow={1} maxWidth={user ? "auto" : "600px"} mr="2" align="center">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          //   fontSize="1.2em"
        >
          <SearchIcon color={"gray.400"} mb="1" />
        </InputLeftElement>
        <Input
          placeholder="Search Reddit"
          fontSize={"10pt"}
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height="34px"
          bg="gray.50"
        />
        <InputRightElement>
          <CheckIcon color="green.500" />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
