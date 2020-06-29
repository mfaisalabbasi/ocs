import {AUTH_USER} from '../constant';

export const authUser = auth => {
  return {
    type: AUTH_USER,
    payload: auth,
  };
};
