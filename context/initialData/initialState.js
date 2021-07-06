import React, { useReducer } from "react";
import { GET_DATA, GET_DATA_ERROR } from "../../types";
import InitialReducer from "./initialReducer";
import InitialContext from "./initialContext";
import AsyncStorage from "@react-native-community/async-storage";
import API from "../../config/axios";

const InitialState = (props) => {
  const initialState = {
    message: null,
    status: null,
  };

  const [state, dispatch] = useReducer(InitialReducer, initialState);

  const getDataLink = async (apiName) => {
    try {
      const response = await API.get(apiName);
      if (response.status === 200) {
        AsyncStorage.setItem(apiName, JSON.stringify(response.data));
        dispatch({
          type: GET_DATA,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_DATA_ERROR,
        payload: error,
      });
    }
  };

  return (
    <InitialContext.Provider
      value={{
        message: state.message,
        status: state.status,
        getDataLink,
      }}
    >
      {props.children}
    </InitialContext.Provider>
  );
};

export default InitialState;
