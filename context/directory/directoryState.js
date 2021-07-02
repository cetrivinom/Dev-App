import React, { useReducer } from "react";
import { GET_DATA_DIRECTORY, GET_DATA_DIRECTORY_ITEM } from "../../types";
import DirectoryReducer from "./directoryReducer";
import DirectoryContext from "./directoryContext";
import API from "../../config/axios";

const DirectoryState = (props) => {
  const initialState = {
    data: [
      {
        name: "Antioquia",
        id: 0,
        items: [
          {
            id: 0,
            title: "Atención psicosocial y Reabilitación discapacitados",
            items: {
              text: "Acompañamiento y asesoría psicológica de manera virtual, recibimos ydevolvemos la llamada a la persona interesada en el acompañamiento de primeros auxilios psicológicos o proceso terapéutico.",
            },
          },
          {
            id: 1,
            title:
              "Atención casos de violencia sexual, VBG y trata de personas",
            items: {
              text: "Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo",
            },
          },
          {
            id: 2,
            title: "Atención en medicina general",
            items: {
              text: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
            },
          },
          {
            id: 3,
            title: "Orientación a victimas",
            items: {
              text: "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño.",
            },
          },
          {
            id: 4,
            title: "Orientación jurídica",
            items: {
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi euismod ex dolor. Nullam a urna suscipit augue egestas faucibus ut eget nibh. Donec et tellus est. Pellentesque consequat pharetra libero nec pulvinar. Nullam in dui at ipsum placerat varius. In eu ligula in lacus faucibus vestibulum ut eget augue.",
            },
          },
        ],
      },
      {
        name: "Arauca",
        id: 1,
        items: [
          {
            id: 0,
            title: "Atención psicosocial y Reabilitación discapacitados",
            items: {
              text: "Acompañamiento y asesoría psicológica de manera virtual, recibimos ydevolvemos la llamada a la persona interesada en el acompañamiento de primeros auxilios psicológicos o proceso terapéutico.",
            },
          },
          {
            id: 1,
            title:
              "Atención casos de violencia sexual, VBG y trata de personas",
            items: {
              text: "Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo",
            },
          },
          {
            id: 2,
            title: "Atención en medicina general",
            items: {
              text: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
            },
          },
          {
            id: 3,
            title: "Orientación a victimas",
            items: {
              text: "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño.",
            },
          },
          {
            id: 4,
            title: "Orientación jurídica",
            items: {
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi euismod ex dolor. Nullam a urna suscipit augue egestas faucibus ut eget nibh. Donec et tellus est. Pellentesque consequat pharetra libero nec pulvinar. Nullam in dui at ipsum placerat varius. In eu ligula in lacus faucibus vestibulum ut eget augue.",
            },
          },
        ],
      },
      {
        name: "Atlántico",
        id: 2,
        items: [
          {
            id: 0,
            title: "Atención psicosocial y Reabilitación discapacitados",
            items: {
              text: "Acompañamiento y asesoría psicológica de manera virtual, recibimos ydevolvemos la llamada a la persona interesada en el acompañamiento de primeros auxilios psicológicos o proceso terapéutico.",
            },
          },
          {
            id: 1,
            title:
              "Atención casos de violencia sexual, VBG y trata de personas",
            items: {
              text: "Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo",
            },
          },
          {
            id: 2,
            title: "Atención en medicina general",
            items: {
              text: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
            },
          },
          {
            id: 3,
            title: "Orientación a victimas",
            items: {
              text: "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño.",
            },
          },
          {
            id: 4,
            title: "Orientación jurídica",
            items: {
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi euismod ex dolor. Nullam a urna suscipit augue egestas faucibus ut eget nibh. Donec et tellus est. Pellentesque consequat pharetra libero nec pulvinar. Nullam in dui at ipsum placerat varius. In eu ligula in lacus faucibus vestibulum ut eget augue.",
            },
          },
        ],
      },
      {
        name: "Bogota D.C",
        id: 3,
        items: [
          {
            id: 0,
            title: "Atención psicosocial y Reabilitación discapacitados",
            items: {
              text: "Acompañamiento y asesoría psicológica de manera virtual, recibimos ydevolvemos la llamada a la persona interesada en el acompañamiento de primeros auxilios psicológicos o proceso terapéutico.",
            },
          },
          {
            id: 1,
            title:
              "Atención casos de violencia sexual, VBG y trata de personas",
            items: {
              text: "Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo",
            },
          },
          {
            id: 2,
            title: "Atención en medicina general",
            items: {
              text: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
            },
          },
          {
            id: 3,
            title: "Orientación a victimas",
            items: {
              text: "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño.",
            },
          },
          {
            id: 4,
            title: "Orientación jurídica",
            items: {
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi euismod ex dolor. Nullam a urna suscipit augue egestas faucibus ut eget nibh. Donec et tellus est. Pellentesque consequat pharetra libero nec pulvinar. Nullam in dui at ipsum placerat varius. In eu ligula in lacus faucibus vestibulum ut eget augue.",
            },
          },
        ],
      },
      {
        name: "Bolívar",
        id: 4,
        items: [
          {
            id: 0,
            title: "Atención psicosocial y Reabilitación discapacitados",
            items: {
              text: "Acompañamiento y asesoría psicológica de manera virtual, recibimos ydevolvemos la llamada a la persona interesada en el acompañamiento de primeros auxilios psicológicos o proceso terapéutico.",
            },
          },
          {
            id: 1,
            title:
              "Atención casos de violencia sexual, VBG y trata de personas",
            items: {
              text: "Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo",
            },
          },
          {
            id: 2,
            title: "Atención en medicina general",
            items: {
              text: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500",
            },
          },
          {
            id: 3,
            title: "Orientación a victimas",
            items: {
              text: "Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño.",
            },
          },
          {
            id: 4,
            title: "Orientación jurídica",
            items: {
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi euismod ex dolor. Nullam a urna suscipit augue egestas faucibus ut eget nibh. Donec et tellus est. Pellentesque consequat pharetra libero nec pulvinar. Nullam in dui at ipsum placerat varius. In eu ligula in lacus faucibus vestibulum ut eget augue.",
            },
          },
        ],
      },
    ],
    dataItem: null,
    dataFilter: [],
  };

  const [state, dispatch] = useReducer(DirectoryReducer, initialState);

  const getDataDirectory = (item) => {
    dispatch({
      type: GET_DATA_DIRECTORY,
      payload: item,
    });
    /*try {
      const response = await API.get("api-lineas-telefonicas");
      if (response.status === 200) {
        dispatch({
          type: GET_DATA_DIRECTORY,
          payload: response.data,
        });
      }
    } catch (error) {
      console.log("error::getDataLink", error);
    }*/
  };

  const getDataDirectoryItem = (id) => {
    dispatch({
      type: GET_DATA_DIRECTORY_ITEM,
      payload: id,
    });
  };

  return (
    <DirectoryContext.Provider
      value={{
        data: state.data,
        dataFilter: state.dataFilter,
        dataItem: state.dataItem,
        getDataDirectory,
        getDataDirectoryItem,
      }}
    >
      {props.children}
    </DirectoryContext.Provider>
  );
};

export default DirectoryState;
