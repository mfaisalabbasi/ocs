import {OTP_USER_LOADING, OTP_USER_SUCCESS, OTP_USER_FAIL} from '../constant';

const initialState = {
  loading: false,
  user: {},
  error: null,
};

const otpredu = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case OTP_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case OTP_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        error: null,
      };
    case OTP_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default otpredu;
