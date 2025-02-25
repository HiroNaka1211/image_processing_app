import React from "react";

type ProcessingTypeProps = {
  processingSelect: (value: string) => void;
};

function ProcessingType(props: ProcessingTypeProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.processingSelect(event.target.value);
  };

  return (
    <div>
      <select name="" id="processingType" onChange={handleChange}>
        <option value="ALL">ALL</option>
        <option value="BLUR">BLUR</option>
        <option value="MOZAIKU">grayscale</option>
        <option value="grayscale">circle</option>
      </select>
    </div>
  );
}

export default ProcessingType;
