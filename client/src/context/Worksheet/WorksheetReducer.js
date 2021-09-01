import { GET_QUESTIONS, SET_LOADING } from "../types";

const WorksheetReducer = (state, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        jsonString: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default WorksheetReducer;
