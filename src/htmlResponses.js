const fs = require('fs');

// Initialization for the main pages
const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const css = fs.readFileSync(`${__dirname}/../client/default-styles.css`);
const mainPage = fs.readFileSync(`${__dirname}/../client/mainPage.html`);
const randomCharacter = fs.readFileSync(`${__dirname}/../client/randChar.html`);
const multiple = fs.readFileSync(`${__dirname}/../client/randCharacters.html`);
const admin = fs.readFileSync(`${__dirname}/../client/admin.html`);

// Error Page
const get404Response = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(errorPage);
  response.end();
};

// Stylesheet
const getCSSResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// Main Page
const getHTMLPageResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(mainPage);
  response.end();
};

// One Random Character
const getRandCharResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(randomCharacter);
  response.end();
};

// Multiple Random Characters
const getRandCharactersResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(multiple);
  response.end();
};

// Admin Page
const adminResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(admin);
  response.end();
};

module.exports = {
  get404Response,
  getCSSResponse,
  getHTMLPageResponse,
  getRandCharResponse,
  getRandCharactersResponse,
  adminResponse,
};
