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

/**
 * Round at decimals
 * @private
 * @param {number} number - any number to round
 * @param {number} decimals - number of decimals to round at
 * @returns {number} the rounded number
 */
const mathRoundAt = function(number, decimals) {
    if (number < 1 + 'e-' + decimals && number > -1 + 'e-' + decimals) {
        return 0
    }
    // https://www.jacklmoore.com/notes/rounding-in-javascript/
    return Number(Math.round(number + 'e' + decimals) + 'e-' + decimals)
}

export { mathSum, mathAvg, mathRoundAt }
