import axios from "axios";
import { actions } from '../Action'
import { GET_PLACE_ID_OF_BUSINESS, GET_PLACES_BY_SEARCH, GET_DETAILS_BY_PLACE_ID,GET_PHOTOS_BY_PLACE_ID,GET_PLACES_BY_LOCATION } from '../constants/places'

export const getPlaceIdOfBusiness = ({ dispatch, getState }) => next => action => {
    
    if (action.type === GET_PLACE_ID_OF_BUSINESS) {
        let name = action.payload.businessName;
        let lat = action.payload.lat;
        let lng = action.payload.lng;
        axios({
            method: 'post',
            url: '/places/getPlaceIdOfBusiness',
            data: {
                name: name,
                lat: lat,
                lng: lng,
            }
        }).then(function (response) {
            dispatch(actions.setPlaceIdAddBusiness(response.data))
        }).catch(err => {
            console.error(err)
        });
    }
    return next(action);
}
export const getAllNearByPlacesBySearchText = ({ dispatch, getState }) => next => action => {
    
    if (action.type === GET_PLACES_BY_SEARCH) {
        let text = action.payload.text
        let location = action.payload.currentUserLocation
        let nextToken = action.payload.nextToken
        let placeOpen=action.payload.placeOpen||""
        axios({
            method: 'post',
            url: `/places/SearchForBusinessesNearby/location=${location.latitude},${location.longitude}/${text}`,
            data: {
                pagetoken:nextToken,
                placeOpen:placeOpen
            }

        }).then(response => {
            if (response.data !== null) {
                dispatch(actions.setResultPlaces(response.data))
                dispatch(actions.setSortBusinesses(response.data.results))
                dispatch(actions.setNextTokenPage(response.data.next_page_token))
                dispatch(actions.setNearPlaces(response.data.results))
            }
            else {
                dispatch(actions.setNearPlaces(response.data))
            }
        }).catch(error => {
            console.error(error);
        })
    }
    return next(action);
}


///check where use with it
export const getPlaceDetailsById = ({ dispatch, getState }) => next => action => {
    
    if (action.type === GET_DETAILS_BY_PLACE_ID) {
        let placeId = action.payload;
        axios.get(`/places/getDetails/${placeId}`).then(response => {
            dispatch(actions.setSelectedBusinessPlacesDetails(response.data.result))
        }).catch(error => {
            console.error(error);
        });
    }
    return next(action);
}
export const getPlacePhotosById = ({ dispatch, getState }) => next => action => {
    if (action.type === GET_PHOTOS_BY_PLACE_ID) {
        let placeId = action.payload;
        axios.get(`/places/getPhotos/${placeId}`).then(response => {
            dispatch(actions.setSelectedBusinessPlacesDetails(response.data.result))
        }).catch(error => {
            console.error(error);
        });
    }
    return next(action);
}



export const getAllPlacesByLocation = ({ dispatch, getState }) => next => action => {
    
    if (action.type === GET_PLACES_BY_LOCATION) {
        let location = action.payload.currentUserLocation
        axios({
            method: 'post',
            url: `/places/searchForBusinessesByLocation/location=${location.latitude},${location.longitude}`,
        }).then(response => {
            if (response.data !== null) {
                dispatch(actions.setPlacesByLoaction(response.data.results))
            }
           
        }).catch(error => {
            console.error(error);
        })
    }
    return next(action);
}