import React, { useRef } from "react";
import style from "./DragAndDrop.module.css";

type FileInputProps = {
  fileSelect: (newFiles: File[]) => void;
  imageNum: number;
  setEditedImage: React.Dispatch<React.SetStateAction<EditedImageType[]>>;
};

function DropArea({ fileSelect, imageNum, setEditedImage }: FileInputProps) {
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
      setEditedImage([]);
    }
  };

  const inputElem = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    console.log(inputElem);
    if (inputElem.current) {
      inputElem.current.click();
    }
  };

  const handleFileSelct = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    //received uploaded Images
    const selectedImages: FileList | null = event.target.files;
    //Check if there are any selected files
    if (selectedImages) {
      const files = Array.from(selectedImages);
      fileSelect(files);
      setEditedImage([]);
    }
  };

  return (
    <div className={style.dragDropContainer}>
      {imageNum < 1 ? (
        <div
          className={style.dragArea}
          id="imageArea"
          onDragOver={dragover}
          onDrop={drop}
        >
          <p>ファイルをドラッグアンドドロップ</p>
          <p>または</p>
          <input
            className={style.inputElem}
            type="file"
            ref={inputElem}
            multiple
            accept="image/*"
            onChange={handleFileSelct}
          />
          <button
            className={style.inputBtn}
            type="button"
            onClick={handleClick}
          >
            <i className={style.icon}>📸</i>画像を選択
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default DropArea;
