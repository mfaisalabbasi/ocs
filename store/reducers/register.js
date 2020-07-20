import {
  REGISTER_SUCCEED,
  REGISTER_FAILED,
  LOGIN_SUCCEED,
  LOGIN_FAILED,
  SELLER_REGISTER_FAILED,
  SELLER_LOGIN_FAILED,
  LOGOUT,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  START_LOADING_LOGIN,
} from '../constant';

const initialState = {
  loading: false,
  authentication: false,
  user: {},
  updateduser: {},
  error: {
    login: null,
    registerEr: null,
    sellerRegister: null,
    sellerLogin: null,
    changepassword: null,
  },
};
const registerCustomer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case START_LOADING_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCEED:
    case LOGIN_SUCCEED:
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        authentication: true,
        user: payload,
        loading: false,
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
        authentication: false,
        loading: false,
      };
    case CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        authentication: true,
        error: {...state, changepassword: payload},
      };

    default:
      return state;
  }
};

export default registerCustomer;
