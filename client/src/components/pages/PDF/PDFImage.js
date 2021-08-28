import React, { useEffect, useState } from "react";
import Desmos from "desmos";

const PDFImage = ({ imageJson }) => {
  const [imgSrc, setImgSrc] = useState("");

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

  return <img alt="Question" src={imgSrc} />;
};

export default PDFImage;
