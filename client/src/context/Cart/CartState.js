import React, { useReducer } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";
import { ADD_SUBTOPIC, REMOVE_SUBTOPIC } from "../types";

const CartState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addSubTopic = (subject, topic, subtopic) => {
    dispatch({ type: ADD_SUBTOPIC, payload: [subject, topic, subtopic] });
  };

  const removeSubTopic = (subject, topic, subtopic) => {
    dispatch({ type: REMOVE_SUBTOPIC, payload: [subject, topic, subtopic] });
  };

  return (
    <CartContext.Provider
      value={{
        topicCart: state,
        addSubTopic: addSubTopic,
        removeSubTopic: removeSubTopic,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
