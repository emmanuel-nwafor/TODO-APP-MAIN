"use client";

import { Flex, InputGroup, InputLeftElement, Input, IconButton, Avatar, HStack, Box } from "@chakra-ui/react";
import { FiSearch, FiBell, FiMenu } from "react-icons/fi";

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      px={4}
      py={2}
      bg="white"
      borderBottom="1px solid #e2e8f0"
      position="sticky"
      top={0}
      zIndex={20}
      w="full"
    >
      {/* Mobile menu button */}
      <IconButton
        aria-label="Open Menu"
        icon={<FiMenu />}
        display={{ base: "flex", md: "none" }}
        onClick={onMenuClick}
        mr={2}
      />

      {/* Search + content wrapper */}
      <Flex flex="1" align="center" justify="space-between" maxW="full" padding={4}>
        {/* Search */}
        <Box flex="1" maxW={{ base: "100%", md: "300px" }} mr={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray" />
            </InputLeftElement>
            <Input placeholder="Search..." />
          </InputGroup>
        </Box>

        {/* Actions */}
        <HStack spacing={3}>
          <IconButton aria-label="Notifications" icon={<FiBell />} />
          <Avatar size="sm" name="Paul" src="/paul.jpg" />
        </HStack>
      </Flex>
    </Flex>
  );
}
