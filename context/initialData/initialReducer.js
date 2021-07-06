import { GET_DATA, GET_DATA_ERROR } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        message: null,
        status: true,
      };
    case GET_DATA_ERROR:
      return {
        ...state,
        message: action.payload,
        status: false,
      };
    default:
      return state;
  }
};
