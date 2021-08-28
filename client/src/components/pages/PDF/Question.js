import React, { useRef } from "react";
import PDFImage from "./PDFImage";
import styles from "./PDF.module.css";
import { prepareLatex } from "./helpers";

const Question = ({ number, prompt, image }) => {

    return (
        <div className="question">
            <div className={styles.prompt}>
                {number}) {prepareLatex(prompt)}
            </div>
            <PDFImage imageJson={image} />
        </div>
    )
}

export default Question;