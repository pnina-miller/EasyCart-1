const Categories = require("../models/category");
const express = require('express');
const request = require('request');
const MainCategory = require("../models/mainCategory");
const { parse } = require("path");
const { response } = require("express");

// const Search = require("./search")

//check
// const SearchForBusinessesNearby = async (req, res) => {
//     const text = req.params.text
//     let textToSearch = ""
//     let searchBy = ""
//     const category = await Categories.findOne({ categoryName: text })
//     const mainCategory = await MainCategory.findOne({ mainCategoryName: text })
//     if (category !== null) {
//         if (category.type !== undefined) {
//             textToSearch = category.type;
//             searchBy = "type"
//         }
//         if (category.keyword !== undefined) {
//             textToSearch = category.keyword
//             searchBy = "keyword"
//         }
//     }
//     if (mainCategory !== null) {
//         if (mainCategory.type !== undefined) {
//             textToSearch = mainCategory.type;
//             searchBy = "type"
//         }
//         if (mainCategory.keyword !== undefined) {
//             textToSearch = mainCategory.keyword
//             searchBy = "keyword"
//         }
//     }
//     if (textToSearch != "") {
//         if (req.body.pagetoken != undefined) {
//             request(
//                 {
//                     url:
//                         `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${req.params.location}&radius=800&language=en&${search}=${textToSearch}&key=${process.env.GOOGLE_API_KEY}&pagetoken=${req.body.pagetoken}${req.body.placeOpen !== undefined && "&" + req.body.placeOpen}`

//                 },
//                 (error, response, body) => {

//                     if (error || response.statusCode !== 200) {
//                         return res.status(500).json(error);
//                     }
//                     return res.json(JSON.parse(body));
//                 }
//             )
//         }
//         else {
//             ("enterrrrrrrrrr");
//             request(
//                 {
//                     url:
//                         `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${req.params.location}&radius=800&language=en&${search}=${textToSearch}&key=${process.env.GOOGLE_API_KEY}${req.body.placeOpen !== undefined && "&" + req.body.placeOpen}`
//                 },
//                 (error, response, body) => {
//                     if (error || response.statusCode !== 200) {
//                         console.error("error", error);
//                         return res.status(500).json(error);
//                     }
//                     else
//                         res.json(JSON.parse(body));
//                 }
//             )
//         }
//     }
//     else {
//         if (textToSearch === "") {
//             textToSearch = req.params.text
//             request(
//                 {
//                     url:
//                         `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${req.params.location}&radius=1500&language=en&keyword=${textToSearch}&key=${process.env.GOOGLE_API_KEY}${req.body.placeOpen !== undefined && "&" + req.body.placeOpen}`
//                 },
//                 (error, response, body) => {
//                     if (error || response.statusCode !== 200)
//                         return res.status(500).json(error);
//                     return res.json(JSON.parse(body));
//                 }
//             )
//         }
//     }
// }

const getPlace = async (req, res) => {
    // language=iw
    request(
        {
            url:
                `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Chicago,%20IL&key=${process.env.GOOGLE_API_KEY}&inputtype=textquery&fields=name&language=en${req.body.placeOpen !== undefined && "&" + req.body.placeOpen}`
        },
        async (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json(null);
            }
            else {
                let photo = await getPhotoByReference(JSON.parse(body), req.params.key)
                const data = JSON.parse(body)
                res.json(data)
            }
        }
    )
}
// send name of business and location and get placeId from google-places(work and update)
const getPlaceIdOfBusiness = async (req, res) => {
    const { name, lat, lng } = req.body
    request(
        {
            url:
                `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name}&inputtype=textquery&locationbias=point:${lat},${lng}&fields=name,formatted_address,place_id&language=en&key=${process.env.GOOGLE_API_KEY}`
        },
        async (error, response, body) => {
            if (error || response.statusCode !== 200) {

                return res.status(500).json(null);
            }
            else {
                const data = JSON.parse(body)
                res.json(data)
            }
        }
    )
}

//return details of specific business(work and update)
const getDetails = async (req, res) => {
    request(
        {
            url:
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.placeId}&key=${process.env.GOOGLE_API_KEY}&language=en`
        },
        async (error, response, body) => {
            if (error || response.statusCode !== 200) {
                console.error("error on getDetails", error)
                return res.status(500).json(null);
            }
            else
                res.json(JSON.parse(body));
        }

    )
}
const getPhotos = async (req, res) => {
    request(
        {
            url:
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=` + req.params.placeId + `&key=${process.env.GOOGLE_API_KEY}&fields=photos&language=en`

        },
        async (error, response, body) => {
            if (error || response.statusCode !== 200) {
                console.error("error on getPhotos", error)
                return res.status(500).json(null);
            }
            else
                res.json(JSON.parse(body));
        }

    )
}

const searchForBusinessesByLocation = async (req, res) => {
    ('on searchForBusinessesByLocation');
    request(
        {
            url:
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${req.params.location}&radius=1500&key=${process.env.GOOGLE_API_KEY}&language=en`
        },
        (error, response, body) => {
            if (error) {
                ("error", error);
                return res.status(500).json(error);
            }
            ("try");
            if (response.statusCode == 200) {
                ("try33333");
                // ("body", JSON.parse(body));
                return res.json(JSON.parse(body));
            }
            if (error || response.statusCode !== 200) {
                return res.status(500).json(error);

            }

        }
    )

}


// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=32.0919479,34.8240778&radius=1500&key=AIzaSyBQc0C4VHw-_Uj_5T-RH77IxlPSOPrcjio

//check
const SearchForBusinessesNearby = async (req, res) => {
    try {
        ('on SearchForBusinessesNearby');
        const text = req.params.text
        let textToSearch = ""
        const foundCategory = await MainCategory.findOne({ mainCategoryName: text }) || await Categories.findOne({ categoryName: text })
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
        if (textToSearch) {
            ("req.body.placeOpen", req.body.placeOpen);
            url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${req.params.location}&radius=800&language=en&${searchBy}=${textToSearch}&key=${process.env.GOOGLE_API_KEY}${req.body.placeOpen != undefined && '&' + req.body.placeOpen}${req.body.pagetoken != undefined && '&pagetoken=' + req.body.pagetoken}`
        }
        else {
            textToSearch = req.params.text
            ("enterrrrrrrrr ttttttttttttttt", textToSearch);
            url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${req.params.location}&radius=800&language=en&keyword=${textToSearch}&key=${process.env.GOOGLE_API_KEY}${req.body.placeOpen != undefined && '&' + req.body.placeOpen}${req.body.pagetoken != undefined && '&pagetoken=' + req.body.pagetoken}`
        }
        request({ url }, (error, response, body) => {
            if (error || response.statusCode !== 200) {
                ('error on SearchForBusinessesNearby', error);
                return res.status(500).json(error);
            }
            return res.json(JSON.parse(body));
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}
module.exports = {
    SearchForBusinessesNearby,
    getPlace,
    getDetails,
    getPhotos,
    getPlaceIdOfBusiness,
    searchForBusinessesByLocation
}
