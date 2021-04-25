const path = require('path');

module.exports = {
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'de',
  },
  localePath: path.resolve('./public/locales')
}
