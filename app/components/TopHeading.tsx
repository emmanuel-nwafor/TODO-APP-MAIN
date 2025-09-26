"use client";

import {
  Flex,
  Text,
  IconButton,
  Switch,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiCircle, FiMenu, FiCalendar, FiPlus } from "react-icons/fi";

export default function TopHeading() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      align="center"
      justify="space-between"
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow="sm"
      mb={4}
      flexWrap="wrap"
      gap={2}
    >
      {/* Left: section icon + title */}
      <Flex align="center" gap={2}>
        <IconButton
          aria-label="Go back"
          icon={<FiCircle />}
          variant="ghost"
          size="sm"
        />
        <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
          Afdeling Kwaliteit
        </Text>
      </Flex>

      {/* Right: actions */}
      <Flex align="center" gap={2} flexWrap="wrap">
        <Switch aria-label="Toggle feature" size="md" />

        <IconButton
          aria-label="Open calendar"
          icon={<FiCalendar />}
          variant="ghost"
          size="sm"
        />

        {isMobile ? (
          // Mobile: show action buttons inside a popover
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <IconButton
                aria-label="Open menu"
                icon={<FiMenu />}
                variant="outline"
                size="sm"
              />
            </PopoverTrigger>
            <PopoverContent w="fit-content">
              <PopoverBody>
                <VStack spacing={2} align="stretch">
                  <Button colorScheme="purple" size="sm" w="full">
                    Export xlsx
                  </Button>
                  <Button
                    colorScheme="teal"
                    leftIcon={<FiPlus />}
                    size="sm"
                    w="full"
                  >
                    Add Task
                  </Button>
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ) : (
          // Desktop: show full action buttons
          <>
            <Button colorScheme="purple" size="md">
              Export xlsx
            </Button>
            <Button colorScheme="teal" leftIcon={<FiPlus />} size="md">
              Add Task
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
}
