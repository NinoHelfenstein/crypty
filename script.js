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

let Playfair = `
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
    // Hier wird di Schlussendlichi FUnction Encode ufgruefe, welli de Key as createGrid & de plaintext as createPairs übergit
    // denach wird über jedes Paar gloopt und encrypted ahand vo de Pairs & gridtabelle mit em Key und zum ciphertext hinzugfüeged
    // zum Schluss hani na welle d X, verursacht dur doppelti Buchstabe oder ungeradi Satzlängene z löschen ums besser chöne lese und gibe das ganze im Output wieder us
    let key = document.getElementById("PlayfairKey").value;
    let plaintext = document.getElementById("PlayfairInputEncode").value;
    var result = isNumber(key);
    if (!plaintext || !key) {
      error("You need a Keyword/phrase and a Text to encode");
      return;
    }
    if (/[^a-zA-Z0-9\s]/g.test(plaintext)) {
      error("Contains special characters, won't work.");
      return;
    }
    if (result == true) {
      error("Key isn't a word/phrase");
      return;
    }

    let grid = createGrid(key);
    let pairs = createPairs(plaintext);
    let ciphertext = "";
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i];
      let encryptedPair = encryptPair(pair, grid);
      ciphertext += encryptedPair;
    }
    document.getElementById("Output").innerText = ciphertext;
  }
  
  function PlayfairDecode() {
    // Hier wird di Schlussendlichi FUnction Decode ufgruefe, welli de Key as createGrid & de ciphertext(verschlüsselte Text) as createPairs übergit
    // denach wird über jedes Paar gloopt und decrypted ahand vo de gridtabelle mit em Key und zum Plaintext hinzugfüeged
    // zum Schluss hani na welle d X, verursacht dur doppelti Buchstabe oder ungeradi Satzlängene z löschen ums besser chöne lese und gibe das ganze im Output wieder us
    // han bim teschte bemerkt, dass wenn es Wort verschlüsselt wird, wo ungerade isch und mit X endet zu de Endig "EE", "WW" und "XX" wird. daher han das ebenfalls noma umbaut um de fehler z umgah.
    let key = document.getElementById("PlayfairKey").value;
    let ciphertext = document.getElementById("PlayfairInputDecode").value;
    var result = isNumber(key);
    if (!ciphertext || !key) {
      error("You need a Keyword/phrase and a Text to encode");
      return;
    }
    if (/[^a-zA-Z0-9\s]/g.test(ciphertext)) {
      error("Contains special characters, won't work.");
      return;
    }
    if (result == true) {
      error("Key needs to be a Word/Phrase");
      return;
    }

    let grid = createGrid(key)
    let pairs = createPairs(ciphertext);
    let plaintext = "";
    let a = "";
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i];
      let decryptedPair = decryptPair(pair, grid);
      plaintext += decryptedPair;
    }
  
    let cleanedText = plaintext.replace(/(.)(X)\1/g, "$1$1");
    cleanedText = cleanedText.replace(/X$/, "");

    if (cleanedText.length % 2 === 1 && cleanedText.charAt(cleanedText.length - 1) === "X") {
      finalText = cleanedText.slice(0, -1);
      document.getElementById("Output").innerText = finalText;

    }
    else if (cleanedText.endsWith("WW")) {
      finalText = cleanedText.slice(0, -2);
      document.getElementById("Output").innerText = finalText;

    }
    else if (cleanedText.endsWith("EE")) {
      finalText = cleanedText.slice(0, -2);
      document.getElementById("Output").innerText = finalText;

    }
    else {
      finalText = cleanedText;
      document.getElementById("Output").innerText = finalText;
    }

  }
  
  function createGrid(key) {
    // Hier wird es Gitter(grid 5x5) erstellt, und de Key hinzugfüegt. dabi wird de Key vo obe links her startend is raschter Igfüegt. Achtung isch en Buchstabe bereits einmal itreit, chunt er im Raster keis zweits mal vor. usserdem wird "J" im raster mit "I" ersetzt(daher 5x5 = 25)
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
    // Hier wird de Plaintext i zweiergruppe zerteilt z.B. "HelloWorld" wird "zu He lx lo Wo rl dx". isch d Azahl Zeiche ungrad wird am Endi vom Text no es X aghängt ums grad z mache, chunt en Buchstabe doppelt hinterenander vor, so werdet die beide mit emene X vonenander trennt z.B. "Hello" wird zu "He lx lo"
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
    // i dere funktion werdet di bereits ufgeteilte Paare vom Plaintexts is Grid(5x5) igfüegt.
    // Dazu träged mir euse Key von Obe Links startend i und gend nach rechts. isch ein Buchstabe im grid so chunt er det keis zweits mal vor.
    // als nächschtes nehmed mir die ufgeteilte Päärli und sueched jede Buechstabe devo ufem Grid. dazu gits aber einig i regle wo münd beachtet werde.
    // Rule1: Sind die Beide Plaintexschtbuechstabe i deselbe Zile, werdet d Buechstabe mit em folgende Buechstabe(rechts) ersetzt. Befindet sich de Buechstabe am üssersertschte Rand(rechts) und es folgt kein andere uf die recht site, so wird de Buechstabe uf di link site ganz links vo de gliche zeile gshiftet
    // Rule2: ergit sich dur d verwendig vo de Buechstabe es Rechteck(z.B. 3x4) so werdet d Buechstabe dur Buechstabe vo de andere ecke vo de gliche Zile ersetzt
    // Rule3: sind beidi Buechstabe id de selbe spalte, werdet d Buechstabe dur die i de spalte abwärts folgende Buechstabe ersetzt. staht en Buechstabe am untere Rand, wird de erschti(vom obere rand) buechstabe i de gliche spalte als schlüsselte buchstabe gewählt.
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
    // gegeteil vo encryptPair, nimmt ciphertext, splitted en uf i Pairs und arbeited sich logisch betrachtet rückwerts dur d verschlüsselig
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

  function removeSuffixes(cleanedText) {
    
      if (cleanedText.endsWith("WW")) {
        return cleanedText.slice(0, -2); // Entferne die letzten beiden Zeichen "WW"
      } else if (cleanedText.endsWith("EE")) {
        return cleanedText.slice(0, -2); // Entferne die letzten beiden Zeichen "EE"
      } else {
        return cleanedText; // Das Wort hat kein Suffix "WW" oder "EE"
      };
  }

  function isNumber(variable) {
    return !isNaN(variable);
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

