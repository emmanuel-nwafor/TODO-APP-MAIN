"use client";

import { Flex, Button, Text } from "@chakra-ui/react";
import { FiCheckSquare, FiClock, FiCheckCircle } from "react-icons/fi";

export default function Statistic() {
  return (
    <Flex
      align="center"
      justify="space-around"
      py={2}
      bg="#f7f7f7"
      borderBottom="1px solid #e2e8f0"
      w="full"
    >
      <Button
        leftIcon={<FiCheckSquare />}
        colorScheme="purple"
        variant="solid"
        size="sm"
        borderRadius="full"
      >
        <Text>ToDo</Text>
        <Text as="span" ml={1} color="gray.600">(20)</Text>
      </Button>
      <Button
        leftIcon={<FiClock />}
        colorScheme="yellow"
        variant="solid"
        size="sm"
        borderRadius="full"
      >
        <Text>InProgress</Text>
        <Text as="span" ml={1} color="gray.600">(23)</Text>
      </Button>
      <Button
        leftIcon={<FiCheckCircle />}
        colorScheme="teal"
        variant="solid"
        size="sm"
        borderRadius="full"
      >
        <Text>Complete</Text>
        <Text as="span" ml={1} color="gray.600">(18)</Text>
      </Button>
    </Flex>
  );
}