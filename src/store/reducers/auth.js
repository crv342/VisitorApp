import {LOGIN, LOGOUT, UPDATE, RESTORE_TOKEN} from '../actions/auth';

const initialState = {
  token: null,
  adminData: {},
  isLoading: true,
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
