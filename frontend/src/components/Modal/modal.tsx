import { useState } from "react";
import style from "./modal.module.css";

type ModalProps = {
  image: EditedImageType;
  setOpenModalIndex: React.Dispatch<React.SetStateAction<null | number>>;
};

export default function Modal({ image, setOpenModalIndex }: ModalProps) {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e.target);
    if (e.target === e.currentTarget) {
      setIsMouseDown(true);
    }
  };
  const onMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    if (isMouseDown) {
      console.log(e.target);
      console.log(e.currentTarget);
      if (e.target === e.currentTarget) {
        setOpenModalIndex(null);
      }
    }
  };

  const handleClose = () => {
    setOpenModalIndex(null);
  };

  return (
    <div
      className={style.overlay}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <div className={style.imageWrapper}>
        <img
          className={style.image}
          src={"data:image/png;base64," + image.buffer}
        />
        <span className={style.close} onClick={handleClose}></span>
      </div>
    </div>
  );
}
