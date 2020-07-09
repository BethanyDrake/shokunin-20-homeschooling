const { isDeepStrictEqual } = require("util")
const { setupMaster } = require("cluster")

const sum = list => list.reduce((i, curr) => i+curr, 0)

const isFair = (division) => {
  return division.every((total) => total === division[0])
}

const r_isDivisible = (alreadyAssigned, remaining) => {

  if (remaining.length == 0) {
    return isFair(alreadyAssigned)
  }

  //if the greatest assignment is greater that the smallest assignment plus the remainders, there's no solution
  const sumRemaining =sum(remaining)
  if (alreadyAssigned[0] > alreadyAssigned[2] +  sumRemaining) {
    return false;
  }

  //if they're currently equal, and the remainder doesn't add to a multiple of three, there's no solution
  if (alreadyAssigned[0] == alreadyAssigned[2] && sumRemaining %3!=0) {
    return false;
  }


  const next = remaining[0]

  const option1 = [alreadyAssigned[0]+next, alreadyAssigned[1], alreadyAssigned[2]]
  const option2 = [alreadyAssigned[0], alreadyAssigned[1]+next, alreadyAssigned[2]]
  const option3 =[alreadyAssigned[0], alreadyAssigned[1], alreadyAssigned[2] +next]

  //we can skip equivalent options
  let options = [option1, option2, option3]
  sortDescending(options)
  if (options[2] == options[1]) options = options.slice(0,1)
  if (options[0] == options[1]) options = options.slice(1)

  const newRemaining = [...remaining].slice(1)
  return options.some((option) => r_isDivisible(option, newRemaining))

}

const sortDescending = (list) => {
  list.sort((a,b) => b-a)
}

const isDivisible = (tasks) => {
  if (!tasks) return "yes"
  sortDescending(tasks)
  return r_isDivisible([0,0,0], tasks) ? "yes" : "no"
}

module.exports = {isDivisible, sum, isFair, r_isDivisible};