const request = require('request') //get from npm request service

const geocode = (address, callback) => {
    // callback is function that we call when we have coordinate

    // mapbox url for getting coordinate of address
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        address +
        '.json?access_token=pk.eyJ1IjoiYW1pci1hbGl6YWRlaDcxIiwiYSI6ImNqeGFjdWt4ZzAyOWkzcW1xOG9jb2t2NDIifQ.KFu5Ld3x3PpmrpLVpDQK-A'

    // url: url -> url => shorthand property
    //response -> { body } => object destructuring
    request({ url, json: true }, (error, { body }) => { // http request
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode