import React, { useReducer } from "react";
import { GET_DATA_LINK } from "../../types";
import LinkReducer from "./linkReducer";
import LinkContext from "./linkContext";
import API from "../../config/axios";

const LinkState = (props) => {
  const initialState = {
    data: null,
  };

  const [state, dispatch] = useReducer(LinkReducer, initialState);

  const getDataLink = async () => {
    try {
      const response = await API.get("api-enlaces-de-interes");
      if (response.status === 200) {
        dispatch({
          type: GET_DATA_LINK,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log("error::getDataLink", error);
    }
  };

  return (
    <LinkContext.Provider
      value={{
        data: state.data,
        getDataLink,
      }}
    >
      {props.children}
    </LinkContext.Provider>
  );
};

export default LinkState;
