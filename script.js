let caesar = `
<p class="info">You can only use normal characters and numbers. Space will remain a space. The key can only be a natural number</p>
<input type="number" name="caesarKey" id="caesarKey" class="key"  placeholder="key" min=0>
    <div class="caesarEncodeWrapper">
      <textarea id="caesarInputEncode" rows="4" cols="50" placeholder="Text to encode"></textarea>
      <button type="button" onclick="caesarEncode()">Encode</button>
    </div>
    <br>
    <div class="caesarDecodeWrapper">
      <textarea id="caesarInputDecode" rows="4" cols="50" placeholder="Text to decode"></textarea>
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
  // Es wird am Body d'class error hinzugfüegt und nacher s'bild vom crypty gändered. Am schluss wird no d'errormessage in ouput ihgfüegt
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