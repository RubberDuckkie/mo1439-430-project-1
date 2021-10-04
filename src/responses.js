const characterDatabase = [
  { name: 'Shen', weapon: 'Sword', vision: 'Hydro' },
  { name: 'Marcus', weapon: 'Polearm', vision: 'Geo' },
  { name: 'Keqing', weapon: 'Sword', vision: 'Electro' },
  { name: 'Thoma', weapon: 'Polearm', vision: 'Pyro' },
  { name: 'Kazuha', weapon: 'Sword', vision: 'Anemo' },
  { name: 'Xiao', weapon: 'Polearm', vision: 'Anemo' },
  { name: 'Ganyu', weapon: 'Bow', vision: 'Cryo' },
  { name: 'Mona', weapon: 'Catalyst', vision: 'Hydro' },
  { name: 'Madarame', weapon: 'Greatsword', vision: 'Hydro' },
  { name: 'Diluc', weapon: 'Greatsword', vision: 'Pyro' },
  { name: 'Venti', weapon: 'Bow', vision: 'Anemo' },

];

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const addCharacter = (request, response, body) => {
  const responseJSON = {
    message: "You're missing a name, weapon and / or vision",
  };

  if (!body.name || !body.weapon || !body.vision) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON); // 400=bad request
  }

  const responseCode = 201;

  characterDatabase.push({ name: body.name, weapon: body.weapon, vision: body.vision });
  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    console.log(characterDatabase);
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const getRandomCharacter = () => characterDatabase[Math.floor(Math.random() * characterDatabase.length)];

const getRandomCharacterJSON = () => JSON.stringify(getRandomCharacter());

const getRandomCharacterXML = () => {
  const chara = addCharacter();
  return `<?xml version="1.0" ?>
    <chara>
      <name>${chara.name}</name>
      <weapon>${chara.weapon}</weapon>
      <vision>${chara.vision}</vision>
    </chara>
  `;
};

const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

const getRandomCharacterResponse = (request, response, acceptedTypes, httpMethod) => {
  const contentType = acceptedTypes.includes('text/xml') ? 'text/xml' : 'application/json';
  const content = contentType === 'text/xml' ? getRandomCharacterXML() : getRandomCharacterJSON();
  const headers = { 'Content-Type': contentType };

  if (httpMethod === 'HEAD') {
    headers['Content-Length'] = getBinarySize(content);
    response.writeHead(200, headers);
    response.end();
  } else {
    response.writeHead(200, headers);
    response.write(content);
    response.end();
  }
};

module.exports = {
  addCharacter,
  getRandomCharacterResponse,

};
