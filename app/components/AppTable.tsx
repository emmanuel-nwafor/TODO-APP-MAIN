"use client";

import {
  Box,
  Flex,
  AvatarGroup,
  Avatar,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiFlag, FiMoreVertical } from "react-icons/fi";

// --------------------
// Mock task data
// --------------------
const mockTasks = [
  {
    name: "MKV Intranet v2",
    date: "23/06/2024 - 23/07/2025",
    assignees: [
      { name: "Alice", src: "/avatars/alice.jpg" },
      { name: "Bob", src: "/avatars/bob.jpg" },
      { name: "Charlie", src: "/avatars/charlie.jpg" },
    ],
    priority: "Urgent",
  },
  {
    name: "Design System",
    date: "01/07/2024 - 15/07/2025",
    assignees: [
      { name: "Eve", src: "/avatars/eve.jpg" },
      { name: "Frank", src: "/avatars/frank.jpg" },
    ],
    priority: "Important",
  },
  {
    name: "Medical Appointement",
    date: "10/06/2024 - 30/06/2024",
    assignees: [{ name: "Grace", src: "/avatars/grace.jpg" }],
    priority: "Medium",
  },
    {
    name: "MKV Intranet v2",
    date: "23/06/2024 - 23/07/2025",
    assignees: [
      { name: "Alice", src: "/avatars/alice.jpg" },
      { name: "Bob", src: "/avatars/bob.jpg" },
      { name: "Charlie", src: "/avatars/charlie.jpg" },
    ],
    priority: "Urgent",
  },
  {
    name: "Design System",
    date: "01/07/2024 - 15/07/2025",
    assignees: [
      { name: "Eve", src: "/avatars/eve.jpg" },
      { name: "Frank", src: "/avatars/frank.jpg" },
      { name: "Alice", src: "/avatars/alice.jpg" },
    ],
    priority: "Important",
  },
  {
    name: "Medical Appointement",
    date: "10/06/2024 - 30/06/2024",
    assignees: [
      { name: "Grace", src: "/avatars/grace.jpg" },
      { name: "Bob", src: "/avatars/bob.jpg" },
    ],
    priority: "Medium",
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Medium":
      return "yellow";
    case "Important":
      return "orange";
    case "Urgent":
      return "red";
    default:
      return "gray";
  }
};

export default function TaskTable() {
  const isDesktop = useBreakpointValue({ base: false, lg: true }); // true on desktop

  return (
    <Box w="full">
      {isDesktop ? (
        // Desktop Table
        <Box overflowX="auto">
          <Table
            variant="simple"
            size="sm"
            minW="600px"
            borderRadius="xl"
            overflow="hidden"
          >
            <Thead bg="gray.100">
              <Tr>
                <Th px={6} py={6}>Name</Th>
                <Th px={6} py={6}>Date</Th>
                <Th px={6} py={6}>Assignee</Th>
                <Th px={6} py={6}>Priority</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mockTasks.map((task, index) => (
                <Tr key={index} borderRadius="md">
                  <Td px={6} py={3}><Text fontSize="md">{task.name}</Text></Td>
                  <Td px={6} py={3}><Text fontSize="md">{task.date}</Text></Td>
                  <Td px={6} py={3}>
                    <AvatarGroup size="sm" max={3} spacing={-3}>
                      {task.assignees.map((assignee) => (
                        <Avatar key={assignee.name} name={assignee.name} src={assignee.src} />
                      ))}
                    </AvatarGroup>
                  </Td>
                  <Td px={6} py={3}>
                    <Popover placement="left-start">
                      <PopoverTrigger>
                        <IconButton
                          aria-label="Show priority"
                          icon={<FiMoreVertical />}
                          size="sm"
                          variant="ghost"
                        />
                      </PopoverTrigger>
                      <PopoverContent w="fit-content">
                        <PopoverArrow />
                        <PopoverBody>
                          <Badge
                            colorScheme={getPriorityColor(task.priority)}
                            px={3} py={1} borderRadius="md"
                          >
                            <Flex align="center" gap={1}>
                              <FiFlag />
                              <Text fontSize="sm">{task.priority}</Text>
                            </Flex>
                          </Badge>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ) : (
        // Mobile & Tablet Grid
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {mockTasks.map((task, index) => (
            <Box
              key={index}
              borderRadius="xl"
              borderWidth="1px"
              p={4}
              bg="white"
              shadow="sm"
            >
              <Text fontWeight="bold" fontSize="sm">{task.name}</Text>
              <Text fontSize="xs" mb={2}>{task.date}</Text>
              <AvatarGroup size="sm" max={3} spacing={-3} mb={2}>
                {task.assignees.map((assignee) => (
                  <Avatar key={assignee.name} name={assignee.name} src={assignee.src} />
                ))}
              </AvatarGroup>
              <Badge
                colorScheme={getPriorityColor(task.priority)}
                px={2} py={1} borderRadius="md"
              >
                <Flex align="center" gap={1}>
                  <FiFlag />
                  <Text fontSize="xs">{task.priority}</Text>
                </Flex>
              </Badge>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
