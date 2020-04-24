
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

    const eyes = imageEyes(url)
    // get color model
    // get pixel value
    // get average value of group of pixels

### todo later

    // get color profile
    // get meta data
    // memory checking

## Tests

You will not find any tests here (yet).
ImageEyes relies on the image-js library.
