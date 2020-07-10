const { isDivisible } = require('./isDivisible.js');
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout

});

rl.question(">>Enter tasks: ", answer => {
  const parsedInput = answer.split(" ").map(i => parseInt(i))
  console.log(isDivisible(parsedInput))
  rl.close();
});
