const fs = require('fs');

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const css = fs.readFileSync(`${__dirname}/../client/default-styles.css`);
const genstructor = fs.readFileSync(`${__dirname}/../client/genstructor.html`);

const get404Response = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(errorPage);
  response.end();
};

const getCSSResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

const getGenstructorResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(genstructor);
  response.end();
};

module.exports.get404Response = get404Response;
module.exports.getCSSResponse = getCSSResponse;
module.exports.getGenstructorResponse = getGenstructorResponse;
