export function getLocales () {
  return [{
    languageTag: window.navigator.languages[0],
    languageCode: window.navigator.languages[1]
  }]
}

export const locale = 'en-US'
