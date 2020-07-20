import {
  GET_USER,
  FAILED_USER,
  GET_SELLERS,
  FAILED_SELLERS,
  START_LOADING,
  UPDATE_LOADING,
} from '../constant';

const initialState = {
  loading: false,
  user: {},
  error: null,
  sellers: [],
};

const user = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case START_LOADING:
    case UPDATE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case GET_SELLERS:
      return {
        ...state,
        sellers: payload,
        loading: false,
      };
    case FAILED_USER:
    case FAILED_SELLERS:
      return {
        ...state,
        error: paylaod,
        loading: false,
      };
    default:
      return state;
  }
};

export default user;
