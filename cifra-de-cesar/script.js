//Trabalho de Segurança, implementando a Cifra de César
const plainSpace = " ";
const cypheredSpace = "-";
const plainSpaceASCII = plainSpace.charCodeAt();
const cypheredSpaceASCII = cypheredSpace.charCodeAt();

let button = document.getElementById("button");
button.onclick = getValues;

function getValues() {
  console.clear();

  const plainStr = document.getElementById("msg").value;
  const key = parseInt(document.getElementById("key").value);
  const normalizedStr = plainStr.toLowerCase();

  if (isNaN(key)) return window.alert("A chave deve ser um numero inteiro");

  console.log(`plain: ${plainStr}`);
  console.log(`normalized: ${normalizedStr}`);
  console.log(`key: ${key}`);
  console.log("\n");

  const encrypted = encrypt(normalizedStr, key);
  const plain = decrypt(encrypted, key);

  createElements(encrypted, plain);
}

function encrypt(str, key) {
  let encryptedStr = "";

  str
    .split("")
    .filter(char => {
      const ASCIIChar = toASCII(char);
      return (
        ASCIIChar == plainSpaceASCII || (ASCIIChar >= 97 && ASCIIChar <= 122)
      );
    })
    .map(char => {
      const ASCIIChar = toASCII(char);

      if (ASCIIChar == plainSpaceASCII) {
        encryptedStr += cypheredSpace;
      } else if (ASCIIChar >= 97 && ASCIIChar <= 122) {
        const cypherChar = String.fromCharCode(ASCIIChar + parseInt(key));

        const normalizedCypherChar =
          toASCII(cypherChar) > 122
            ? String.fromCharCode(toASCII(cypherChar) - 26)
            : cypherChar;

        encryptedStr += normalizedCypherChar;
      }
    });

  return encryptedStr;
}

function decrypt(str, key) {
  let decyptedSrt = "";

  str
    .split("")
    .filter(char => {
      const ASCIIChar = toASCII(char);
      return (
        ASCIIChar == cypheredSpaceASCII || (ASCIIChar >= 97 && ASCIIChar <= 122)
      );
    })
    .map(char => {
      const ASCIIChar = toASCII(char);

      if (ASCIIChar == cypheredSpaceASCII) {
        decyptedSrt += plainSpace;
      } else if (ASCIIChar >= 97 && ASCIIChar <= 122) {
        const plainChar = String.fromCharCode(ASCIIChar - parseInt(key));

        const normalizedPlainChar =
          toASCII(plainChar) < 97
            ? String.fromCharCode(toASCII(plainChar) + 26)
            : plainChar;

        decyptedSrt += normalizedPlainChar;
      } else {
        decyptedSrt += "";
      }
    });

  return decyptedSrt;
}

function toASCII(char) {
  return char.charCodeAt();
}

function createElements(cyphered, plain) {
  const div = document.querySelector("div");
  div.innerHTML = "";

  const p = document.createElement("p");

  const cypheredText = document.createTextNode(`Codificada: ${cyphered}`);
  const plainText = document.createTextNode(`Decodificada: ${plain}`);

  p.appendChild(cypheredText);
  p.appendChild(document.createElement("br"));
  p.appendChild(document.createElement("br"));
  p.appendChild(plainText);

  div.appendChild(p);
}
