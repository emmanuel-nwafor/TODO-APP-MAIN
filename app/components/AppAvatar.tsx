"use client";

import { Avatar, AvatarBadge, Tooltip, HStack } from "@chakra-ui/react";

interface AppAvatarProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showOnline?: boolean;
}

export default function AppAvatar({ name, src, size = "md", showOnline = false }: AppAvatarProps) {
  return (
    <HStack>
      <Tooltip label={name}>
        <Avatar name={name} src={src} size={size}>
          {showOnline && <AvatarBadge boxSize="1.25em" bg="green.400" />}
        </Avatar>
      </Tooltip>
    </HStack>
  );
}
