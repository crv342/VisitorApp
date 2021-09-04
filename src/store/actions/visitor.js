import {URL} from './auth';
import Visitor from '../../models/visitor';

export const CHECKIN = 'CHECKIN';
export const CHECKOUT = 'CHECKOUT';
export const FETCH_CHECKED_IN = 'FETCH_CHECKED_IN';
export const FETCH_VISITOR = 'FETCH_VISITOR';

export const fetchCheckedIn = () => {
  return async dispatch => {
    try {
      const response = await fetch(URL + '/visitor?checkOut=null', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Fetching Visitors failed..');
      }
      const resData = await response.json();

      const checkedInData = [];
      for (let key = 0; key < resData.length; key++) {
        if (!resData[key].checkOut) {
          checkedInData.push(
            new Visitor(
              resData[key]._id,
              resData[key].name,
              resData[key].phone,
              resData[key].address,
              resData[key].gender,
              resData[key].dob,
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

export const fetchvisitor = () => {
  return async dispatch => {
    try {
      const response = await fetch(URL + '/visitor', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Fetching Visitors failed..');
      }
      const resData = await response.json();

      const visitorData = [];
      for (let key = 0; key < resData.length; key++) {
        visitorData.push(
          new Visitor(
            resData[key]._id,
            resData[key].name,
            resData[key].phone,
            resData[key].address,
            resData[key].gender,
            resData[key].dob,
            resData[key].checkIn,
            resData[key].checkOut,
            resData[key].host,
            resData[key].purpose,
          ),
        );
      }
      dispatch({
        type: FETCH_VISITOR,
        visitorData,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const checkin = (
  name,
  phone,
  address,
  gender,
  dob,
  checkIn,
  checkOut,
  host,
  purpose,
  hostid,
) => {
  return async dispatch => {
    try {
      const response = await fetch(URL + '/visitor/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          address,
          gender,
          dob,
          checkIn,
          host,
          purpose,
          hostid,
        }),
      });

      if (!response.ok) {
        let message = 'Something went wrong!';
        throw new Error(message);
      }

      const resData = await response.json();
      const visitorData = {
        id: resData._id,
        name: resData.name,
        phone: resData.phone,
        address: resData.address,
        gender: resData.address,
        dob: resData.dob,
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

export const checkout = id => {
  return async dispatch => {
    try {
      const response = await fetch(URL + '/visitor/checkout/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) {
        throw new Error('something went wrong');
      }
      dispatch({type: CHECKOUT, id});
    } catch (e) {
      throw new Error(e);
    }
  };
};
