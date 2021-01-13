import {
  LOADING_ORDER,
  FAIL_ORDER,
  SUCCESS_ORDER,
  CLEAR_ORDER,
} from '../constant';

const initialState = {
  loading: false,
  confirmed: false,
  order: null,
  error: null,
};

const order = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOADING_ORDER:
      return {
        ...state,
        loading: true,
      };
    case SUCCESS_ORDER:
      return {
        ...state,
        loading: false,
        confirmed: true,
        order: payload,
      };
    case CLEAR_ORDER:
      return {
        ...state,
        loading: false,
        confirmed: false,
      };
    case FAIL_ORDER:
      return {
        ...state,
        loading: false,
        confirmed: false,
        error: payload,
      };
    default:
      return state;
  }
};
export default order;
