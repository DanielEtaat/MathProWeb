import { GET_DATA, SET_LOADING } from "../types";

const DataReducer = (state, action) => {
  switch (action.type) {
    case GET_DATA:
      const d = {
        ...state,
        availableTopics: action.payload,
        loading: false,
        hasLoaded: true,
      };
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
