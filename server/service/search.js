const Business = require("../models/business");
const Categories = require("../models/category");
const MainCategory = require("../models/mainCategory");
const Repository = require("../repository/repository");


////serach business by mainCategory
const searchByMainCategory = (sort, openFilter, id, popularity) => {
    return new Promise(async (resolve, reject) => {
        try {
    // skip: numResults ? numResults : 0, limit: 1,
            let allBusiness = []
            if (id) {
                const popArr=[{path:"categories",populate:{path:"business",match: sort,populate:{ path: "category" }}}]
                const getALL = await Repository.findById(MainCategory,id,popArr)
               
                if (getALL != undefined) {
                    getALL && getALL.categories && getALL.categories.forEach((element) => {
                        element.business && element.business.forEach((item) => {
                            allBusiness.push(item)
                        });
                    });
                    if (openFilter&&openFilter.length > 0) {
                        let business = await openByHour(openFilter, allBusiness);
                        allBusiness = business
                    }
                    let result = await resFunction(popularity, allBusiness)
                    resolve(result)
                }
                else
                    throw { message: "this main category not exsist" }
            }
            else
                throw { message: "this main category not exsist" }
        } catch (error) {
            reject(error.message)
        }
    })
}

/// get business by sub category
const searchByCategory = async (sort, openFilter, id, popularity) => {
    return new Promise(async (resolve, reject) => {
        try {
             // , skip: numResults ? numResults : 0, limit: 1
            let allBusiness = []
            if (id) {
                const popArr=[{path: "business", match: sort}]
                let getCategoryName = await Repository.findById(Categories,id,popArr)
                if (getCategoryName) {
                    getCategoryName.business.forEach((b) => { allBusiness.push(b) });
                    if (openFilter.length > 0) {
                        let business = await openByHour(openFilter, allBusiness);
                        allBusiness = business
                    }
                    let result = await resFunction(popularity, allBusiness)
                    resolve(result)
                }
                else
                    throw { message: "this category not exsist" }

            } else
                throw { message: "this category not exsist" }
        } catch (error) {
            reject(error.message)
        }
    })
}

///get business by free text
const searchByText = async (sort, openFilter, popularity, text) => {
    return new Promise(async (resolve, reject) => {
        try {
            // skip: numResults ? numResults : 0, limit: 1,
            let resultsArray = []
            const popArr=[{path: "category",populate:{path: "mainCategories",match: sort}}];
            getAllResults = await Repository.find(Business,sort,popArr)
            getAllResults && getAllResults.forEach(item => {
                if (item.businessName.toLowerCase().includes(text.toLowerCase()) || item.category.find(x => x.categoryName.toLowerCase() == text.toLowerCase())) {
                    resultsArray.push(item)
                }
                if (item.category) {
                    item.category.forEach(e => e.mainCategories.forEach(e => { e.mainCategoryName.toLowerCase() == text.toLowerCase() && resultsArray.push(item) }))
                }
            })
            if (openFilter&& openFilter.length > 0) {
                let business = await openByHour(openFilter, resultsArray);
                allBusiness = business
            }
            let result = await resFunction(popularity, resultsArray)
            resolve(result)
        } catch (error) {
            reject(error.message)
        }
    })
}

// return businesses sort by popularity
const resFunction = (popularity, allBusiness) => {
    allBusiness && allBusiness.sort(function (x, y) {
        return y[popularity] - x[popularity]
    })
    return ({ business: [...new Set(allBusiness)] })
}


// get day and hour and check if open in this time 
function openByHour(queryOpen, business) {
    try {
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
    } catch (error) {
        console.error("error hours");
    }
}

///return names of open filter
const getFiltersNames = () => {
    let filtersNames = [
        { key: "Now", value: "now" },
        { key: "Night", value: "night" },
        { key: "Saturday", value: "saturday" },
        { key: "Hours", value: "hours" },
    ];
    return (filtersNames)
}


////return names of popularity filter
const defaultSortNames = () => {
    let names = [
        { key: "Rating", value: "rating" },
        { key: "Total Clicks", value: "total clicks" },
    ];
    return (names)
}
///return names of services filter
const getServicesNames = () => {
    let moreFiltersName = [
        { key: "Smoking Allowed", value: "smoking allowed" },
        { key: "Events", value: "events" },
        { key: "Free Parking On Premises", value: "free parking on premises" },
        { key: "Friendly Workspace", value: "Friendly workspace" },
        { key: "Elevator", value: "elevator" }
    ];
    return (moreFiltersName)
}

module.exports = {
    getServicesNames,
    getFiltersNames,
    defaultSortNames,
    searchByText,
    searchByMainCategory,
    searchByCategory
};