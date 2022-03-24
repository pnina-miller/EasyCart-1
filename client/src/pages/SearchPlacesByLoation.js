import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import { Row, Container } from "react-bootstrap";

import { actions } from "../redux/Action";
import FirstPlaceCard from "../components/searchResult/FirstPlacesCard"
import '../styles/searchResult/listCategory.css'

function SearchPlacesByLocation() {
    const location = useLocation();
    const dispatch = useDispatch();
    const currentUserLocationR = useSelector((state) => state.location.currentUserLocation);

    useEffect(() => {
        let currentUserLocation = {}
        location.state?.CityProps !== undefined ?
            currentUserLocation = { latitude: location.state.CityProps.lat, longitude: location.state.CityProps.lng }
            : currentUserLocationR?.latitude !== "" ? currentUserLocation = { latitude: currentUserLocationR.latitude, longitude: currentUserLocationR.longitude } : currentUserLocation = { latitude: 32.09197119999999, longitude: 34.824072799999996 }
        dispatch(actions.getPlacesByLocation({ currentUserLocation }));
    }, [dispatch, location, currentUserLocationR])

    // useEffect(() => {
    //     dispatch(actions.getPlacesByLocation({ currentUserLocationR }));
    // }, [currentUserLocationR])
    const placesByLocation = useSelector(state => state.places.placesByLocation);

    return (
        <Container className="margin-location-search">
            <Row>
                {placesByLocation?.map((place, i) =>
                    <FirstPlaceCard key={i} item={place} />
                )}
            </Row>
        </Container>
    )
}
export default SearchPlacesByLocation