"use client";

import { Box } from "@chakra-ui/react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import AppLayout from "./components/layout/AppLayout";
import AppTable from "./components/AppTable"; // Updated import to match the table we created
import Statistic from "./components/Statistic";
import TableSearch from "./components/TableSearch";
import TopHeading from "./components/TopHeading";

export default function DashboardPage() {
  return (
    <AppLayout>
      <Box display="flex">
        <Sidebar />

        <Box flex="1" ml={{ base: 0, md: "260px" }}>
          <Header />
          <TopHeading />
          <TableSearch />
          <Statistic />
          <Box p={6}>
            <AppTable />
          </Box>
        </Box>
      </Box>
    </AppLayout>
  );
}
