import React, { useState, useContext } from "react";
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
import DataContext from "../../../context/Data/DataContext";
import ShoppingCart from "../../cart/ShoppingCart";

const SelectSubject = () => {

  const { loading, availableTopics } = useContext(DataContext);

  const [selectedSubject, setSelectedSubject] = useState("");
  const clickSubjectButton = (subject) => {
    setSelectedSubject(subject === selectedSubject ? "" : subject);
  };

  return !loading && (
    <div className="content worksheet-customization-content">
      <div className={shopping}>
        <ShoppingCart />
      </div>
      <div className={content}>
        <p className={header}>Worksheet Customization</p>
        <div className={buttons}>
          {Object.keys(availableTopics).map((subject) => (
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
