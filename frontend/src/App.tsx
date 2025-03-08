import React from "react";
import { useState } from "react";
import "./App.css";
import DragDropArea from "./components/DragAndDrop/DragDropArea";
import InputImages from "./components/InputImages/InputImages";
import ProcessingType from "./components/ProcessingType";
import EditedImages from "./components/EditedImages/EditedImages";
import { startProcessing } from "./api";

function App() {
  //Stored uploaded images
  const [images, setImages] = useState<File[]>([]);
  const [editedImages, setEditedImages] = useState<EditedImageType[]>([]);
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
    const data = await startProcessing(ImageData);
    console.log(data);
    setImages([]);
    setEditedImages(data);
  };

  return (
    <div className="App">
      <h1 className="title">画像アップロード & 加工</h1>
      <div className="upload-container">
        <button onClick={handleClick}>Start Processing</button>
        <DragDropArea
          fileSelect={handleFileSelect}
          imageNum={images.length}
          setEditedImage={setEditedImages}
        />
        <ProcessingType
          processing={processing}
          processingSelect={setProcessing}
          images={images}
        />
        <InputImages images={images} setImages={setImages} />
        <EditedImages
          editedImages={editedImages}
          setEditedImages={setEditedImages}
        />
      </div>
    </div>
  );
}

export default App;
