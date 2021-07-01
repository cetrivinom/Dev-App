import { GET_DATA_LINK } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_DATA_LINK:
      return {
        ...state,
        message: null,
        data: action.payload,
      };
    default:
      return state;
  }
};
