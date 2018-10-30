/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import fiLocaleData from 'react-intl/locale-data/fi';

import { DEFAULT_LOCALE } from './App/constants'; // eslint-disable-line
import enTranslationMessages from './translations/en';
import fiTranslationMessages from './translations/fi';

export const appLocales = [
  'en',
  'fi',
];

addLocaleData(enLocaleData);
addLocaleData(fiLocaleData);

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
    : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    let message = messages[key];
    if (!message && locale !== DEFAULT_LOCALE) {
      message = defaultFormattedMessages[key];
    }
    return Object.assign(formattedMessages, { [key]: message });
  }, {});
};

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  fi: formatTranslationMessages('fi', fiTranslationMessages),
};
