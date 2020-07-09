const isDivisible = require('./isDivisible');

const test = (func, expectedOutput) => {
  const output = func()
  if (output === expectedOutput) {
    console.log("pass")
  } else console.log("fail: " + output)

}

test(isDivisible, "yes");
