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
    <div class="OutputWrapper" >
      <pre id="Output" class="Output"></pre>
      <img class="copyOutput" src="src/copy.png" alt"copyText-Icon" onclick="copyOutput()">
      <img class="openExternal" src="src/external.png" alt="Open Output external" onclick="externalOutput()">
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
  <div class="OutputWrapper" >
  <pre id="Output" class="Output"></pre>
  <img class="copyOutput" src="src/copy.png" alt"copyText-Icon" onclick="copyOutput()">
  <img class="openExternal" src="src/external.png" alt="Open Output external" onclick="externalOutput()">
</div>
`;

function VigenèreEncode() {
  //I dere Funktion übergebed mir de Igabetext und de Schlüssel via DOM ad Variable und stelled alles uf Grossbuechstabe um.
  let input = document
    .getElementById("VigenèreInputEncode")
    .value.toUpperCase();
  let key = document.getElementById("VigenèreKey").value.toUpperCase();
  // Ezt werdet die Variable für de verschlüsselti Texscht und de Schlüsselindex initalisiert
  let encryptedText = "";
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
      let encryptedChar = String.fromCharCode(
        ((charCode - 65 + keyChar) % 26) + 65
      );
      encryptedText += encryptedChar;
      // und zu gueter Letscht wird im Loop de KeyIndex erhöht, demit de nechschti Buechstabe chan nach em gliche verfahre verschlüsselt werde
      keyIndex++;
    } else {
      // falls de Zeichecode ned im Bereich vo 65 - 90 lieht, wird er ned verschlüsselt, sondern gad wieder am encryptedText hinzuegfüeged.
      encryptedText += input.charAt(i);
    }
  }
  // Hier wird noma überprüeft, ob encryptedText existiert bzw i de Console usgäh wird
  // zuletscht wird de encryptedText via DOM is Usgabefeld VigenèreInputEecode übergäh
  document.getElementById("logo").src = "src/cryptyLogoTransparent.png";
  document.body.classList.remove("error");
  document.getElementById("Output").innerHTML = encryptedText;
}

function VigenèreDecode() {
  // I dere Funktion übergebed mir de Igabetext und de Schlüssel via DOM ad Variable und stelled alles uf Grossbuechstabe um.
  let input = document
    .getElementById("VigenèreInputDecode")
    .value.toUpperCase();
  let key = document.getElementById("VigenèreKey").value.toUpperCase();
  // Ezt werdet die Variable für de verschlüsselti Texscht und de Schlüsselindex initalisiert
  let decryptedText = "";
  let keyIndex = 0;
  //errormessages für special chars & numbers
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
      let decryptedChar = String.fromCharCode(
        ((charCode - 65 - keyChar + 26) % 26) + 65
      );
      decryptedText += decryptedChar;
      // und ezt wird im Loop de KeyIndex erhöht, demit de nechschti Buechstabe chan nach em gliche verfahre verschlüsselt werde
      keyIndex++;
    } else {
      // falls de Zeichecode ned im Bereich vo 65 - 90 lieht, wird er ned verschlüsselt, sondern gad wieder am encryptedText hinzuegfüeged.
      decryptedText += input.charAt(i);
    }
  }
  // Hier wird noma überprüeft, ob encryptedText existiert bzw i de Console usgäh wird
  // zuletscht wird de encryptedText via DOM is Usgabefeld VigenèreInputDecode übergäh
  document.getElementById("logo").src = "src/cryptyLogoTransparent.png";
  document.body.classList.remove("error");
  document.getElementById("Output").innerHTML = decryptedText;
}

let Playfair = `
    <p class="info">Playfair Verschlüsselung<br>Benötigt Input für Encode & Schlüssel der ebenfalls ein Wort ist.<br>
    Leerzeichen werden automatisch entfernt. EIn benutztes J wird automatisch zu einem I beim decoden<br>
    X wird zum Schluss noch herausgesucht und entfernt</p>
    <input type="text" name="PlayfairKey" id="PlayfairKey" placeholder="key">
    <div class="caesarEncodeWrapper">
      <textarea type="text" id="PlayfairInputEncode" placeholder="Text to encode"></textarea>
      <button type="button" onclick="PlayfairEncode()">Encode</button>
    </div>
    <br>
    <div class="caesarDecodeWrapper">
      <textarea id="PlayfairInputDecode" placeholder="Text to decode"></textarea>
      <button type="button" onclick="PlayfairDecode()">Decode</button>
    </div>
    <div class="OutputWrapper" onclick="copyOutput()">
    <pre id="Output" class="Output"></pre>
    <img class="copyOutput" src="src/copy.png" alt"copyText-Icon">
    <img class="openExternal" src="src/external.png" alt="Open Output external" onclick="externalOutput()">
  </div>
  `;

  function PlayfairEncode() {
    // Hier wird di Schlussendlichi FUnction Encode ufgruefe, welli de Key as createGrid & de plaintext as createPairs übergit
    // denach wird über jedes Paar gloopt und encrypted ahand vo de Pairs & gridtabelle mit em Key und zum ciphertext hinzugfüeged
    // zum Schluss hani na welle d X, verursacht dur doppelti Buchstabe oder ungeradi Satzlängene z löschen ums besser chöne lese und gibe das ganze im Output wieder us
    let length = document.getElementById("PlayfairInputEncode").value.length;
    let key = document.getElementById("PlayfairKey").value;
    let plaintext = document.getElementById("PlayfairInputEncode").value;
    //errormessages für special chars und numbers in plaintext/key
    let resultKey = isNumber(key);
    if (!plaintext || !key) {
      error("You need a Keyword/phrase and a Text to decode");
      return;
    }
    if (/[^a-zA-Z\s]/g.test(plaintext)) {
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

    let grid = createGrid(key);
    let pairs = createPairs(plaintext);
    let ciphertext = "";
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i];
      let encryptedPair = encryptPair(pair, grid);
      ciphertext += encryptedPair;
    }
    document.getElementById("logo").src = "src/cryptyLogoTransparent.png";
    document.body.classList.remove("error");
    ciphertext += length
    document.getElementById("Output").innerText = ciphertext;
  }
  
  function PlayfairDecode() {
    // Hier wird di Schlussendlichi FUnction Decode ufgruefe, welli de Key as createGrid & de ciphertext(verschlüsselte Text) as createPairs übergit
    // denach wird über jedes Paar gloopt und decrypted ahand vo de gridtabelle mit em Key und zum Plaintext hinzugfüeged
    // zum Schluss hani na welle d X, verursacht dur doppelti Buchstabe oder ungeradi Satzlängene z löschen ums besser chöne lese und gibe das ganze im Output wieder us
    // han bim teschte bemerkt, dass wenn es Wort verschlüsselt wird, wo ungerade isch und mit X endet zu de Endig "EE", "WW" und "XX" wird. daher hani das ebenfalls noma umbaut um de fehler z umgah. 
    let key = document.getElementById("PlayfairKey").value;
    let ciphertext = document.getElementById("PlayfairInputDecode").value;
    
    // hier benutzed mir regex um d zahl hinter dem verschlüsselte Text uszlese und separat z speichere um d zahl im nechschte schritt vom text z trenne
    let regex = /\d+$/g;
    let match = ciphertext.match(regex);
    let numberlength = ""
      if (match) {
        let number = match[0];
        numberlength = number.length;
      } else {
  }
  ciphertext = ciphertext.slice(0, -numberlength);
  ciphertext = ciphertext.replace(/\s/g, "");
  let textLength = ciphertext.slice(-numberlength).length;
// errormessages für special char und numbers in key/ciphertext
    let resultKey = isNumber(key);
    if (!ciphertext || !key) {
      error("You need a Keyword/phrase and a Text to decode");
      return;
    }
    if (/[^a-zA-Z\s]/g.test(ciphertext)) {
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

    let grid = createGrid(key)
    let pairs = createPairs(ciphertext);
    let plaintext = "";
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i];
      let decryptedPair = decryptPair(pair, grid);
      plaintext += decryptedPair;
    }
  
    let finalText = plaintext;
//Hier entferned mir na d character wo chented für fehler sorge wie z.B. WW >VsV
      // i dem for sueched mir use, ob es wort mit em Satz x endet und ned so lang isch wie de text wo verschlüsslet worde isch
      if(finalText.length >= textLength) {
        //hier wird nach spezialfäll glueged wie zb "fixiert", da IXI da im nächschte else die X dete ussortiert werdet.
        if (finalText.match(/IXI/g)) {
          finalText = finalText.slice(0, -1)
        } 
        else if (finalText.match(/(.)(X)\1/g, "1$1" && finalText.length === textLength)) {
          finalText = finalText.replace(/(.)(X)\1/g, "$1$1")
        }
        else if(finalText.charAt(textLength) == "X") {
          finalText = finalText.slice(0, -1)
        }
      }
      document.getElementById("logo").src = "src/cryptyLogoTransparent.png";
      document.body.classList.remove("error");
      document.getElementById("Output").innerText = finalText;
  }

  function createGrid(key) {
    // Hier wird es Gitter(grid 5x5) erstellt, und de Key hinzugfüegt. dabi wird de Key vo obe links her startend is raschter Igfüegt. Achtung isch en Buchstabe bereits einmal itreit, chunt er im Raster keis zweits mal vor. usserdem wird "J" im raster mit "I" ersetzt(daher 5x5 = 25)
    let grid = [];
    let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
    // hier werded d J mit de I tusched und glueged das nur Buechstabe vo A-Z existiered
    key = key.toUpperCase().replace(/J/g, "I");
    key += alphabet;
    key = key.replace(/[^A-Z]/g, "");
    // hier werded d buechstabe is grip glade um d 5X5 tabelle z bilde
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
      // wenn text zu churz isch oder doppelti vorchemed, wird es x aghängt bzw dezwisched igfüegt.
      if (i === text.length - 1 || text.charAt(i) === text.charAt(i + 1)) {
        pair += "X";
        i--;
      } else {
        pair += text.charAt(i + 1);
      } 
      // füegt d pair id pairs i
      pairs.push(pair);
      i += 2;
    }
    return pairs;
  }
  
  function encryptPair(pair, grid) {
    // i dere funktion werdet di bereits ufgeteilte Paare vom Plaintexts is Grid(5x5) aglueged.
    // defür lesed mir euse Key von Obe Links startend  und gend nach rechts im grid(tabelle). isch ein Buchstabe im grid so chunt er det keis zweits mal vor.
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
    // gegeteil vo encryptPair, nimmt ciphertext, wo sch ufsplitted isch i Pairs und arbeited sich logisch betrachtet rückwerts dur d verschlüsselig
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
// hier wird d sicherheit überprüeft. falls d de text e zahl isch wird si da gfunde. und en error displayed
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
    case "caesar":
      contentWrapper.innerHTML = caesar;
      break;
    case "vigenère":
      contentWrapper.innerHTML = vigenère;
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


function externalOutput() {
  const output = document.getElementById("Output");
  let newWin = open("url", "windowName");
  newWin.document.write(output.innerHTML);
}


// TO WORK OUT THE MODULO BUG
// web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
https: Number.prototype.mod = function (n) {
  return ((this % n) + n) % n;
};

function isNumber(variable) {
  return !isNaN(variable);
}
