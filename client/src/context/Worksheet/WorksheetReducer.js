import { GET_QUESTIONS } from "../types";

const WorksheetReducer = (state, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        jsonString: action.payload,
      };
    default:
      return state;
  }
};

export default WorksheetReducer;
