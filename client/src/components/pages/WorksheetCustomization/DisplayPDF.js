import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import CartContext from "../../../context/Cart/CartContext";
import WorksheetContext from "../../../context/Worksheet/WorksheetContext";
import PDF from "../PDF/PDF.js";
import html2canvas from "html2canvas";

import { pdf } from "../PDF/PDF.module.css";
import { buttonLeft, buttonRight } from "./WorksheetCustomization.module.css";
import { back, next } from "./Button.module.css";

const DisplayPDF = () => {
  const { subjectName } = useParams();
  const { topicCart } = useContext(CartContext);
  const { getQuestions, jsonString } = useContext(WorksheetContext);
  const [topics, setTopics] = useState([]);

  const pdfContainer = useRef(null);

  const onDownload = () => {
    // TODO: ADD DOWNLOAD LOADING ANIMATION
    jsonString && console.log("pdf downloading...");

    pdfContainer.current.style.overflow = "visible";
    pdfContainer.current.style.height = `5000px`;
    html2canvas(pdfContainer.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Generate PDF
      const doc = new jsPDF("p", "px", "a1");
      doc.addImage(imgData, "PNG", 0, 0, 1080, 5000);
      doc.save("worksheet.pdf");
    });
    pdfContainer.current.style.overflow = "scroll";
    pdfContainer.current.style.height = "auto";
  };

  useEffect(() => {
    getQuestions(topicCart);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setTopics(jsonString === "" ? [] : JSON.parse(jsonString));
  }, [jsonString]);

  // Note: these lines were the product of two hours of work - Danny and Gianni
  useEffect(() => {
    window.MathJax.typeset();
  }, [topics]);

  return (
    <div className="content worksheet-customization-content">
      <div ref={pdfContainer} className={pdf}>
        <PDF topics={topics} />
      </div>
      <div className={buttonLeft}>
        <Link to={`/custom/${subjectName}/order`}>
          <button className={back}>{"<"} Questions</button>
        </Link>
      </div>
      <div className={buttonRight}>
        <button className={next} onClick={onDownload}>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default DisplayPDF;
