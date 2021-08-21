import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  shopping,
  content,
  buttonRight,
  header,
} from "./WorksheetCustomization.module.css";
import {
  buttons,
  subjectButton,
  subjectButtonSelected,
  prenext,
  next,
} from "./Button.module.css";
import data from "../../../data/subjects.js";
import ShoppingCart from "../../cart/ShoppingCart";

const SelectSubject = () => {
  const subjects = Object.keys(data);

  const [selectedSubject, setSelectedSubject] = useState("");
  const clickSubjectButton = (subject) => {
    setSelectedSubject(subject === selectedSubject ? "" : subject);
  };

  return (
    <div className="content worksheet-customization-content">
      <div className={shopping}>
        <ShoppingCart />
      </div>
      <div className={content}>
        <p className={header}>Worksheet Customization</p>
        <div className={buttons}>
          {subjects.map((subject) => (
            <button
              key={subject}
              className={
                subject === selectedSubject
                  ? subjectButtonSelected
                  : subjectButton
              }
              onClick={() => clickSubjectButton(subject)}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>
      <div className={buttonRight}>
        <Link to={"/custom/" + selectedSubject}>
          <button className={selectedSubject === "" ? prenext : next}>
            Topics {">"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SelectSubject;
