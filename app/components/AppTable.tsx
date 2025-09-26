"use client";

import React, { useEffect, useMemo, useState } from "react";
// impoirts from Chakra UI
import {
  Box,
  Flex,
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
  Button,
  HStack,
  useBreakpointValue,
  Select,
  Stack,
  AvatarGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Tag,
  TagLabel,
  TagCloseButton,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
// imports from react-icons
import {
  FiFlag,
  FiMoreVertical,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiUserPlus,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

// Types
type Assignee = { name: string; src?: string };
type Task = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  assignees: Assignee[];
  priority: "Medium" | "Important" | "Urgent";
  description?: string;
};

// saving to local storage
const STORAGE_KEY = "tasks_v2";
const loadFromStorage = (): Task[] => {
  try {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Task[];
  } catch {
    return [];
  }
};
const saveToStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
      console.error("Failed to save tasks to local storage");
  }
};


const seedTasks = (count = 12): Task[] =>
  Array.from({ length: count }).map((_, i) => {
    const p = (["Medium", "Important", "Urgent"] as const)[i % 3];
    return {
      id: Date.now() + i,
      name: `Task Project ${i + 1}`,
      startDate: `2024-${String(((i % 12) + 1)).padStart(2, "0")}-01`,
      endDate: `2025-${String(((i % 12) + 1)).padStart(2, "0")}-15`,
      assignees: [
        { name: "Alice", src: "/avatars/alice.jpg" },
        { name: "Bob", src: "/avatars/bob.jpg" },
        { name: "Charlie", src: "/avatars/charlie.jpg" },
        { name: "David", src: "/avatars/david.jpg" },
      ].slice(0, (i % 4) + 1),
      priority: p,
      description: `Example description for task ${i + 1}`,
    } as Task;
  });

function RenderAvatars({ assignees }: { assignees: Assignee[] }) {
  const count = assignees.length;
  if (count === 0) return <Text fontSize="xs">—</Text>;

  if (count <= 3) {
    return (
      <AvatarGroup size="sm" max={3} spacing={-2}>
        {assignees.map((a) => (
          <Avatar key={a.name} name={a.name} src={a.src} />
        ))}
      </AvatarGroup>
    );
  }

  // more than 3: show first 2 and +N
  const visible = assignees.slice(0, 2);
  const remainder = count - 2;
  return (
    <AvatarGroup size="sm" spacing={-2}>
      {visible.map((a) => (
        <Avatar key={a.name} name={a.name} src={a.src} />
      ))}
      <Avatar name={`+${remainder}`} bg="gray.200" color="black">
        +{remainder}
      </Avatar>
    </AvatarGroup>
  );
}

