const path = require('path');
const fs = require('fs');

//read original index
let indexFilename = path.join(__dirname, '../../build-storybook/index.html');
let indexHtml = fs.readFileSync(indexFilename, {encoding: 'utf8'});
let match = indexHtml.match(/<script src="static\/manager\.(\w*)\.bundle\.js">/);
if (match === null && match.length > 0) throw new Error('bundle id not found');
let buildID = match[1];
console.log('buildID', buildID)

//read template
let templateFilename = path.join(__dirname, 'index.html');
let templateHtml = fs.readFileSync(templateFilename, {encoding: 'utf8'});
templateHtml = templateHtml.replace(/{BUILD_ID}/, buildID)

//customize index
fs.writeFileSync(indexFilename, templateHtml, {encoding: 'utf8'});
