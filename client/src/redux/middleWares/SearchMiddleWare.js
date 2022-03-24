import axios from "axios";
import { actions } from "../Action";
import {
  NAMES_OF_FILTERS,
  NAMES_OF_POPULAR_FILTERS,
  GET_BUSINESSES_BY_POPULARITY,
  GET_RESULTS_OF_SEARCH,
  GET_NAMES_SERVICES,
} from "../constants/search";
import GeolocationService from "./Geolocation";
import Geocode from "react-geocode";

export const getResultofSearchByText = ({ dispatch, getState }) => (next) => (action) => {

  if (action.type === GET_RESULTS_OF_SEARCH) {
    let query = action.payload.query;
    let date = new Date();
    let openFilter = []
    query = query || "";
    if (query.open !== "") {
      switch (query.open) {
        case "now": {
          openFilter.push(date.getHours(), date.getDay() + 1)
          break;
        }
        case "saturday": {
          openFilter.push("0", "7")
          break;
        }
        case "night": {
          openFilter.push("22", date.getDay() + 1)
          break;
        }
        case "hours": {
          let q = query.open.split(",");
          openFilter.push(q[0], q[1])
          break;
        }
        default:
      }
    }
    let sort = {}, services
    if (query.service !== undefined) {
      if (query.service.includes(",")) {
        services = query.service.split(",")
        services.forEach(e => {
          if (e.includes(" ")) {
            let q = e.split(" ");
            let string = q[1].charAt(0).toUpperCase() + q[1].slice(1)
            query.service = q[0].concat(string);
            sort[query.service] = true;
          }
          else sort[e] = true;
        })
      }
      else {
        if (query.service.includes(" ")) {
          let q = query.service.split(" ");
          let string = q[1].charAt(0).toUpperCase() + q[1].slice(1)
          query.service = q[0].concat(string);
        }
        sort[query.service] = true;
      }
    }
    let text = action.payload.text.value ? action.payload.text.value : action.payload.text;
    let searchSource = action.payload.text.db;
    let location = action.payload.currentUserLocation;
    let id = action.payload.text.id
    let numResults = action.payload.numResults
    let address = ""
    axios({
      method: "post",
      url: "/search/getBusinessByText",
      data: { text, searchSource, openFilter, sort, id, numResults },
      // data: { text: text, searchSource: searchSource, openFilter: openFilter, sort: sort ,id:id},
      params: query,
    })
      .then(function (response) {
        let result = response.data;
        let EnCity = "";
        let businessSort = [];
        let premium = [],
          promoted = [],
          free = [];
        if (result.business !== undefined && result.business.length > 0) {
          if (result.business !== undefined) {
            Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
            Geocode.setLanguage("wi");
            Geocode.fromLatLng(location.latitude, location.longitude).then(
              async (response) => {
                address = response.results[0].formatted_address;
                EnCity = address.split(",");
                EnCity = EnCity[EnCity.length - 2];
                result.business.forEach((element) => {
                  if (element.citiesForAdvertising !== null) {
                    if (element.citiesForAdvertising !== undefined) {
                      if (element.citiesForAdvertising.length > 0) {
                        element.citiesForAdvertising.forEach((item) => {
                          if (
                            item.split(",")[0] === EnCity ||
                            EnCity.includes(item.split(",")[0])
                          ) {
                            if (element.paidUp === "premium")
                              premium.push(element);
                            if (element.paidUp === "promoted")
                              promoted.push(element);
                            if (element.paidUp === "free") free.push(element);
                          }
                        });
                      }
                    }
                  }
                });
                let myarr = [];
                if (premium.length > 0) {
                  let sortPremium = [];
                  myarr = await GeolocationService.beginSort(
                    location.latitude,
                    location.longitude,
                    premium
                  );
                  for (let i = 0; i < myarr.length; i++) {
                    sortPremium[i] = premium[myarr[i].index];
                  }
                  sortPremium.forEach((element) => {
                    businessSort.push(element);
                  });
                }
                if (promoted.length > 0) {
                  let sortPromoted = [];
                  myarr = await GeolocationService.beginSort(
                    location.latitude,
                    location.longitude,
                    promoted
                  );
                  for (let i = 0; i < myarr.length; i++) {
                    sortPromoted[i] = promoted[myarr[i].index];
                  }
                  sortPromoted.forEach((element) => {
                    businessSort.push(element);
                  });
                }
                if (free.length > 0) {
                  let sortFree = [];
                  myarr = await GeolocationService.beginSort(
                    location.latitude,
                    location.longitude,
                    free
                  );
                  for (let i = 0; i < myarr.length; i++) {
                    sortFree[i] = free[myarr[i].index];
                  }
                  sortFree.forEach((element) => {
                    businessSort.push(element);
                  });
                }
                let flag;
                let business = [];

                dispatch(actions.setResult({ business: businessSort }));
                result.business.forEach((element) => {
                  flag = true;
                  businessSort.forEach((item) => {
                    if (element === item) flag = false;
                  });
                  if (flag === true) {
                    business.push(element);
                  }
                });

                dispatch(actions.setResultDb(business));
                dispatch(actions.setSortBusinesses(business));
                // dispatch(actions.setSortBusinesses({numResults:result.numResults}));
              }
            );
            if (!address) {
              dispatch(actions.setResultDb(result.business));

              dispatch(actions.setSortBusinesses(result.business));
            }

          }
        } else {
          ////
          let reset = []
          dispatch(actions.setResultDb(reset))

          dispatch(actions.setSortBusinesses(reset))
          dispatch(actions.setResult(result));
        }
      })
      .catch((err) => {
        console.error("msg", err);
      });

  }
  return next(action);
};

