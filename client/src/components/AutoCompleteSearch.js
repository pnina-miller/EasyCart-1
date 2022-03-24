import React, { useState, useEffect } from 'react';
import { GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useDispatch, useSelector } from 'react-redux'
import { Form } from "react-bootstrap";

import '../styles/addBusinessPage.css';
import { actions } from '../redux/Action'


function AutoCompleteSearch(props) {
  const dispatch = useDispatch();
  const { flag, flagAdditionalFilters,flagLocetionAuto,valueSearch } = props
  const resultOfSearch = useSelector(state => state.search.resultOfSearch)
  const nearPlacesBySearch = useSelector(state => state.places.nearPlacesBySearch)
  const editBusiness = useSelector(state => state.business.editBusiness)
  // const flagCities = useSelector(state => state.business.flagCities)
  // const citiesToAdvertise = useSelector(state => state.business.citiesToAdvertise)
  const [address, setAddress] = useState("");
  // const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  // const [activeMarker, setActiveMarker] = useState({});
  // const [selectedPlace, setSelectedPlace] = useState({});
  
  const addressRedux = useSelector(state => state.location.address)
  const currentUserAddress = useSelector(state => state.location.currentUserAddress)
  const [mapCenter, setMapCenter] = useState({
    "lat": "",
    "lng": "",
  })

  useEffect(() => {
  }, [mapCenter])

  const handleChange = (address) => {
    setAddress(address)
  };
  const handleSelect = (address) => {
    localStorage.setItem("changedLocation", "true");
    if (address === "") {
      localStorage.setItem("changedLocation", "false");
    }


    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        let obj1 = latLng.lat.toString();
        let obj2 = latLng.lng.toString();

        setAddress(address)
        setMapCenter({ "lat": obj1, "lng": obj2 })

      })
      .catch((error) => console.error("Error", error));
  };
  useEffect(() => {
    /////////////////שמירת מיקום של user
    if (mapCenter.lat !== "") {
      if (address === "") {
        localStorage.setItem("changedLocation", "false");
      }
      if (flagAdditionalFilters === true || flag === false) {
        dispatch(actions.setLocationCreateBusiness(mapCenter))
        let location = {
          latitude: mapCenter.lat,
          longitude: mapCenter.lng,
        };
        dispatch(actions.setCurrentUserAddress(""))
        dispatch(actions.setCurrentUserLocation(location))
        dispatch(actions.setBusinessAdress(address))
      }
      if (props.flag === true) {
        dispatch(actions.setCityAddress(address))
      }
    }
    //if (props.flagAdditionalFilters === true&&nearPlacesBySearch[0]!==undefined) {
    // let address= nearPlacesBySearch[0].vicinity.split(
    //   ","
    // );
    // dispatch(actions.setBusinessAdress(address[address.length-1]))
    // props.setBusinessAdress(address[address.length-1]);
    //}
    // eslint-disable-next-line
  }, [address, mapCenter, flagLocetionAuto, flagAdditionalFilters, dispatch, props.flag]);
  //  changedLocation() { }
  return (
    <div id="googleMap">
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
        types={['(regions)']}
      >
        {({
          getInputProps,
          suggestions,
          getSuggestionItemProps,
          loading,
        }) => (
          <div>
           <Form.Control
                     className="listing-control" type="email" 
                     onKeyPress={()=>{props.flagLocetionAuto&&props.flagLocetionAuto(false)}}
              {...getInputProps({
                placeholder:
                  nearPlacesBySearch && nearPlacesBySearch[0] ? "        "
                    : resultOfSearch !== undefined &&
                      resultOfSearch.business !== undefined &&
                      resultOfSearch.business[0] !== undefined &&
                      resultOfSearch.business[0].adress !==
                      undefined
                      ? "        " +
                      resultOfSearch.business[0].adress.city
                      :
                      editBusiness !== "" && props.flag === false
                        ? editBusiness.adress.state +
                        "," +
                        editBusiness.adress.city +
                        "," +
                        editBusiness.adress.street
                        :
                        valueSearch===true?currentUserAddress!==""?currentUserAddress:addressRedux!==""?addressRedux:"location":
                        "location",
                className: "location-search-input col focusCancel borderNone",
                onFocus: (e)=>e.currentTarget.placeholder = '',
                onBlur: (e)=>e.currentTarget.placeholder =  nearPlacesBySearch && nearPlacesBySearch[0] ? "        "
                : resultOfSearch !== undefined &&
                  resultOfSearch.business !== undefined &&
                  resultOfSearch.business[0]  &&
                  resultOfSearch.business[0].adress !==
                  undefined
                  ? "        " +
                  resultOfSearch.business[0].adress.city
                  :
                  editBusiness !== "" && props.flag === false
                    ? editBusiness.adress.state +
                    "," +
                    editBusiness.adress.city +
                    "," +
                    editBusiness.adress.street
                    :
                    "מיקום"
              })}
              />
            <div className='autocomplete-dropdown-container'>
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, i) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };

                return (
                  <div key={i}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div >
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  language: "wi",
  libraries: ["places"]
})(AutoCompleteSearch);
