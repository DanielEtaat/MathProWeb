import React from "react";
import { Link, useParams } from "react-router-dom";

import {
  shopping,
  content,
  buttonLeft,
  buttonRight,
  header,
} from "./WorksheetCustomization.module.css";
import { back, next } from "./Button.module.css";
import data from "../../../data/subjects.js";

import TopicGrid from "./TopicGrid";
import ShoppingCart from "../../cart/ShoppingCart";

const SelectTopics = () => {
  const { subjectName } = useParams();
  return (
    <div className="content worksheet-customization-content">
      <div className={shopping}>
        <ShoppingCart />
      </div>
      <div className={content}>
        <p className={header}>{subjectName}</p>
        <TopicGrid topicsMap={data[subjectName]} />
      </div>
      <div className={buttonLeft}>
        <Link to="/custom/">
          <button className={back}>{"<"} Subjects</button>
        </Link>
      </div>
      <div className={buttonRight}>
        <Link to={`/custom/${subjectName}/order`}>
          <button className={next}>Questions {">"}</button>
        </Link>
      </div>
    </div>
  );
};

export default SelectTopics;
