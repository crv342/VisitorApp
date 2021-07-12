import {URL} from './auth';
import Host from '../../models/host';

export const ADDHOST = 'ADDHOST';
export const REMOVEHOST = 'REMOVEHOST';
export const FETCH_DETAILS = 'FETCH_DETAILS';
export const UPDATEHOST = 'UPDATEHOST';
export const UPDATEPURPOSE = 'UPDATEPURPOSE';
export const REMOVEPURPOSE = 'REMOVEPURPOSE';

export const fetchDetails = () => {
  return async dispatch => {
    try {
      const response = await fetch(URL + '/details', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('1');
      if (!response.ok) {
        console.log('2');
        const resData = await response.json();
        console.log('3' + resData);
        throw new Error('Fetching details failed..');
      }
      const resData = await response.json();
      console.log('4' + resData.host);
      const purposeData = resData.purpose;
      const hData = resData.host;
      console.log(purposeData);
      const hostData = [];
      //id, title, imageUrl, description, price, category, owner
      for (var key = 0; key < hData.length; key++) {
        hostData.push(
          new Host(
            hData[key]._id,
            hData[key].name,
            hData[key].phone,
            'abc@gmail.com',
          ),
        );
      }
      dispatch({
        type: FETCH_DETAILS,
        hostData,
        purposeData,
      });
    } catch (error) {
      throw new Error('No Data Found!');
    }
  };
};

export const updatePurpose = purpose => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await fetch(URL + '/purpose/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          name: purpose,
        }),
      });
      if (!response.ok) {
        throw new Error('something went wrong');
      }
      const resData = await response.json();
      const purposeData = resData.purpose;

      // const resData = await response.json();
      dispatch({type: UPDATEPURPOSE, purposeData});
    } catch (e) {
      throw new Error(e.message);
    }
  };
};

export const removePurpose = id => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await fetch(URL + '/purpose/remove/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(),
      });
      if (!response.ok) {
        throw new Error('something went wrong');
      }
      const resData = await response.json();

      // const resData = await response.json();
      dispatch({type: REMOVEPURPOSE, id: resData._id});
    } catch (e) {
      throw new Error(e.message);
    }
  };
};
