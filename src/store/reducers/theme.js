import {UPDATE_THEME_COLOR, UPDATE_CHART_COLOR} from '../actions/theme';

const initialState = {
  colors: {
    primary: '#C1403D',
    accent: '#ffeaea',
    text: '#ffffff',
  },
  chartColors: {
    bezier: {
      gradientStart: '#e26a00',
      gradientEnd: '#fb8c00',
      stroke: '#ffa726', 
    },
    line: {
      gradientStart: '#69e200',
      gradientEnd: '#698c00',
      stroke: '#69a726', 
    },
    bar: {
      gradientStart: '#0066e2',
      gradientEnd: '#0066e2',
      stroke: '#0066e2', 
    },
    contribution: {
      gradientStart: '#a600e2',
      gradientEnd: '#a600e2',
      stroke: '#a600e2', 
    }
  }
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
    case UPDATE_CHART_COLOR:
      return {
        ...state,
        chartColors: action.chartColors,
      };  
    default:
      return state;
  }
};
