import {CHECKIN, CHECKOUT, FETCH_CHECKED_IN} from '../actions/visitor';

const initialState = {
  checkedInVisitors: [
    {
      name: 'yash',
      checkIn: new Date(),
    },
    {
      name: 'rahul',
      checkIn: new Date(),
    },
  ],
  visitor: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHECKED_IN:
      return {
        ...state,
        checkedInVisitors: action.checkedInData,
      };
    case CHECKIN:
      const data = action.visitorData;
      return {
        ...state,
        checkedInVisitors: state.checkedInVisitors.concat(data),
        visitor: state.visitor.concat(data),
      };
    case CHECKOUT:
      return '';
    default:
      return state;
  }
};
