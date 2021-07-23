import {URL} from './auth';
import Visitor from '../../models/visitor';
import PushNotification from 'react-native-push-notification';

export const CHECKIN = 'CHECKIN';
export const CHECKOUT = 'CHECKOUT';
export const FETCH_CHECKED_IN = 'FETCH_CHECKED_IN';
export const FETCH_VISITOR = 'FETCH_VISITOR';

export const fetchCheckedIn = () => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch(URL + '/visitor?checkOut=null', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const resData = await response.json();
        console.log(resData);
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
  return async (dispatch, getState) => {
    try {
      const response = await fetch(URL + '/visitor', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const resData = await response.json();
        console.log(resData);
        throw new Error('Fetching Visitors failed..');
      }
      const resData = await response.json();

      const visitorData = [];
      //id, title, imageUrl, description, price, category, owner
      for (var key = 0; key < resData.length; key++) {
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
  return async (dispatch, getstate) => {
    try {
      const notifyTime = getstate().auth.adminData.notifytime;
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
        const resData = await response.json();
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
      PushNotification.localNotificationSchedule({
        id: visitorData.id,
        channelId: 'id1',
        message: `It's been ${notifyTime}.\n${visitorData.name} is not Checked Out yet`, // (required)
        date: new Date(Date.now() + 60 * 1000 * 1), // in 60 secs
        allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        /* Android Only Properties */
        repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
      });
      dispatch({type: CHECKIN, visitorData});
    } catch (e) {
      console.log(e);
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

      // const resData = await response.json();
      PushNotification.cancelLocalNotifications({id: id});
      dispatch({type: CHECKOUT, id});
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
};
