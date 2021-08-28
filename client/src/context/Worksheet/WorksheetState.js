import React, { useReducer } from "react";
import WorksheetContext from "./WorksheetContext";
import WorksheetReducer from "./WorksheetReducer";
import { GET_QUESTIONS } from "../types";
import axios from "axios";

const WorksheetState = (props) => {
  const initialState = {
    jsonString: "",
  };

  const [state, dispatch] = useReducer(WorksheetReducer, initialState);

  const getQuestions = async (requestArray) => {
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

  return (
    <WorksheetContext.Provider
      value={{
        jsonString: state.jsonString,
        getQuestions,
      }}
    >
      {props.children}
    </WorksheetContext.Provider>
  );
};

export default WorksheetState;
