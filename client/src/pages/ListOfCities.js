import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Container, Col } from "react-bootstrap";
import csc from 'country-state-city'

import "bootstrap/dist/css/bootstrap.min.css";


function ListOfCities() {
    const countries = csc.getAllCountries();
    const [cities, setCities] = useState([]);

    function getCitiesByCityCountry(isoCountry) {
        let arrCities = csc.getCitiesOfCountry(isoCountry)
        setCities(c => arrCities)
    }

    return (
        <Container className="mt-5">
            <Row>
                {cities?.length === 0 ? countries?.map((country, i) =>
                    <Col xs={3}>
                        <p key={i} onClick={() => getCitiesByCityCountry(country.isoCode)}>{country.name} </p>
                    </Col>
                ) :
                    cities.map((city, index) =>
                        <Col xs={3}>
                            <Link to={{ pathname: "/search", state: { CityProps: { lat: city.latitude, lng: city.longitude } } }}  >
                                <p key={index}>{city.name} </p>
                            </Link>
                        </Col>
                    )
                }
            </Row>
        </Container>
    )
}
export default ListOfCities