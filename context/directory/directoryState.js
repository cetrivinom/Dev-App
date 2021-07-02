import React, { useReducer } from "react";
import {
  GET_DATA_DIRECTORY,
  GET_DATA_DIRECTORY_SERVICE,
  GET_DATA_DIRECTORY_ITEM,
  GET_DATA_DIRECTORY_ITEM_SERVICE,
} from "../../types";
import DirectoryReducer from "./directoryReducer";
import DirectoryContext from "./directoryContext";
import API from "../../config/axios";

const DirectoryState = (props) => {
  const initialState = {
    data: [],
    dataService: [],
    dataItem: null,
    dataItemService: null,
    dataFilter: [],
  };

  const [state, dispatch] = useReducer(DirectoryReducer, initialState);

  const getDataDirectory = async (item) => {
    try {
      const response = await API.get("api-lineas-telefonicas");
      if (response.status === 200) {
        getDataDirectoryService();
        dispatch({
          type: GET_DATA_DIRECTORY,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log("error::getDataLink", error);
    }
  };

  const getDataDirectoryService = async () => {
    try {
      const response = await API.get("api-lineas-telefonicas-servicios");
      if (response.status === 200) {
        dispatch({
          type: GET_DATA_DIRECTORY_SERVICE,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log("error::getDataLink", error);
    }
  };

  const getDataDirectoryItem = (id) => {
    dispatch({
      type: GET_DATA_DIRECTORY_ITEM,
      payload: id,
    });
  };

  const getDataDirectoryItemService = (id) => {
    dispatch({
      type: GET_DATA_DIRECTORY_ITEM_SERVICE,
      payload: id,
    });
  };

  return (
    <DirectoryContext.Provider
      value={{
        data: state.data,
        dataFilter: state.dataFilter,
        dataItem: state.dataItem,
        dataItemService: state.dataItemService,
        getDataDirectory,
        getDataDirectoryItem,
        getDataDirectoryItemService,
      }}
    >
      {props.children}
    </DirectoryContext.Provider>
  );
};

export default DirectoryState;
