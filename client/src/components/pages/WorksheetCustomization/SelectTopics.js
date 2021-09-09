import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import {
  shopping,
  content,
  buttonLeft,
  buttonRight,
  header,
} from "./WorksheetCustomization.module.css";
import { back, prenext, next } from "./Button.module.css";
import DataContext from "../../../context/Data/DataContext";

import CartContext from "../../../context/Cart/CartContext";
import TopicGrid from "./TopicGrid";
import ShoppingCart from "../../cart/ShoppingCart";

const SelectTopics = () => {
  const { subjectName } = useParams();
  const { topicCart } = useContext(CartContext);
  const { loading, availableTopics } = useContext(DataContext);
  
  while (loading); // wait until loading is false.
  const data = availableTopics;
  console.log("data", data);

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
          <button
            disabled={topicCart?.length === 0}
            className={topicCart?.length !== 0 ? next : prenext}
          >
            Questions {">"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SelectTopics;
