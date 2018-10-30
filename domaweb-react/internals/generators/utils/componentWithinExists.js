/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');
const pageComponents = fs.readdirSync(path.join(__dirname, '../../../src/components'));
const pageContainers = fs.readdirSync(path.join(__dirname, '../../../src/containers'));
//const components = pageComponents.concat(pageContainers);

function validateFolder() {
  return fs.readdirSync(path.join(__dirname, '../../../app/components/'));
}

function iterateFolders() {
  const list = [];
  const folders = validateFolder();
  for (let i of folders) {
    let temp = fs.readdirSync(path.join(__dirname, `../../../app/components/${i}`));
    list.push(temp);
  }
  return list;
}

function componentWithinExists(comp) {
  const components = iterateFolders();
  // console.log(components);
  return components.indexOf(comp) >= 0;
}

module.exports = componentWithinExists;
