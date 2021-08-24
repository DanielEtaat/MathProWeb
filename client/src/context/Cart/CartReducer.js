import { ADD_SUBTOPIC, REMOVE_SUBTOPIC } from "../types";

const CartReducer = (state, action) => {
  const [subject, topic, subtopic] = action.payload;

  const newState = [...state];

  switch (action.type) {

    case ADD_SUBTOPIC:
      newState.push({
        subject: subject,
        topic: topic,
        subtopic: subtopic
      });
      return newState;

    case REMOVE_SUBTOPIC:
      for (let i = 0; i < newState.length; i++) {
        const request = newState[i];
        if (request.subject === subject 
            && request.topic === topic
            && request.subtopic === subtopic) {
          newState.splice(i, 1);
          return newState;
        }
      }
      return state;
    default:
      return state;
  }
};

export default CartReducer;
