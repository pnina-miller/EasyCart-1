import React from 'react'
import ShoppingCart from '../components/shoppingCart/ShoppingCart'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "react-bootstrap";

const ShoppingCartPage = () => {
    return (
        <>
            <div className="d-flex justify-content-center w-100" style={{ marginTop: "100px" }}>
                <Container fluid >
                    <Row>
                        <Col xs={12} className="hw-100 text-center">
                            <div className="h3">my shopping cart</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <ShoppingCart scrollCart={false} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default ShoppingCartPage
