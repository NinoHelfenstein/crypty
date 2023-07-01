let caesar = `
<p class="info">You can only use normal characters and numbers. Space will remain a space. The key can only be a natural number</p>
<input type="number" name="caesarKey" id="caesarKey" class="key"  placeholder="key" min=0>
    <div class="caesarEncodeWrapper">
      <textarea id="caesarInputEncode" rows="4" placeholder="Text to encode"></textarea>
      <button type="button" onclick="caesarEncode()">Encode</button>
    </div>
    <br>
    <div class="caesarDecodeWrapper">
      <textarea id="caesarInputDecode" rows="4" placeholder="Text to decode"></textarea>
      <button type="button" onclick="caesarDecode()">Decode</button>
    </div>
    <div class="OutputWrapper" onclick="copyOutput()">
      <pre id="Output" class="Output"></pre>
      <img class="copyOutput" src="src/copy.png" alt"copyText-Icon">
    </div>
  `;

const caesarString =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

function caesarEncode() {
  // Da bechömemer de text und de key(de machemer no en float) nacher luegemer öb beides usgfühlt isch udn denn wird gluegt öbs spezial zeiche hed.
  // falls es speziall zeiche hed wird en error gmacht. nacher wird gluegt öb de key valid isch und denn wird res difiniert.
  // nacher wird d'längi vom text gloopt und bi jedem zeiche glugt öbs space isch und sucht bim z'gliche zeiche plus de key vom caesarString gno.
  // am schluss wird no das zeiche res hinzuegfüegt. das ganze wird denn mit innerhtml is dokument ihgfüegt.
  let text = document.getElementById("caesarInputEncode").value;
  let key = parseFloat(document.getElementById("caesarKey").value);
  if (!text || !key) {
    error("You need a Key and a Text to encode");
    return;
  }
  if (/[^a-zA-Z0-9\s]/g.test(text)) {
    error("Contains special characters, won't work.");
    return;
  }
  if (key % 1 !== 0 || key < 0) {
    error("Key isn't a natural number");
    return;
  }
  let res = "";
  for (let i = 0; i < text.length; i++) {
    let caesarStringIndex = caesarString.indexOf(text.charAt(i));
    if (/\s/.test(text.charAt(i))) {
      console.log("Current character is a space");
      res = res.concat(text.charAt(i));
    } else {
      let char = caesarStringIndex + key;
      char = char.mod(caesarString.length);
      res = res.concat(caesarString.charAt(char));
    }
  }
  document.getElementById("logo").src = "src/cryptyLogoTransparent.png";
  document.body.classList.remove("error");
  document.getElementById("Output").innerHTML = res;
}

function caesarDecode() {
  // Da passiert s'gliche wie bim Encode eifach das de Key minus grechned wird und ned plus. 
  let text = document.getElementById("caesarInputDecode").value;
  let key = parseFloat(document.getElementById("caesarKey").value);
  if (!text || !key) {
    error("You need a Key and a Text to encode");
    return;
  }
  if (/[^a-zA-Z0-9\s]/g.test(text)) {
    error("Contains special characters, won't work.");
    return;
  }
  if (key % 1 !== 0 || key < 0) {
    error("Key isn't a natural number");
    return;
  }
  let res = "";
  for (let i = 0; i < text.length; i++) {
    let caesarStringIndex = caesarString.indexOf(text.charAt(i));
    if (/\s/.test(text.charAt(i))) {
      console.log("Current character is a space");
      res = res.concat(text.charAt(i));
    } else {
      let char = caesarStringIndex - key;
      char = char.mod(caesarString.length);
      res = res.concat(caesarString.charAt(char));
    }
  }
  document.getElementById("logo").src = "src/cryptyLogoTransparent.png";
  document.body.classList.remove("error");
  document.getElementById("Output").innerHTML = res;
}

  let vigenère = `
  <p class="info">Vigenère-Verschlüsselung<br>Benötigt Input & ein Schlüsselwort zum verschlüsseln</p>
  <input type="text" name="VigenèreKey" id="VigenèreKey" placeholder="keyWord">
  <div class="caesarEncodeWrapper">
    <textarea id="VigenèreInputEncode" rows="4" placeholder="Text to encode"></textarea>
    <button type="button" onclick="VigenèreEncode()">Encode</button>
  </div>
  <br>
  <div class="caesarDecodeWrapper">
    <textarea id="VigenèreInputDecode" rows="4" placeholder="Text to decode"></textarea>
    <button type="button" onclick="VigenèreDecode()">Decode</button>
  </div>
  <div class="OutputWrapper" onclick="copyOutput()">
  <pre id="Output" class="Output"></pre>
  <img class="copyOutput" src="src/copy.png" alt"copyText-Icon">
</div>
`;

