const sum = list => {
  //console.log("summing " + list.length + " numbers")
  const result =list.reduce((i, curr) => i+curr, 0)
 // console.log("result: "+ result)
  return result
}

const isFair = (totals) => {
  //console.log("checking if fair: "+ totals)
  return totals.every((total) => total === totals[0])
}

const formatSolution = (solution) => {
  //console.log("formating solution: " + solution)
  if (!solution || solution.length !== 3) return "(no solution) " +solution
  return "SOLUTION: " + " A: "+ solution[0] + " B: "+solution[1] + " C: "+solution[2]
}

const removeNumberFromList = (number, list) => {
  const index = list.findIndex((element) => element === number)
  return list.splice(index, 1)
}

const sortDescending = (list) => {
  list.sort((a,b) => b-a)
}

const r_isDivisible = (remaining, currentDivisions = [[],[],[]], alreadySearched={}) => {
  //console.log("checking if divisible: " + "remaining: "  + remaining + " currentDivisions: "+ formatSolution(currentDivisions))
  const currentTotals = currentDivisions.map(division => sum(division))
  sortDescending(currentTotals)

 // console.log("checking if divisible: " + "currentTotals: " + currentTotals)
  const key = ""+ currentTotals + remaining;

  //skip situations we've already explored, or mark this situation as explored.
  if (alreadySearched[key]) {
    // console.log("stopping, already searched: "+ key)
    return {
    isDivisible:false,
  };
}
  alreadySearched[key] = true

  if (remaining.length == 0) {
    if (isFair(currentTotals)) {
     // console.log("done, solution found: " + formatSolution(currentDivisions))
      return {
        isDivisible:true,
        solution: currentDivisions,
      }
    }
  }

  //console.log("A")
  //if the greatest assignment is greater that the smallest assignment plus the remainders, there's no solution
  const sumRemaining =sum(remaining)
  if (currentTotals[0] > currentTotals[2] +  sumRemaining) {
   // console.log("stopping, not enough points left to make up the difference.")
    return {
      isDivisible: false
    }
  }

  //if they're currently equal, and the remainder doesn't add to a multiple of three, there's no solution
  if (currentTotals[0] == currentTotals[2] && sumRemaining %3!=0) {
  //  console.log("stopping, ncurrently equal but remainder can't be divided equally.")
    return {
      isDivisible: false
    }
  }

  //console.log("B")
  const next = remaining[0]

  const option1 = [[...currentDivisions[0], next], [...currentDivisions[1]], [...currentDivisions[2]]]
  const option2 = [[...currentDivisions[0]], [...currentDivisions[1], next], [...currentDivisions[2]]]
  const option3 =[[...currentDivisions[0]], [...currentDivisions[1]], [...currentDivisions[2], next]]

  let options = [option1, option2, option3]
  //sortDescending(options)

  const newRemaining = [...remaining].slice(1)
  while (options.length>0) {
    const option = options.pop()
    const result = r_isDivisible(newRemaining, option, alreadySearched)
    if (result.isDivisible) {
      return result
    }
  }

  //console.log("stopping, no options work")
  return {
    isDivisible: false
  }

}



const isDivisible = (tasks) => {
  if (!tasks) return "yes"
  sortDescending(tasks)
  return r_isDivisible(tasks).isDivisible ? "yes" : "no"
}

module.exports = {isDivisible, sum, isFair, r_isDivisible, formatSolution};