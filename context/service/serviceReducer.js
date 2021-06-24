import { GET_DATA_SERVICE } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_DATA_SERVICE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
