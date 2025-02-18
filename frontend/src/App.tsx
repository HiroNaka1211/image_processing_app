import React from "react";
import { useState, useRef } from "react";
import "./App.css";
import FileInput from "./components/FileInput";
import DragDropArea from "./components/DragDropArea";
import InputImages from "./components/InputImages";
import ProcessingType from "./components/ProcessingType";
import { startProcessing } from "./api";

function App() {
  //Stored uploaded images
  const [images, setImages] = useState<File[]>([]);
  const [processing, setProcessing] = useState<string>("ALL");

  //stored received selected files as input images
  const handleFileSelect = (newFiles: File[]) => {
    setImages((prevImages) => [...prevImages, ...newFiles]);
  };

  const handleClick = async (e: React.MouseEvent) => {
    const ImageData = {
      processingStyle: processing,
      imageList: images,
    };
    await startProcessing(ImageData);
  };

  return (
    <div className="App">
      <h1>画像アップロード & 加工</h1>
      <div className="file-upload">
        <button onClick={handleClick}>Start Processing</button>
        <ProcessingType processingSelect={setProcessing} />
        <FileInput fileSelect={handleFileSelect} />
        <DragDropArea fileSelect={handleFileSelect} />
        <InputImages images={images} setImages={setImages} />
      </div>
    </div>
  );
}

export default App;
