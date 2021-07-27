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
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_DATA_LINK:
      const dataLink = JSON.parse(action.value);
      const unique = [...new Set(dataLink.map((item) => item.Etiquetas))];
      const mergeDedupe = (arr) => {
        return [...new Set([].concat(...arr))];
      };
      return {
        ...state,
        dataLink: action.item !== "" && action.item !== undefined ? dataLink.filter((obj) =>obj.Etiquetas.some((o) => o == action.item)) : dataLink,
        dataLinkEtiquetas: mergeDedupe(unique),
        dataItem: null,
        messageError: null,
      };
    case GET_DATA_POINT:
      const dataPoint = JSON.parse(action.payload);
      const uniqueState = [...new Set(dataPoint.map((item) => item.Estado))];
      const uniqueDepartamento = [ ...new Set(dataPoint.map((item) => item.Departamento)),];
      const uniqueMunicipio = [...new Set(dataPoint.map((item) => item.Municipio)),];
      const uniqueService = [...new Set(dataPoint.map((item) => item.Servicios.map((item2 => item2.Servicio)) )),];
      const mergeDedupe1 = (arr) => {
        return [...new Set([].concat(...arr))];
      };
      //console.log("uniqueService", mergeDedupe1(uniqueService))
      return {
        ...state,
        dataPoint: JSON.parse(action.payload),
        dataPointState: uniqueState,
        dataPointDepartamento: uniqueDepartamento,
        dataPointMunicipio: uniqueMunicipio,
        dataItem: null,
        messageError: null,
        //dataPointFilter: false,
      };
    case GET_DATA_DIRECTORY_FILTER:
      return {
        ...state,
        dataPointFilter: state.dataPoint
          .filter((item) => item.Departamento.toLowerCase().includes(action.departamento.toLowerCase()))
          .filter((item) => item.Municipio.toLowerCase().includes(action.municipio.toLowerCase()))
          .filter((item) => item.Estado.toLowerCase().includes(action.estado.toLowerCase())),
      };
    case GET_DATA_POINT_ID:
      return {
        ...state,
        dataItem: state.dataPoint.find((item) => item.ID == action.payload),
      };
    case GET_DATA_DIRECTORY:
      return {
        ...state,
        dataDirectory: JSON.parse(action.value).filter((item) =>
          item.departamento.toLowerCase().includes(action.item.toLowerCase())
        ),
        dataItem: null,
        messageError: null,
      };
    case GET_DATA_DIRECTORY_ITEM:
      return {
        ...state,
        message: null,
        dataItem: state.dataDirectory.find(
          (item) => item.departamento === action.payload
        ),
      };
    case GET_DATA_DIRECTORY_SERVICE:
      return {
        ...state,
        dataDirectoryService: JSON.parse(action.payload),
        dataItem: null,
        messageError: null,
      };
    case GET_DATA_DIRECTORY_SERVICE_ITEM:
      return {
        ...state,
        message: null,
        dataItemService: state.dataDirectoryService.find(
          (item) => item.id === action.payload
        ),
      };
    case GET_DATA_FAVORITES:
      return {
        ...state,
        dataFavorite: JSON.parse(action.payload),
        dataItem: null,
        messageError: null,
      };
    case GET_DATA_ERROR:
      return {
        ...state,
        messageError: action.payload,
        data: null,
        dataItem: null,
      };
    default:
      return state;
  }
};
