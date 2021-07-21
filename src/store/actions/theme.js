// import fs from 'fs';

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
  return {
    type: UPDATE_THEME_COLOR,
    primaryColor,
    accentColor,
  };
};
