let caesar = `
    <p class="info">You can only use normal characters and numbers. Space will remain a space</p>
    <input type="number" name="caesarKey" id="caesarKey" placeholder="key">
    <div class="EncodeWrapper">
      <input type="text" id="caesarInputEncode" placeholder="Text to encode">
      <button type="button" onclick="caesarEncode()">Encode</button>
    </div>
    <br>
    <div class="caesarDecodeWrapper">
      <input type="text" id="caesarInputDecode" placeholder="Text to decode">
      <button type="button" onclick="caesarDecode()">Decode</button>
    </div>
    <div class="OutputWrapper" onclick="copyOutput()">
    <div id="Output" class="Output"></div>
      <img class="copyOutput" src="src/copy.png" alt"copyText-Icon">
    </div>
  `;
  
const caesarString =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

function caesarEncode() {
  let text = document.getElementById("caesarInputEncode").value;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]+/.test(text)) {
    //TODO
    error("contains special characters, won't work.");
    return;
  }
  let key = parseInt(document.getElementById("caesarKey").value);
  let res = "";
  for (let i = 0; i < text.length; i++) {
    let caesarStringIndex = caesarString.indexOf(text.charAt(i));
    let char = caesarStringIndex + key;
    char = char % caesarString.length;
    res = res.concat(caesarString.charAt(char));
  }
  document.getElementById("logo").src = "src/cryptyLogoTransparent.png";
  document.body.classList.remove("error");
  document.getElementById("Output").innerHTML = res;
}

function caesarDecode() {
  let text = document.getElementById("caesarInputDecode").value;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]+/.test(text)) {
    //TODO
    alert("contains special characters, won't work. ");
    return;
  }
  let key = parseInt(document.getElementById("caesarKey").value);
  let res = "";
  for (let i = 0; i < text.length; i++) {
    let caesarStringIndex = caesarString.indexOf(text.charAt(i));
    let char = caesarStringIndex - key;
    char = char % caesarString.length;
    res = res.concat(caesarString.charAt(char));
  }
  document.getElementById("logo").src = "src/cryptyLogoTransparent.png";
  document.body.classList.remove("error");
  document.getElementById("Output").innerHTML = res;
}

let option2 = `
    <p class="info">Info Text</p>
    <input type="number" name="option2Key" id="option2Key" placeholder="key">
    <div class="EncodeWrapper">
      <input type="text" id="option2InputEncode" placeholder="Text to encode">
      <button type="button" onclick="option2Encode()">Encode</button>
    </div>
    <br>
    <div class="option2DecodeWrapper">
      <input type="text" id="option2InputDecode" placeholder="Text to decode">
      <button type="button" onclick="option2Decode()">Decode</button>
    </div>
    <div id="option2Output" class="Output" onclick="copyOutput(option1Output)">
      <img class="copyOutput" src="src/copy.png" alt"copyText-Icon">
    </div>
  `;

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
