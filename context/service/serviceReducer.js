import { GET_DATA_SERVICE, GET_DATA_POINT_ID } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_DATA_SERVICE:
      return {
        ...state,
        data: action.payload,
      };
    case GET_DATA_POINT_ID:
      return {
        ...state,
        message: null,
        dataItem: state.data.find((item) => item.ID == action.payload),
      };
    default:
      return state;
  }
};
