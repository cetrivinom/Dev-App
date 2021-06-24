import React, { useReducer } from "react";
import { GET_DATA_SERVICE } from "../../types";
import ServiceReducer from "./serviceReducer";
import ServiceContext from "./serviceContext";
import API from "../../config/axios";

const ServiceState = (props) => {
  const initialState = {
    data: null,
  };

  const [state, dispatch] = useReducer(ServiceReducer, initialState);

  const getDataService = async () => {
    try {
      const response = await API.get("mapeo-api");
      if (response.status === 200) {
        dispatch({
          type: GET_DATA_SERVICE,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log("error::getData", error);
    }
  };

  return (
    <ServiceContext.Provider
      value={{
        data: state.data,
        getDataService,
      }}
    >
      {props.children}
    </ServiceContext.Provider>
  );
};

export default ServiceState;
