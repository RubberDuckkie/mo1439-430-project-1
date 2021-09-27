const xhttp = new XMLHttpRequest();

const respond = (request, response, content, type) => {
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getCharacter = (request, response, content, acceptedTypes) => {
  const characterData = [];
  characterData.push(response);
  return respond(request, response, JSON.stringify[characterData], 'application/json');
};

module.exports.getCharacter = getCharacter;
