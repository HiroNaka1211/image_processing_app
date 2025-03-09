import React, { useEffect, useRef, useState } from "react";
import style from "./Processing.module.css";

type ProcessingTypeProps = {
  processing: string;
  processingSelect: (value: string) => void;
  images: File[];
};

function ProcessingType({
  processing,
  processingSelect,
  images,
}: ProcessingTypeProps) {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);

  const ulRef = useRef<HTMLUListElement>(null);
  const processingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //セレクトタグの選択の際、選択肢以外のところがクリックされたら、選択メニューを非表示にする。
  const handleClickOutside = (e: MouseEvent) => {
    //containsに渡すために、e.targetをキャストする
    if (
      ulRef.current &&
      processingRef.current &&
      !processingRef.current.contains(e.target as HTMLElement) &&
      !ulRef.current.contains(e.target as HTMLElement)
    ) {
      setIsMenuVisible(false); // メニューを非表示にする
    }
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  const handleClick = (option: string) => {
    processingSelect(option);
    setIsMenuVisible(false);
  };

  return (
    <div>
      {images.length > 0 && (
        <div className={style.dropholder}>
          <p>Processing Style</p>
          <div
            ref={processingRef}
            className={`${style.dropdown} ${isMenuVisible ? style.open : ""}`}
            onClick={toggleMenu}
          >
            <p>{processing}</p>
          </div>
          <ul
            ref={ulRef}
            className={`${style.menu} ${isMenuVisible ? style.showMenu : ""}`}
          >
            <li onClick={() => handleClick("ALL")}>ALL</li>
            <li onClick={() => handleClick("BLUR")}>BLUR</li>
            <li onClick={() => handleClick("GRAYSCALE")}>GRAYSCALE</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProcessingType;
