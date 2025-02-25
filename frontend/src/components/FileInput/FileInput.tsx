import React from "react";

type FileInputProps = {
  fileSelect: (newFiles: File[]) => void;
};

function FileInput({ fileSelect }: FileInputProps) {
  const handleFileSelct = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    //received uploaded Images
    const selectedImages: FileList | null = event.target.files;
    //Check if there are any selected files
    if (selectedImages) {
      const files = Array.from(selectedImages);
      fileSelect(files);
    }
  };

  return <input type="file" multiple onChange={handleFileSelct} />;
}

export default FileInput;
