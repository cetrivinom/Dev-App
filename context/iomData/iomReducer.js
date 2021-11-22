import {
  GET_DATA_LINK,
  GET_DATA_POINT,
  GET_DATA_DIRECTORY,
  GET_DATA_DIRECTORY_FILTER,
  GET_DATA_DIRECTORY_SERVICE,
  GET_DATA_DIRECTORY_SERVICE_ITEM,
  GET_DATA_FAVORITES,
  GET_DATA_ERROR,
  GET_DATA_POINT_ID,
  GET_DATA_DIRECTORY_ITEM,
  GET_DATA_MAPEO_SERVICE,
  GET_DATA_MAPEO_STATE,
  GET_USER_COMMENTS,
  NEW_FAVORITE,
  NEW_COMMENT,
  DELETE_COMMENT,
} from "../../types";

export default (state, action) => {
  
  switch (action.type) {
    case GET_DATA_LINK:
      const dataLink = JSON.parse(action.value);
      const unique = [...new Set(dataLink.map((item) => item.Etiquetas))];
      const mergeDedupe = (arr) => { return [...new Set([].concat(...arr))]; };
      return {
        ...state,
        dataLink: action.item !== "" && action.item !== undefined ? dataLink.filter((obj) => obj.Etiquetas.some((o) => o == action.item)) : dataLink,
        dataLinkEtiquetas: mergeDedupe(unique),
        dataItem: null,
        messageError: null,
      };
    case GET_DATA_POINT:
      const dataPoint = action.payload;
      const uniqueState = [...new Set(dataPoint.map((item) => item.Estado))];
      const uniqueDepartamento = [...new Set(dataPoint.map((item) => item.Departamento)),];
      const uniqueMunicipio = [...new Set(dataPoint.map((item) => item.Municipio)),];
      /*const uniqueService = [...new Set(dataPoint.map((item) => item.Servicios.map((item2) => item2.Servicio))),];
      const mergeDedupe1 = (arr) => {
        return [...new Set([].concat(...arr))];
      };*/
      return {
        ...state,
        dataPoint: action.payload,
        dataPointState: uniqueState,
        dataPointDepartamento: uniqueDepartamento,
        dataPointMunicipio: uniqueMunicipio,
        /* Esto genera un error porque al guardar un punto la info se borra y es por esto, ya que al entrar primero a favoritos el redux de datapoint queda activo
        dataItem: null        */
        messageError: null,
        //dataPointFilter: false,
      };
    case GET_DATA_DIRECTORY_FILTER:

      if (action.typeService.length > 0) {

        const array = [];
        state.dataPoint.map(element => {
          var todos = false;

          element.Servicios.map(item => {


            action.typeService.map(service => {

              if (service.item === item.Servicio) {
                todos = true;
              }
            })

          })
          if (todos) {
            array.push(element);
          }


        })

        return {



          ...state,
          dataPointFilter: array
            .filter((item) => item.Departamento.toLowerCase().includes(action.departamento.toLowerCase()))
            .filter((item) => item.Municipio.toLowerCase().includes(action.municipio.toLowerCase()))
            .filter((item) => item.Estado.toLowerCase().includes(action.estado.toLowerCase()))

        };
      }
      else {
     return {

        ...state,
        dataPointFilter: state.dataPoint
          .filter((item) => item.Departamento.toLowerCase().includes(action.departamento.toLowerCase()))
          .filter((item) => item.Municipio.toLowerCase().includes(action.municipio.toLowerCase()))
          .filter((item) => item.Estado.toLowerCase().includes(action.estado.toLowerCase()))
          //.filter((item) => item.Servicios.some((o) => o.Servicio.toLowerCase().includes(action.typeService.toLowerCase()))),
      };
    }
    case GET_DATA_POINT_ID:
      return {
        ...state,
        dataItem: state.dataPoint.find((item) => item.ID == action.payload),
      };
    case GET_DATA_DIRECTORY:
      return {
        ...state,
        dataDirectory: JSON.parse(action.value).filter((item) => item.departamento.toLowerCase().includes(action.item.toLowerCase())),
        dataItem: null,
        messageError: null,
      };
    case GET_DATA_DIRECTORY_ITEM:
      return {
        ...state,
        message: null,
        dataItem: state.dataDirectory.find((item) => item.departamento === action.payload),
      };
    case GET_DATA_DIRECTORY_SERVICE:
      return {
        ...state,
        dataDirectoryService: JSON.parse(action.payload).filter((item) => item.visibilidad_servicio == 'SI'),
        dataItem: null,
        messageError: null,
      };
    case GET_DATA_MAPEO_SERVICE:
      return {
        ...state,
        dataMapeoService: JSON.parse(action.payload).filter((item) => item.visibilidad_servicio == 'SI'),
        messageError: null,
      };
    case GET_DATA_MAPEO_STATE:
      return {
        ...state,
        dataMapeoState: JSON.parse(action.payload),
        messageError: null,
      };
    case GET_DATA_DIRECTORY_SERVICE_ITEM:
      return {
        ...state,
        message: null,
        dataItemService: state.dataDirectoryService.find((item) => item.id === action.payload),
      };
    case GET_DATA_FAVORITES:
      return {
        ...state,
        dataFavorite: JSON.parse(action.payload),
        dataItem: null,
        messageError: null,
      };
    case GET_USER_COMMENTS:
      return {
        ...state,
        dataComments: action.payload,
      };
    case GET_DATA_ERROR:
      return {
        ...state,
        messageError: action.payload,
        data: null,
        dataItem: null,
      };
    case NEW_FAVORITE:
      return {
        ...state,
        dataFavorite: action.payload,
      };
    case NEW_COMMENT:
      return {
        ...state
      };
    case DELETE_COMMENT:
      return {
        ...state
      };
/*     case DELETE_FAVORITE:
      return {
        ...state,
        dataFavorite: action.payload,
      }; */
    default:
      return state;
  }
};
