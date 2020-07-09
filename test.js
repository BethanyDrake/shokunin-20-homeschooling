const {isDivisible, sum, isFair, r_isDivisible} = require('./isDivisible');

const test = (func, expectedOutput) => {
  const output = func()
  if (output === expectedOutput) {
    console.log("pass")
  } else console.log("fail: " + output)

}

console.log("\nsum")
test(() => sum([]), 0)
test(() => sum([1, 7, 3]), 11)

console.log("\nisFair")
test(() => isFair([[2], [2], [1, 1]]), true)
test(() => isFair([[2], [3], [1, 1]]), false)

console.log("\nis divisible")
test(isDivisible, "yes");


console.log("\nr_isDivisible base case")
test(() => r_isDivisible([], []), true)
test(() => r_isDivisible([[1], [1], [1]], []), true)
test(() => r_isDivisible([[1], [2], [1]], []), false)
test(() => r_isDivisible([[1, 1], [2], [1, 1]], []), true)

console.log("\nall tasks same size")
test(() => isDivisible([]), "yes")
test(() => isDivisible([1]), "no")
test(() => isDivisible([1, 1]), "no")
test(() => isDivisible([1, 1, 1]), "yes")

console.log("\nall tasks of different size, no solution")
test(() => isDivisible([1, 1, 2]), "no")

console.log("\ntasks of different size, has solution")
test(() => isDivisible([2, 2, 1, 1 ]), "yes")


