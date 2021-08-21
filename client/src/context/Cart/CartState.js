import React, { useReducer } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";
import { ADD_SUBTOPIC, REMOVE_SUBTOPIC } from "../types";

const CartState = (props) => {
  const initialState = {};

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addSubTopic = (subject, subtopic) => {
    dispatch({ type: ADD_SUBTOPIC, payload: [subject, subtopic] });
  };

  const removeSubTopic = (subject, subtopic) => {
    dispatch({ type: REMOVE_SUBTOPIC, payload: [subject, subtopic] });
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
