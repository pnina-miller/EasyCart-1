const service = require("../service/place")

const SearchForBusinessesNearby = async (req, res) => {
    try {
        const text = req.params.text
        const data = await service.SearchForBusinessesNearby(text, req)
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const searchForBusinessesByLocation = async (req, res) => {
    try {
        const data =await service.searchForBusinessesByLocation( req)
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getPlace = async (req, res) => {
    try {
        const data =await service.getPlace(text, req)
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getDetails = async (req, res) => {
    ("arrive details");
    try {
        const data =await service.getDetails( req)
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}


const getPlaceIdOfBusiness = async (req, res) => {
    try {
        const { name, lat, lng } = req.body
        const data =await service.getPlaceIdOfBusiness(name, lat, lng)
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}


module.exports = {
    SearchForBusinessesNearby,
    getPlace,
    getDetails,
    // getPhotos,
    getPlaceIdOfBusiness,
    searchForBusinessesByLocation
}