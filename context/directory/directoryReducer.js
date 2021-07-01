import { GET_DATA_DIRECTORY, GET_DATA_DIRECTORY_ITEM } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_DATA_DIRECTORY:
      return {
        ...state,
        message: null,
        dataFilter: state.data.filter((item) => item.name.toLowerCase().includes(action.payload.toLowerCase())),
      };
    case GET_DATA_DIRECTORY_ITEM:
      return {
        ...state,
        message: null,
        dataItem: state.data.find((item) => item.name === action.payload),
      };
    default:
      return state;
  }
};
