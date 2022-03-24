const Business = require("../models/business");
const Categories = require("../models/category");
const MainCategory = require("../models/mainCategory");

// read all business according to a text sent (work and update)
const getBusinessByText = async (req, res) => {
  try {
    let text = req.body.text;
    let allBusiness = [];
    //בדיקה אם המשתמש הכניס טקסט
    if (text != "") {
      //בדיקה האם הטקסט  קיים בקטגוריות הראשיות
      const getMainCategoryName = await MainCategory.findOne({
        mainCategoryName: text,
      });
      if (getMainCategoryName != null) {
        const getALL = await MainCategory.findById(
          getMainCategoryName
        ).populate({
          path: "categories",
          populate: {
            path: "business",
            populate: {
              path: "category"
            },
          },
        });
        getALL.categories.forEach((element) => {
          element.business.forEach((item) => {
            if (!allBusiness.find((x) => x == item)) {
              allBusiness.push(item);
            }
          });
        });

        if (allBusiness.length > 0) {
          if (
            req.query.open != undefined ||
            req.query.popularity != undefined
          ) {
            if (req.query.open != undefined) {
              let business = [];
              let bus = await moreFilters(req.query.open, allBusiness);
              if (bus.length > 0) {
                if (req.query.popularity != undefined) {
                  business = await moreFilters(req.query.popularity, bus);
                  if (business.length > 0) {
                    res.status(200).json({ business: business });
                  }
                } else {
                  res.status(200).json({ business: bus });
                }
              } else {
                res.status(200).json({ business: bus });
              }
            } else {
              if (req.query.popularity != undefined) {
                let bus = await moreFilters(req.query.popularity, allBusiness);
                if (bus.length > 0) {
                  res.status(200).json({ business: bus });
                } else {
                  res.status(200).json({ business: bus });
                }
              }
            }
          } else {
            res.status(200).json({ business: allBusiness });
          }
        } else {
          res.status(200).json(allBusiness);
        }
      } else {
        //בדיקה אם טקסט קיים בקטגוריות
        let getCategoryName = await Categories.find({ categoryName: text });
        if (getCategoryName.length > 0) {
          const getCategoryName = await Categories.find({
            categoryName: text,
          }).populate({ path: "business" });
          getCategoryName.forEach((item) => {
            if (item.business.length > 0) {
              item.business.forEach((b) => {
                allBusiness.push(b);
              });
            }
          });
          if (allBusiness.length > 0) {
            if (
              req.query.open != undefined ||
              req.query.popularity != undefined
            ) {
              if (req.query.open != undefined) {
                let bus = await moreFilters(req.query.open, allBusiness);
                if (bus.length > 0) {
                  res.status(200).json({ business: bus });
                } else {
                  console.error("no business");
                }
              } else {
                if (req.query.popularity != undefined) {
                  let bus = await moreFilters(
                    req.query.popularity,
                    allBusiness
                  );
                  if (bus.length > 0) {
                    res.status(200).json({ business: bus });
                  } else {
                    res.status(200).json({ business: bus });
                  }
                }
              }
            } else {
              res.status(200).json({ business: allBusiness });
            }
          } else {
            res.status(200).json({ business: allBusiness });
          }
        } else {
          let getAllBuisness = await Business.find({
            businessName: text,
          }).populate({
            path: "category",
            populate: {
              path: "mainCategories",
            },
          });
          if (getAllBuisness.length > 0)
            if (req.query.open != undefined) {
              let bus = await moreFilters(req.query.open, getAllBuisness);
              if (bus.length > 0) {
                res.status(200).json({ business: bus });
              } else {
                res.status(200).json({ business: bus });
              }
            } else {
              res.status(200).json({ business: getAllBuisness });
            }
          else {
            res.status(200).json(getAllBuisness);
          }
        }
      }
    } else {
      res.json("enter your text for search!!");
    }
  } catch (error) {
    console.error("error on getBusinessByText", error.message);
    // res.status(400).json({ message: error.message });
  }
};









