const {isDivisible} = require('./isDivisible.js');
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout

});

rl.question(">>Enter tasks: ", answer => {
  console.log(isDivisible(answer.split(" ").map(i => parseInt(i))))
  rl.close();
});


