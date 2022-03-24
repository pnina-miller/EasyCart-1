import { produce } from 'immer'
import createReducer from '../ReducerUtils'

const initialState = {
    openPlaces: [],
    filtersNames: [],
    defaultSortNames: [],
    sortBusinesses: [],
    sortAllBusinesses: [],
    resultPlaces: [],
    resultDb: [],
    nextTokenPage: [],
    resultOfSearch: [],
    namesServices: []
}

const searchFunctions = {
    setOpenPlaces(state, action) {
        state.openPlaces = action.payload
    },
    setNamesServices(state, action) {
        state.namesServices = action.payload
    },
    setResultDb(state, action) {
        // if (action.payload.reset?.length === 0) {
        //     state.resultDb = []
        // }
        // else {
        //     state.resultDb = state.resultDb.concat(action.payload)
        // }
        state.resultDb = action.payload
    },
    setSortBusinesses(state, action) {
        
        if (action.payload.reset?.length === 0) {
            state.sortBusinesses = []
        }

        else {
            let business = []
            let flag = false
            let allBusinesses = []
            if (state.resultPlaces.length > 0) {
                state.resultPlaces.forEach(element => {
                    allBusinesses.push(element)
                });
            }
            if (state.resultDb.length > 0) {
                state.resultDb.forEach(element => {
                    allBusinesses.push(element)
                });
            }
            if (state.resultDb.length > 0 && state.resultPlaces.length > 0) {
                allBusinesses.forEach((element, i) => {
                    allBusinesses.forEach((item, index) => {
                        if (element.placeId !== undefined && element.placeId === item.place_id && i !== index) {
                            flag = true
                            business = allBusinesses.filter(e => e !== item)
                        }
                    })
                })
            }
            if (!flag && allBusinesses) {
                business = allBusinesses
            }
            if (business.length > 0) {
                state.sortBusinesses = business
            }
        }
    },
    setNamesOfOpenFilters(state, action) {
        state.filtersNames = action.payload
    },
    setNamesOfPopularFilters(state, action) {
        state.defaultSortNames = action.payload
    },
    sortedBusinessByPopularity(state, action) {
        state.resultOfSearch = action.payload
        ////
        state.sortBusinesses = state.resultPlaces

    },
    setResultPlaces(state, action) {
        if (action.payload.length === 0) {
            state.resultPlaces = action.payload
        }
        if (state.openPlaces.length > 0) {
            state.resultPlaces = state.openPlaces
        }
        else {
            let business = []
            if (state.resultPlaces.length > 0 && !state.nextTokenPage.find(t => t === action.payload.next_page_token)) {
                business = state.resultPlaces
                if (action.payload.results !== undefined) {
                    action.payload.results.forEach(e => {
                        business.push(e)
                    })
                }
            }
            else {
                if (action.payload.results !== undefined) {
                    business = action.payload.results
                }
                else {
                    business = action.payload
                }
            }
            state.resultPlaces = business
        }
    },
    setNextTokenPage(state, action) {

        let tokens = []
        if (action.payload !== undefined && action.payload.length === 0) {
            state.nextTokenPage = action.payload
        }
        else {
            if (action.payload !== undefined) { }
            if (state.nextTokenPage.length > 0) {
                tokens = state.nextTokenPage
                tokens.push(action.payload)
            }
            else {
                tokens.push(action.payload)
            }
            state.nextTokenPage = tokens
        }
    },
    setSortAllBusinesses(state, action) {
        state.sortAllBusinesses = action.payload
    },
    setResult(state, action) {
        if (action.payload.business !== undefined) {
            if (action.payload.business.length > 0) {
                state.resultOfSearch = action.payload;
            }
            else {

                ////
                // state.sortBusinesses = state.resultPlaces
                state.resultOfSearch = { error: "error" };
            }
        } else {
            ////
            state.sortBusinesses = state.resultPlaces
            state.resultOfSearch = { error: "error" };
        }
    }

}
export default produce((state, action) => createReducer(state, action, searchFunctions), initialState);
