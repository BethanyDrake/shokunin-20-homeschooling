const isDivisible = (tasks) => {
  if (!tasks) return "yes"
  if (tasks.length % 3 === 0) return "yes"
  return "no"
}

module.exports = isDivisible;