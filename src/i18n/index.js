import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import hi from './locals/hi/general';

const resources = {
  fr: {
    translation: {
      'check out': 'vérifier',
      admin: 'Administrateur',
    },
  },
  hi,
  gu: {
    translation: {
      admin: 'સંચાલક',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
