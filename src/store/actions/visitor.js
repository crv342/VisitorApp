import URL from './auth';
import Visitor from '../../models/visitor';

export const CHECKIN = 'CHECKIN';
export const CHECKOUT = 'CHECKOUT';
export const FETCH_CHECKED_IN = 'FETCH_CHECKED_IN';

export const fetchCheckedIn = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(URL + '/visitor?checkedOut=false', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const resData = await response.json();
        throw new Error('Fetching Visitors failed..');
      }
      const resData = await response.json();

      const checkedInData = [];
      //id, title, imageUrl, description, price, category, owner
      for (var key = 0; key < resData.length; key++) {
        if (!resData[key].checkOut) {
          checkedInData.push(
            new Visitor(
              resData[key]._id,
              resData[key].name,
              resData[key].checkIn,
              resData[key].checkOut,
              resData[key].host,
              resData[key].purpose,
            ),
          );
        }
      }
      dispatch({
        type: FETCH_CHECKED_IN,
        checkedInData,
      });
    } catch (error) {
      throw new Error('No Visitor checked In!');
    }
  };
};

export const checkin = (name, checkIn, checkOut, host, purpose) => {
  return async dispatch => {
    try {
      const response = await fetch(URL + '/visitor/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          checkIn,
          checkOut,
          host,
          purpose,
        }),
      });

      if (!response.ok) {
        const resData = await response.json();
        let message = 'Something went wrong!';
        if (resData.e === 'Invalid username or password') {
          message = resData.e;
        }
        throw new Error(message);
      }

      const resData = await response.json();
      const visitorData = {
        id: resData._id,
        name: resData.name,
        checkIn: resData.checkIn,
        checkOut: resData.checkOut,
        host: resData.host,
        purpose: resData.purpose,
      };

      dispatch({type: CHECKIN, visitorData});
    } catch (e) {
      throw new Error(e);
    }
  };
};
