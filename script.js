let option1 = `
    <p class="info">Info Text</p>
    <input type="number" name="option1Key" id="option1Key" placeholder="key">
    <div class="EncodeWrapper">
      <input type="text" id="option1InputEncode" placeholder="Text to encode">
      <button type="button" onclick="option1Encode()">Encode</button>
    </div>
    <br>
    <div class="option1DecodeWrapper">
      <input type="text" id="option1InputDecode" placeholder="Text to decode">
      <button type="button" onclick="option1Decode()">Decode</button>
    </div>
    <div class="OutputWrapper" onclick="copyOutput()">
    <div id="Output" class="Output"></div>
      <img class="copyOutput" src="src/copy.png" alt"copyText-Icon">
    </div>
  `;

  let Vigenère = `
  <p class="info">Vigenère-Verschlüsselung<br>Benötigt Input & ein Schlüsselwort zum verschlüsseln</p>
  <input type="text" name="VigenèreKey" id="VigenèreKey" placeholder="keyWord">
  <div class="VigenèreEncodeWrapper">
    <input type="text" id="VigenèreInputEncode" placeholder="Text to encode">
    <button type="button" onclick="VigenèreEncode()">Encode</button>
  </div>
  <br>
  <div class="VigenèreDecodeWrapper">
    <input type="text" id="VigenèreInputDecode" placeholder="Text to decode">
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
  // denach wird über jede Buechstabe vom Igabetext gloopt(Schleife)
  for (let i = 0; i < input.length; i++) {
    let charCode = input.charCodeAt(i);
    // ezt wird überprüeft, ob de Zeichecode im Bereich vo A = 65 und Z = 90 liegt.
    if (charCode >= 65 && charCode <= 90) {
      // stimmt das sowit, wird denach hier de ensprechende Zeichecode vom Schlüsselbuechstabe ermittelt
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
  document.getElementById("VigenèreInputDecode").value = encryptedText;
}


function VigenèreDecode() {
  // I dere Funktion übergebed mir de Igabetext und de Schlüssel via DOM ad Variable und stelled alles uf Grossbuechstabe um.
  let input = document.getElementById("VigenèreInputDecode").value.toUpperCase();
  let key = document.getElementById("VigenèreKey").value.toUpperCase();
  // Ezt werdet die Variable für de verschlüsselti Texscht und de Schlüsselindex initalisiert
  let decryptedText = '';
  let keyIndex = 0;
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
  document.getElementById("Output").innerText = decryptedText;
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
    case "1":
      contentWrapper.innerHTML = option1;
      break;
    case "Vigenère":
      contentWrapper.innerHTML = Vigenère;
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
