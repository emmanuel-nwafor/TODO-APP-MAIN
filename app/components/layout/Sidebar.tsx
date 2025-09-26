"use client";

import { Box, Flex, VStack, Text, Collapse, Divider, Link as ChakraLink, useDisclosure, IconButton, Drawer, DrawerOverlay, DrawerContent } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import {
  FiHome,
  FiFolder,
  FiUsers,
  FiFileText,
  FiCheckSquare,
  FiPhone,
  FiChevronDown,
  FiChevronRight,
  FiSettings,
  FiMenu,
} from "react-icons/fi";

// --------------------
// Menu items
// --------------------
const MENU_ITEMS = [
  { label: "Home", href: "/", icon: <FiHome /> },
  { label: "MKVanBinnen", href: "/mkvanbinnen", icon: <FiFileText /> },
  { label: "Document Management", href: "/documents", icon: <FiFolder /> },
  { label: "Patient Information", href: "/patients", icon: <FiUsers /> },
  { label: "Agenda", href: "/agenda", icon: <FiFileText /> },
  { label: "My Department", href: "/department", icon: <FiUsers /> },
  { label: "News", href: "/news", icon: <FiFileText /> },
  { label: "Members", href: "/members", icon: <FiUsers /> },
  { label: "To-Do", href: "/todos", icon: <FiCheckSquare /> },
  {
    label: "Group Settings",
    icon: <FiSettings />,
    children: [
      { label: "Agenda", href: "/settings/agenda", icon: <FiFileText /> },
      { label: "Follow up system", href: "/settings/follow-up", icon: <FiFileText /> },
    ],
  },
  { label: "Phone numbers", href: "/phones", icon: <FiPhone /> },
  {
    label: "Admin",
    icon: <FiUsers />,
    children: [
      { label: "Agenda", href: "/admin/agenda", icon: <FiFileText /> },
      { label: "News", href: "/admin/news", icon: <FiFileText /> },
      { label: "Poll", href: "/admin/poll", icon: <FiFileText /> },
      { label: "Department Rules", href: "/admin/rules", icon: <FiFileText /> },
    ],
  },
];

export default function Sidebar() {
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const SidebarContent = (
    <VStack align="stretch" spacing={1} p={4} h="full" overflowY="auto" bg="white" w="260px">
      {/* Logo Image */}
      <Box mb={6} textAlign="center">
        <Image
          src="https://res.cloudinary.com/dqtjja88b/image/upload/v1758807223/todo-app-logo-removebg-preview_hzybso.png"
          alt="App Logo"
          width={170}
          height={70}
          style={{ objectFit: "contain", margin: "0 auto" }}
        />
      </Box>

      {/* Menu Items */}
      {MENU_ITEMS.map((item) => (
        <Box key={item.label}>
          <Flex
            align="center"
            justify="space-between"
            px={3}
            py={2}
            borderRadius="md"
            cursor="pointer"
            _hover={{ bg: "gray.100" }}
            onClick={() => item.children && setOpenSubMenu(openSubMenu === item.label ? null : item.label)}
          >
            <Flex align="center" gap={3}>
              {item.icon}
              <Text fontSize="sm">{item.label}</Text>
            </Flex>
            {item.children && (openSubMenu === item.label ? <FiChevronDown /> : <FiChevronRight />)}
          </Flex>

          {item.children && (
            <Collapse in={openSubMenu === item.label}>
              <VStack pl={8} align="stretch" spacing={1}>
                {item.children.map((child) => (
                  <ChakraLink as={NextLink} key={child.label} href={child.href ?? "#"} _hover={{ textDecoration: "none" }}>
                    <Flex align="center" gap={2} px={3} py={2} borderRadius="md" _hover={{ bg: "gray.50" }}>
                      {child.icon}
                      <Text fontSize="sm">{child.label}</Text>
                    </Flex>
                  </ChakraLink>
                ))}
              </VStack>
            </Collapse>
          )}
        </Box>
      ))}

      <Divider my={4} />
    </VStack>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Box display={{ base: "block", md: "none" }}>
        <IconButton
          aria-label="Open Menu"
          icon={<FiMenu />}
          pos="fixed"
          top={4}
          left={4}
          zIndex={1100}
          onClick={onOpen}
        />
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent maxW="260px">{SidebarContent}</DrawerContent>
        </Drawer>
      </Box>

      {/* Desktop Sidebar */}
      <Box
        as="nav"
        display={{ base: "none", md: "block" }}
        pos="fixed"
        top={0}
        left={0}
        h="100vh"
        borderRight="1px solid #e2e8f0"
      >
        {SidebarContent}
      </Box>
    </>
  );
}
