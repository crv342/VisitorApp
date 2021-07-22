import AsyncStorage from '@react-native-async-storage/async-storage';

export const UPDATE_THEME_COLOR = 'UPDATE_THEME_COLOR';

export const updateTheme = (primaryColor, accentColor) => {
  // const constaData = 'export default {\n' +
  //   '  primary: \'#C1403D\',\n' +
  //   '  accent: \'#ffeaea\',\n' +
  //   '  // accent: \'rgba(255,234,234,0.85)\',\n' +
  //   '};'
  // fs.writeFile('../../constants/Colors.js', constaData, err => {
  //   // In case of a error throw err.
  //   if (err) {
  //     console.log(err);
  //   }
  // });
  console.log('colors', primaryColor, accentColor);
  let c = primaryColor.slice().substring(1); // strip #
  let rgb = parseInt(c, 16); // convert rrggbb to decimal
  let r = (rgb >> 16) & 0xff; // extract red
  let g = (rgb >> 8) & 0xff; // extract green
  let b = (rgb >> 0) & 0xff; // extract blue

  let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
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
