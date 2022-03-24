import { produce } from 'immer'
import createReducer from '../ReducerUtils'

const initialState = {
    currentUserLocation: {
        latitude: "",
        longitude: ""
    },
    flagLocationBusiness: true,
    businessLocation: {},
    address: "",
    currentUserAddress: "",
    addressCity: ""
}

const locationFunctions = {
    setCurrentUserLocation(state, action) {
        let location = {
            "latitude": action.payload.latitude,
            "longitude": action.payload.longitude
        }
        state.currentUserLocation = location
    },
    setLocationCreateBusiness(state, action) {
        state.businessLocation = action.payload
    },
    setFlagLocationBusiness(state, action) {
        state.flagLocationBusiness = action.payload
    },
    setBusinessAdress(state, action) {
        state.address = action.payload
    },
    setCityAddress(state, action) {
        state.addressCity = action.payload
    },
    setCurrentUserAddress(state, action) {
        state.currentUserAddress = action.payload
    }
}


export default produce((state, action) => createReducer(state, action, locationFunctions), initialState);

