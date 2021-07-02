import {
  GET_DATA_DIRECTORY,
  GET_DATA_DIRECTORY_ITEM,
  GET_DATA_DIRECTORY_SERVICE,
  GET_DATA_DIRECTORY_ITEM_SERVICE,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_DATA_DIRECTORY:
      return {
        ...state,
        message: null,
        data: action.payload,
        //dataFilter: state.data.filter((item) => item.name.toLowerCase().includes(action.payload.toLowerCase())),
      };
    case GET_DATA_DIRECTORY_SERVICE:
      return {
        ...state,
        message: null,
        dataService: action.payload,
        //dataFilter: state.data.filter((item) => item.name.toLowerCase().includes(action.payload.toLowerCase())),
      };
    case GET_DATA_DIRECTORY_ITEM:
      return {
        ...state,
        message: null,
        dataItem: state.data.find(
          (item) => item.departamento === action.payload
        ),
      };
    case GET_DATA_DIRECTORY_ITEM_SERVICE:
      return {
        ...state,
        message: null,
        dataItemService: state.dataService.find(
          (item) => item.id === action.payload
        ),
      };
    default:
      return state;
  }
};
