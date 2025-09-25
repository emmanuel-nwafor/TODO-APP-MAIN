"use client";

import {
  Flex,
  Button,
  Text,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiCheckSquare, FiClock, FiCheckCircle, FiChevronDown } from "react-icons/fi";

export default function Statistic() {
  // show popover for mobile and tablet
  const isMobileOrTablet = useBreakpointValue({ base: true, sm: true, md: true, lg: true, xl: false });

  const stats = [
    { label: "ToDo", icon: FiCheckSquare, count: 20, color: "purple.200" },
    { label: "InProgress", icon: FiClock, count: 23, color: "yellow.200" },
    { label: "Complete", icon: FiCheckCircle, count: 18, color: "teal.200" },
  ];

  return (
    <Flex
      align="center"
      justify="flex-start"
      py={2}
      px={{ base: 4, md: 0 }}
      bg="#f7f7f7"
      borderBottom="1px solid #e2e8f0"
      w="full"
    >
      {isMobileOrTablet ? (
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <Button
              bg="white"
              size="sm"
              borderRadius="md"
              px={4}
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Text fontSize="sm">Statistics</Text>
              <FiChevronDown />
            </Button>
          </PopoverTrigger>
          <PopoverContent w="fit-content" borderRadius="md">
            <PopoverBody p={4}>
              <VStack spacing={3} align="stretch">
                {stats.map((stat) => (
                  <Button
                    key={stat.label}
                    leftIcon={<Icon as={stat.icon} color={stat.color} />}
                    variant="solid"
                    size="sm"
                    justifyContent="space-between"
                    bg="white"
                  >
                    <Text>{stat.label}</Text>
                    <Text as="span" color="gray.600">({stat.count})</Text>
                  </Button>
                ))}
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        stats.map((stat) => (
          <Button
            key={stat.label}
            leftIcon={<Icon as={stat.icon} color={stat.color} fontSize={28} />}
            variant="solid"
            flexDirection="row"
            size="sm"
            borderRadius={7}
            bg="white"
            marginX={7}
            px={6}
            py={7}
            shadow={20}
          >
            <Text>{stat.label}</Text>
            <Text as="span" ml={30} color="gray.500" bg={stat.color} p={1} borderRadius="lg">({stat.count})</Text>
          </Button>
        ))
      )}
    </Flex>
  );
}
