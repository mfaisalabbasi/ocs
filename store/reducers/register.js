import {
  REGISTER_SUCCEED,
  REGISTER_FAILED,
  LOGIN_SUCCEED,
  LOGIN_FAILED,
} from '../constant';

const initialState = {
  loading: true,
  authentication: false,
  error: null,
  user: {},
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
      };
    case REGISTER_FAILED:
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        authentication: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default registerCustomer;
