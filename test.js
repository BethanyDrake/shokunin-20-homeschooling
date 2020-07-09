const isDivisible = require('./isDivisible');

const output = isDivisible()
if (output === "yes") {
  console.log("pass")
} else console.log("fail: " + output)