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
  GET_DATA_ENLACE,
  GET_DATA_SOCIO
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
      const uniqueDepartamento = [...new Set(dataPoint.map((item) => item.Departamento).sort((a, b) => a.localeCompare(b))),];      
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
      
      let poinstFiltered = [] //Inicialmente filtramos los punto por departamento, municipio y estado
      poinstFiltered = state.dataPoint
        .filter((item) => item.Departamento.toLowerCase().includes(action.departamento.toLowerCase()))
        .filter((item) => item.Municipio.toLowerCase().includes(action.municipio.toLowerCase()))
        .filter((item) => item.Estado.toLowerCase().includes(action.estado.toLowerCase()))
      
      //Si hay lista de servicios, filtramos los puntos que presten algun servicio
      if (action.typeService.length > 0) {
        let  arrayFilter = poinstFiltered.filter((objectPoint) => {
          for (const servicio of objectPoint.Servicios) {//recorremos los servicios del punto
              for (const servicioFilter of action.typeService) {//recorremos los servicios del filtro
                  if (servicioFilter.item === servicio.Servicio) {//Validamos que un servicio del punto haga match con el algun servicio del filtro
                      return true;
                  }
              }    
          }            
          return false;
        });
        poinstFiltered = arrayFilter
      }
      
      //Si en el filtro nombre trae información, hacemos la busqueda por el nombre del punto o la descripcion/nombre de los servicios
      if(action.nombre !== undefined && action.nombre !== "" && action.nombre.length > 0){
        let  poinstWithMatchingName = []//Array con los puntos que contienen en el nombre el filtro
        poinstWithMatchingName = poinstFiltered.filter((item) => item.Nombre_punto.toLowerCase().includes(action.nombre.toLowerCase()))
        
        let  poinstWithMatchingDescServices = []//Array con los puntos que contienen el filtro en la descripcion/nombre del servicio
        poinstWithMatchingDescServices = poinstFiltered.filter(item => item.Servicios.some(
                                                  cat => cat.Descripcion_Servicio.toLowerCase().includes(action.nombre.toLowerCase()) ||
                                                  cat.Servicio.toLowerCase().includes(action.nombre.toLowerCase()) ))
        
        let  poinstWithMatchingNameAnsServices = []//Array con los puntos que contienen en el nombre el filtro y los servicios la descripcion
        poinstWithMatchingNameAnsServices = poinstWithMatchingName.concat(poinstWithMatchingDescServices)

        let  poinstFilteredWithMatchingNameAnsServices = []//Array con los puntos sin  repetidos
        poinstFilteredWithMatchingNameAnsServices 
        = poinstWithMatchingNameAnsServices.filter((q, idx) => poinstWithMatchingNameAnsServices.indexOf(q) === idx)

        poinstFiltered = poinstFilteredWithMatchingNameAnsServices

      }
      return {
        ...state,
        dataPointFilter: poinstFiltered
      };

    case GET_DATA_POINT_ID:
      return {
        ...state,
        dataItem: state.dataPoint.find((item) => item.ID == action.payload),
      };
    case GET_DATA_DIRECTORY:

      var busqueda = action.item.toLowerCase();
      const array = JSON.parse(action.value);
      let array_concat = [];
      const array3 = [];

      if (busqueda !== undefined && busqueda !== null && busqueda != "") {

        array.map(element => {
          var todos = false;

          element.LineasTelefonicas.map(item => {

            let tipo_linea = item.tipo_de_linea.toLowerCase()

            if (tipo_linea.includes(busqueda)) {
              todos = true;
            }


          })
          if (todos) {
            array3.push(element);
          }


        })

        let value = [];

        if (array3.length === 0) {
          value = array.filter((item) => {

            let depart = item.departamento.toLowerCase();

            return depart.includes(busqueda)

          });

        }


        array_concat = array3.concat(value);

      }
      else {
        array_concat = array;
      }
      return {
        ...state,
        dataDirectory: array_concat,
        //dataDirectory: JSON.parse(action.value).filter((item) => item.departamento.toLowerCase().includes(action.item.toLowerCase())),
        dataItem: null,
        messageError: null,
      };
    case GET_DATA_ENLACE:
      return {
        ...state,
        dataEnlace: JSON.parse(action.value),
        dataItem: null,
        messageError: null,
      };

    case GET_DATA_SOCIO:
      return {
        ...state,
        dataSocio: JSON.parse(action.value),
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
        dataFavorite: action.payload,
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
