"use client";

import { Box } from "@chakra-ui/react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import AppLayout from "./components/layout/AppRender";
import AppTable from "./components/AppTable"; // Updated import to match the table we created

export default function DashboardPage() {
  return (
    <AppLayout>
      <Box display="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <Box flex="1" ml={{ base: 0, md: "260px" }}>
          <Header />
          <Box p={6}>
            {/* Task Table */}
            <AppTable />
          </Box>
        </Box>
      </Box>
    </AppLayout>
  );
}
