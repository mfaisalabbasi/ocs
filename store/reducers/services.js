import {
    LOADING_SERVICES,
    SERVICES_SUCCESS,
    SERVICES_FAILED
  } from '../constant';
  
  const initialState = {
    loading: false,
    services: [],
    error: null,
  };
  
  const services = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
      case LOADING_SERVICES:
        return {
          ...state,
          loading: true,
        };
      case SERVICES_SUCCESS:
        return {
          ...state,
          loading: false,
          services: payload,
        };
      case SERVICES_FAILED:
        return {
          ...state,
          loading: false,
          error: payload,
        };
      default:
        return state;
    }
  };
  
  export default services;
  