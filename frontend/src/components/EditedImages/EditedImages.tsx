import React, { useState } from "react";
import style from "./EditedImages.module.css";
import "./EditedImages.css";
import Modal from "../Modal/modal";

type EditedImagesProps = {
  editedImages: EditedImageType[];
  setEditedImages: React.Dispatch<React.SetStateAction<EditedImageType[]>>;
};

export default function EditedImages({
  editedImages,
  setEditedImages,
}: EditedImagesProps) {
  // クリックされた画像のインデックスを管理
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  // モーダルを切り替える関数
  const toggleModal = (index: number) => {
    // モーダルがすでに開いている場合は閉じる
    if (openModalIndex === index) {
      setOpenModalIndex(null);
    } else {
      // 新しい画像のモーダルを開く
      setOpenModalIndex(index);
    }
  };

  return (
    <div>
      {editedImages.length > 0 && (
        <div>
          <h1>Edited Images</h1>
          <div className={style.container}>
            {editedImages.map((image, index) => {
              return (
                <div className={style.card} key={index}>
                  {/* 画像をクリックしたときに対応するインデックスを渡す */}
                  <img
                    className={style.image}
                    src={"data:image/png;base64," + image.buffer}
                    width={300}
                    height={300}
                    onClick={() => toggleModal(index)} // クリックされた画像のインデックスを渡す
                  />
                  <a
                    className={style.dlBtn}
                    href={"data:image/png;base64," + image.buffer}
                    download
                  >
                    DOWNLOAD
                  </a>

                  {/* クリックされた画像をModalに渡す */}
                  {openModalIndex === index && (
                    <Modal
                      image={image}
                      setOpenModalIndex={setOpenModalIndex}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
