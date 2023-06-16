function encode() {
  let text = document.getElementById("inputEncode").value;
  let key = parseInt(document.getElementById("key").value);
  let res = "";
  let enChar = ""
  for (let i = 0; i < text.length; i++) {
    let char = text.charCodeAt(i);
    enChar = char + key
    console.log(text.charAt(i) + enChar);
    if ( enChar > 127){
        enChar = enChar - 127
    }
    res = res.concat(String.fromCharCode(enChar));
  }
  document.getElementById("output").innerHTML = res;
}

function decode() {
  let text = document.getElementById("inputDecode").value;
  let key = parseInt(document.getElementById("key").value);
  let res = ""
  let deChar = ""
  for (let i = 0; i < text.length; i++) {
    let char = text.charCodeAt(i);
    deChar = char - key
    if (deChar < 0) {
      deChar = deChar + 127;
    }
    res = res.concat(String.fromCharCode(deChar));
  }
  document.getElementById("output").innerHTML = res;
}