import React, { useContext } from "react";
import CartContext from "../../context/Cart/CartContext";
import CrossOutBtn from "./CrossOutBtn";

import styles from "./Cart.module.css";

const ShoppingCart = () => {
  const { topicCart } = useContext(CartContext);

  const subjects = Array.from(
    topicCart
    .reduce((acc, curr) => {
      return acc.add(curr.subject);
    }, new Set())
  ); // a list of the unique subjects

  const makeSubjectGrid = (subject) => {
    /* Returns a block of HTML elements representing the shopping cart's
    items for a single subject and its selected subtopics. */

    const subtopics = topicCart
      .reduce((acc, curr) => {
        if (curr.subject === subject) {
          return [...acc, curr.subtopic];
        }
        return acc;
      }, []);

    const subtopicElements = subtopics
    .map((subtopic) => (
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

  const topicCartHasSubject = (subject) => {
    for (let i = 0; i < topicCart.length; i++) {
      const request = topicCart[i];
      if (request.subject === subject) {
        return true;
      }
      return false;
    }
  };

  const gridContents = subjects
    .filter((subject) => topicCartHasSubject(subject) !== 0)
    .map((subject) => makeSubjectGrid(subject));

  return gridContents.length !== 0 ? (
    <div className={styles.cartWrapper}>{gridContents}</div>
  ) : (
    <></>
  );
};

export default ShoppingCart;
