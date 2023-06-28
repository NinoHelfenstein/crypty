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

let Playfair = `asdf
    <p class="info">Playfair Verschlüsselung<br>Benötigt Input für Encode & Schlüssel der ebenfalls ein Wort ist.<br> X wird zum Schluss noch herausgesucht und entfernt<br>Leerzeichen werden immer entfernt</p>
    <input type="text" name="PlayfairKey" id="PlayfairKey" placeholder="key">
    <div class="EncodeWrapper">
      <input type="text" id="PlayfairInputEncode" placeholder="Text to encode">
      <button type="button" onclick="PlayfairEncode()">Encode</button>
    </div>
    <br>
    <div class="PlayfairDecodeWrapper">
      <input type="text" id="PlayfairInputDecode" placeholder="Text to decode">
      <button type="button" onclick="PlayfairDecode()">Decode</button>
    </div>
    <div class="OutputWrapper" onclick="copyOutput()">
    <pre id="Output" class="Output"></pre>
    <img class="copyOutput" src="src/copy.png" alt"copyText-Icon">
  </div>
  `;

  function PlayfairEncode() {
    let key = document.getElementById("PlayfairKey").value;
    let plaintext = document.getElementById("PlayfairInputEncode").value;
    console.log(key, plaintext);
    let grid = createGrid(key);
    let pairs = createPairs(plaintext);
    let ciphertext = "";
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i];
      let encryptedPair = encryptPair(pair, grid);
      ciphertext += encryptedPair;
    }
    document.getElementById("PlayfairInputDecode").value = ciphertext;
  }
  
  function PlayfairDecode() {
    let key = document.getElementById("PlayfairKey").value;
    let ciphertext = document.getElementById("PlayfairInputDecode").value;
    let grid = createGrid(key)
    let pairs = createPairs(ciphertext);
    let plaintext = "";
    let text = "";
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i];
      let decryptedPair = decryptPair(pair, grid);
      plaintext += decryptedPair;
    }
  
    let cleanedText = plaintext.replace(/(.)(X)\1/g, "$1$1");
    cleanedText = cleanedText.replace(/X$/, "");
    if (cleanedText.length % 2 === 1 && cleanedText.charAt(cleanedText.length - 1) === "X") {
      return cleanedText.slice(0, -1);
    }
    document.getElementById("Output").innerText = cleanedText;
  }
  
  // Hilfsfunktionen
  
  function createGrid(key) {
    let grid = [];
    let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    
    key = key.toUpperCase().replace(/J/g, "I");
    key += alphabet;
    key = key.replace(/[^A-Z]/g, "");
    
    for (let i = 0; i < key.length; i++) {
      let letter = key.charAt(i);
      if (grid.indexOf(letter) === -1) {
        grid.push(letter);
      }
    }
    
    return grid;
  }
  
  function createPairs(text) {
    text = text.toUpperCase().replace(/J/g, "I");
    text = text.replace(/[^A-Z]/g, "");
    
    let pairs = [];
    let i = 0;
    
    while (i < text.length) {
      let pair = "";
      pair += text.charAt(i);
      
      if (i === text.length - 1 || text.charAt(i) === text.charAt(i + 1)) {
        pair += "X";
        i--;
      } else {
        pair += text.charAt(i + 1);
      }
      
      pairs.push(pair);
      i += 2;
    }
    
    return pairs;
  }
  
  function encryptPair(pair, grid) {
    let char1 = pair.charAt(0);
    let char2 = pair.charAt(1);
    let row1, col1, row2, col2;
    
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (grid[i * 5 + j] === char1) {
          row1 = i;
          col1 = j;
        }
        if (grid[i * 5 + j] === char2) {
          row2 = i;
          col2 = j;
        }
      }
    }
    
    let encryptedPair = "";
    
    if (row1 === row2) {
      col1 = (col1 + 1) % 5;
      col2 = (col2 + 1) % 5;
    } else if (col1 === col2) {
      row1 = (row1 + 1) % 5;
      row2 = (row2 + 1) % 5;
    } else {
      let temp = col1;
      col1 = col2;
      col2 = temp;
    }
    
    encryptedPair += grid[row1 * 5 + col1];
    encryptedPair += grid[row2 * 5 + col2];
    
    return encryptedPair;
  }
  
  function decryptPair(pair, grid) {
    let char1 = pair.charAt(0);
    let char2 = pair.charAt(1);
    let row1, col1, row2, col2;
    
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (grid[i * 5 + j] === char1) {
          row1 = i;
          col1 = j;
        }
        if (grid[i * 5 + j] === char2) {
          row2 = i;
          col2 = j;
        }
      }
    }
    
    let decryptedPair = "";
    
    if (row1 === row2) {
      col1 = (col1 + 4) % 5;
      col2 = (col2 + 4) % 5;
    } else if (col1 === col2) {
      row1 = (row1 + 4) % 5;
      row2 = (row2 + 4) % 5;
    } else {
      let temp = col1;
      col1 = col2;
      col2 = temp;
    }
    
    decryptedPair += grid[row1 * 5 + col1];
    decryptedPair += grid[row2 * 5 + col2];
    
    return decryptedPair;
  }
  

function chooseMethod() {
  // Z'erst wird d'value vom select ide letiable "value" gspeichered, s'glich macht mer no mit em content wrapper.
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
    case "Playfair":
      contentWrapper.innerHTML = Playfair;
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

