import {
  GET_USER,
  FAILED_USER,
  GET_SELLERS,
  FAILED_SELLERS,
  START_LOADING,
  UPDATE_LOADING,
  FAILED_CLOSE,
  NULL_SELLER,
} from '../constant';

const initialState = {
  loading: false,
  user: {},
  error: null,
  sellers: [],
  closeOne: {},
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
    case NULL_SELLER:
      return {
        ...state,
        sellers: payload,
        loading: false,
      };
    case FAILED_USER:
    case FAILED_SELLERS:
    case FAILED_CLOSE:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default user;
