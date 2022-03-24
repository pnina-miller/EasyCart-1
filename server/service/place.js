const Repository = require("../repository/repository")
const Categories = require("../models/category");
const MainCategory = require("../models/mainCategory");
const request = require('request');

//// search places from google by type or keyWord and location
const SearchForBusinessesNearby = (text, req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let textToSearch = ""
            const foundCategory = await Repository.findOne(MainCategory, { mainCategoryName: text }) || await Repository.findOne(Categories, { categoryName: text })
            if (foundCategory) {
                if (foundCategory.type) {
                    textToSearch = foundCategory.type;
                    searchBy = "type"
                }
                if (foundCategory.keyword) {
                    textToSearch = foundCategory.keyword
                    searchBy = "keyword"
                }
            }
            let url
            let pagetoken=(req.body.pagetoken !== undefined && '&pagetoken=' + req.body.pagetoken)||'';
            if (textToSearch !== "") {
                url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${req.params.location}&radius=800&language=en&${searchBy}=${textToSearch}&key=${process.env.GOOGLE_API_KEY}${req.body.placeOpen != undefined && '&' + req.body.placeOpen}${pagetoken}`
            }
            else {
                textToSearch = req.params.text
                url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${req.params.location}&radius=800&language=en&keyword=${textToSearch}&key=${process.env.GOOGLE_API_KEY}${req.body.placeOpen != undefined && '&' + req.body.placeOpen}${pagetoken}`
            }
            let data = await PlaceRequest(url)
            resolve(data)
        } catch (error) {
            ('error on SearchForBusinessesNearby service: ', error);
            reject(error.message)
        }
    })
}


//// search places from google by location
const searchForBusinessesByLocation = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${req.params.location}&radius=1500&key=${process.env.GOOGLE_API_KEY}&language=en`
            let data = await PlaceRequest(url)
            resolve(data)
        } catch (error) {
            reject(error.message)
        }
    })
}


///get details for place from google by placeId
const getDetails = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            let url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.placeId}&key=${process.env.GOOGLE_API_KEY}&language=en`
            let data = await PlaceRequest(url)
            resolve(data)
        } catch (error) {
            reject(error.message)
        }

    })
}

///get place id by place's name and location
const getPlaceIdOfBusiness = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, lat, lng } = req.body
            let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name}&inputtype=textquery&locationbias=point:${lat},${lng}&fields=name,formatted_address,place_id&language=en&key=${process.env.GOOGLE_API_KEY}`
            let data = await PlaceRequest(url)
            resolve(data)
        } catch (error) {
            reject(error.message)
        }

    })
}

const PlaceRequest = async (url) => {
    return new Promise(async (resolve, reject) => {
        try {
            request({ url }, (error, response, body) => {
                if (error || response.statusCode !== 200) {
                    throw { message: "error on request", error }
                }
                resolve(JSON.parse(body))
            })
        } catch (error) {
            ("err", error);
            reject(error)
        }
    })
}


module.exports = {
    SearchForBusinessesNearby,
    getDetails,
    getPlaceIdOfBusiness,
    searchForBusinessesByLocation,
}