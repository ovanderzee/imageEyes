
# ImageEyes

ImageEyes offers the genuine colordata of images at your webpage,
to serve scientific purposes.
Unlike traditional eyedroppers,
it buffers the image and reads color value from there
without color correction.

## Install

Install the package as npm package. Provided are
a umd-formatted file in the dist folder to require or just read
and an es-module in the module folder to import.

## Usage

Get the API thru an async function:

```js
const eyes = await imageEyes(url)
```

Then you'll be able to have your eyes at pixelvalues and metadata:

    eyes.getPixelColor(xCoordinate, yCoordinate)
        // => an array with color and alpha channels
    eyes.getDropColor(xCoordinate, yCoordinate, sampleSize)
        // => an array with average color and alpha channels
    eyes.getColorModel()
        // => a string
    eyes.getColorProfile()
        // => a string
    eyes.getMetaData({exif|gps|icc|ifd0|iptc|xmp: true})
        // => an object

## Demo

Start the demo server with

```sh
npm start
```

### todo later

    // intelligent caching
