import React, { useState } from "react";
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
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    processingSelect(event.target.value);
  };

  const toggleMenu = () => {
    setIsMenuVisible(true);
  };
  const handleClick = (option: string) => {
    processingSelect(option);
    setIsMenuVisible(false);
    console.log(isMenuVisible);
  };

  return (
    <div>
      {images.length > 0 && (
        <div className={style.dropholder}>
          <p>Processing Style</p>
          <div className={style.dropdown} onClick={toggleMenu}>
            <p>{processing}</p>
          </div>
          <ul
            className={`${style.menu} ${isMenuVisible ? style.showMenu : ""}`}
          >
            <li onClick={() => handleClick("ALL")}>ALL</li>
            <li onClick={() => handleClick("BLUR")}>BLUR</li>
            <li onClick={() => handleClick("GRAYSCALE")}>GRAYSCALE</li>
          </ul>
        </div>
      )}
      {/* <select name="" id="processingType" onChange={handleChange}>
        <option value="ALL">ALL</option>
        <option value="BLUR">BLUR</option>
        <option value="MOZAIKU">grayscale</option>
        <option value="grayscale">circle</option>
      </select> */}
    </div>
  );
}

export default ProcessingType;
