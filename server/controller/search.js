
const service = require("../service/search")

let sourceFunctions = { mainCategory: searchByMainCategory, category: searchByCategory, search: searchByText }


///this function router to a suitable function by check searchSource
const getBusinessByText = async (req, res) => {
    const { searchSource } = req.body
    if (!searchSource)
        res.json("enter your source for search!!");
    else
        sourceFunctions[searchSource](req, res)
}

////serach business by mainCategory
async function searchByMainCategory(req, res) {
    try {
        const { sort, openFilter, id } = req.body
        let popularity = req.query.popularity
        const data = await service.searchByMainCategory(sort, openFilter, id, popularity)
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
        console.error("error in search by main category", err.message);
    }
}

/// search business by sub category
async function searchByCategory(req, res) {
    try {
        let popularity = req.query.popularity
        const { sort, openFilter, id } = req.body
        const data = await service.searchByCategory(sort, openFilter, id, popularity)
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
        console.error("error in search by main category", err.message);
    }
}


///search business by free text
async function searchByText(req, res) {
    try {
        const { text, sort, openFilter, numResults } = req.body
        let popularity = req.query.popularity
        const data = await service.searchByText(sort, openFilter, popularity, text)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.error("error in search by free text", error.message);
    }
}

///return names of open filter
const getFiltersNames = async (req, res) => {
    try {
        const data = await service.getFiltersNames()
        res.json(data);
    } catch (error) {
        res.status(404).json(error);
    }
};

////return names of popularity filter
const defaultSortNames = async (req, res) => {
    try {
        const data = await service.defaultSortNames()
        res.json(data);
    } catch (error) {
        res.status(404).json(error);
    }
};

///return names of services filter
const getServicesNames = async (req, res) => {
    try {
        const data = await service.getServicesNames()
        res.json(data);
    } catch (error) {
        res.status(404).json(error);
    }
};




module.exports = {
    getBusinessByText,
    getServicesNames,
    getFiltersNames,
    defaultSortNames
};