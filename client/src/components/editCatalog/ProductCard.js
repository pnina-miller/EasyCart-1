import React from "react";
import { Card, Container, Row } from "react-bootstrap";

import defaultImg from '../../images/BY1A65881.jpg';
import Icon from "../utilities/Icon";
import "../../styles/productCard.css";
function ProductCard(props) {
  
  const { product, edit, index, remove, update }=props;

  return (
    <>
      <Card className="ProductCard-card">
        <div className={edit || update === true ? 'd-none' : 'plusIconCss'}>
          <Icon name='addToOrder' style={{width:'100px',height:'100px'}} ></Icon></div>
        <div className={edit ? 'deleteCss' : 'd-none'} id={index} onClick={() => remove(index)}>X</div>
        <Card.Img
          className="ProductCard-card-img"
          variant="top"
          src={product.images ? product.images : defaultImg}
        />
        <Card.Body className="ProductCard-card-body">
          <Container className="mt-1 d-flex flex-column justify-content-between">
          <Row>
            <Card.Title className="">
              {product?.name}
            </Card.Title>
          </Row>
          <Row className="ProductCard-detailes d-flex-column justify-content-between">
            {/* <div className="wrapper-description-productCard d-flex flex-column justify-content-between"> */}
              <Card.Text className="p-ProductCard">
                {product?.description}
              </Card.Text>
            {/* </div> */}
            <hr className="solid"></hr>
             {/* <div className="time-wrapper d-flex align-items-center justify-content-between"> */}
              {/* <div className="wrapper-time-delivery d-flex align-items-center justify-content-between w-100"> */}
                {/* <Card.Text className="time-text">
                  <Icon name="clockFill" />
                  {delivery ? delivery : '30 minutes'}
                </Card.Text> */}
                <Card.Text><span className="dolar-char">$</span>{product.price}</Card.Text>
              {/* </div> */}
              {/* </div>  */}
            </Row>
          </Container>
        </Card.Body>
      </Card>

    </>
  );
}
export default ProductCard;
