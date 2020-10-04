import {
  NOTIFICATION,
  NOTIFICATION_ERROR,
  NOTIFICATION_LOADING,
} from '../constant';

const initialState = {
  loading: false,
  notification: null,
  error: null,
};

const notification = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case NOTIFICATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case NOTIFICATION:
      return {
        ...state,
        loading: false,
        notification: payload,
      };
    case NOTIFICATION_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default notification;