// const getBusinessByText = async (req, res) => {
//   try {
//     let text = req.body.text;
//     let allBusiness = [];
//     //בדיקה אם המשתמש הכניס טקסט
//     if (text != "") {
//       //בדיקה האם הטקסט  קיים בקטגוריות הראשיות
//       // const getMainCategoryName = await MainCategory.findOne({
//       //   mainCategoryName: text,
//       // });
//       // if (getMainCategoryName != null) {
//       //   const getALL = await MainCategory.findById(
//       //     getMainCategoryName
//       //   ).populate({
//       //     path: "categories",
//       //     populate: {
//       //       path: "business",
//       //       populate: {
//       //         path: "category"
//       //       },
//       //     },
//       //   });
//       //   getALL.categories.forEach((element) => {
//       //     element.business.forEach((item) => {
//       //       if (!allBusiness.find((x) => x == item)) {
//       //         allBusiness.push(item);
//       //       }
//       //     });
//       //   });
//       //   if (allBusiness.length > 0) {
//       //     checkQuery(allBusiness, req)
//       //   }
//         // if (allBusiness.length > 0) {
//         //   if (
//         //     req.query.open != undefined ||
//         //     req.query.popularity != undefined
//         //   ) {
//         //     if (req.query.open != undefined) {
//         //       let business = [];
//         //       let bus = await moreFilters(req.query.open, allBusiness);
//         //       if (bus.length > 0) {
//         //         if (req.query.popularity != undefined) {
//         //           business = await moreFilters(req.query.popularity, bus);
//         //           if (business.length > 0) {
//         //             res.status(200).json({ business: business });
//         //           }
//         //         } else {
//         //           res.status(200).json({ business: bus });
//         //         }
//         //       } else {
//         //         res.status(200).json({ business: bus });
//         //       }
//         //     } else {
//         //       if (req.query.popularity != undefined) {
//         //         let bus = await moreFilters(req.query.popularity, allBusiness);
//         //         if (bus.length > 0) {
//         //           res.status(200).json({ business: bus });
//         //         } else {
//         //           res.status(200).json({ business: bus });
//         //         }
//         //       }
//         //     }
//         //   } else {
//         //     res.status(200).json({ business: allBusiness });
//         //   }
//         // } else {
//         //   res.status(200).json(allBusiness);
//         // }
//       } else {
//         //בדיקה אם טקסט קיים בקטגוריות
//         let getCategoryName = await Categories.find({ categoryName: text });
//         if (getCategoryName.length > 0) {
//           const getCategoryName = await Categories.find({
//             categoryName: text,
//           }).populate({ path: "business" });
//           getCategoryName.forEach((item) => {
//             if (item.business.length > 0) {
//               item.business.forEach((b) => {
//                 allBusiness.push(b);
//               });
//             }
//           });
//           if (allBusiness.length > 0) {
//             checkQuery(allBusiness, req)
//           }
//           //   if (
//           //     req.query.open != undefined ||
//           //     req.query.popularity != undefined
//           //   ) {
//           //     if (req.query.open != undefined) {
//           //       let bus = await moreFilters(req.query.open, allBusiness);
//           //       if (bus.length > 0) {
//           //         res.status(200).json({ business: bus });
//           //       } else {
//           //         ("no business");
//           //       }
//           //     } else {
//           //       if (req.query.popularity != undefined) {
//           //         let bus = await moreFilters(
//           //           req.query.popularity,
//           //           allBusiness
//           //         );
//           //         if (bus.length > 0) {
//           //           res.status(200).json({ business: bus });
//           //         } else {
//           //           res.status(200).json({ business: bus });
//           //         }
//           //       }
//           //     }
//           //   } else {
//           //     res.status(200).json({ business: allBusiness });
//           //   }
//           // } else {
//           //   res.status(200).json({ business: allBusiness });
//           // }
//         } else {
//           let getAllBuisness = await Business.find({
//             businessName: text,
//           }).populate({
//             path: "category",
//             populate: {
//               path: "mainCategories",
//             },
//           });
//           if (getAllBuisness.length > 0)
//             if (req.query.open != undefined) {
//               let bus = await moreFilters(req.query.open, getAllBuisness);
//               if (bus.length > 0) {
//                 res.status(200).json({ business: bus });
//               } else {
//                 res.status(200).json({ business: bus });
//               }
//             } else {
//               res.status(200).json({ business: getAllBuisness });
//             }
//           else {
//             res.status(200).json(getAllBuisness);
//           }
//         }

