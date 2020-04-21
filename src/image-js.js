import ijs from '../node_modules/image-js/dist/image.js'

let img

const load = function(url) {
    ijs.load(url)
        .then(function(res) {
            console.log('loaded', url)
            img = res
        })
        .catch(err => console.error(`Error reading image ${url}`, err))
}

const getRGB = function(x, y) {
    var res = img.getPixelXY(x, y)
    console.log('rgb value', res)
    return res
}

const api = {
    load: load,
    getRGB: getRGB,
}

export default api
