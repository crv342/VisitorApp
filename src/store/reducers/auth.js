import {
  LOGIN,
  LOGOUT,
  UPDATE,
  UPDATEPASSWORD,
  RESTORE_TOKEN,
} from '../actions/auth';

const initialState = {
  token: null,
  adminData: {},
  isLoading: true,
  setPass: false,
  resToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.token,
        adminData: action.adminData,
        isLoading: false,
      };
    case UPDATE:
      return {
        ...state,
        adminData: action.adminData,
      };
    case UPDATEPASSWORD:
      return {
        ...state,
        setPass: action.setPassword,
        resToken: action.resToken,
      };
    case LOGOUT:
      return initialState;
    case RESTORE_TOKEN:
      return {
        ...state,
        token: action.token,
        isLoading: false,
        adminData: action.adminData,
      };
    default:
      return state;
  }
};
