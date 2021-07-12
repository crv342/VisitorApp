import {
  CHECKIN,
  CHECKOUT,
  FETCH_CHECKED_IN,
  FETCH_VISITOR,
} from '../actions/visitor';

const initialState = {
  checkedInVisitors: [],
  visitor: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHECKED_IN:
      return {
        ...state,
        checkedInVisitors: action.checkedInData,
      };
    case FETCH_VISITOR:
      return {
        ...state,
        visitor: action.visitorData,
      };

    case CHECKIN:
      const data = action.visitorData;
      return {
        ...state,
        checkedInVisitors: state.checkedInVisitors.concat(data),
        visitor: state.visitor.concat(data),
      };
    case CHECKOUT:
      return {
        ...state,
        checkedInVisitors: state.checkedInVisitors.filter(
          item => item.id !== action.id,
        ),
      };
    default:
      return state;
  }
};
