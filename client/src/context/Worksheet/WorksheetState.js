import React, { useReducer } from "react";
import WorksheetContext from "./WorksheetContext";
import WorksheetReducer from "./WorksheetReducer";
import { GET_QUESTIONS, SET_LOADING } from "../types";
import axios from "axios";

const WorksheetState = (props) => {
  const initialState = {
    jsonString: "",
    loading: false,
  };

  const [state, dispatch] = useReducer(WorksheetReducer, initialState);

  const getQuestions = async (requestArray) => {
    setLoading();
    try {
      const promises = requestArray.map((topicItem) =>
        axios.get(
          `https://puxec9.deta.dev/questions?request=[${JSON.stringify(
            topicItem
          )}]`
        )
      );

      const resArray = (await Promise.all(promises)).reduce((agg, curr) => {
        return agg.concat(curr.data);
      }, []);

      dispatch({ type: GET_QUESTIONS, payload: JSON.stringify(resArray) });
    } catch (err) {
      console.error(err);
    }
  };

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <WorksheetContext.Provider
      value={{
        jsonString: state.jsonString,
        loading: state.loading,
        getQuestions,
      }}
    >
      {props.children}
    </WorksheetContext.Provider>
  );
};

export default WorksheetState;
