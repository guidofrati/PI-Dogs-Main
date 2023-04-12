import axios from "axios";
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
} from "../actions/actionsType";

export const getDogs = () => {
  return async function (dispatch) {
    const url = await axios("http://localhost:3001/dogs");
    return dispatch({
      type: GET_DOGS,
      payload: url.data,
    });
  };
};

export const getDogsName = (name) => {
  return async function (dispatch) {
    const url = await axios(`http://localhost:3001/dogs/?name=${name}`);
    return dispatch({
      type: GET_DOGS_NAME,
      payload: url.data,
    });
  };
};

export const getDogsDetail = (id) => {
  return async function (dispatch) {
    const url = await axios(`http://localhost:3001/dogs/${id}`);
    return dispatch({
      type: GET_DOGS_DETAIL,
      payload: url.data,
    });
  };
};

export const getTemperaments = () => {
  return async function (dispatch) {
    const url = await axios("http://localhost:3001/temperaments");
    return dispatch({
      type: GET_TEMPS,
      payload: url.data,
    });
  };
};

export const orderName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const orderByWeight = (payload) => {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
};

export const filterOrigin = (payload) => {
  return {
    type: FILTER_BY_CREATED,
    payload,
  };
};

export const filterTemp = (payload) => {
  return {
    type: FILTER_BY_TEMPS,
    payload,
  };
};

export const createDog = (payload) => {
  return async function (dispatch) {
    let newD = await axios.post("http://localhost:3001/dogs", payload);
    return dispatch({
      type: CREATE_DOG,
      payload: newD.data,
    });
  };
};

export const setPage = (payload) => {
  return {
    type: SET_CURRENT_PAGE,
    payload,
  };
};

export const resetDetails = () => {
  return {
    type: RESET_DETAIL,
  };
};
