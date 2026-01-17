import { Avatar, Box, Icon, IconButton, VStack } from "@chakra-ui/react";
import { HiPencil } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

type AppAvatarProps = {
  imageSrc?: string;
  fallbackSrc?: string;
  onEdit?: () => void;
  onClear?: () => void;
  onClick?: () => void;
};

export const ProfileAvatar = ({
  imageSrc,
  fallbackSrc,
  onEdit,
  onClear,
  onClick,
}: AppAvatarProps) => {
  const hasActions = onEdit || onClear;

  return (
    <Box display="inline-block" position="relative">
      <Box
        as="button"
        onClick={onClick}
        borderRadius="full"
        overflow="hidden"
        border="3px solid"
        borderColor="gray.100"
        _focus={{
          outline: "none",
          boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
        }}
        _hover={{ borderColor: "gray.200" }}
        transition="all 0.2s"
        cursor="pointer"
      >
        <Avatar.Root size="2xl" shape="full">
          <Avatar.Image src={imageSrc} />
          <Avatar.Fallback bg="gray.100">
            {fallbackSrc && (
              <img
                src={fallbackSrc}
                alt="Fallback avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </Avatar.Fallback>
        </Avatar.Root>
      </Box>
      {hasActions && (
        <VStack
          gap={1}
          position="absolute"
          right={-3}
          top={0}
          bottom={0}
          justifyContent="center"
        >
          {onEdit && (
            <IconButton
              size="2xs"
              rounded="full"
              variant="outline"
              borderColor="gray.200"
              bg="white"
              color="gray.600"
              _hover={{ bg: "gray.50", borderColor: "gray.300" }}
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              aria-label="Edit avatar"
            >
              <Icon as={HiPencil} boxSize={3} />
            </IconButton>
          )}
          {onClear && (
            <IconButton
              size="2xs"
              rounded="full"
              variant="outline"
              borderColor="gray.200"
              bg="white"
              color="gray.400"
              _hover={{
                bg: "red.50",
                borderColor: "red.200",
                color: "red.500",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              aria-label="Clear avatar"
            >
              <Icon as={IoClose} boxSize={3} />
            </IconButton>
          )}
        </VStack>
      )}
    </Box>
  );
};
