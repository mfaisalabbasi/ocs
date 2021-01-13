import {
  LOADING_OTP,
  SUCCESS_OTP,
  FAILED_OTP,
  OTP_CONFIRM,
  OTP_FAIL,
  NEW_USER,
  LOGOUT,
  USER_TYPE,
} from '../constant';

const initialState = {
  loading: false,
  authentication: false,
  confirm: null,
  user: null,
  isNewUser: null,
  error: null,
  otpError: null,
  userType: null,
};

const otp = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOADING_OTP:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_OTP:
      return {
        ...state,
        loading: false,
        confirm: payload,
      };
    case OTP_CONFIRM:
      return {
        ...state,
        loading: false,
        authentication: true,
        user: payload.user._user,
        isNewUser: payload.additionalUserInfo.isNewUser,
      };
    case NEW_USER:
      return {
        ...state,
        loading: false,
        isNewUser: payload,
      };
    case FAILED_OTP:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case OTP_FAIL:
      return {
        ...state,
        loading: false,
        authentication: false,
        otpError: payload,
      };
    case USER_TYPE:
      return {
        ...state,
        userType: payload,
      };
    case LOGOUT:
      return {
        ...state,
        authentication: false,
        loading: false,
        confirm: null,
      };
    default:
      return state;
  }
};
export default otp;
