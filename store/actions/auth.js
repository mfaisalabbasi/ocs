//------------------------------------------------------------update locations

export const updateLocation = (userId, location) => async (dispatch) => {
  try {
    const req = await fetch(
      `https://on-click-s.firebaseio.com/customers/${userId}.json`,
      {
        method: 'patch',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify({location}),
      },
    );
  } catch (error) {
    console.log('location updating error', error);
  }
};

//---------update customer token
export const CustomerDeviceToken = (userId, Devicetoken) => async (
  dispatch,
) => {
  try {
    const req = await fetch(
      `https://on-click-s.firebaseio.com/customers/${userId}.json`,
      {
        method: 'patch',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify({Devicetoken: Devicetoken}),
      },
    );
    const res = await req.json();
  } catch (error) {
    console.log('Token updating', error);
  }
};

//------------------------------------Partner Section

//---------update partner location
export const updatePartnerLocation = (userId, location, service) => async (
  dispatch,
) => {
  let serviceName = service.replace(/ /g, '');
  const {latitude, longitude} = location;
  try {
    const req = await fetch(
      `https://on-click-s.firebaseio.com/sellers/${serviceName}/${userId}.json`,
      {
        method: 'patch',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify({latitude, longitude}),
      },
    );
  } catch (error) {
    console.log('location updating error', error);
  }
};

//---------update partner token
export const DeviceToken = (userId, Devicetoken, service) => async (
  dispatch,
) => {
  let serviceName = service.replace(/ /g, '');

  try {
    const req = await fetch(
      `https://on-click-s.firebaseio.com/sellers/${serviceName}/${userId}.json`,
      {
        method: 'patch',
        headers: {
          ContentType: 'application/json',
        },
        body: JSON.stringify({Devicetoken}),
      },
    );
  } catch (error) {
    console.log('seller updating token', error);
  }
};
