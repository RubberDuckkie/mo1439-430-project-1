// 1 - pull in the HTTP server module
const http = require('http');

// 2 - pull in URL and query modules (for URL parsing)
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses');
const responseHandler = require('./responses');

// 3 - locally this will be 3000, on Heroku it will be assigned
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Link and URL to the Genshin API
const genshinURL = new URL('https://api.genshin.dev/');
const genshinLink = genshinURL.toString();

const selector = document.getElementById('Presets');
const selector2 = document.getElementById('Presets2');
const { value } = selector.options[selector.selectedIndex];
const value2 = selector2.options[selector2.selectedIndex].value;
console.log(value);
console.log(value2);

// Endpoints for the different tabs
const urlStruct = {
  character: responseHandler.getCharacter,
  artifacts: responseHandler.getRandomJokes,
  notFound: htmlHandler.get404Response,

};

// Function gotten from https://ricardometring.com/getting-the-value-of-a-select-in-javascript
function update() {
  const select = document.getElementById('Presets');
  const option = select.options[select.selectedIndex].value;
}

const onRequest = (request, response) => {
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];
  // console.log(request.headers);
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  const params = query.parse(parsedUrl.query);

  // function getCharacter(link = charaLINK) {
  //   update();
  //   const trueLink = charaLINK += value;
  //   console.log(trueLink);
  //   fetch(trueLink)
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       const character = data;
  //       console.log(character);
  //       charaName.append(character.name);
  //       charaVision.append(character.vision);
  //       charaNation.append(character.nation);
  //       charaWeapon.append(character.weapon);
  //       if (character.vision === 'Anemo') {
  //         document.body.style.backgroundColor = '#54DCB4';
  //       } else if (character.vision === 'Pyro') {
  //         document.body.style.backgroundColor = '#D12027';
  //       } else if (character.vision === 'Hydro') {
  //         document.body.style.backgroundColor = '#0073CD';
  //       } else if (character.vision === 'Cryo') {
  //         document.body.style.backgroundColor = '#B9DFE4';
  //       } else if (character.vision === 'Electro') {
  //         document.body.style.backgroundColor = '#BF00FF';
  //       } else if (character.vision === 'Geo') {
  //         document.body.style.backgroundColor = '#FFCE00';
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  urlStruct[parsedUrl.pathname](request, response);
};

// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);
