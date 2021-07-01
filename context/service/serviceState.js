import React, { useReducer } from "react";
import { GET_DATA_SERVICE, GET_DATA_POINT_ID } from "../../types";
import ServiceReducer from "./serviceReducer";
import ServiceContext from "./serviceContext";
import API from "../../config/axios";

const ServiceState = (props) => {
  const initialState = {
    data: null,
    dataItem: null,
  };

  const [state, dispatch] = useReducer(ServiceReducer, initialState);

  const getDataService = async () => {
    try {
      const response = await API.get("api-mapeo.json");
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

  const getDataServiceById = (id) => {
    dispatch({
      type: GET_DATA_POINT_ID,
      payload: id,
    });
  };

  return (
    <ServiceContext.Provider
      value={{
        data: state.data,
        dataItem: state.dataItem,
        getDataService,
        getDataServiceById,
      }}
    >
      {props.children}
    </ServiceContext.Provider>
  );
};

export default ServiceState;
