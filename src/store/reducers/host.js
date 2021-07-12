import {
  ADDHOST,
  REMOVEHOST,
  UPDATEHOST,
  UPDATEPURPOSE,
  FETCH_DETAILS,
  REMOVEPURPOSE,
} from '../actions/host';

const initialState = {
  hosts: [],
  purposes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DETAILS:
      return {
        ...state,
        hosts: action.hostData,
        purposes: action.purposeData,
      };
    case ADDHOST:
      return {
        ...state,
        hosts: state.hosts.concat(action.hostData),
      };

    case REMOVEHOST:
      return {
        ...state,
        hosts: state.visitor.filter(data => data.id === action.id),
      };
    case UPDATEHOST:
      return {
        ...state,
        hosts: action.hostData,
      };
    case UPDATEPURPOSE:
      return {
        ...state,
        purposes: action.purposeData,
      };
    case REMOVEPURPOSE:
      return {
        ...state,
        purposes: state.purposes.filter(item => item._id !== action.id),
      };
    default:
      return state;
  }
};
