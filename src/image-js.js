import ijs from '../node_modules/image-js/dist/image'
import { mathAvg } from './utilities'

const cache = new Object()
let cacheOrder = new Array()
const MAX_CACHE_SIZE = 32
let currentUrl
let currentImage
let loading

const getPixelColor = function(x, y) {
    if (loading) return
    let left = Math.round(x)
    let top = Math.round(y)
    const res = currentImage.getPixelXY(left, top)
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
    if (loading) return
    let left = Math.round(x)
    let top = Math.round(y)
    let radius = Math.floor(d / 2)
    let color

    // setup sort-of multi-dimensional array
    let sample = Array(currentImage.channels)
    for (let n = 0; n < currentImage.channels; n++) {
        sample[n] = []
    }

    // traverse the drop
    for (let i = left - radius; i <= left + radius; i++) {
        for (let j = top - radius; j <= top + radius; j++) {
            color = currentImage.getPixelXY(i, j)
            if (typeof color[0] === 'number') {
                for (let n = 0; n < currentImage.channels; n++) {
                    sample[n].push(color[n])
                }
            }
        }
    }

    // find averge;
    for (let n = 0; n < currentImage.channels; n++) {
        let average = mathAvg(sample[n])
        color[n] = Math.round(average)
    }
    return color
}

/*
 * Report the number of channel values in the buffer
 * @returns {Number} usage - number of buffered channel values
 */
const memoryUsage = function() {
    let usage = 0
    for (let [url, image] of Object.entries(cache)) {
        usage += image.size * image.channels
    }
    return usage
}

/*
 * Remove all but the current image from the cache
 */
const purgeCache = function() {
    cacheOrder.forEach(url => {
        if (url !== currentUrl) delete cache[url]
    })
    cacheOrder = [url]
}

/*
 * Keep cache history - put new currentUrl at the end
 * @private
 * @param {URL} url - new currentUrl
 */
const maintainCacheOrder = function(url) {
    const urlIndex = cacheOrder.indexOf(url)
    cacheOrder.splice(urlIndex, 1)
    cacheOrder.push(url)
}

/*
 * Keep size of cache within limits - remove most discarded entry
 * @private
 */
const maintainCache = function(url) {
    const removeUrl = cacheOrder.splice(0, 1)[0]
    delete cache[removeUrl]
    cacheOrder.push(url)
}

const api = {
    get image() {
        if (loading) return
        return currentImage
    },
    getPixelColor: getPixelColor,
    getDropColor: getDropColor,
    memoryUsage: memoryUsage,
    purgeCache: purgeCache,
}

const loader = async function(url) {
    if (loading || url === currentUrl) return api
    loading = true
    if (cache[url]) {
        maintainCacheOrder()
        currentImage = cache[url]
    } else {
        if (cacheOrder.length >= MAX_CACHE_SIZE) {
            maintainCache()
        }
        currentImage = await ijs.load(url)
        cache[url] = currentImage
    }
    loading = false
    currentUrl = url
    return api
}

export default loader
