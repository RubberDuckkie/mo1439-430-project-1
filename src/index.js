const http = require('http');

const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses');
const responseHandler = require('./responses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/character': responseHandler.getRandomCharacterResponse,
  '/build-character': responseHandler.addCharacter,
  '/client/default-styles.css': htmlHandler.getCSSResponse,
  '/client/mainPage.html': htmlHandler.getHTMLPageResponse,
  '/': htmlHandler.get404Response,
  notFound: htmlHandler.get404Response,
};

const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/build-character') {
    const body = [];

    // https://nodejs.org/api/http.html
    request.on('error', (err) => {
      console.dir(error);
      response.statusCode = 400;
      response.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);
      console.log(bodyString);
      responseHandler.addCharacter(request, response, bodyParams);
    });
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  const httpMethod = request.method;
  console.log('pathname=', pathname);

  if (httpMethod === 'POST') {
    handlePost(request, response, parsedUrl);
    return;
  }

  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];
  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, acceptedTypes, httpMethod);
  } else if (undefined) {
    urlStruct[httpMethod].notFound(request, response);
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
