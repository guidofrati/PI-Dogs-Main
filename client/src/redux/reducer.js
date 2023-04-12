import {
  GET_DOGS,
  GET_DOGS_NAME,
  GET_DOGS_DETAIL,
  GET_TEMPS,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  FILTER_BY_CREATED,
  FILTER_BY_TEMPS,
  CREATE_DOG,
  SET_CURRENT_PAGE,
  RESET_DETAIL,
} from "../redux/actions/actionsType";

const initialState = {
  dogs: [],
  temperaments: [],
  dogsDetail: {},
  allDogs: [],
  current: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case GET_DOGS_NAME:
      return {
        ...state,
        dogs: action.payload,
      };

    case GET_DOGS_DETAIL:
      return {
        ...state,
        dogsDetail: action.payload,
      };

    case GET_TEMPS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case ORDER_BY_NAME:
      let ordenado =
        action.payload === "Asc"
          ? [...state.dogs].sort((a, b) => {
              console.log(a.name);
              console.log(b.name);
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            })
          : [...state.dogs].sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              return 0;
            });
      console.log(ordenado);
      return {
        ...state,
        dogs: ordenado,
      };

    case ORDER_BY_WEIGHT:
      let weightSort =
        action.payload === "max"
          ? [...state.dogs].sort((a, b) => {
              if (a.maxWeight > b.maxWeight) return -1;
              if (a.maxWeight < b.maxWeight) return 1;
              return 0;
            })
          : [...state.dogs].sort((a, b) => {
              if (a.minWeight < b.minWeight) return -1;
              if (a.minWeight > b.minWeight) return 1;
              return 0;
            });
      return {
        ...state,
        dogs: weightSort,
      };

    case FILTER_BY_CREATED:
      const origen =
        action.payload === "All"
          ? [...state.allDogs]
          : action.payload === "Db"
          ? [...state.dogs].filter((i) => i.fromDb)
          : [...state.dogs].filter((i) => !i.fromDb);
      return {
        ...state,
        dogs: origen,
      };

    case FILTER_BY_TEMPS:
      let temperas =
        action.payload === "All temps"
          ? state.dogs
          : state.allDogs.filter((d) =>
              d.temperament?.includes(action.payload)
            );
      return {
        ...state,
        dogs: temperas,
      };

    case CREATE_DOG:
      return {
        ...state,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        current: action.payload,
      };

    case RESET_DETAIL:
      return {
        ...state,
        dogsDetail: {},
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
