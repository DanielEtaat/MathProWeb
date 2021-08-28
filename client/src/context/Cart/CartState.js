import React, { useReducer } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";
import { ADD_SUBTOPIC, REMOVE_SUBTOPIC, CHANGE_NUM_QUESTIONS } from "../types";

const CartState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addSubTopic = (subject, topic, subtopic) => {
    dispatch({ type: ADD_SUBTOPIC, payload: [subject, topic, subtopic] });
  };

  const removeSubTopic = (subject, topic, subtopic) => {
    dispatch({ type: REMOVE_SUBTOPIC, payload: [subject, topic, subtopic] });
  };

  const getTopicItem = (subject, topic, subtopic) => {
    for (const topicItem of state) {
      if (
        topicItem.subject === subject &&
        topicItem.topic === topic &&
        topicItem.subtopic === subtopic
      ) {
        return topicItem;
      }
    }
    return undefined;
  };

  const changeNumQuestions = (subject, topic, subtopic, numQuestions) => {
    dispatch({
      type: CHANGE_NUM_QUESTIONS,
      payload: [
        subject,
        topic,
        subtopic,
        numQuestions === "" ? 0 : numQuestions,
      ],
    });
  };

  return (
    <CartContext.Provider
      value={{
        topicCart: state,
        addSubTopic: addSubTopic,
        removeSubTopic: removeSubTopic,
        changeNumQuestions: changeNumQuestions,
        getTopicItem: getTopicItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
