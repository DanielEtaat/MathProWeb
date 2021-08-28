import { ADD_SUBTOPIC, REMOVE_SUBTOPIC, CHANGE_NUM_QUESTIONS } from "../types";

const CartReducer = (state, action) => {
  const [subject, topic, subtopic, numQuestions] = action.payload;

  const newState = [...state];

  switch (action.type) {
    case ADD_SUBTOPIC:
      newState.push({
        subject: subject,
        topic: topic,
        subtopic: subtopic,
        numQuestions: 10,
      });
      return newState;

    case REMOVE_SUBTOPIC:
      for (let i = 0; i < newState.length; i++) {
        const request = newState[i];
        if (
          request.subject === subject &&
          request.topic === topic &&
          request.subtopic === subtopic
        ) {
          newState.splice(i, 1);
          return newState;
        }
      }
      return state;
    case CHANGE_NUM_QUESTIONS:
      for (const topicItem of newState) {
        if (
          topicItem.subject === subject &&
          topicItem.topic === topic &&
          topicItem.subtopic === subtopic
        ) {
          topicItem.numQuestions = numQuestions;
          break;
        }
      }
      return newState;
    default:
      return state;
  }
};

export default CartReducer;
