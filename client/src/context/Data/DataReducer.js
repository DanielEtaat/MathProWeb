import { GET_DATA, SET_LOADING } from "../types";

const DataReducer = (state, action) => {
  console.log("payload", action.payload);
  switch (action.type) {
    case GET_DATA:
      const d = {
        ...state,
        availableTopics: action.payload,
        loading: false,
      };
      // console.log("available_data result", d);
      return d;
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default DataReducer;
