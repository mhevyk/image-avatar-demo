import { createImageFromDataURL } from "@/utils/createImageFromDataURL";
import { useEffect, useState } from "react";
import type { Area, Point } from "react-easy-crop";

const DEFAULT_CROP = {
  x: 0,
  y: 0,
};

const DEFAULT_ZOOM = 1;

export type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type CropState = {
  crop: Point;
  zoom: number;
  croppedAreaPixels: CropArea | null;
};

type UseCropImageOptions = {
  initialCropState?: CropState;
  image?: File;
};

export const useCropImage = ({
  initialCropState,
  image,
}: UseCropImageOptions = {}) => {
  const [crop, setCrop] = useState<Point>(
    initialCropState?.crop ?? DEFAULT_CROP,
  );

  const [zoom, setZoom] = useState(initialCropState?.zoom ?? DEFAULT_ZOOM);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
    initialCropState?.croppedAreaPixels ?? null,
  );

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!image) {
      setImageUrl(undefined);
      return;
    }

    const url = URL.createObjectURL(image);
    setImageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [image]);

  const getCroppedImageDataURL = async () => {
    if (!imageUrl || !croppedAreaPixels) {
      return;
    }

    const img = await createImageFromDataURL(imageUrl);

    const canvas = document.createElement("canvas");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    const ctx = canvas.getContext("2d");

    ctx?.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
    );

    return canvas.toDataURL("image/png");
  };

  const onCropComplete = (_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const cropperProps = {
    image: imageUrl,
    crop,
    onCropChange: setCrop,
    zoom,
    onZoomChange: setZoom,
    aspect: 1,
    onCropComplete,
  };

  const cropState: CropState = {
    crop,
    zoom,
    croppedAreaPixels,
  };

  return {
    cropperProps,
    cropState,
    getCroppedImageDataURL,
  };
};
