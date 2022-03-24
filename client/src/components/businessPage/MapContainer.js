import React, { useState, useEffect, useRef } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { useSelector } from 'react-redux'

import '../../styles/businessPage/mapContainer.css'

export function MapContainer(props) {
  const { location, google } = props

  const CheckedBusinessDetails = useSelector(state => state.business.CheckedBusinessDetails)
  const businessPlacesCheckedDetails = useSelector(state => state.places.BusinessPlacesCheckedDetails);
  let lat = 32.0920019;
  let lng = 34.8262947;
 
  const [mapCenter, setMapCenter] = useState({
    lat: lat,
    lng: lng,
  })

  const usePrevValues = (value, callback) => {
    const prevValues = useRef(value);

    useEffect(() => {
      callback(prevValues.current);
      return () => (prevValues.current = value);
    }, [value, callback]);
  };

  useEffect(() => {
    let mapCenter = {}
    if (CheckedBusinessDetails !== usePrevValues.CheckedBusinessDetails) {
      if (CheckedBusinessDetails !== undefined && CheckedBusinessDetails.location !== undefined) {
        mapCenter = {
          lat: CheckedBusinessDetails.location.lat,
          lng: CheckedBusinessDetails.location.lng
        }

      }
      if (businessPlacesCheckedDetails !== undefined && businessPlacesCheckedDetails.geometry !== undefined) {

        mapCenter = {
          lat: businessPlacesCheckedDetails.geometry.location.lat,
          lng: businessPlacesCheckedDetails.geometry.location.lng
        }
      }
      if (location !== undefined) {
        mapCenter = {
          lat: location.latitude,
          lng: location.longitude
        }
      }
      setMapCenter(mapCenter)
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div id="googleMap">
      <Map google={google} className='position-relative'
        style={props.style || {
          width: '100%',
          height: '64vh',
          right: "20%",
        }}

        initialCenter={{
          lat: mapCenter.lat,
          lng: mapCenter.lng
        }}
        center={{
          lat: mapCenter.lat,
          lng: mapCenter.lng
        }}>
        <Marker position={{
          lat: mapCenter.lat,
          lng: mapCenter.lng
        }} />
      </Map>
    </div>
  )
}


export default (GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_API_KEY)
},
)(MapContainer))