function VigenèreEncode() {
  //I dere Funktion übergebed mir de Igabetext und de Schlüssel via DOM ad Variable und stelled alles uf Grossbuechstabe um.
  let input = document.getElementById("VigenèreInputEncode").value.toUpperCase();
  let key = document.getElementById("VigenèreKey").value.toUpperCase();
  // Ezt werdet die Variable für de verschlüsselti Texscht und de Schlüsselindex initalisiert
  let encryptedText = '';
  let keyIndex = 0;

  let resultKey = isNumber(key);
    if (!input || !key) {
      error("You need a Keyword/phrase and a Text to decode");
      return;
    }
    if (/[^a-zA-Z\s]/g.test(input)) {
      error("Contains special characters or numbers, won't work.");
      return;
    }
    if (/[^a-zA-Z\s]/g.test(key)) {
      error("Contains special characters or numbers, won't work.");
      return;
    }
    if (resultKey == true) {
      error("Key needs to be a Word/Phrase");
      return;
    }

  // denach wird über jede Buechstabe vom Igabetext gloopt(Schleife)
  for (let i = 0; i < input.length; i++) {
    let charCode = input.charCodeAt(i);
    let charLetter = input.charAt(i);
    
    // ezt wird überprüeft, ob de Zeichecode im Bereich vo A = 65 und Z = 90 liegt.
    if (charCode >= 65 && charCode <= 90) {
      // stimmt das sowit, wird denach hier de ensprechendi Zeichecode vom Schlüsselbuechstabe ermittelt
      let keyChar = key.charCodeAt(keyIndex % key.length) - 65;
      // denach wird de Buechstabe verschlüsselt und zum EncryptedText hinzugfüeged
      let encryptedChar = String.fromCharCode(((charCode - 65 + keyChar) % 26) + 65);
      encryptedText += encryptedChar;
      // und zu gueter Letscht wird im Loop de KeyIndex erhöht, demit de nechschti Buechstabe chan nach em gliche verfahre verschlüsselt werde
      keyIndex++;
    } else {
      // falls de Zeichecode ned im Bereich vo 65 - 90 lieht, wird er ned verschlüsselt, sondern gad wieder am encryptedText hinzuegfüeged.
      encryptedText += input.charAt(i);
    }
  }
  // Hier wird noma überprüeft, ob encryptedText existiert bzw i de Console usgäh wird
  console.log(encryptedText);
  // zuletscht wird de encryptedText via DOM is Usgabefeld VigenèreInputEecode übergäh
  document.getElementById("logo").src = "src/cryptyLogoTransparent.png";
  document.body.classList.remove("error");
  document.getElementById("Output").innerHTML = encryptedText;
}



