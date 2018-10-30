 /* List containers for component-specific command
 */

const fs = require('fs');
const path = require('path');
const pageComponents = fs.readdirSync(path.join(__dirname, '../../../src/'));

function componentList() {
  const components = [];
  for (const i in pageComponents) {
    if (/^[A-Z]/.test(pageComponents[i]) === true) {
      components.push(pageComponents[i]);
    }
  }
  return components;
}

module.exports = componentList;
