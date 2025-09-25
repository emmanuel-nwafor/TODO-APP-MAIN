"use client"

import {
  Box,
  Flex,
  IconButton,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react"
import {
  FiHome,
  FiSettings,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi"
import { useState } from "react"

const navItems = [
  { label: "Home", icon: FiHome },
  { label: "Profile", icon: FiUser },
  { label: "Settings", icon: FiSettings },
]

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Flex h="100vh" bg="gray.50">
      {/* Desktop Sidebar */}
      <Box
        as="nav"
        pos="fixed"
        left="0"
        top="0"
        h="100vh"
        w={collapsed ? "70px" : "220px"}
        bg="white"
        boxShadow="md"
        transition="width 0.2s"
        display={{ base: "none", md: "block" }}
      >
        <Flex
          align="center"
          justify={collapsed ? "center" : "space-between"}
          px="4"
          py="4"
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          {!collapsed && (
            <Text fontSize="lg" fontWeight="bold">
              MyApp
            </Text>
          )}
          <IconButton
            aria-label="Toggle sidebar"
            icon={collapsed ? <FiMenu /> : <FiX />}
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            variant="ghost"
          />
        </Flex>

        <VStack as="ul" spacing={2} mt="4" align="stretch">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              justifyContent={collapsed ? "center" : "flex-start"}
              leftIcon={<item.icon />}
              px="4"
              py="2"
              borderRadius="md"
            >
              {!collapsed && item.label}
            </Button>
          ))}
        </VStack>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerContent>
          <Box w="220px" p="4">
            <Flex justify="space-between" align="center">
              <Text fontSize="lg" fontWeight="bold">
                MyApp
              </Text>
              <IconButton
                aria-label="Close menu"
                icon={<FiX />}
                onClick={onClose}
                size="sm"
                variant="ghost"
              />
            </Flex>

            <VStack as="ul" spacing={2} mt="6" align="stretch">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  justifyContent="flex-start"
                  leftIcon={<item.icon />}
                  px="4"
                  py="2"
                  borderRadius="md"
                  onClick={onClose}
                >
                  {item.label}
                </Button>
              ))}
            </VStack>
          </Box>
        </DrawerContent>
      </Drawer>

      {/* Main Content Area */}
      <Flex
        flex="1"
        ml={{ base: 0, md: collapsed ? "70px" : "220px" }}
        transition="margin 0.2s"
        direction="column"
        w="full"
      >
        {/* Header */}
        <Flex
          as="header"
          h="14"
          px="4"
          align="center"
          justify="space-between"
          bg="white"
          borderBottom="1px solid"
          borderColor="gray.200"
          boxShadow="sm"
        >
          <IconButton
            aria-label="Open menu"
            icon={<FiMenu />}
            display={{ base: "inline-flex", md: "none" }}
            onClick={onOpen}
            variant="ghost"
          />
          <Text fontWeight="bold">Dashboard</Text>
        </Flex>

        {/* Page Content */}
        <Box as="main" flex="1" p="4" overflowY="auto">
          {children}
        </Box>
      </Flex>
    </Flex>
  )
}
