import {UPDATE_THEME_COLOR} from '../actions/theme';

const initialState = {
  colors: {
    primary: '#C1403D',
    accent: '#ffeaea',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_THEME_COLOR:
      console.log('colors reducers', action);
      return {
        ...state,
        colors: {
          primary: action.primaryColor,
          accent: action.accentColor,
        },
      };
    default:
      return state;
  }
};
