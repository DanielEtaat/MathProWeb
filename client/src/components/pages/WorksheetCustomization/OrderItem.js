import React, { useState } from "react";
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

const OrderItem = ({ subject, topic, subtopic, index }) => {
  const min = 1;
  const max = 100;
  const [questionCount, setQuestionCount] = useState(10);

  const capCounter = (e) => {
    const { value } = e.target;
    const checkedVal =
      value === ""
        ? value
        : Math.max(Number(min), Math.min(Number(max), Number(value)));

    setQuestionCount(checkedVal);
  };
  const incrementCounter = () => {
    const increasedVal = questionCount + 1;
    increasedVal <= max && setQuestionCount(increasedVal);
  };
  const decrementCounter = () => {
    const decreasedVal = questionCount - 1;
    decreasedVal >= min && setQuestionCount(decreasedVal);
  };

  return (
    <Draggable draggableId={`${subject}-${topic}-${subtopic}`} index={index}>
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