// Priority color 
const getPriorityColor = (p: Task["priority"]) => {
  switch (p) {
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

// Subtle animations for better UIUX
const MotionTr = motion(Tr);
const MotionBox = motion(Box);

export default function TaskTable() {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = loadFromStorage();
    if (stored.length) return stored;
    const seeded = seedTasks(14);
    saveToStorage(seeded);
    return seeded;
  });

  // event when task chnages
  useEffect(() => saveToStorage(tasks), [tasks]);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const totalPages = Math.max(1, Math.ceil(tasks.length / itemsPerPage));
  useEffect(() => {
    // clamp item per page
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [itemsPerPage, totalPages, currentPage]);

  const displayedTasks = useMemo(
    () => tasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [tasks, currentPage, itemsPerPage]
  );

  // modal for adding/editing
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editing, setEditing] = useState<Task | null>(null);

  // form state
  type TaskForm = Task & { _newAssignee?: string };

  const emptyForm: TaskForm = {
    id: 0,
    name: "",
    startDate: "",
    endDate: "",
    assignees: [],
    priority: "Medium",
    description: "",
    _newAssignee: "",
  };

  const [form, setForm] = useState<TaskForm>(emptyForm);

  // open add
  function openAdd() {
    setEditing(null);
    setForm({ ...emptyForm, id: Date.now() });
    onOpen();
  }

  // open edit
  function openEdit(t: Task) {
    setEditing(t);
    setForm({ ...t });
    onOpen();
  }

  // save CRUD
  function handleSave() {
    // form validation
    if (!form.name.trim()) {
      alert("Please enter a task name.");
      return;
    }
    if (!form.startDate || !form.endDate) {
      alert("Pick start and end dates.");
      return;
    }
    if (new Date(form.endDate) < new Date(form.startDate)) {
      alert("End date must be after start date.");
      return;
    }

    if (editing) {
      setTasks((prev) => prev.map((p) => (p.id === editing.id ? { ...form } : p)));
    } else {
      setTasks((prev) => [{ ...form, id: Date.now() }, ...prev]);
      setCurrentPage(1);
    }
    onClose();
  }

  function handleDelete(id: number) {
    if (!confirm("Delete this task?")) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  // assignee helpers in modal form
  function addAssigneeFromInput(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    setForm((f) => ({ ...f, assignees: [...f.assignees, { name: trimmed }] }));
  }
  function removeAssigneeFromForm(name: string) {
    setForm((f) => ({ ...f, assignees: f.assignees.filter((a) => a.name !== name) }));
  }

  // pagination helpers, for displaying page numbers
  const maxToShow = 5;
  const pageStart = Math.max(1, currentPage - 2);
  const pageEnd = Math.min(totalPages, pageStart + maxToShow - 1);
  const pageNumbers = [];
  for (let i = pageStart; i <= pageEnd; i++) pageNumbers.push(i);

  // formatting helper
  const formatRange = (s: string, e: string) => {
    if (!s || !e) return "";
    const fs = new Date(s);
    const fe = new Date(e);
    const fmt = (d: Date) => `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
    return `${fmt(fs)} - ${fmt(fe)}`;
  };

  return (
    <Box w="full">
      {/* Desktop Table */}
      {isDesktop ? (
        <Box overflowX="auto">
          <Flex justify="space-between" align="center" mb={3} px={{ base: 2, md: 6 }}>
            <Text fontSize="lg" fontWeight="bold">Tasks</Text>
            <HStack spacing={3}>
              <Button leftIcon={<FiPlus />} colorScheme="teal" size="sm" onClick={openAdd}>Add Task</Button>
            </HStack>
          </Flex>

          <Table variant="simple" size="sm" minW="600px" bg="white" borderRadius="xl" overflow="hidden">
            <Thead bg="gray.100">
              <Tr>
                <Th px={6} py={3}>Name</Th>
                <Th px={6} py={3}>Date</Th>
                <Th px={6} py={3}>Assignees</Th>
                <Th px={6} py={3}>Priority</Th>
                <Th px={6} py={3}></Th>
              </Tr>
            </Thead>
            <Tbody>
              <AnimatePresence initial={false}>
                {displayedTasks.map((task) => (
                  <MotionTr
                    key={task.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Td px={4} py={2}>
                      <Text fontSize={{ base: "sm", md: "md" }}>{task.name}</Text>
                      {/* Commented out description, hence it wasn't in figma file */}
                      {/* <Text fontSize="xs" color="gray.500">{task.description}</Text> */}
                    </Td>

                    <Td px={4} py={2}>
                      <Text fontSize={{ base: "xs", md: "sm" }}>{formatRange(task.startDate, task.endDate)}</Text>
                    </Td>

                    <Td px={4} py={2}>
                      <RenderAvatars assignees={task.assignees} />
                    </Td>

                    <Td px={4} py={2}>
                      <Popover placement="left-start">
                        <PopoverTrigger>
                          <IconButton aria-label="Show priority" icon={<FiMoreVertical />} variant="ghost" size="sm" />
                        </PopoverTrigger>
                        <PopoverContent w="fit-content">
                          <PopoverArrow />
                          <PopoverBody>
                            <Badge colorScheme={getPriorityColor(task.priority)} px={3} py={1} borderRadius="md">
                              <Flex align="center" gap={2}>
                                <FiFlag />
                                <Text fontSize="sm">{task.priority}</Text>
                              </Flex>
                            </Badge>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </Td>

                    <Td px={4} py={2}>
                      <HStack justify="flex-end">
                        <Tooltip label="Edit">
                          <IconButton aria-label="Edit" icon={<FiEdit2 />} size="sm" onClick={() => openEdit(task)} />
                        </Tooltip>
                        <Tooltip label="Delete">
                          <IconButton aria-label="Delete" icon={<FiTrash2 />} size="sm" onClick={() => handleDelete(task.id)} />
                        </Tooltip>
                      </HStack>
                    </Td>
                  </MotionTr>
                ))}
              </AnimatePresence>
            </Tbody>
          </Table>

          {/* Pagination controls (desktop) */}
          <Flex justify="space-between" align="center" mt={4} px={{ base: 2, md: 6 }} flexDirection={{ base: "column", md: "row" }} gap={{ base: 4, md: 0 }}>
            <HStack spacing={2} flexWrap="wrap" justifyContent="center">
              <Button size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} isDisabled={currentPage === 1} leftIcon={<FiChevronLeft />} variant="outline" colorScheme="teal" borderRadius="full" />
              {pageNumbers.map((number) => (
                <Button key={number} size="sm" variant={currentPage === number ? "solid" : "outline"} colorScheme="teal" borderRadius="full" onClick={() => setCurrentPage(number)}>
                  {number}
                </Button>
              ))}
              {pageEnd < totalPages && <Text mx={2} fontSize="sm">...</Text>}
              <Button size="sm" variant="outline" colorScheme="teal" borderRadius="full">100</Button>
              <Button size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} isDisabled={currentPage === totalPages} rightIcon={<FiChevronRight />} variant="outline" colorScheme="teal" borderRadius="full" />
            </HStack>

            <Flex align="center" mt={{ base: 4, md: 0 }}>
              <Text mr={2} fontSize="sm">Rows per page:</Text>
              <Select size="sm" value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} w={{ base: "60px", md: "80px" }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </Select>
            </Flex>
          </Flex>
        </Box>
      ) : (
        // Mobile / Tablet Grid
        <Stack spacing={4}>
          <Flex justify="space-between" align="center" mb={1} px={{ base: 2, md: 4 }}>
            <Text fontSize="lg" fontWeight="bold">Tasks</Text>
            <Button leftIcon={<FiPlus />} colorScheme="teal" size="sm" onClick={openAdd}>Add</Button>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <AnimatePresence initial={false}>
              {displayedTasks.map((task) => (
                <MotionBox key={task.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }}>
                  <Box borderRadius="lg" borderWidth="1px" p={{ base: 2, md: 4 }} bg="white" shadow="sm">
                    <Flex justify="space-between" align="start" mb={2}>
                      <Box>
                        <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>{task.name}</Text>
                        <Text fontSize="xs" color="gray.600">{formatRange(task.startDate, task.endDate)}</Text>
                      </Box>
                      <HStack spacing={1}>
                        <IconButton aria-label="Edit" icon={<FiEdit2 />} size="sm" onClick={() => openEdit(task)} />
                        <IconButton aria-label="Delete" icon={<FiTrash2 />} size="sm" onClick={() => handleDelete(task.id)} />
                      </HStack>
                    </Flex>

                    <Box mb={3}>
                      <RenderAvatars assignees={task.assignees} />
                    </Box>

                    <Badge colorScheme={getPriorityColor(task.priority)} px={2} py={1} borderRadius="md">
                      <Flex align="center" gap={1}>
                        <FiFlag />
                        <Text fontSize="xs">{task.priority}</Text>
                      </Flex>
                    </Badge>
                  </Box>
                </MotionBox>
              ))}
            </AnimatePresence>
          </SimpleGrid>

          {/* Mobile pagination */}
          <Flex justify="center" mt={4} gap={2}>
            <Button size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} isDisabled={currentPage === 1} leftIcon={<FiChevronLeft />} />
            <Text fontSize="sm">{currentPage} / {totalPages}</Text>
            <Button size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} isDisabled={currentPage === totalPages} rightIcon={<FiChevronRight />} />
          </Flex>

          <Flex justify="center" mt={2}>
            <Text mr={2} fontSize="sm">Rows per page:</Text>
            <Select size="sm" value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} w="80px">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </Select>
          </Flex>
        </Stack>
      )}

      {/* Modal for Add / Edit */}
      <Modal isOpen={isOpen} onClose={() => { onClose(); setEditing(null); }} size="md" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editing ? "Edit Task" : "Add Task"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <FormControl>
                <FormLabel>Task name</FormLabel>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Task title" />
              </FormControl>

              <Flex gap={2}>
                <FormControl>
                  <FormLabel>Start date</FormLabel>
                  <Input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
                </FormControl>
                <FormControl>
                  <FormLabel>End date</FormLabel>
                  <Input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
                </FormControl>
              </Flex>

              <FormControl>
                <FormLabel>Assignees</FormLabel>
                <HStack>
                  <Input
                    placeholder="Type name and press Add"
                    value={form._newAssignee ?? ""}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, _newAssignee: e.target.value }))
                    }
                  />
                  <Button
                    onClick={() => {
                      addAssigneeFromInput(form._newAssignee || "");
                      setForm((f) => ({ ...f, _newAssignee: "" }));
                    }}
                    leftIcon={<FiUserPlus />}
                  />
                </HStack>
                <HStack mt={2} spacing={2} flexWrap="wrap">
                  {form.assignees.map((a) => (
                    <Tag key={a.name} size="sm" borderRadius="full" variant="solid" colorScheme="gray">
                      <TagLabel>{a.name}</TagLabel>
                      <TagCloseButton onClick={() => removeAssigneeFromForm(a.name)} />
                    </Tag>
                  ))}
                </HStack>
              </FormControl>

              <FormControl>
                <FormLabel>Priority</FormLabel>
                <Select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as Task["priority"] })}>
                  <option value="Medium">Medium</option>
                  <option value="Important">Important</option>
                  <option value="Urgent">Urgent</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Optional description" />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => { onClose(); setEditing(null); }}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={() => { handleSave(); setEditing(null); }}>
              {editing ? "Save" : "Add"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
