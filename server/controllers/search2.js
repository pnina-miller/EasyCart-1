const Business = require("../models/business");
const Categories = require("../models/category");
const MainCategory = require("../models/mainCategory");

let sourceFunctions = { mainCategory: serachByMainCategory, category: searchByCategory, search: searchByText }
const getBusinessByText = async (req, res) => {
    try {
        const { searchSource } = req.body
        if (!searchSource)
            res.json("enter your source for search!!");
        sourceFunctions[searchSource](req, res)
    } catch (error) {

    }

}

////serach by mainCategory
async function serachByMainCategory(req, res) {
    let allBusiness = []
    const { searchSource, text, sort, openFilter, id, numResults } = req.body
    let popularity = req.query.popularity
    if (id) {
        const getALL = await MainCategory.findById({
            _id: id,
        }).populate({
            path: "categories", populate: {
                path: "business",
                match: sort,
                // skip: numResults ? numResults : 0, limit: 1,
                populate: { path: "category" },
            },
        })
        if (getALL != undefined) {
            getALL && getALL.categories && getALL.categories.forEach((element) => {
                element.business && element.business.forEach((item) => {
                    allBusiness.push(item)
                });
            });

            if (req.query.open != undefined) {
                let business = await openByHour(openFilter, allBusiness);
                if (business && business.length > 0)
                    allBusiness = business
            }
            resFunction(res, req, popularity, allBusiness)
        }
        else
            res.status(500).json("this main category not exsist");
    }
    else
        res.status(500).json("this main category not exsist");

}
async function searchByCategory(req, res) {
    let allBusiness = []
    const { searchSource, text, sort, openFilter, id, numResults } = req.body
    let popularity = req.query.popularity
    if (id) {
        let getCategoryName = await Categories.findById({ _id: id }).populate({
            path: "business", match: sort
            // , skip: numResults ? numResults : 0, limit: 1
        });
        if (getCategoryName) {
            getCategoryName.business.forEach((b) => { allBusiness.push(b) });
            if (req.query.open != undefined) {
                let business = await openByHour(openFilter, allBusiness);
                // if (business && business.length > 0)
                allBusiness = business
            }
            resFunction(res, req, popularity, allBusiness)
        }
        else
            res.status(500).json("this category not exsist");

    } else {
        res.status(500).json("this category not exsist");
    }

}
async function searchByText(req, res) {
    const { searchSource, text, sort, openFilter, id, numResults } = req.body
    let popularity = req.query.popularity
    let resultsArray = []
    getAllResults = await Business.find(sort).populate({
        path: "category",
        populate: {
            path: "mainCategories",
            match: sort,
            // skip: numResults ? numResults : 0, limit: 1,
        }
    })
    getAllResults && getAllResults.forEach(item => {
        if (item.businessName.toLowerCase().includes(text.toLowerCase()) || item.category.find(x => x.categoryName.toLowerCase() == text.toLowerCase())) {
            resultsArray.push(item)
        }
        if (item.category) {
            item.category.forEach(e => e.mainCategories.forEach(e => { e.mainCategoryName.toLowerCase() == text.toLowerCase() && resultsArray.push(item) }))
        }
    })
    if (resultsArray.length > 0) {
        resultsArray.forEach(e => ("e- search", e.businessName))
    }
    if (req.query.open != undefined) {
        let business = await openByHour(openFilter, resultsArray);
        if (business && business.length > 0)
            allBusiness = business
        // if (business?.length > 0)

        // if (business?.length > 0)
        allBusiness = business
    }
    resFunction(res, req, popularity, resultsArray)
}
// get day and hour and check if open in this time (work and update)
function openByHour(queryOpen, business) {
    let hourq = queryOpen[0];
    let dayq = queryOpen[1];
    return new Promise((resolve, reject) => {
        try {
            const hour = parseInt(hourq);
            const day = parseInt(dayq);
            const businessList = [];
            business.forEach((obj) => {
                if (obj.opening_hours != undefined) {
                    const start = parseInt(obj.opening_hours[day].start);
                    const end = parseInt(obj.opening_hours[day].end);
                    if (day != 7) {
                        if (start <= hour && end >= hour)
                            businessList.push(obj);
                    }
                    else {
                        if (start == 0 && end == 0)
                            businessList.push(obj);
                    }
                } else
                    console.error("not opening -hours");
            });
            resolve(businessList);
        } catch (error) {
            console.error("error hours");
            reject(error);
        }
    });
}

const resFunction = async (res, req, popularity, allBusiness) => {
    allBusiness && allBusiness.sort(function (x, y) {
        return y[popularity] - x[popularity]
    })
    // , numResults: req.body.numResults
    res.status(200).json({ business: [...new Set(allBusiness)] });
}

const getFiltersNames = async (req, res) => {
    try {
        let filtersNames = [
            { key: "Now", value: "now" },
            { key: "Night", value: "night" },
            { key: "Saturday", value: "saturday" },
            { key: "Hours", value: "hours" },
        ];
        res.json(filtersNames);
    } catch (error) {
        res.status(404).json(error);
    }
};
const defaultSortNames = async (req, res) => {
    try {
        let names = [
            { key: "Rating", value: "rating" },
            { key: "Total Clicks", value: "total clicks" },
        ];
        res.json(names);
    } catch (error) {
        res.status(404).json(error);
    }
};
const getServicesNames = async (req, res) => {
    try {
        let moreFiltersName = [
            { key: "Smoking Allowed", value: "smoking allowed" },
            { key: "Events", value: "events" },
            { key: "Free Parking On Premises", value: "free parking on premises" },
            { key: "Friendly Workspace", value: "Friendly workspace" },
            { key: "Elevator", value: "elevator" }
        ];
        res.json(moreFiltersName);
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