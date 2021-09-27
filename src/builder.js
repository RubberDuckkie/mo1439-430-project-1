// getting the API and how to use tutorial from https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
function createNode(element) {
  return document.createElement(element);
}
const charaURL = 'https://api.genshin.dev/characters/';
let charaLINK = charaURL.toString();
const artiURL = 'https://api.genshin.dev/artifacts/';
const artiLINK = artiURL.toString();

const charaName = document.getElementById('charaName');
const charaVision = document.getElementById('charaVision');
const charaNation = document.getElementById('charaNation');
const charaWeapon = document.getElementById('charaWeapon');

const artiCrown = document.getElementById('artiCrown');
const artiCup = document.getElementById('artiCup');
const artiSands = document.getElementById('artiSands');
const artiFeather = document.getElementById('artiFeather');
const artiFlower = document.getElementById('artiFlower');

const selector = document.getElementById('Presets');
const selector2 = document.getElementById('Presets2');
const { value } = selector.options[selector.selectedIndex];
const value2 = selector2.options[selector2.selectedIndex].value;
console.log(value);
console.log(value2);

// Function gotten from https://ricardometring.com/getting-the-value-of-a-select-in-javascript
function update() {
  const select = document.getElementById('Presets');
  const option = select.options[select.selectedIndex].value;
}

function getCharacter(link = charaLINK) {
  update();
  const trueLink = charaLINK += value;
  console.log(trueLink);

  fetch(trueLink)
    .then((resp) => resp.json())
    .then((data) => {
      const character = data;
      console.log(character);
      charaName.append(character.name);
      charaVision.append(character.vision);
      charaNation.append(character.nation);
      charaWeapon.append(character.weapon);
      if (character.vision === 'Anemo') {
        document.body.style.backgroundColor = '#54DCB4';
      } else if (character.vision === 'Pyro') {
        document.body.style.backgroundColor = '#D12027';
      } else if (character.vision === 'Hydro') {
        document.body.style.backgroundColor = '#0073CD';
      } else if (character.vision === 'Cryo') {
        document.body.style.backgroundColor = '#B9DFE4';
      } else if (character.vision === 'Electro') {
        document.body.style.backgroundColor = '#BF00FF';
      } else if (character.vision === 'Geo') {
        document.body.style.backgroundColor = '#FFCE00';
      }
    })

    .catch((error) => {
      console.log(error);
    });
}

function getArtifacts(link = artiLINK) {
  update();
  const trueLink = link += value2;
  console.log(trueLink);

  fetch(trueLink)
    .then((resp) => resp.json())
    .then((data) => {
      const artifacts = data;

      console.log(artifacts);
      artiCrown.append('Crown: ', artifacts.name);
      artiCup.append('Cup: ', artifacts.name);
      artiSands.append('Sands: ', artifacts.name);
      artiFlower.append('Flower: ', artifacts.name);
      artiFeather.append('Feather: ', artifacts.name);
    });
}
