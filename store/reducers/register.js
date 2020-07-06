import {
  REGISTER_SUCCEED,
  REGISTER_FAILED,
  LOGIN_SUCCEED,
  LOGIN_FAILED,
  SELLER_REGISTER_FAILED,
  SELLER_LOGIN_FAILED,
  LOGOUT,
} from '../constant';

const initialState = {
  loading: true,
  authentication: false,
  user: {},
  error: {
    login: null,
    registerEr: null,
    sellerRegister: null,
    sellerLogin: null,
  },
};
const registerCustomer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case REGISTER_SUCCEED:
    case LOGIN_SUCCEED:
      return {
        ...state,
        loading: false,
        authentication: true,
        user: payload,
        error: {},
      };
    case REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        authentication: false,
        error: {
          ...state,
          registerEr: payload,
        },
      };
    case SELLER_REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        authentication: false,
        error: {
          ...state,
          sellerRegister: payload,
        },
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        authentication: false,
        error: {
          ...state,
          login: payload,
        },
      };
    case SELLER_LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        authentication: false,
        error: {
          ...state,
          sellerLogin: payload,
        },
      };

    case LOGOUT:
      return {
        ...state,
        loading: false,
        authentication: false,
      };
    default:
      return state;
  }
};

export default registerCustomer;
