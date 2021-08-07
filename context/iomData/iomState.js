import React, { useReducer } from "react";
import {
  GET_DATA_POINT,
  GET_DATA_LINK,
  GET_DATA_DIRECTORY,
  GET_DATA_DIRECTORY_FILTER,
  GET_DATA_DIRECTORY_SERVICE,
  GET_DATA_DIRECTORY_SERVICE_ITEM,
  GET_DATA_FAVORITES,
  GET_DATA_ERROR,
  GET_DATA_DIRECTORY_ITEM,
  GET_DATA_POINT_ID,
  GET_DATA_MAPEO_SERVICE,
  GET_USER_COMMENTS,
  NEW_COMMENT,
  NEW_FAVORITE,
} from "../../types";
import moment from 'moment';
import IOMReducer from "./iomReducer";
import IOMContext from "./iomContext";
import AsyncStorage from "@react-native-community/async-storage";
import database from "@react-native-firebase/database";
import _ from 'lodash';

const IOMState = (props) => {
  const initialState = {
    dataLink: null,
    dataLinkEtiquetas: null,
    dataPoint: null,
    dataPointState: null,
    dataPointDepartamento: null,
    dataPointMunicipio: null,
    dataPointFilter: null,
    dataDirectory: null,
    dataDirectoryService: null,
    dataMapeoService: [],
    dataFavorite: [],
    dataItem: null,
    dataItemService: null,
    messageError: null,
    dataComments: null,
  };

  const [state, dispatch] = useReducer(IOMReducer, initialState);

  const getDataLink = async (item) => {
    try {
      const value = await AsyncStorage.getItem("api-enlaces-de-interes.json");
      if (value !== null) {
        dispatch({
          type: GET_DATA_LINK,
          value,
          item,
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

  const getDataMapeoService = async () => {
    try {
      const value = await AsyncStorage.getItem("api-mapeo-servicios.json");
      if (value !== null) {
        dispatch({
          type: GET_DATA_MAPEO_SERVICE,
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

  const getDataDirectory = async (item) => {
    try {
      const value = await AsyncStorage.getItem("lines.json");
      getDataDirectoryService();
      if (value !== null) {
        dispatch({
          type: GET_DATA_DIRECTORY,
          value,
          item,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_DATA_ERROR,
        payload: error,
      });
    }
  };

  const getDataPointFilter = (departamento, municipio, estado, typeService) => {
    dispatch({
      type: GET_DATA_DIRECTORY_FILTER,
      departamento,
      municipio,
      estado,
      typeService
    });
  }

  const getDataDirectoryService = async () => {
    try {
      const value = await AsyncStorage.getItem(
        "api-lineas-telefonicas-servicios.json"
      );
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

  const getUserComments = (uid) => {
    database().ref('/comments/'+uid).on('value',snapshot => {
      let res = [];
      snapshot.forEach((value) => {
        const pointID= value.key;
        let comments = [];
        value.forEach((item) =>{
          comments.push({commentID:item.key,date:item.val().date,comment:item.val().comment});
        });
        res.push({pointID,comments});
      });
      dispatch({
        type: GET_USER_COMMENTS,
        payload: res
      });
    });
  };

  const createUserComment = (uid,id,comment) => {
    var date = moment().format('YYYY-MM-DD, hh:mm:ss a');
    database().ref('/comments/'+uid+'/'+id).push({
      comment,
      date
    }).then(()=> 
      dispatch({
        type: NEW_COMMENT
      })
    );
  }

  const createFavorite = async (point) => {
    try {
        var value = JSON.parse(await AsyncStorage.getItem("favorites"));
        if(!value)
          value=[];
        let index = value.findIndex(favorite => favorite.id == point.id);
        if(index == -1) {
          value.push(point);
          AsyncStorage.setItem("favorites", JSON.stringify(value));
          dispatch({
            type: NEW_FAVORITE,
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
        dataLinkEtiquetas: state.dataLinkEtiquetas,
        dataPoint: state.dataPoint,
        dataPointState: state.dataPointState,
        dataPointDepartamento: state.dataPointDepartamento,
        dataPointMunicipio: state.dataPointMunicipio,
        dataPointFilter: state.dataPointFilter,
        dataDirectory: state.dataDirectory,
        dataDirectoryService: state.dataDirectoryService,
        dataFavorite: state.dataFavorite,
        dataItem: state.dataItem,
        dataItemService: state.dataItemService,
        messageError: state.messageError,
        dataMapeoService: state.dataMapeoService,
        dataComments: state.dataComments,
        getDataLink,
        getDataPoint,
        getDataDirectory,
        getDataFavorite,
        getDataPointById,
        getDataByDepartId,
        getDataDirectoryItemService,
        getDataPointFilter,
        getDataMapeoService,
        getUserComments,
        createUserComment,
        createFavorite,
      }}
    >
      {props.children}
    </IOMContext.Provider>
  );
};

export default IOMState;
