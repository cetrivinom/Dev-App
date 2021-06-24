import { ADD_NOTE, DELETE_NOTE } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return [
        ...state,
        {
          note: action.payload,
        },
      ];

    case DELETE_NOTE:
      const deletedNewArray = remove(state, (obj) => {
        return obj.id != action.payload;
      });
      return deletedNewArray;

    default:
      return state;
  }
};
