import { useState } from "react";
import style from "./modal.module.css";

type ModalProps = {
  image: EditedImageType;
  setOpenModalIndex: React.Dispatch<React.SetStateAction<null | number>>;
};

export default function Modal({ image, setOpenModalIndex }: ModalProps) {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
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
  return (
    <div
      className={style.overlay}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <img
        className={style.image}
        src={"data:image/png;base64," + image.buffer}
        width={300}
        height={300}
      />
    </div>
  );
}
