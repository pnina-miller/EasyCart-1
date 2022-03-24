import {  Col, Row, Container } from 'react-bootstrap';
import React, { useEffect } from "react";


import "bootstrap/dist/css/bootstrap.min.css";


function Oh(props) {

    const { business } = props;

    useEffect(() => {
        if (business?.opening_hours) {
            console.log(business?.opening_hours);
        }
    }, [business?.opening_hours])

    return (

        <Container fluid className='' >
            {business?.opening_hours && Object.entries(business?.opening_hours).map(([dayKey, days], i) => (
                <Row className="" >
                    <Col className='d-flex justify-content-center' lg={1} md={3} xs={6} >{business.opening_hours[dayKey].length?<b>{dayKey}</b> :""} </Col>
                    <Col>
                        {days[0] &&
                            days?.map((hours, j) => (
                                <>
                                    <Row>{business.opening_hours[dayKey][j]&&business.opening_hours[dayKey][j].start + "  " + business.opening_hours[dayKey][j].end}</Row>
                                </>
                            ))}
                    </Col>
                </Row>
            ))}
        </Container>
    );
}
export default Oh;