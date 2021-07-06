import React, { useReducer } from "react";
import {
  GET_DATA_POINT,
  GET_DATA_LINK,
  GET_DATA_DIRECTORY,
  GET_DATA_DIRECTORY_SERVICE,
  GET_DATA_DIRECTORY_SERVICE_ITEM,
  GET_DATA_FAVORITES,
  GET_DATA_ERROR,
  GET_DATA_DIRECTORY_ITEM,
  GET_DATA_POINT_ID,
} from "../../types";
import IOMReducer from "./iomReducer";
import IOMContext from "./iomContext";
import AsyncStorage from "@react-native-community/async-storage";

const IOMState = (props) => {
  const initialState = {
    dataLink: null,
    dataPoint: null,
    dataDirectory: null,
    dataDirectoryService: null,
    dataFavorite: [
      { id: "348" },
      { id: "42" },
      { id: "430" },
      { id: "423" },
      { id: "314" },
      { id: "381" },
      { id: "297" },
      { id: "406" },
      { id: "467" },
      { id: "433" },
      { id: "598" },
      { id: "615" },
    ],
    dataItem: null,
    dataItemService: null,
    messageError: null,
  };

  const [state, dispatch] = useReducer(IOMReducer, initialState);

  const getDataLink = async () => {
    try {
      const value = await AsyncStorage.getItem("api-enlaces-de-interes.json");
      if (value !== null) {
        dispatch({
          type: GET_DATA_LINK,
          payload: value,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_DATA_ERROR,
        payload: error,
      });
    }
  };

  const getDataPoint = async () => {
    try {
      const value = await AsyncStorage.getItem("api-mapeo.json");
      if (value !== null) {
        dispatch({
          type: GET_DATA_POINT,
          payload: value,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_DATA_ERROR,
        payload: error,
      });
    }
  };

  const getDataPointById = (id) => {
    dispatch({
      type: GET_DATA_POINT_ID,
      payload: id,
    });
  };

  const getDataDirectory = async () => {
    try {
      const value = await AsyncStorage.getItem("lines.json");
      getDataDirectoryService();
      if (value !== null) {
        dispatch({
          type: GET_DATA_DIRECTORY,
          payload: value,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_DATA_ERROR,
        payload: error,
      });
    }
  };

  const getDataDirectoryService = async () => {
    try {
      const value = await AsyncStorage.getItem("api-lineas-telefonicas-servicios.json");
      if (value !== null) {
        dispatch({
          type: GET_DATA_DIRECTORY_SERVICE,
          payload: value,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_DATA_ERROR,
        payload: error,
      });
    }
  };

  const getDataDirectoryItemService = (id) => {
    dispatch({
      type: GET_DATA_DIRECTORY_SERVICE_ITEM,
      payload: id,
    });
  };

  const getDataByDepartId = (id) => {
    dispatch({
      type: GET_DATA_DIRECTORY_ITEM,
      payload: id,
    });
  };

  const getDataFavorite = async () => {
    try {
      const value = await AsyncStorage.getItem("favorites");
      if (value !== null) {
        dispatch({
          type: GET_DATA_FAVORITES,
          payload: value,
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
    <IOMContext.Provider
      value={{
        dataLink: state.dataLink,
        dataPoint: state.dataPoint,
        dataDirectory: state.dataDirectory,
        dataDirectoryService: state.dataDirectoryService,
        dataFavorite: state.dataFavorite,
        dataItem: state.dataItem,
        dataItemService: state.dataItemService,
        messageError: state.messageError,
        getDataLink,
        getDataPoint,
        getDataDirectory,
        getDataFavorite,
        getDataPointById,
        getDataByDepartId,
        getDataDirectoryItemService
      }}
    >
      {props.children}
    </IOMContext.Provider>
  );
};

export default IOMState;
