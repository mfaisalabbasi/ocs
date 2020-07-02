import {
  AUTH_USER,
  REGISTER_SUCCEED,
  REGISTER_FAILED,
  LOGIN_SUCCEED,
  LOGIN_FAILED,
} from '../constant';
import AsyncStorage from '@react-native-community/async-storage';

export const registerCustomer = user => async dispatch => {
  try {
    const {email, password, phone, name} = user;
    const authUser = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfVRLKqj_hBKc9HSuji_ujl0NEW-opQVE',
      {
        method: 'post',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify({email, password}),
      },
    );
    const res = await authUser.json();
    const userid = res.localId;
    await fetch(`https://on-click-s.firebaseio.com/customers/${userid}.json`, {
      method: 'put',
      headers: {
        ContentType: 'application/json',
      },
      body: JSON.stringify({name, email, phone}),
    });
    // const token = res.idToken;
    // const val = JSON.stringify(token);
    // await AsyncStorage.setItem('token', val);
    dispatch({
      type: REGISTER_SUCCEED,
      payload: userid,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAILED,
      payload: err,
    });
  }
};

export const registerSeller = user => async dispatch => {
  try {
    const {name, email, phone, service, password} = user;
    const authUser = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfVRLKqj_hBKc9HSuji_ujl0NEW-opQVE',
      {
        method: 'post',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify({email, password}),
      },
    );

    const res = await authUser.json();
    const userId = res.localId;
    await fetch(`https://on-click-s.firebaseio.com/sellers/${userId}.json`, {
      method: 'put',
      headers: {
        ContentType: 'application/json',
      },
      body: JSON.stringify({name, email, phone, service}),
    });

    dispatch({
      type: REGISTER_SUCCEED,
      payload: userId,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAILED,
      payload: err,
    });
  }
};

export const loginAction = () => {
  return {
    type: LOGIN_SUCCEED,
  };
};

export const logoutAction = () => {
  return {
    type: LOGIN_FAILED,
  };
};
