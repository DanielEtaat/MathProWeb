import React, { useState, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";

import {
  grip,
  orderItem,
  questionCountContainer,
  questionCountInput,
  countBtn,
  hidden,
} from "./OrderTopics.module.css";
import CartContext from "../../../context/Cart/CartContext";

const OrderItem = ({ subject, topic, subtopic, index }) => {
  const min = 1;
  const max = 10;
  const { changeNumQuestions, getTopicItem } = useContext(CartContext);
  const currTopicItem = getTopicItem(subject, topic, subtopic);
  const [questionCount, setQuestionCount] = useState(
    currTopicItem ? currTopicItem.numQuestions : 10
  );

  const updateQuestionCount = (count) => {
    setQuestionCount(count);
    changeNumQuestions(subject, topic, subtopic, count);
  };

  const capCounter = (e) => {
    const { value } = e.target;
    const checkedVal =
      value === ""
        ? value
        : Math.floor(
            Math.max(Number(min), Math.min(Number(max), Number(value)))
          );

    updateQuestionCount(checkedVal);
  };
  const incrementCounter = () => {
    const increasedVal = questionCount + 1;
    increasedVal <= max && updateQuestionCount(increasedVal);
  };
  const decrementCounter = () => {
    const decreasedVal = questionCount - 1;
    decreasedVal >= min && updateQuestionCount(decreasedVal);
  };

  return (
    <Draggable
      draggableId={`${subject}-${topic}-${subtopic}-${questionCount}`}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          className={orderItem}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <i className={`${grip} fas fa-grip-vertical`}></i>
          <p>{subtopic}</p>
          <div className={questionCountContainer}>
            <button
              className={`${countBtn} ${questionCount > min ? "" : hidden}`}
              onClick={decrementCounter}
            >
              -
            </button>
            <input
              className={questionCountInput}
              type="number"
              value={questionCount}
              min={String(min)}
              max={String(max)}
              onChange={(e) => capCounter(e)}
            />
            <button
              className={`${countBtn} ${questionCount < max ? "" : hidden}`}
              onClick={incrementCounter}
            >
              +
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

OrderItem.propTypes = {
  subject: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  subtopic: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default OrderItem;
