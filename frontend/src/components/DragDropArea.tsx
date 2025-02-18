import React from "react";

type FileInputProps = {
  fileSelect: (newFiles: File[]) => void;
};

function DropArea({ fileSelect }: FileInputProps) {
  const dragover = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const drop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const selectedimages: Object | null = event.dataTransfer.files;
    // console.log(selectedimages);
    if (selectedimages) {
      const key = Object.keys(selectedimages);
      const images: File[] = Object.values(selectedimages);
      fileSelect(images);
    }
  };

  return (
    <div id="imageArea" onDragOver={dragover} onDrop={drop}>
      ファイルをドラッグアンドドロップ
    </div>
  );
}

export default DropArea;
