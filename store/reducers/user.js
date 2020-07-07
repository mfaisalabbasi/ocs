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
        loading: false,
        user: payload,
      };
    case FAILED_USER:
      return {
        ...state,
        loading: false,
        error: paylaod,
      };
    default:
      return state;
  }
};

export default user;
