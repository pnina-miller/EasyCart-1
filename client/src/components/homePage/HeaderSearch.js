import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import Auto from './AutoSearch'


function HeaderSearch() {
    return (
        <>
            <Container fluid style={{ paddingTop: "120px" }}>
                <Row>
                    <Col className="m-auto">
                        <h1 className="h2 font-title-search text-capitalize text-center">The largest search engine in the world</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mb-5">
                        <h2 className="h4 font-sub-title">Explore top-rated attractions, activities and more!</h2>
                    </Col>
                </Row>
            </Container>
            <Auto />
        </>
    )
}

export default HeaderSearch