import { produce } from 'immer'
import createReducer from '../ReducerUtils'

const initialState = {
    nearPlacesBySearch: {},
    BusinessPlacesCheckedDetails: "false",
    addBusinessPlaceId: "",
    placesByLocation:[]
}

const placesFunctions = {
    setPlaceIdAddBusiness(state, action) {
        state.addBusinessPlaceId = action.payload
    },
    setSelectedBusinessPlacesDetails(state, action) {
        state.BusinessPlacesCheckedDetails = action.payload
    },
    setNearPlaces(state, action) {
        if (action.payload !==null ) {
            if (action.payload.length > 0) {
                state.nearPlacesBySearch = action.payload
            }
            else
                state.nearPlacesBySearch = { error: "error" }
        }
        else
            state.nearPlacesBySearch = { error: "error" }
    },
    setPlacesByLoaction(state,action){
        state.placesByLocation=action.payload
    }


}
export default produce((state, action) => createReducer(state, action, placesFunctions), initialState);