export const getFiltersNames = ({ dispatch, getState }) => (next) => (
  action
) => {

  if (action.type === NAMES_OF_FILTERS) {
    axios
      .get("/search/getFiltersNames")
      .then((response) => {
        dispatch(actions.setNamesOfOpenFilters(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return next(action);
};

export const getServicesNames = ({ dispatch, getState }) => (next) => (
  action
) => {

  if (action.type === GET_NAMES_SERVICES) {
    axios
      .get("/search/getServicesNames")
      .then((response) => {
        dispatch(actions.setNamesServices(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return next(action);
};

export const getPopularFilters = ({ dispatch, getState }) => (next) => (
  action
) => {

  if (action.type === NAMES_OF_POPULAR_FILTERS) {
    axios
      .get("/search/defaultSortNames")
      .then((response) => {
        dispatch(actions.setNamesOfPopularFilters(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return next(action);
};
export const sortedBusinessByPopularity = ({ dispatch, getState }) => (
  next
) => (action) => {
  if (action.type === GET_BUSINESSES_BY_POPULARITY) {
    let text = action.payload.text.value;
    let query = action.payload.query;



    ///////////////
    let date = new Date();
    let openFilter = []
    query = query || "";
    if (query.open !== "") {
      switch (query.open) {
        case "now": {
          openFilter.push(date.getHours(), date.getDay() + 1)
          break;
        }
        case "saturday":
          {
            openFilter.push("0", "7")
            break;
          }
        case "night": {
          openFilter.push("22", date.getDay() + 1)
          break;
        }
        case "hours": {
          let q = query.open.split(",");
          openFilter.push(q[0], q[1])
          break;
        }
        default:
      }
    }
    let sort = {}, services
    if (query.service !== undefined) {
      if (query.service.includes(",")) {
        services = query.service.split(",")
        services.forEach(e => {
          if (e.includes(" ")) {
            let q = e.split(" ");
            let string = q[1].charAt(0).toUpperCase() + q[1].slice(1)
            query.service = q[0].concat(string);
            sort[query.service] = true;
          }
          else sort[e] = true;
        })
      }
      else {
        if (query.service.includes(" ")) {
          let q = query.service.split(" ");
          let string = q[1].charAt(0).toUpperCase() + q[1].slice(1)
          query.service = q[0].concat(string);
        }
        sort[query.service] = true;
      }
    }
    if (query.popularity.includes(" ")) {
      let q = query.popularity.split(" ");
      let string = q[1].charAt(0).toUpperCase() + q[1].slice(1)
      query.popularity = q[0].concat(string);
    }
    let searchSource = action.payload.text.db
    let id = action.payload.text.id

    axios({
      method: "post",
      url: "/search/getBusinessByText",
      // data: { text: text, searchSource: searchSource },
      data: { text, searchSource, openFilter, sort, id },
      params: query,
    })
      .then(function (response) {
        let reset = [];
        dispatch(actions.setSortBusinesses(reset));
        dispatch(actions.sortedBusinessByPopularity(response.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return next(action);
};
