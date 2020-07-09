const { isDeepStrictEqual } = require("util")
const { setupMaster } = require("cluster")

const sum = list => list.reduce((i, curr) => i+curr, 0)

const isFair = (division) => {
  const sums = division.map(list => sum(list))
  const fairTotal = sums[0]

  return sums.every((total) => total === fairTotal)
}

const r_isDivisible = (alreadyAssigned, remaining) => {

  if (remaining.length == 0) {
    return isFair(alreadyAssigned)
  }

  return false
}


const isDivisible = (tasks) => {
  if (!tasks) return "yes"
  if (tasks.length % 3 === 0) return "yes"
  return "no"
}

module.exports = {isDivisible, sum, isFair, r_isDivisible};