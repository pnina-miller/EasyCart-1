import { Card, Container,Button } from "react-bootstrap";
import React from "react";

import "../../styles/productCard.css";

function SecondProductCard(props) {
  const{ product }=props
//check why two products card || meaningful name
    return (
        <>
            <Container fluid>
                <Card className="second-Product mt-1 mb-1 ml-2">
                    <Card.Img
                        className="img-Second-Product"
                        variant="top"
                        src={product.images}
                    />
                    <Card.Body>
                        <p className="font-weight-bold title-wrapper-second_product fontsTitle mb-4">
                            {product?.name}
                        </p>
                        <div className="text-wrapper-second_product d-flex flex-column mb-3 justify-content-between">
                            <p className="fontsAddressCategoiesSecond">
                                <b>description</b>: {product?.description}
                            </p>
                            <div className="wrapper-button-to-hover">
                            <Button className='buttonStyleOrder mt-2'>$
                             {product?.price} dollars</Button>
                             <Button className='buttonStyleOrder2 mt-2'>
                                 Add to order</Button></div>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
export default SecondProductCard;
