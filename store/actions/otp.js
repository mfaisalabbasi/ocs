import {
  SUCCESS_OTP,
  FAILED_OTP,
  LOADING_OTP,
  OTP_CONFIRM,
  OTP_FAIL,
  NEW_USER,
  OTP_USER_LOADING,
  OTP_USER_SUCCESS,
  OTP_USER_FAIL,
  USER_TYPE,
  LOGOUT,
  UPDATE_PROFILE,
} from '../constant';
import auth from '@react-native-firebase/auth';

export const otpRegister = (num) => async (dispatch) => {
  dispatch({type: LOADING_OTP});
  try {
    const confirmation = await auth().signInWithPhoneNumber(num);
    dispatch({
      type: SUCCESS_OTP,
      payload: confirmation,
    });
    dispatch({
      type: USER_TYPE,
      payload: 'customer',
    });
  } catch (error) {
    dispatch({
      type: FAILED_OTP,
      payload: 'error',
    });
  }
};

export const otpConfirm = (confirm, code) => async (dispatch) => {
  dispatch({type: LOADING_OTP});
  try {
    const rs = await confirm.confirm(code);
    dispatch({
      type: OTP_CONFIRM,
      payload: rs,
    });
  } catch (error) {
    dispatch({
      type: OTP_FAIL,
      payload: 'res',
    });
  }
};

export const isNewUser = () => async (dispatch) => {
  try {
    dispatch({
      type: NEW_USER,
      payload: false,
    });
  } catch (error) {
    dispatch({
      type: OTP_FAIL,
      payload: 'res',
    });
  }
};

export const otpCustomer = (user) => async (dispatch) => {
  dispatch({type: OTP_USER_LOADING});
  try {
    const verification = 'unverified';
    const date = Date.now();
    const AccountStatus = 'open';
    const Devicetoken = 'not defined';
    const {phone, name, userId} = user;
    const type = 'customer';
    const req = await fetch(
      `https://on-click-s.firebaseio.com/customers/${userId}.json`,
      {
        method: 'put',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          verification,
          Devicetoken,
          date,
          AccountStatus,
          customerId: userId,
          type,
        }),
      },
    );
    const res = await req.json();
    if (res.error) {
      dispatch({
        type: OTP_USER_FAIL,
        payload: 'error',
      });
    } else {
      dispatch({
        type: UPDATE_PROFILE,
        payload: res,
      });
      dispatch({
        type: OTP_USER_SUCCESS,
        payload: res,
      });
      dispatch({
        type: NEW_USER,
        payload: false,
      });
    }
  } catch (err) {
    dispatch({
      type: OTP_USER_FAIL,
      payload: 'err',
    });
  }
};

// partner section

export const registerPartner = (num) => async (dispatch) => {
  dispatch({type: LOADING_OTP});
  try {
    const confirmation = await auth().signInWithPhoneNumber(num);
    dispatch({
      type: SUCCESS_OTP,
      payload: confirmation,
    });
    dispatch({
      type: USER_TYPE,
      payload: 'partner',
    });
  } catch (error) {
    dispatch({
      type: FAILED_OTP,
      payload: 'error',
    });
  }
};

export const otpConfirmPartner = (confirm, code) => async (dispatch) => {
  dispatch({type: LOADING_OTP});
  try {
    const rs = await confirm.confirm(code);
    dispatch({
      type: OTP_CONFIRM,
      payload: rs,
    });
  } catch (error) {
    dispatch({
      type: OTP_FAIL,
      payload: 'res',
    });
  }
};

export const otpPartner = (user) => async (dispatch) => {
  dispatch({type: OTP_USER_LOADING});
  try {
    const verification = 'unverified';
    const AccountStatus = 'open';
    const date = Date.now();
    const Devicetoken = 'not defined';
    const type = 'partner';
    const {phone, name, userId, expertise, service} = user;
    let serviceName = service.replace(/ /g, '');
    const status = true;
    const req = await fetch(
      `https://on-click-s.firebaseio.com/sellers/${serviceName}/${userId}.json`,
      {
        method: 'put',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          verification,
          Devicetoken,
          expertise,
          date,
          AccountStatus,
          partnerKey: userId,
          radius: 50,
          type,
          service,
          status,
        }),
      },
    );
    const res = await req.json();
    if (res.error) {
      dispatch({
        type: OTP_USER_FAIL,
        payload: 'error',
      });
    } else {
      dispatch({
        type: UPDATE_PROFILE,
        payload: res,
      });
      dispatch({
        type: OTP_USER_SUCCESS,
        payload: res,
      });
      dispatch({
        type: NEW_USER,
        payload: false,
      });
    }
  } catch (err) {
    dispatch({
      type: OTP_USER_FAIL,
      payload: 'err',
    });
  }
};

//----------------------------------------------------------------------logout Action
export const logoutAction = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.log('error');
  }
};
