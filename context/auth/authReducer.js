import { LOG_IN, LOG_IN_ERROR, SIGN_UP } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        auth: true,
        message: null,
        user: action.payload,
      };
    case LOG_IN_ERROR:
      return {
        ...state,
        auth: null,
        user: null,
        message: action.payload,
      };
    case SIGN_UP:
      return {
        ...state,
        auth: true,
        user: null,
        message: action.payload,
      };
    default:
      return state;
  }
};
