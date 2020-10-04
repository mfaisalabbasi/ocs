import {
  GET_USER,
  FAILED_USER,
  GET_SELLERS,
  FAILED_SELLERS,
  START_LOADING,
  UPDATE_LOADING,
  FAILED_CLOSE,
  NULL_SELLER,
  UPLOAD_PROFILE,
  UPDATE_PROFILE,
  GET_NEAREST,
  GET_NEARBY,
  NULL_NEAREST,
  REQUEST_CUSTOMER,
  NULL_CUSTOMER,
  FAILED_UPDATE,
  FAILED_PROFILE,
  NULL_PROFILE,
} from '../constant';

const initialState = {
  loading: false,
  user: {},
  error: null,
  updateError: null,
  profileImgError: null,
  sellers: [],
  sellersError: null,
  closeOne: {},
  nearestUser: {},
  nearestPartners: [],
  requestcustomer: {},
};

const user = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case START_LOADING:
    case UPDATE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case GET_SELLERS:
      return {
        ...state,
        sellers: payload,
        loading: false,
      };
    case UPLOAD_PROFILE:
      return {
        ...state,
        user: {...state.user, profileUrl: payload},
        loading: false,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
        },
        loading: false,
      };
    case NULL_SELLER:
      return {
        ...state,
        sellers: payload,
        loading: false,
        sellersError: null,
      };
    case GET_NEAREST:
    case NULL_NEAREST:
      return {
        ...state,
        loading: false,
        nearestUser: payload,
      };
    case GET_NEARBY:
      return {
        ...state,
        loading: false,
        nearestPartners: payload,
      };
    case REQUEST_CUSTOMER:
    case NULL_CUSTOMER:
      return {
        ...state,
        loading: false,
        requestcustomer: payload,
      };
    case FAILED_UPDATE:
      return {
        ...state,
        updateError: payload,
        loading: false,
      };
    case FAILED_PROFILE:
      return {
        ...state,
        loading: false,
        profileImgError: payload,
      };
    case NULL_PROFILE:
      return {
        ...state,
        loading: false,
        profileImgError: payload,
      };
    case FAILED_SELLERS:
      return {
        ...state,
        sellersError: payload,
        loading: false,
      };
    case FAILED_USER:
    case FAILED_CLOSE:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default user;
