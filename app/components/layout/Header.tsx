"use client";

import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  IconButton,
  Avatar,
  HStack,
  VStack,
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Divider,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiBell,
  FiMenu,
  FiLink,
  FiHome,
  FiUser,
  FiSettings,
  FiStar,
} from "react-icons/fi";

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

      {/* Search section */}
      <Flex flex="1" align="center" justify="space-between" maxW="full" px={4} py={2}>
        {/* Search */}
        <Box flex="1" maxW={{ base: "100%", md: "500px" }} mr={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiSearch color="gray" />
            </InputLeftElement>
            <Input placeholder="Search..." />
          </InputGroup>
        </Box>

        {/* Mobile Popover */}
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Button display={{ base: "flex", md: "none" }}>
              <FiHome />
            </Button>
          </PopoverTrigger>
          <PopoverContent w="fit-content" display={{ base: "flex", md: "none" }}>
            <PopoverArrow />
            <PopoverBody>
              <VStack align="stretch" spacing={3}>
                {/* Section 1 - icons */}
                <HStack justify="space-between">
                  <IconButton aria-label="Home" icon={<FiHome />} />
                  <IconButton aria-label="User" icon={<FiUser />} />
                  <IconButton aria-label="Settings" icon={<FiSettings />} />
                  <IconButton aria-label="Star" icon={<FiStar />} />
                </HStack>

                <Divider />

                {/* Section 2 - text buttons */}
                <VStack spacing={2} align="stretch">
                  <Button size="sm" bg="#DDA0DD" color={"white"} borderRadius={10}>Melding maken</Button>
                  <Button size="sm" bg={"teal"} color={"white"} borderRadius={10}>VIM</Button>
                  <Button size="sm" bg={"teal"} color={"white"} borderRadius={10}>LMS</Button>
                  <Button size="sm" bg={"teal"} color={"white"} borderRadius={10}>BHV</Button>
                  <Button size="sm" bg={"teal"} color={"white"} borderRadius={10}>DataLek</Button>
                </VStack>

                <Divider />

                {/* Section 3 - link button */}
                <Button leftIcon={<FiLink />} size="sm">
                  Link
                </Button>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        {/* Desktop HStack */}
        <HStack display={{ base: "none", md: "flex" }} spacing={3} align="center">
          {/* Section 1 - icons */}
          <HStack spacing={2}>
            <IconButton aria-label="Home" icon={<FiHome />} />
            <IconButton aria-label="User" icon={<FiUser />} />
            <IconButton aria-label="Settings" icon={<FiSettings />} />
            <IconButton aria-label="Star" icon={<FiStar />} />
          </HStack>

          {/* Section 2 - text buttons */}
          <HStack spacing={2}>
                  <Button size="sm" bg="#DDA0DD" color={"white"} paddingY={5} borderRadius={10}>Melding maken</Button>
                  <Button size="sm" bg={"teal"} color={"white"} paddingY={5} borderRadius={10}>VIM</Button>
                  <Button size="sm" bg={"teal"} color={"white"} paddingY={5} borderRadius={10}>LMS</Button>
                  <Button size="sm" bg={"teal"} color={"white"} paddingY={5} borderRadius={10}>BHV</Button>
                  <Button size="sm" bg={"teal"} color={"white"} paddingY={5} borderRadius={10}>DataLek</Button>
          </HStack>

          {/* Section 3 - link button */}
          <Button leftIcon={<FiLink />} size="md" />
        </HStack>

        {/* Avatar */}
        <Avatar size="sm" name="Paul" src="/paul.jpg" />
      </Flex>
    </Flex>
  );
}
