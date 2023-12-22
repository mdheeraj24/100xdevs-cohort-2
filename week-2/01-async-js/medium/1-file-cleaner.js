const fs = require('fs');

let fileContent = fs.readFileSync('test.txt').toString();
let lines = [];
fileContent.split("\n").forEach(line => {
  let words = line.split(" ");
  lines.push(words.filter(word => word.length > 0).join(" "));
  console.log(lines);
});
fs.writeFileSync('test.txt', lines.join("\n"));
