import {URL} from './auth';
import Host from '../../models/host';

export const ADDHOST = 'ADDHOST';
export const DELETEHOST = 'DELETEHOST';
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
      if (!response.ok) {
        const resData = await response.json();
        throw new Error('Fetching details failed..');
      }
      const resData = await response.json();
      const purposeData = resData.purpose;
      const hData = resData.host;
      const hostData = [];
      for (var key = 0; key < hData.length; key++) {
        hostData.push(
          new Host(
            hData[key]._id,
            hData[key].name,
            hData[key].phone,
            hData[key].email,
            hData[key].sendemail,
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

export const addHost = (name, phone, email, sendemail) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await fetch(URL + '/host/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          sendemail,
        }),
      });
      if (!response.ok) {
        throw new Error('something went wrong');
      }
      const responseData = await response.json();
      const resData = responseData.host;
      const hostData = [];
      for (var key = 0; key < resData.length; key++) {
        hostData.push(
          new Host(
            resData[key]._id,
            resData[key].name,
            resData[key].phone,
            resData[key].email,
            resData[key].sendemail,
          ),
        );
      }

      dispatch({type: ADDHOST, hostData});
    } catch (e) {
      throw new Error(e.message);
    }
  };
};

export const updateHost = (id, host) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await fetch(URL + '/host/update/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(host),
      });

      if (!response.ok) {
        throw new Error('something went wrong');
      }
      const hostData = await response.json();

      dispatch({type: UPDATEHOST, hostData, id});
    } catch (e) {
      throw new Error(e.message);
    }
  };
};

export const deleteHost = id => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await fetch(URL + '/host/remove/' + id, {
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

      dispatch({type: DELETEHOST, id: resData._id});
    } catch (e) {
      throw new Error(e.message);
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
