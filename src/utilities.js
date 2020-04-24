/*
 * calculate sum of array with Numbers
 * @param {Array} seq - array containing numbers
 * @returns {Number} the sum of the numbers
 */
const mathSum = seq => seq.reduce((a, b) => a + b, 0)

/*
 * calculate average of array with Numbers
 * @param {Array} seq - array containing numbers
 * @returns {Number} average sum of the numbers
 */
const mathAvg = seq => mathSum(seq) / seq.length || 0

export { mathSum, mathAvg }
