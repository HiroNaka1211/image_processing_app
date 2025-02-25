import React from "react";
import style from "../InputImages/InputImages.module.css";

type EditedImagesProps = {
  editedImages: EditedImageType[];
  setEditedImages: React.Dispatch<React.SetStateAction<EditedImageType[]>>;
};

export default function EditedImages({
  editedImages,
  setEditedImages,
}: EditedImagesProps) {
  return (
    <div>
      {editedImages.length > 0 && (
        <div>
          <h1>Edited Images</h1>
          <div className={style.container}>
            {editedImages.map((image, index) => {
              return (
                <div className={style.card} key={index}>
                  {/* <p>{decodeURIComponent(image.fileName)}</p> */}
                  <img
                    src={"data:image/png;base64," + image.buffer}
                    width={300}
                    height={300}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
