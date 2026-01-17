import { CropperDialog } from "@/components/CropperDialog";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { toasterCreator } from "@/components/Toaster";
import type { CropState } from "@/hooks/useCropImage";
import { useProfileImageUpload } from "@/hooks/useProfileImageUpload";
import { Button, FileUpload, VStack } from "@chakra-ui/react";
import { useState } from "react";

type SavedAvatar = {
  file: File;
  previewUrl: string;
  cropState: CropState;
};

export const App = () => {
  const [savedAvatar, setSavedAvatar] = useState<SavedAvatar | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { fileUpload } = useProfileImageUpload({
    onFileAccept: () => {
      setIsEditing(false);
      setIsDialogOpen(true);
    },
  });

  const newImage = fileUpload.acceptedFiles[0];

  const dialogImage = isEditing ? savedAvatar?.file : newImage;

  const onSave = (previewUrl: string, cropState: CropState) => {
    if (dialogImage) {
      setSavedAvatar({ file: dialogImage, previewUrl, cropState });
    }

    setIsEditing(false);
  };

  const editAvatar = () => {
    if (savedAvatar) {
      setIsEditing(true);
      setIsDialogOpen(true);
    }
  };

  const resetFileState = () => {
    setIsEditing(false);
    fileUpload.clearFiles();
  };

  const clearAvatar = () => {
    setSavedAvatar(null);
    resetFileState();
  };

  const triggerUpload = () => {
    resetFileState();
    fileUpload.openFilePicker();
  };

  const uploadToBackend = () => {
    if (!savedAvatar) {
      return;
    }

    const payload = {
      originalImage: savedAvatar.file,
      cropParams: savedAvatar.cropState.croppedAreaPixels,
    };

    console.log("Uploading to backend:", payload);

    toasterCreator.create({
      title: "Upload triggered",
      description: "Check console for payload details",
      type: "success",
    });
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);

    if (!open) {
      setIsEditing(false);
    }
  };

  return (
    <FileUpload.RootProvider value={fileUpload}>
      <FileUpload.HiddenInput />
      <VStack gap={4}>
        <ProfileAvatar
          imageSrc={savedAvatar?.previewUrl}
          onClick={triggerUpload}
          onEdit={savedAvatar ? editAvatar : undefined}
          onClear={savedAvatar ? clearAvatar : undefined}
        />
        {savedAvatar && (
          <Button colorPalette="blue" onClick={uploadToBackend}>
            Upload to Backend
          </Button>
        )}
      </VStack>
      {dialogImage && isDialogOpen && (
        <CropperDialog
          open={isDialogOpen}
          onOpenChange={handleDialogOpenChange}
          image={dialogImage}
          initialCropState={isEditing ? savedAvatar?.cropState : undefined}
          onSave={onSave}
        />
      )}
    </FileUpload.RootProvider>
  );
};
