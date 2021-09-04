import {
  ADDHOST,
  DELETEHOST,
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
        hosts: action.hostData,
      };

    case DELETEHOST:
      return {
        ...state,
        hosts: state.hosts.filter(data => data.id !== action.id),
      };
    case UPDATEHOST:
      const index = state.hosts.findIndex(item => item.id == action.id);
      if (index === -1) {
        return state;
      }
      return {
        ...state,
        hosts: [
          ...state.hosts.slice(0, index),
          {
            ...state.hosts[index],
            ...action.hostData,
          },
          ...state.hosts.slice(index + 1),
        ],
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
