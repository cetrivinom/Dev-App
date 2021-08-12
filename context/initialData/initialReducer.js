import { 
  GET_DATA, 
  GET_DATA_ERROR,
  UPDATED_LAST_UPDATE
} from "../../types";

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
    case UPDATED_LAST_UPDATE:
      return {
        ...state,
        lastUpdate: action.payload,
      };
    default:
      return state;
  }
};
