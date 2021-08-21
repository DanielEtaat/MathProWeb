import React, { useContext } from "react";
import CartContext from "../../context/Cart/CartContext";
import CrossOutBtn from "./CrossOutBtn";

import styles from "./Cart.module.css";

const ShoppingCart = () => {
  const { topicCart } = useContext(CartContext);

  const subjects = Object.keys(topicCart);

  const makeSubjectGrid = (subject) => {
    const subtopics = topicCart[subject];
    const subtopicElements = subtopics.map((subtopic) => (
      <div className={styles.subTopicRow} key={subtopic}>
        <div>{subtopic}</div>
        <CrossOutBtn subject={subject} subtopic={subtopic}></CrossOutBtn>
      </div>
    ));
    return (
      <div className={styles.subjectGrid} key={subject}>
        <div className={styles.subjectRow}>{subject}</div>
        {subtopicElements}
      </div>
    );
  };

  const gridContents = subjects
    .filter((subject) => topicCart[subject].length !== 0)
    .map((subject) => makeSubjectGrid(subject));

  return gridContents.length !== 0 ? (
    <div className={styles.cartWrapper}>{gridContents}</div>
  ) : (
    <></>
  );
};

export default ShoppingCart;