//       }
//     } else {
//       res.json("enter your text for search!!");
//     }
//   } catch (error) {
//     console.error("msg", error.message);
//     // res.status(400).json({ message: error.message });
//   }
// };




// const getBusinessByText = async (req, res) => {

// const checkQuery = async ( req, res) => {
//   if (
//     req.query.open != undefined ||
//     req.query.popularity != undefined
//   ) {
//     if (req.query.open != undefined) {
//       let bus = await moreFilters(req.query.open, allBusiness);
//       if (bus.length > 0) {
//         res.status(200).json({ business: bus });
//       } else {
//         ("no business");
//       }
//     } else {
//       if (req.query.popularity != undefined) {
//         let bus = await moreFilters(
//           req.query.popularity,
//           allBusiness
//         );
//         if (bus.length > 0) {
//           res.status(200).json({ business: bus });
//         } else {
//           res.status(200).json({ business: bus });
//         }
//       }
//     }
//   } else {
//     res.status(200).json({ business: allBusiness });
//   }
// }








//checking if business open until next hour (work and update)
function openNow(business) {
  return new Promise((resolve, reject) => {
    try {
      const businessList = [];
      let date = new Date();
      let currentDay = date.getDay() + 1;
      let current_hour = date.getHours();
      business.forEach((obj) => {
        if (obj.opening_hours != undefined) {
          const start = parseInt(obj.opening_hours[currentDay].start);
          const end = parseInt(obj.opening_hours[currentDay].end);
          if (start <= current_hour && end >= current_hour + 1) {
            businessList.push(obj);
          }
        } else {
          console.error("not opening -hours");
        }
      });
      resolve(businessList);
    } catch (error) {
      reject(error);
    }
  });
}

//chacking if close on shabat (work and update)
function openShabat(business) {
  return new Promise((resolve, reject) => {
    try {
      const businessList = [];
      business.forEach((obj) => {
        if (obj.opening_hours != undefined) {
          const start = parseInt(obj.opening_hours[7].start);
          const end = parseInt(obj.opening_hours[7].end);
          if (start == 0 && end == 0) {
            businessList.push(obj);
          }
        } else {
          console.error("not opening -hours");
        }
      });
      resolve(businessList);
    } catch (error) {
      reject(error);
      res.status(500).json({ message: error });
    }
  });
}

//checking if business open from 16:00 hour (work and update)
function openNight(business) {
  return new Promise((resolve, reject) => {
    try {
      let date = new Date();
      let currentDay = date.getDay() + 1;
      const businessList = [];
      business.forEach((obj) => {
        if (obj.opening_hours != undefined) {
          const myEnd = parseInt(obj.opening_hours[currentDay].end);
          if (myEnd >= 16) {
            businessList.push(obj);
          }
        } else {
          console.error("not opening houres");
        }
      });
      resolve(businessList);
    } catch (error) {
      reject(error);
      res.status(500).json({ message: error });
    }
  });
}

// get day and hour and check if open in this time (work and update)
function openByHour(hourq, dayq, business) {
  return new Promise((resolve, reject) => {
    try {
      const hour = parseInt(hourq);
      const day = parseInt(dayq);
      const businessList = [];
      business.forEach((obj) => {
        if (obj.opening_hours != undefined) {
          const start = parseInt(obj.opening_hours[day].start);
          const end = parseInt(obj.opening_hours[day].end);
          if (start <= hour && end >= hour) {
            businessList.push(obj);
          }
        } else {
          console.error("not opening -hours");
        }
      });
      resolve(businessList);
    } catch (error) {
      console.error("error hours",error);
      reject(error);
    }
  });
}

//filter by opening hours (work and update)
async function moreFilters(query, allBusiness) {
  let q = query.split(",");
  if (q.length > 1) {
    query = "hours";
  }
  let promise = new Promise((resolve, reject) => {
    try {
      switch (query) {
        case "now":
          bus = openNow(allBusiness);
          break;
        case "saturday":
          bus = openShabat(allBusiness);
          break;
        case "night":
          bus = openNight(allBusiness);
          break;
        case "hours": {
          let hour = q[0];
          let day = q[1];
          bus = openByHour(hour, day, allBusiness);
          break;
        }
        case "highest-rated": {
          bus = getSortedBusinessesByRating(allBusiness);
          break;
        }
        case "most-visited-places": {
          bus = getSortedBusinessByMostVisited(allBusiness);
          break;
        }
        default:
      }
      resolve(bus);
    } catch {
      reject("not found!");
    }
  });
  let result = await promise;
  return result;
}

