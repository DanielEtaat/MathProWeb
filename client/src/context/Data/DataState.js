import React, { useReducer } from "react";
import DataContext from "./DataContext";
import DataReducer from "./DataReducer";
import { GET_DATA, SET_LOADING } from "../types";
import axios from "axios";

const DataState = (props) => {
  const initialState = {
    availableTopics: "",
    loading: false,
    hasLoaded: false,
  };
  
  const [state, dispatch] = useReducer(DataReducer, initialState);

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const getData = async () => {
    setLoading();
    try {
      const availableTopics = (await axios.get(`https://puxec9.deta.dev/keys`)).data;  
      dispatch({ type: GET_DATA, payload: availableTopics });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DataContext.Provider
      value={{
        availableTopics: state.availableTopics,
        loading: state.loading,
        getData: getData,
        hasLoaded: state.loaded,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataState;
