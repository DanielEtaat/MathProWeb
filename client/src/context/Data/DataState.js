import React, { useReducer, useEffect } from "react";
import DataContext from "./DataContext";
import DataReducer from "./DataReducer";
import { GET_DATA, SET_LOADING } from "../types";
import axios from "axios";

const DataState = (props) => {
  const initialState = {
    availableTopics: "",
    loading: false,
  };
  
  const [state, dispatch] = useReducer(DataReducer, initialState);

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  useEffect(() => {
    const getData = async () => {
      setLoading();
      try {
        // console.log("Start loading data.");
        const availableTopics = (await axios.get(`https://puxec9.deta.dev/keys`)).data;  
        dispatch({ type: GET_DATA, payload: availableTopics });
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        availableTopics: state.availableTopics,
        loading: state.loading,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataState;
