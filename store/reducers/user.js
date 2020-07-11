import {GET_USER, FAILED_USER} from '../constant';

const initialState = {
  loading: true,
  user: {},
  error: null,
};

const user = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case FAILED_USER:
      return {
        ...state,
        error: paylaod,
        loading: false,
      };
    default:
      return state;
  }
};

export default user;
