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
test(() => isFair([3,3,3]), true)
test(() => isFair([3,3,4]), false)

console.log("\nis divisible")
test(isDivisible, "yes");


console.log("\nr_isDivisible base case")
test(() => r_isDivisible([], []), true)
test(() => r_isDivisible([1,1,1], []), true)
test(() => r_isDivisible([1,2,1], []), false)

console.log("\nr_isDivisible simple case")
test(() => r_isDivisible([[], [], []], [1,1,1]), true)


console.log("\nall tasks same size")
test(() => isDivisible([]), "yes")
test(() => isDivisible([1]), "no")
test(() => isDivisible([1, 1]), "no")
test(() => isDivisible([1, 1, 1]), "yes")

console.log("\nall tasks of different size, no solution")
test(() => isDivisible([1, 1, 2]), "no")

console.log("\ntasks of different size, has solution")
test(() => isDivisible([2, 2, 1, 1 ]), "yes")
test(() => isDivisible([6, 2, 3, 1, 2, 1,  2, 1 ]), "yes")

console.log("\nsample question")
test(() => isDivisible([5,4,1,2,7,8,3]), "yes")

console.log("\n bigger problem, no solution")
test(() => isDivisible([5,4,1,2,7,8,3,1]), "no")
test(() => isDivisible([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]), "no")


console.log("\n many tasks of the same size")
const createArray = (number, size) => {
  const array = []
  for (let i=0; i<size; i++) {
    array.push(number)
  }
  return array
}
test(() => isDivisible(createArray(1, 14)), "no")
test(() => isDivisible(createArray(2, 21)), "yes")
test(() => isDivisible(createArray(4, 20)), "no")
test(() => isDivisible(createArray(3, 20)), "no")