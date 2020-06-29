import {AUTH_USER} from '../constant';

const initialState = {
  auth: false,
};

const auth = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case AUTH_USER:
      return {
        ...state,
        auth: payload,
      };
    default:
      return state;
  }
};

export default auth;
