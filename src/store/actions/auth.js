import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const RESTORE_TOKEN = 'RESTORE_TOKEN';
export const URL = 'https://visitorapi.herokuapp.com';

let timer;

export const login = (username, password) => {
  // console.log("...start")
  return async dispatch => {
    try {
      // console.log("...in start")
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
      // console.log("...after call", await response.json())
      if (!response.ok) {
        const resData = await response.json();
        let message = 'Something went wrong!';
        if (resData.e === 'Invalid username or password') {
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
      throw new Error(e);
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
