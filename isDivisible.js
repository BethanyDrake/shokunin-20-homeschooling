const sum = list => {
  const result = list.reduce((i, curr) => i + curr, 0)
  return result
}

const NO_SOLUTION = { isDivisible: false }

const isFair = (totals) => totals.every((total) => total === totals[0])

const formatSolution = (solution) => {
  if (!solution || solution.length !== 3) return "(no solution) " + solution
  return "SOLUTION: " + " A: " + solution[0] + " B: " + solution[1] + " C: " + solution[2]
}

const sortDescending = (list) => list.sort((a, b) => b - a)

const getKey = (currentTotals, remaining) => "" + currentTotals + remaining

const hasAlreadyBeenExplored = (remaining, currentTotals, alreadySearched) => {
  return (alreadySearched[getKey(currentTotals, remaining)])
}

const markAsExplored = (remaining, currentTotals, alreadySearched) => {
  alreadySearched[getKey(currentTotals, remaining)] = true
}

const positiveResult = (solution) => {
  return {
    isDivisible: true,
    solution,
  }
}

const handleBaseCase = (currentTotals, currentDivisions) => {
  if (isFair(currentTotals)) {
    return positiveResult(currentDivisions)
  } else {
    return NO_SOLUTION
  }
}

const hasNoTasksLeftToAssign = (remainingTasks) => {
  return remainingTasks.length == 0
}

const getOptions = (currentDivisions, next) => {
  const option1 = [[...currentDivisions[0], next], [...currentDivisions[1]], [...currentDivisions[2]]]
  const option2 = [[...currentDivisions[0]], [...currentDivisions[1], next], [...currentDivisions[2]]]
  const option3 = [[...currentDivisions[0]], [...currentDivisions[1]], [...currentDivisions[2], next]]

  return [option1, option2, option3]
}

const exploreAllOptions = (remaining, currentDivisions, alreadySearched) => {
  const next = remaining[0]
  const options = getOptions(currentDivisions, next)
  const newRemaining = [...remaining].slice(1)

  while (options.length > 0) {
    const option = options.pop()
    const result = r_isDivisible(newRemaining, option, alreadySearched)
    if (result.isDivisible) {
      return result
    }
  }

  return null
}

const earlyExit = (remaining, currentTotals) => {
  //early exit: if the greatest assignment is greater that the smallest assignment plus the remainders, there's no solution
  const sumRemaining = sum(remaining)
  if (currentTotals[0] > currentTotals[2] + sumRemaining) {
    return NO_SOLUTION
  }

  //early exit: if they're currently equal, and the remainder doesn't add to a multiple of three, there's no solution
  if (currentTotals[0] == currentTotals[2] && sumRemaining % 3 != 0) {
    return NO_SOLUTION
  }

  return null
}

const r_isDivisible = (remaining, currentDivisions = [[], [], []], alreadySearched = {}) => {
  const currentTotals = currentDivisions.map(division => sum(division))
  sortDescending(currentTotals)

  if (hasAlreadyBeenExplored(remaining, currentTotals, alreadySearched)) {
    return NO_SOLUTION;
  }

  markAsExplored(remaining, currentTotals, alreadySearched)

  if (hasNoTasksLeftToAssign(remaining)) {
    return handleBaseCase(currentTotals, currentDivisions)
  }

  return earlyExit(remaining, currentTotals)
    || exploreAllOptions(remaining, currentDivisions, alreadySearched)
    || NO_SOLUTION
}


const isDivisible = (tasks) => {
  if (!tasks) return "yes"
  sortDescending(tasks)
  const result = r_isDivisible(tasks)
  if (result.isDivisible) {
    return "yes " + formatSolution(result.solution)
  }
  return "no"
}

module.exports = { isDivisible, sum, isFair, r_isDivisible, formatSolution };