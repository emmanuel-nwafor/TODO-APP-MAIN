"use client";

import { Flex, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

export default function TableSearch() {
  return (
    <Flex
      align="center"
      justify="space-between"
      p={6}
      bg="#e6f0fa"
      borderBottom="1px solid #e2e8f0"
      w="full"
    >
      <InputGroup maxW="300px">
        <InputLeftElement pointerEvents="none" marginTop={2}>
          <FiSearch color="gray.400" />
        </InputLeftElement>
        <Input placeholder="Search for To-Do" variant="outline" bg={"white"} paddingY={7} borderRadius={"lg"} />
      </InputGroup>
    </Flex>
  );
}