import * as en from './languages/en.json';
import * as es from './languages/es.json';

const languages = {
  en: en,
  es: es,
};

export function localize(string, search = '', replace = '') {
  const lang = (localStorage.getItem('selectedLanguage') || 'en')
    .replace(/['"]+/g, '')
    // Two char language
    .replace(/-.*/, '');

  let translated;

  try {
    translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
  } catch (e) {
    translated = string.split('.').reduce((o, i) => o[i], languages['en']);
  }

  if (translated === undefined) translated = string.split('.').reduce((o, i) => o[i], languages['en']);

  if (search !== '' && replace !== '') {
    translated = translated.replace(search, replace);
  }
  return translated;
}
