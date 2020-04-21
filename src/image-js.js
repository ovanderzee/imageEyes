import ijs from '../node_modules/image-js/dist/image.js'

let img

const loader = async function(url) {
    img = await ijs.load(url)
    return api
}

const getPixelColor = function(x, y) {
    const res = img.getPixelXY(x, y)
    return res
}

/**
 * Compose a RGB value from the median of the channels
 * @param {Number} x pixel count from left of image
 * @param {Number} y pixel count from top of image
 * @param {Number} d width and height of the sample
 * @returns {Array} rgb median value for each color channel
 *    @member {Number} 0 median of red channel
 *    @member {Number} 1 median of green channel
 *    @member {Number} 2 median of blue channel
 */
const getDropColor = function(x, y, d) {
    let r = Math.floor(d / 2)
    let color

    // setup sort-of multi-dimensional array
    let sample = Array(img.channels)
    for (let n = 0; n < img.channels; n++) {
        sample[n] = []
    }

    // traverse the drop
    for (let i = x - r; i <= x + r; i++) {
        for (let j = y - r; j <= y + r; j++) {
            color = img.getPixelXY(i, j)
            if (typeof color[0] === 'number') {
                for (let n = 0; n < img.channels; n++) {
                    sample[n].push(color[n])
                }
            }
        }
    }

    // find medians
    for (let n = 0; n < img.channels; n++) {
        sample[n].sort((a, b) => a - b)
        color[n] = sample[n][Math.floor(sample[n].length / 2)]
    }
    return color
}

const api = {
    get image() {
        return img
    },
    getPixelColor: getPixelColor,
    getDropColor: getDropColor,
}

export default loader
