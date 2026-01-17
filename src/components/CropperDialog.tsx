import { type CropState, useCropImage } from "@/hooks/useCropImage";
import { Box, Button, Dialog, IconButton, Portal } from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import Cropper from "react-easy-crop";

type CropperDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: File;
  initialCropState?: CropState;
  onSave?: (dataURL: string, cropState: CropState) => void;
};

export const CropperDialog = ({
  open,
  onOpenChange,
  image,
  initialCropState,
  onSave,
}: CropperDialogProps) => {
  const { cropperProps, cropState, getCroppedImageDataURL } = useCropImage({
    initialCropState,
    image,
  });

  const closeDialog = () => onOpenChange(false);

  const onSaveButtonClick = async () => {
    const croppedDataURL = await getCroppedImageDataURL();

    if (croppedDataURL) {
      onSave?.(croppedDataURL, cropState);
      closeDialog();
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => onOpenChange(details.open)}
      size="xl"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="600px" borderRadius="xl" overflow="hidden">
            <Dialog.Header py={4} px={6} borderBottomWidth="1px">
              <Dialog.Title fontSize="xl" fontWeight="semibold">
                Crop Avatar
              </Dialog.Title>
            </Dialog.Header>
            <IconButton
              aria-label="Close"
              variant="ghost"
              size="md"
              borderRadius="full"
              position="absolute"
              top={3}
              right={3}
              onClick={closeDialog}
            >
              <IoClose size={24} />
            </IconButton>
            <Dialog.Body p={0}>
              <Box position="relative" height="450px" bg="gray.800">
                {cropperProps.image && (
                  <Cropper
                    {...cropperProps}
                    style={{
                      containerStyle: {
                        width: "100%",
                        height: "100%",
                      },
                    }}
                  />
                )}
              </Box>
            </Dialog.Body>
            <Dialog.Footer py={4} px={6} borderTopWidth="1px" gap={3}>
              <Button variant="outline" size="md" onClick={closeDialog}>
                Cancel
              </Button>
              <Button onClick={onSaveButtonClick} colorPalette="blue" size="md">
                Save
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
