import { LOG_IN, LOG_IN_ERROR, SIGN_UP,SIGN_UP_ERROR,SIGN_OUT,SIGN_OUT_ERROR,UPDATED_USER } from "../../types";

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
        user: action.payload.user,
        message: action.payload.response,
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        auth: null,
        user: null,
        message: action.payload,
      };
    case UPDATED_USER:
      return {
        ...state,
        auth: true,
        user: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        auth: null,
        user: null,
        message: null,
      };
    case SIGN_OUT_ERROR:
      return {
        ...state,
        auth: null,
        user: null,
        message: action.payload,
      };
    default:
      return state;
  }
};
