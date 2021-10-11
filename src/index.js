const http = require('http');

const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses');
const responseHandler = require('./responses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/character': responseHandler.getRandomCharacterResponse,
  '/characters': responseHandler.getRandomCharactersResponse,
  '/randChar': htmlHandler.getRandCharResponse,
  '/multi': htmlHandler.getRandCharactersResponse,
  '/admin': htmlHandler.adminResponse,
  '/getCharacter': responseHandler.getCharacterList,
  '/build-character': responseHandler.addCharacter,
  '/default-styles.css': htmlHandler.getCSSResponse,
  '/': htmlHandler.getHTMLPageResponse,
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
  const params = query.parse(parsedUrl.query);
  const httpMethod = request.method;

  if (httpMethod === 'POST') {
    handlePost(request, response, parsedUrl);
    return;
  }

  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];
  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, acceptedTypes, params, httpMethod);
  } else {
    urlStruct.notFound(request, response);
  }
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
