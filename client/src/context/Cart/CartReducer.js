import { ADD_SUBTOPIC, REMOVE_SUBTOPIC } from "../types";

const CartReducer = (state, action) => {
  const [subject, subtopic] = action.payload;

  const cartUpdate = {
    [subject]: state[subject] ? state[subject].slice() : [],
  };

  switch (action.type) {
    case ADD_SUBTOPIC:
      cartUpdate[subject].push(subtopic);
      return {
        ...state,
        ...cartUpdate,
      };
    case REMOVE_SUBTOPIC:
      const i = cartUpdate[subject].indexOf(subtopic);
      cartUpdate[subject].splice(i, 1);
      return {
        ...state,
        ...cartUpdate,
      };
    default:
      return state;
  }
};

export default CartReducer;
