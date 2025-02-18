import React from "react";
import style from "./../styles/imageCard.module.css";

type InputImagessProps = {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
};

function InputImages(props: InputImagessProps) {
  const handleDelete = (index: number) => {
    // 現在の画像リストを基に新しいリストを作成し、削除
    const updatedImages = props.images.filter((_, i) => i !== index);
    props.setImages(updatedImages); // 親コンポーネントに更新を通知
  };
  return (
    <div>
      <h2 id={style.title}>Selected Images</h2>
      <div className={style.container}>
        {" "}
        {props.images.map((image, index) => {
          const imageURL = URL.createObjectURL(image);
          return (
            <div className={style.card} key={index}>
              <img src={imageURL} alt="" width={300} height={300} />
              <button onClick={() => handleDelete(index)}>DELETE</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InputImages;
