import { toasterCreator } from "@/components/Toaster";
import { type FileUploadFileRejection, useFileUpload } from "@chakra-ui/react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

type ErrorCode = FileUploadFileRejection["errors"][number];

const errorCodeDisplayValueMap = new Map<ErrorCode, string>([
  [
    "FILE_TOO_LARGE",
    `File is too large. Max file size is ${MAX_FILE_SIZE / (1024 * 1024)} MB.`,
  ],
  ["FILE_INVALID_TYPE", "Invalid file type. Please upload an image file."],
]);

type UseProfileImageUploadOptions = {
  onFileAccept?: (image: File) => void;
};

export const useProfileImageUpload = ({
  onFileAccept,
}: UseProfileImageUploadOptions) => {
  const fileUpload = useFileUpload({
    maxFiles: 1,
    maxFileSize: MAX_FILE_SIZE,
    accept: ["image/*"],
    onFileAccept: ({ files }) => onFileAccept?.(files[0]),
    onFileReject: ({ files }) => {
      const errorCodes = files[0].errors;

      const displayedErrors = errorCodes.reduce<string[]>(
        (result, errorCode) => {
          const displayError = errorCodeDisplayValueMap.get(errorCode);

          if (displayError) {
            result.push(displayError);
            return result;
          }

          return result;
        },
        [],
      );

      displayedErrors.forEach((displayError) => {
        toasterCreator.create({
          description: displayError,
          type: "error",
          closable: true,
        });
      });
    },
  });

  return { fileUpload };
};
