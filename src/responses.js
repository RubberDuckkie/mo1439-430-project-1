const characterDatabase = [
  { name: 'Shen', weapon: 'Sword', vision: 'Hydro' },
  { name: 'Marcus', weapon: 'Polearm', vision: 'Geo' },
  { name: 'Keqing', weapon: 'Sword', vision: 'Electro' },
  { name: 'Thoma', weapon: 'Polearm', vision: 'Pyro' },
  { name: 'Kaedehara Kazuha', weapon: 'Sword', vision: 'Anemo' },
  { name: 'Xiao', weapon: 'Polearm', vision: 'Anemo' },
  { name: 'Ganyu', weapon: 'Bow', vision: 'Cryo' },
  { name: 'Mona', weapon: 'Catalyst', vision: 'Hydro' },
  { name: 'Madarame', weapon: 'Claymore', vision: 'Hydro' },
  { name: 'Diluc', weapon: 'Claymore', vision: 'Pyro' },
  { name: 'Venti', weapon: 'Bow', vision: 'Anemo' },
  { name: 'Amber', weapon: 'Bow', vision: 'Pyro' },
  { name: 'Lisa', weapon: 'Catalyst', vision: 'Electro' },
  { name: 'Barbara', weapon: 'Catalyst', vision: 'Hydro' },
  { name: 'Xiangling', weapon: 'Polearm', vision: 'Pyro' },
  { name: 'Albedo', weapon: 'Sword', vision: 'Geo' },
  { name: 'Bennett', weapon: 'Sword', vision: 'Pyro' },
  { name: 'Beidou', weapon: 'Claymore', vision: 'Electro' },
  { name: 'Chongyun', weapon: 'Claymore', vision: 'Cryo' },
  { name: 'Diona', weapon: 'Bow', vision: 'Cryo' },
  { name: 'Eula', weapon: 'Claymore', vision: 'Cryo' },
  { name: 'Fischl', weapon: 'Bow', vision: 'Electro' },
  { name: 'Hu Tao', weapon: 'Polearm', vision: 'Pyro' },
  { name: 'Jean', weapon: 'Sword', vision: 'Anemo' },
  { name: 'Kamisato Ayaka', weapon: 'Sword', vision: 'Cryo' },
  { name: 'Klee', weapon: 'Catalyst', vision: 'Pyro' },
  { name: 'Kujo Sara', weapon: 'Bow', vision: 'Electro' },
  { name: 'Ningguang', weapon: 'Catalyst', vision: 'Geo' },
  { name: 'Noelle', weapon: 'Claymore', vision: 'Geo' },
  { name: 'Raiden Shogun', weapon: 'Polearm', vision: 'Electro' },
  { name: 'Razor', weapon: 'Claymore', vision: 'Electro' },
  { name: 'Rosaria', weapon: 'Polearm', vision: 'Cryo' },
  { name: 'Sangonomiya Kokomi', weapon: 'Catalyst', vision: 'Hydro' },
  { name: 'Sayu', weapon: 'Claymore', vision: 'Anemo' },
  { name: 'Sucrose', weapon: 'Catalyst', vision: 'Anemo' },
  { name: 'Tartaglia', weapon: 'Bow', vision: 'Hydro' },
  { name: 'Xingqiu', weapon: 'Sword', vision: 'Hydro' },
  { name: 'Xinyan', weapon: 'Claymore', vision: 'Pyro' },
  { name: 'Yanfei', weapon: 'Catalyst', vision: 'Pyro' },
  { name: 'Yoimiya', weapon: 'Bow', vision: 'Pyro' },
  { name: 'Zhongli', weapon: 'Polearm', vision: 'Geo' },
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

// adds a character to the database
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
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

// This is based off of the example code, but overall it adds random characters to the database and returns them
const getRandomCharacter = () => characterDatabase[Math.floor(Math.random() * characterDatabase.length)];
// JSON based return format
const getRandomCharacterJSON = () => JSON.stringify(getRandomCharacter());
// XML based return format
const getRandomCharacterXML = () => {
  const chara = getRandomCharacter();
  return `<?xml version="1.0" ?>
    <chara>
      <name>${chara.name}</name>
      <weapon>${chara.weapon}</weapon>
      <vision>${chara.vision}</vision>
    </chara>
  `;
};

// Based off homework but returns multiple characters
const getRandomCharacters = (max) => {
  let num = Number(max);
  num = !num ? 1 : num;
  num = num < 1 ? 1 : num; // if `num` is less than 1 default it to 1
  num = num < characterDatabase.length ? num : characterDatabase.length;
  num = Math.floor(num);

  const rental = [];

  for (let i = 0; i < num; i += 1) {
    // so to explain for this, it
    rental.push(characterDatabase[Math.floor(Math.random() * characterDatabase.length)]);
  }

  return rental;
};
// JSON based return format
const getRandomCharactersJSON = (max = 1) => JSON.stringify(getRandomCharacters(max));
// XML return based format
const getRandomCharactersXML = (max = 1) => {
  const characters = getRandomCharacters(max);
  let xml = '<?xml version="1.0" ?>';
  xml += '<characters>';
  for (const c of characters) {
    xml += '<character>';
    xml += `<name>${c.name}</name>`;
    xml += `<weapon>${c.weapon}</weapon>`;
    xml += `<vision>${c.vision}</vision>`;
    xml += '</character>';
  }
  xml += '</characters>';
  return xml;
};

// Returns the list of all the characters within the database.
const getCharacterList = (request, response) => {
  const responseJSON = {
    characterDatabase,

  };

  respondJSON(request, response, 200, responseJSON);
};

// https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

// Taken from the random jokes HW and also the FORMS Demo
const getRandomCharacterResponse = (request, response, acceptedTypes, params, httpMethod) => {
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

// Taken from the random jokes HW and also the FORMS Demo
const getRandomCharactersResponse = (request, response, acceptedTypes, params, httpMethod) => {
  const contentType = acceptedTypes.includes('text/xml') ? 'text/xml' : 'application/json';
  const content = contentType === 'text/xml' ? getRandomCharactersXML(params.max) : getRandomCharactersJSON(params.max);
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
  getRandomCharactersResponse,
  getCharacterList,

};
