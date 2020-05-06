// start server for localhost at port 8 with npm start
let eyeDropApi
let eyeDropDiameter = 11

const firstImage = document.querySelector('figure img')
const allImages = document.querySelectorAll('figure img')

const xyCoordinateNode = document.getElementById('xy-coordinate')
const rgbSampleNode = document.getElementById('rgb-sample')
const rgbValueNode = document.getElementById('rgb-value')
const modelNode = document.getElementById('color-model')
const profileNode = document.getElementById('color-profile')

const mouseMoveHandler = function (event) {
    let domRect = this.getBoundingClientRect()
    let imgX = Math.round(event.x - domRect.x)
    let imgY = Math.round(event.y - domRect.y)
    xyCoordinateNode.textContent = `${imgX}, ${imgY}`
    // let color = eyeDropApi.getDropColor(imgX, imgY, eyeDropDiameter)
    let color = eyeDropApi.getPixelColor(imgX, imgY)
    rgbSampleNode.style.background = `rgba(${color.join()})`
    rgbValueNode.textContent = JSON.stringify( color )
}

const eyeDropLoader = async function () {
    xyCoordinateNode.textContent = ''
    rgbSampleNode.textContent = ''
    rgbValueNode.textContent = ''
    let t0 = new Date()
    eyeDropApi = await imageEyes(this.src)
    this.addEventListener('mousemove', mouseMoveHandler)
    let t1 = new Date()
    console.log(`loading ${this.src} took ${(t1 - t0) / 1000} seconds`)
    modelNode.textContent = eyeDropApi.getColorModel()
}

allImages.forEach((img) => {
    if (img === firstImage) {
        eyeDropLoader.call(firstImage)
    }
    img.addEventListener('mouseover', eyeDropLoader.bind(img))
})