function VigenèreDecode() {
  // I dere Funktion übergebed mir de Igabetext und de Schlüssel via DOM ad Variable und stelled alles uf Grossbuechstabe um.
  let input = document.getElementById("VigenèreInputDecode").value.toUpperCase();
  let key = document.getElementById("VigenèreKey").value.toUpperCase();
  // Ezt werdet die Variable für de verschlüsselti Texscht und de Schlüsselindex initalisiert
  let decryptedText = '';
  let keyIndex = 0;
  //errormessages für special chars & numbers
  console.log(key)
  let resultKey = isNumber(key);
    if (!input || !key) {
      error("You need a Keyword/phrase and a Text to decode");
      return;
    }
    if (/[^a-zA-Z\s]/g.test(input)) {
      error("Contains special characters or numbers, won't work.");
      return;
    }
    if (/[^a-zA-Z\s]/g.test(key)) {
      error("Contains special characters or numbers, won't work.");
      return;
    }
    if (resultKey == true) {
      error("Key needs to be a Word/Phrase");
      return;
    }
  // denach wird über jede Buechstabe vom Igabetext gloopt(Schleife)
  for (let i = 0; i < input.length; i++) {
    let charCode = input.charCodeAt(i);
    // ezt wird überprüeft, ob de Zeichecode im Bereich vo A = 65 und Z = 90 liegt
    if (charCode >= 65 && charCode <= 90) {
      // stimmt das sowit, wird denach hier de ensprechende Zeichecode vom Schlüsselbuechstabe ermittelt
      let keyChar = key.charCodeAt(keyIndex % key.length) - 65;
      // denach wird de Buechstabe entschlüsselt und zum encryptedText hinzugfüeged
      let decryptedChar = String.fromCharCode(((charCode - 65 - keyChar + 26) % 26) + 65);
      decryptedText += decryptedChar;
      // und ezt wird im Loop de KeyIndex erhöht, demit de nechschti Buechstabe chan nach em gliche verfahre verschlüsselt werde
      keyIndex++;
    } else {
      // falls de Zeichecode ned im Bereich vo 65 - 90 lieht, wird er ned verschlüsselt, sondern gad wieder am encryptedText hinzuegfüeged.
      decryptedText += input.charAt(i);
    }
  }
  // Hier wird noma überprüeft, ob encryptedText existiert bzw i de Console usgäh wird
  console.log(decryptedText);
  // zuletscht wird de encryptedText via DOM is Usgabefeld VigenèreInputDecode übergäh
  document.getElementById("logo").src = "src/cryptyLogoTransparent.png";
  document.body.classList.remove("error");
  document.getElementById("Output").innerHTML = decryptedText;
}


let option3 = `
    <p class="info">Info Text</p>
    <input type="number" name="option3Key" id="option3Key" placeholder="key">
    <div class="EncodeWrapper">
      <input type="text" id="option3InputEncode" placeholder="Text to encode">
      <button type="button" onclick="option3Encode()">Encode</button>
    </div>
    <br>
    <div class="option3DecodeWrapper">
      <input type="text" id="option3InputDecode" placeholder="Text to decode">
      <button type="button" onclick="option3Decode()">Decode</button>
    </div>
    <div id="option3Output" class="Output" onclick="copyOutput(option1Output)">
      <img class="copyOutput" src="src/copy.png" alt"copyText-Icon">
    </div>
  `;

function chooseMethod() {
  // Z'erst wird d'value vom select ide variable "value" gspeichered, s'glich macht mer no mit em content wrapper.
  // Nacher wird gluegt was de user usgwählt hed und denne wird demm entsprechend das glade, indem's de innerHTML zerst glöscht wird und
  // nacher wieder öpis ine chunt.
  let value = document.getElementById("method").value;
  contentWrapper = document.getElementById("contentWrapper");
  contentWrapper.innerHTML = "";
  switch (value) {
    case "caesar":
      contentWrapper.innerHTML = caesar;
      break;
    case "vigenère":
      contentWrapper.innerHTML = vigenère;
      break;
    case "3":
      contentWrapper.innerHTML = option3;
      break;
  }
}

function error(message) {
  document.body.classList.add("error");
  document.getElementById("logo").src = "src/cryptyLogoTransparentError.png";
  document.querySelector(".Output").innerHTML = message;
  // setTimeout(() => {
  //   document.body.classList.remove("error");
  //   document.getElementById("logo").src = "src/cryptyLogoTransparent.png";
  // }, 1000);
}

function copyOutput() {
  const output = document.getElementById("Output");
  navigator.clipboard.writeText(output.innerHTML);
}


// TO WORK OUT THE MODULO BUG
// web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
https: Number.prototype.mod = function (n) {
  return ((this % n) + n) % n;
};

function isNumber(variable) {
  return !isNaN(variable);
}