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
      // var index = state.checkedInVisitors.findIndex(
      //   item => item.id == action.id,
      // );
      // if (index !== -1) {
      //   state.checkedInVisitors.splice(index, 1);
      // }
      const index = state.hosts.findIndex(item => item.id == action.id);
      // const data = state.hosts[index];
      // const updatedData = {...data, ...action.hostData};
      // const hosts = state.hosts;
      // hosts[index] = updatedData;
      if (index === -1) {
        return state;
      }
      return {
        ...state,
        hosts: [
          ...state.hosts.slice(0, index), // everything before current post
          {
            ...state.hosts[index],
            ...action.hostData,
          },
          ...state.hosts.slice(index + 1), // everything after current post
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
