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

  const next = remaining[0]

  const option1 = [[...alreadyAssigned[0], next], [...alreadyAssigned[1]], [...alreadyAssigned[2]]]
  const option2 = [[...alreadyAssigned[0]], [...alreadyAssigned[1], next], [...alreadyAssigned[2]]]
  const option3 = [[...alreadyAssigned[0]], [...alreadyAssigned[1]], [...alreadyAssigned[2], next]]

  const newRemaining = [...remaining].slice(1)
  return r_isDivisible(option1, newRemaining) || r_isDivisible(option2, newRemaining) || r_isDivisible(option3, newRemaining)
}


const isDivisible = (tasks) => {
  if (!tasks) return "yes"
  return r_isDivisible([[], [], []], tasks) ? "yes" : "no"
}

module.exports = {isDivisible, sum, isFair, r_isDivisible};