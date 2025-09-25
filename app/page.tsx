// app/page.tsx
"use client"

import { Link } from "@chakra-ui/next-js"
import SidebarLayout from "./components/Sidebar"

export default function Page() {
  return (
    <SidebarLayout>
      <Link
        href="/about"
        color="blue.400"
        fontSize="2xl"
        _hover={{ color: "blue.500" }}
        fontWeight="bold"
      >
        About
      </Link>

      <p style={{ marginTop: "16px" }}>
        This is the dashboard main area. You can add your content here.
      </p>
    </SidebarLayout>
  )
}
