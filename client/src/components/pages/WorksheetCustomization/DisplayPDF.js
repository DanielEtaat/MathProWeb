import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import CartContext from "../../../context/Cart/CartContext";
import WorksheetContext from "../../../context/Worksheet/WorksheetContext";
import PDF from "../PDF/PDF.js";
import Spinner from "../../layout/Spinner";

import { pdf } from "../PDF/PDF.module.css";
import { buttonLeft, buttonRight } from "./WorksheetCustomization.module.css";
import { back, prenext, next } from "./Button.module.css";

const DisplayPDF = () => {
  const { subjectName } = useParams();
  const { topicCart } = useContext(CartContext);
  const { loading, jsonString, getQuestions } = useContext(WorksheetContext);
  const [topics, setTopics] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const pdfContainer = useRef(null);

  const onDownload = () => {
    setIsDownloading(true);
    document.body.style.overflow = "hidden";
    pdfContainer.current.style.overflow = "visible";
    pdfContainer.current.style.height = `${pdfContainer.current.scrollHeight}px`;
    html2canvas(pdfContainer.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Generate PDF
      const doc = new jsPDF("p", "mm");
      heightLeft -= pageHeight;
      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight; // top padding for other pages
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save("worksheet.pdf");
      setIsDownloading(false);

      document.body.style.overflow = "hidden";
      pdfContainer.current.style.overflow = "scroll";
      pdfContainer.current.style.height = "auto";
    });
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
        {loading ? <Spinner /> : <PDF topics={topics} />}
      </div>
      <div className={buttonLeft}>
        <Link to={`/custom/${subjectName}/order`}>
          <button className={back}>{"<"} Questions</button>
        </Link>
      </div>
      <div className={buttonRight}>
        <button
          disabled={isDownloading || loading}
          className={isDownloading || loading ? prenext : next}
          onClick={onDownload}
        >
          {isDownloading ? "Downloading..." : "Download PDF"}
        </button>
      </div>
    </div>
  );
};

export default DisplayPDF;
