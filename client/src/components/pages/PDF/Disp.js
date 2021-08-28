import React from "react";
import PDFImage from "./PDFImage";
import styles from "./PDF.module.css";
import { prepareLatex } from "./helpers";

const Disp = ({ number, body, image }) => {
    return (
        <div className={styles.disp}>
            <div className={styles.number}> {number})</div>
            <div className={styles.dispbody}>
                {prepareLatex(body)}
                <PDFImage imageJson={image} />    
            </div>
        </div>
    )
}

export default Disp;