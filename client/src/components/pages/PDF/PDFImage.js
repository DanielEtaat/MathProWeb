import React, { useEffect, useState } from "react";
import Desmos from "desmos";

const PDFImage = ({ imageJson }) => {
  const [imgSrc, setImgSrc] = useState("");
  const [hasImage] = useState(Object.keys(imageJson).length !== 0);

  useEffect(() => {
    if (imageJson.imageType === "Graph") {
      let calculator = Desmos.GraphingCalculator();
      calculator.updateSettings(imageJson.updateSettings);
      for (let expression of imageJson.expressions) {
        calculator.setExpression({ latex: expression });
      }
      calculator.asyncScreenshot(imageJson.screenshot, setImgSrc);
    }
  }, [imageJson]);

  return hasImage && <img alt="Question" src={imgSrc} />;
};

export default PDFImage;
