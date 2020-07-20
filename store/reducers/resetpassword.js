import {
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  LOADING_RESET,
} from '../constant';

const initialState = {
  loading: false,
  data: {},
  error: {
    resetError: null,
  },
};

const resetpassword = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case LOADING_RESET:
      return {
        ...state,
        loading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        error: {},
      };
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        error: {
          resetError: payload,
        },
      };
    default:
      return state;
  }
};

export default resetpassword;
