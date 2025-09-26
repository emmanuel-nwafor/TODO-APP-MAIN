"use client";

import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function Dashboard({ children }: AppLayoutProps) {

  return (
    <Flex minH="100vh" bg="gray.50">
      <Box flex="1">
        {children}
      </Box>
    </Flex>
  );
}
