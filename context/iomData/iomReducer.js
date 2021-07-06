import {
  GET_DATA_LINK,
  GET_DATA_POINT,
  GET_DATA_DIRECTORY,
  GET_DATA_DIRECTORY_SERVICE,
  GET_DATA_DIRECTORY_SERVICE_ITEM,
  GET_DATA_FAVORITES,
  GET_DATA_ERROR,
  GET_DATA_POINT_ID,
  GET_DATA_DIRECTORY_ITEM,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_DATA_LINK:
      return {
        ...state,
        dataLink: JSON.parse(action.payload),
        dataItem: null,
        messageError: null,
      };
    case GET_DATA_POINT:
      return {
        ...state,
        dataPoint: JSON.parse(action.payload),
        dataItem: null,
        messageError: null,
      };
    case GET_DATA_POINT_ID:
      return {
        ...state,
        dataItem: state.dataPoint.find((item) => item.ID == action.payload),
      };
    case GET_DATA_DIRECTORY:
      return {
        ...state,
        dataDirectory: JSON.parse(action.payload),
        dataItem: null,
        messageError: null,
      };
    case GET_DATA_DIRECTORY_ITEM:
      return {
        ...state,
        message: null,
        dataItem: state.dataDirectory.find(
          (item) => item.departamento === action.payload
        ),
      };
    case GET_DATA_DIRECTORY_SERVICE:
      return {
        ...state,
        dataDirectoryService: JSON.parse(action.payload),
        dataItem: null,
        messageError: null,
      };
    case GET_DATA_DIRECTORY_SERVICE_ITEM:
      return {
        ...state,
        message: null,
        dataItemService: state.dataDirectoryService.find(
          (item) => item.id === action.payload
        ),
      };
    case GET_DATA_FAVORITES:
      return {
        ...state,
        dataFavorite: JSON.parse(action.payload),
        dataItem: null,
        messageError: null,
      };
    case GET_DATA_ERROR:
      return {
        ...state,
        messageError: action.payload,
        data: null,
        dataItem: null,
      };
    default:
      return state;
  }
};