//Returns the most sought after businesses by sorting (work and update)
async function getSortedBusinessByMostVisited(business) {
  let b;
  try {
    b = await business.sort(function (x, y) {
      return y.totalClicks - x.totalClicks;
    });
  } catch (error) {
    console.error("catch", error);
  }

  return await new Promise((resolve, reject) => {
    try {
      resolve(b);
    } catch (error) {
      reject("error");
    }
  });
}

// get all business names sorted (work and update)
const getFiltersNames = async (req, res) => {
  try {
    let filtersNames = [
      { key: "now", value: "פתוח עכשיו" },
      { key: "night", value: "פתוח בלילה" },
      { key: "saturday", value: "סגור בשבת" },
      { key: "hours", value: "יום ושעה" },
    ];
    res.json(filtersNames);
  } catch (error) {
    res.status(404).json(error);
  }
};

//Returns the names of the business by filtering by the most popular(work and update)
const defaultSortNames = async (req, res) => {
  try {
    let names = [
      { key: "highest rated", value: "ריטינג הגבוה ביותר" },
      { key: "most visited places", value: "המקומות המבוקרים ביותר" },
    ];
    res.json(names);
  } catch (error) {
    res.status(404).json(error);
  }
};
//הדיספאטצ מפעיל את המידלאוור שהיא מפעילה את הפונקציה בשרת
//אח"כ הנתונים נשלחים לרידוסר ונשמרים בסטור וכך שולפים אותם בפונקציה בריאקט
const getServicesNames = async (req, res) => {
  try {
    let moreFiltersName = [
      { key: "smoking allowed", value: "אזור עישון" },
      { key: "events", value: "מתאים לארועים" },
      // { key: "free parking on street", value: "חניה ברחוב בחינם" },
      { key: "free parking on premises", value: "חניה ללא עלות" },
      // { key: "wireless internet", value: "אינטרנט אלחוטי" },
      { key: "friendly workspace", value: "מרחב עבודה ידידותי" },
      { key: "elevator in building", value: "מעלית בבניין" }
    ];
    res.json(moreFiltersName);
  } catch (error) {
    res.status(404).json(error);
  }
};

//Returns the names of the business by filtering by the most rating(work and update)
async function getSortedBusinessesByRating(business) {
  let b;
  try {
    b = await business.sort(function (x, y) {
      return y.totalAddedToFavorites - x.totalAddedToFavorites;
    });
  } catch (error) {
    console.error("error on getSortedBusinessesByRating", error);
  }
  return await new Promise((resolve, reject) => {
    try {
      resolve(b);
    } catch (error) {
      reject("error");
    }
  });
}

async function getBusinessBySmokingAllowed(business) {
  return await new Promise((resolve, reject) => {
    try {
      let b
      b = Business.find({ smokingAllowed: true })
      resolve(b);
    } catch (error) {
      reject("error");
    }
  });
}


async function getBusinessByEvents(business) {
  return await new Promise((resolve, reject) => {
    try {
      let b
      b = Business.find({ events: true })
      resolve(b);
    } catch (error) {
      reject("error");
    }
  });
}
async function getBusinessByFreeParkingOnPremises(business) {
  return await new Promise((resolve, reject) => {
    try {
      let b
      b = Business.find({ freeParkingOnPremises: true })
      resolve(b);
    } catch (error) {
      reject("error");
    }
  });
}
async function getBusinessByFriendlyWorkspace(business) {
  return await new Promise((resolve, reject) => {
    try {
      let b
      b = Business.find({ FriendlyWorkspace: true })
      resolve(b);
    } catch (error) {
      reject("error");
    }
  });
}

module.exports = {
  getBusinessByText,
  moreFilters,
  getFiltersNames,
  getSortedBusinessesByRating,
  getSortedBusinessByMostVisited,
  defaultSortNames,
  getServicesNames,
};