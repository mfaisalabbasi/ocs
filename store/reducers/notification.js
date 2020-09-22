import {NOTIFICATION, NOTIFICATION_LOADING} from '../constant';

const initialState = {
  loading: false,
  notification: null,
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
    default:
      return state;
  }
};

export default notification;
