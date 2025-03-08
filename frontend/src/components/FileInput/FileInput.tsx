import React, { useRef } from "react";
import style from "./FileInput.module.css";

type FileInputProps = {
  fileSelect: (newFiles: File[]) => void;
};

function FileInput({ fileSelect }: FileInputProps) {
  //こちらの
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
    }
  };

  return (
    <div>
      <input
        className={style.inputElem}
        type="file"
        ref={inputElem}
        multiple
        accept="image/*"
        onChange={handleFileSelct}
      />
      <button className={style.inputBtn} type="button" onClick={handleClick}>
        <i className={style.icon}>📸</i>画像を選択
      </button>
    </div>
  );
}

export default FileInput;
