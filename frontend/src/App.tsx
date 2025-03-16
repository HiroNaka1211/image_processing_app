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
  const [loading, setLoading] = useState<boolean>(false);

  //stored received selected files as input images
  const handleFileSelect = (newFiles: File[]) => {
    setImages((prevImages) => [...prevImages, ...newFiles]);
  };

  const handleClick = async (e: React.MouseEvent) => {
    setLoading(true);
    const ImageData = {
      processingStyle: processing,
      imageList: images,
    };
    const data = await startProcessing(ImageData);
    setImages([]);
    setEditedImages(data);
    setLoading(false);
  };
  if (loading) {
    return (
      <div className="overlay">
        <div className="loading"></div>
        <span className="processing">Processing...</span>
      </div>
    );
  }

  return (
    <div className="App">
      <h1 className="title">画像アップロード & 加工</h1>
      <div className="upload-container">
        <button onClick={handleClick}>Start Processing</button>
        <ProcessingType processingSelect={setProcessing} />
        <DragDropArea
          fileSelect={handleFileSelect}
          imageNum={images.length}
          setEditedImage={setEditedImages}
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
