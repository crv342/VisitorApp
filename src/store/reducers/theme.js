import {UPDATE_THEME_COLOR} from '../actions/theme';

const initialState = {
  colors: {
    primary: '#C1403D',
    accent: '#ffeaea',
    text: '#000000',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_THEME_COLOR:
      return {
        ...state,
        colors: {
          primary: action.primaryColor,
          accent: action.accentColor,
          text: action.textColor,
        },
      };
    default:
      return state;
  }
};
