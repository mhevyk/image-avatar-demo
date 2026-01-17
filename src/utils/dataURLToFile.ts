export const dataURLtoFile = (dataURL: string, filename: string) => {
  const array = dataURL.split(",");
  const mime = array[0].match(/:(.*?);/)?.[1];

  const bstr = atob(array[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};
