import {RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILED} from '../constant';

const initialState = {
  loading: true,
  data: {},
  error: {
    resetError: null,
  },
};

const resetpassword = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
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
