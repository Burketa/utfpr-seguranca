let button = document.getElementById("button");
button.onclick = getValues;

function getValues() {
  console.clear();

  const plainStr = document.getElementById("msg").value;
  const key = document.getElementById("key").value;
  const normalizedStr = plainStr.toLowerCase();

  console.log(`plain: ${plainStr}`);
  console.log(`normalized: ${normalizedStr}`);
  console.log(`key: ${key}`);
  console.log("\n");

  const encrypted = encrypt(normalizedStr, key);
  console.log(`Cyphered: ${encrypted}`);

  console.log("\n");

  const plain = decrypt(encrypted, key);
  console.log(`Plain: ${plain}`);
}

function encrypt(str, key) {
  let encryptedStr = "";

  str.split("").map(char => {
    const ASCIIChar = toASCII(char);
    const cypherChar = String.fromCharCode(ASCIIChar + parseInt(key));

    const normalizedCypherChar =
      toASCII(cypherChar) > 122
        ? String.fromCharCode(toASCII(cypherChar) - 26)
        : cypherChar;

    encryptedStr += normalizedCypherChar;
  });

  /*console.log(`ASCII Char: ${String.fromCharCode(ASCIIChar)}`);
    console.log(`ASCII Code: ${ASCIIChar}`);
    console.log(`ASCII Char + Key \(Cyphered\): ${cypherChar}`);
    console.log("\n");*/

  return encryptedStr;
}

function decrypt(str, key) {
  let decyptedSrt = "";

  str.split("").map(char => {
    const ASCIIChar = toASCII(char);
    const plainChar = String.fromCharCode(ASCIIChar - parseInt(key));

    const normalizedPlainChar =
      toASCII(plainChar) < 97
        ? String.fromCharCode(toASCII(plainChar) + 26)
        : plainChar;

    decyptedSrt += normalizedPlainChar;
  });

  /*console.log(`ASCII Char: ${String.fromCharCode(ASCIIChar)}`);
    console.log(`ASCII Code: ${ASCIIChar}`);
    console.log(`ASCII Char - Key \(Plain\): ${plainChar}`);
    console.log("\n");*/

  return decyptedSrt;
}

function toASCII(char) {
  return char.charCodeAt();
}
