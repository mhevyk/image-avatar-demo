export const createImageFromDataURL = (dataURL: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.setAttribute("crossOrigin", "anonymous");
    image.src = dataURL;

    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", reject);
  });
};
