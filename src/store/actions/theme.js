import AsyncStorage from '@react-native-async-storage/async-storage';

export const UPDATE_THEME_COLOR = 'UPDATE_THEME_COLOR';
export const UPDATE_CHART_COLOR = 'UPDATE_CHART_COLOR';

export const updateTheme = (primaryColor, accentColor) => {
  let c = primaryColor.slice().substring(1);
  let rgb = parseInt(c, 16);
  let r = (rgb >> 16) & 0xff;
  let g = (rgb >> 8) & 0xff;
  let b = (rgb >> 0) & 0xff;

  let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const textColor = luma < 40 ? 'white' : 'black';
  AsyncStorage.setItem(
    'theme',
    JSON.stringify({
      primary: primaryColor,
      accent: accentColor,
      text: textColor,
    }),
  );
  return {
    type: UPDATE_THEME_COLOR,
    primaryColor,
    accentColor,
    textColor,
  };
};

export const updateChartColor = chartColors => {
  AsyncStorage.setItem('chartColors', JSON.stringify(chartColors));
  return {
    type: UPDATE_CHART_COLOR,
    chartColors,
  };
};
