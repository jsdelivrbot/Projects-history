/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs');
const path = require('path');
const specificComponentGenerator = require('./component/index.js');
const containerGenerator = require('./container/index.js');
const routeGenerator = require('./route/index.js');
const languageGenerator = require('./language/index.js');

module.exports = (plop) => {
  plop.setGenerator('component', specificComponentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.setGenerator('route', routeGenerator);
  plop.setGenerator('language', languageGenerator);
  plop.addHelper('directory', (comp) => {
    try {
      fs.accessSync(path.join(__dirname, `../../src/${comp}/containers`), fs.F_OK);
      return `${comp}/containers`;
    } catch (e) {
      return `${comp}/components`;
    }
  });
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
