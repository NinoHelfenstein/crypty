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

  let option2 = `
  <p class="info">Vigenère-Verschlüsselung</p>
  <input type="text" name="VigenèreKey" id="VigenèreKey" placeholder="key">
  <div class="VigenèreEncodeWrapper">
    <input type="text" id="VigenèreInputEncode" placeholder="Text to encode">
    <button type="button" onclick="VigenèreEncode()">Encode</button>
  </div>
  <br>
  <div class="VigenèreDecodeWrapper">
    <input type="text" id="VigenèreInputDecode" placeholder="Text to decode">
    <button type="button" onclick="VigenèreDecode()">Decode</button>
  </div>
  <div id="VigenèreOutput" class="Output" onclick="copyOutput(VigenèreOutput)">
    <input type="text" id="VigenèreOutputA" placeholder="Text to decode">
    <img class="copyOutput" src="src/copy.png" alt"copyText-Icon">
  </div>
`;

function VigenèreEncode() {
  //read the DOM Input & Key, set EncyptedText & KeyIndex to uppercase
  let input = document.getElementById("VigenèreInputEncode").value.toUpperCase();
  let key = document.getElementById("VigenèreKey").value.toUpperCase();
  let encryptedText = '';
  let keyIndex = 0;
  //Loop over each character via KeyCharacter
  for (let i = 0; i < input.length; i++) {
    let charCode = input.charCodeAt(i);
    //if charset grösser gleich 65 & charcode kleiner als 90
    if (charCode >= 65 && charCode <= 90) {
      let keyChar = key.charCodeAt(keyIndex % key.length) - 65;
      let encryptedChar = String.fromCharCode(((charCode - 65 + keyChar) % 26) + 65);
      encryptedText += encryptedChar;
      keyIndex++;
    } else {
      encryptedText += input.charAt(i);
    }
  }
  console.log(encryptedText)
  document.getElementById("VigenèreInputDecode").value = encryptedText;
}

function VigenèreDecode() {
  //read the DOM Input & Key, set EncyptedText & KeyIndex
  let input = document.getElementById("VigenèreInputDecode").value.toUpperCase();
  let key = document.getElementById("VigenèreKey").value.toUpperCase();
  console.log(1)
  let decryptedText = '';
  let keyIndex = 0;
  //Loop over each character via KeyCharacter
  for (let i = 0; i < input.length; i++) {
    let charCode = input.charCodeAt(i);
    //if charset grösser gleich 65 & charcode kleiner als 90
    if (charCode >= 65 && charCode <= 90) {
      let keyChar = key.charCodeAt(keyIndex % key.length) - 65;
      let decryptedChar = String.fromCharCode(((charCode - 65 - keyChar + 26) % 26) + 65);
      decryptedText += decryptedChar;
      keyIndex++;
    } else {
      decryptedText += input.charAt(i);
    }
  }
  //return into Output-element
  document.getElementById("VigenèreOutput").value = decryptedText;
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
    case "2":
      contentWrapper.innerHTML = option2;
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
