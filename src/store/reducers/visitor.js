import {
  CHECKIN,
  CHECKOUT,
  FETCH_CHECKED_IN,
  FETCH_VISITOR,
} from '../actions/visitor';

const initialState = {
  checkedInVisitors: [
    // {
    //   name: 'yash',
    //   checkIn: new Date(),
    // },
    // {
    //   name: 'rahul',
    //   checkIn: new Date(),
    // },
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
      // var index = state.checkedInVisitors.findIndex(
      //   item => item.id == action.id,
      // );
      // if (index !== -1) {
      //   state.checkedInVisitors.splice(index, 1);
      // }

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
