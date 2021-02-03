import exifr from '../node_modules/exifr/dist/full.esm.mjs' // umd.cjs errors, esm.js/umd.js global fs needed

const metaTypes = {
    // APP Segments
    jfif: false,
    tiff: false,
    xmp: false,
    icc: false,
    iptc: false,
    // TIFF Blocks
    ifd0: false, // aka image
    ifd1: false, // aka thumbnail
    exif: false,
    gps: false,
    interop: false,
}

const metaProcessing = {
    sanitize: true,
    reviveValues: true,
    translateKeys: true,
    translateValues: true,
}

// XMP ColorMode
// see https://apireference.aspose.com/psd/net/aspose.psd.xmp.schemas.photoshop/colormode
// but what is the possible ICC ColorSpaceData output?
const xmpColorModes = [
    'Bitmap',
    'GRAY', // ICC ColorSpaceData
    'IndexedColor',
    'RGB', // ICC ColorSpaceData
    'CMYK', // ICC ColorSpaceData
    ,
    ,
    'MultiChannel',
    'Duotone',
    'LabColor',
]

const metaData = (function () {
    let state

    /**
     * Return the color model string
     * @returns {String} [ RGB | CMYK etc. ]
     */
    const getColorMode = async function () {
        if (state.loading) return
        const options = {
            icc: { pick: ['ColorSpaceData'] },
            //            xmp: { pick: ['ColorMode'] },
        }

        return await exifr.parse(state.currentUrl, options).then((metaObj) => {
            if (metaObj) {
                //                if (metaObj.ColorMode) return xmpColorModes[metaObj.ColorMode]
                if (metaObj.ColorSpaceData) return metaObj.ColorSpaceData
            }
        })
    }

    /**
     * Return the color profile string
     * @returns {String}
     */
    const getColorProfile = async function () {
        if (state.loading) return
        const queryOptions = {
            icc: { pick: ['ProfileDescription'] },
            xmp: { pick: ['ICCProfileName'] },
        }
        const options = Object.assign({}, metaTypes, queryOptions, {
            multiSegment: false,
        })

        let found = ''
        const find = async function (options) {
            await exifr.parse(state.currentUrl, options).then((metaObj) => {
                if (metaObj) {
                    if (metaObj.ProfileDescription)
                        found = metaObj.ProfileDescription
                    if (metaObj.ICCProfileName) found = metaObj.ICCProfileName
                }
            })
        }

        await find(options)
        if (found) return found

        options.multiSegment = true
        await find(options)
        if (found) return found
    }

    /**
     * Returns exif|icc|ifd0|iptc|xmp, complete or a specified subset
     * @param {Object} properties - {type: true} | {pick: [prop1, prop2, ...]}
     * @returns {Object} meta-data Object
     */
    const getMetaData = async function (query) {
        if (state.loading) return
        const options = Object.assign({}, metaTypes, metaProcessing, query)

        return await exifr.parse(state.currentUrl, options).then((metaObj) => {
            let response = {}
            const props = Array.from(Object.values(query)[0])
            props.length
                ? props.forEach((prop) => (response[prop] = metaObj[prop]))
                : (response = metaObj ? metaObj : {})
            // common knowledge
            if (response.ColorMode) {
                response.ColorMode = xmpColorModes[metaObj.ColorMode]
            }
            return response
        })
    }

    const update = (loadState) => (state = loadState)

    return {
        getMetaData: getMetaData,
        getColorMode: getColorMode,
        getColorProfile: getColorProfile,
        update: update,
    }
})()

export default metaData
