
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

    const eyes = await imageEyes(url)

Then you'll be able to call the eyedropper:

    eyes.getPixelXY(xCoordinate, yCoordinate)
        // => an array with color and alpha channels
    eyes.getDropColor(xCoordinate, yCoordinate, sampleSize)
        // => an array with average color and alpha channels

## Demo

Start the demo server with

    npm start


### todo later

    // get color model
    // get color profile
    // get meta data
    // intelligent caching
