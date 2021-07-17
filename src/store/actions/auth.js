import AsyncStorage from '@react-native-async-storage/async-storage';
import {UPDATEHOST} from './host';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE = 'UPDATE';
export const UPDATEPASSWORD = 'UPDATEPASSWORD';
export const RESTORE_TOKEN = 'RESTORE_TOKEN';
export const URL = 'https://visitorapi.herokuapp.com';
// export const URL = 'http://localhost:3000';

let timer;

export const login = (username, password) => {
  return async dispatch => {
    try {
      const response = await fetch(URL + '/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      if (!response.ok) {
        const resData = await response.json();
        let message = 'Something went wrong!';
        if (resData.e == 'Invalid username or password') {
          message = resData.e;
        }
        throw new Error(message);
      }

      const resData = await response.json();
      const adminData = {
        id: resData.user._id,
        username: resData.user.username,
        email: resData.user.email,
      };

      let expiresIn = 3600;
      const expirationDate = new Date(
        new Date().getTime() + parseInt(expiresIn) * 1000,
      );
      saveDataToStorage(resData.token, adminData, expirationDate);

      dispatch(setLogoutTimer(parseInt(expiresIn) * 1000));
      dispatch({type: LOGIN, token: resData.token, adminData});
    } catch (e) {
      throw new Error(e.message);
    }
  };
};

export const updateAdmin = updateData => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await fetch(URL + '/admin/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(updateData),
      });
      if (!response.ok) {
        throw new Error('something went wrong');
      }
      const resData = await response.json();
      const adminData = {
        id: resData._id,
        username: resData.username,
        email: resData.email,
      };

      AsyncStorage.mergeItem(
        'adminData',
        JSON.stringify({
          adminData,
        }),
      );

      dispatch({type: UPDATE, adminData});
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  };
};

export const checkPass = password => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await fetch(URL + '/admin/checkpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          password,
        }),
      });
      if (!response.ok) {
        const resData = await response.json();
        let message = 'Something went wrong!';
        console.log(resData);
        if (resData.e == 'Password Does Not Match!') {
          message = resData.e;
        }
        throw new Error(message);
      }
      const resData = await response.json();
      console.log(resData, '5');
      dispatch({
        type: UPDATEPASSWORD,
        setPassword: true,
        resToken: resData.token,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
};

export const updatePassword = password => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.resToken;
      const response = await fetch(URL + '/admin/updatepassword', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({password}),
      });
      if (!response.ok) {
        throw new Error('something went wrong');
      }

      dispatch({
        type: UPDATEPASSWORD,
        setPassword: false,
        resToken: null,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await fetch(URL + '/admin/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(),
      });

      clearLogoutTimer();
      AsyncStorage.removeItem('adminData');
      dispatch({type: LOGOUT});
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const restoreToken = (token, adminData) => {
  return {type: RESTORE_TOKEN, token: token, adminData: adminData};
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, adminData, expirationDate) => {
  AsyncStorage.setItem(
    'adminData',
    JSON.stringify({
      token,
      adminData,
      expiryDate: expirationDate.toISOString(),
    }),
  );
};
