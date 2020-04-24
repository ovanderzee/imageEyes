import ijs from '../node_modules/image-js/dist/image'
import { mathAvg } from './utilities'

let img

const loader = async function(url) {
    img = await ijs.load(url)
    return api
}

const getPixelColor = function(x, y) {
    let left = Math.round(x)
    let top = Math.round(y)
    const res = img.getPixelXY(left, top)
    return res
}

/**
 * Compose an array with channel values from the average of the channels
 * @param {Number} x pixel count from left of image
 * @param {Number} y pixel count from top of image
 * @param {Number} d width and height of the sample
 * @returns {Array} rgb median value for each color channel
 *    @members {Number} average value of each channel
 */
const getDropColor = function(x, y, d) {
    let left = Math.round(x)
    let top = Math.round(y)
    let radius = Math.floor(d / 2)
    let color

    // setup sort-of multi-dimensional array
    let sample = Array(img.channels)
    for (let n = 0; n < img.channels; n++) {
        sample[n] = []
    }

    // traverse the drop
    for (let i = left - radius; i <= left + radius; i++) {
        for (let j = top - radius; j <= top + radius; j++) {
            color = img.getPixelXY(i, j)
            if (typeof color[0] === 'number') {
                for (let n = 0; n < img.channels; n++) {
                    sample[n].push(color[n])
                }
            }
        }
    }

    // find averge;
    for (let n = 0; n < img.channels; n++) {
        let average = mathAvg(sample[n])
        color[n] = Math.round(average)
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
