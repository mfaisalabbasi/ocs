import {LOADING_SERVICES,SERVICES_FAILED,SERVICES_SUCCESS} from '../constant'

export const fetchServices = () => async dispatch => {
    dispatch({
      type: LOADING_SERVICES,
    });
    try {
    const req = await fetch(`https://on-click-s.firebaseio.com/services.json`)
    const res = await req.json()
    let loaded = [];
    const vl = Object.keys(res);
    vl.map(item => loaded.push(res[item]));
    res.error
        ? dispatch({
            type: SERVICES_FAILED,
            payload: 'res.error',
          })
        : dispatch({
            type: SERVICES_SUCCESS,
            payload: loaded,
          });
    } catch (error) {
      dispatch({
        type: SERVICES_FAILED,
        payload: 'res.error',
      });
    }
  };