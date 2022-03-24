import React from "react";
import image from "../images/image2.png";
import { Card } from "react-bootstrap";
import Icon from "/utilities/Icon";

import "../styles/productSearchResult.css";


function ProductSearchResult({
  nameProduct,
  descriptionProduct,
}) {
  return (
    <>
      <Card className="ProductCard-search d-flex col-lg-3 col-md-3 col-sm-3">
        <Card.Img
          className="img-ProductCard-search"
          variant="top"
          src={image}
          alt={image}
        />
        <Card.Body className="card-body-ProductCard-search">
          <div className="wrapper-description-ProductCard-search d-flex flex-column justify-content-between">
            <Card.Title className="title-ProductCard-search">
              {nameProduct}jhhhhh
            </Card.Title>
            <Card.Title className="p-ProductCard-search">
              {descriptionProduct}jjjjjhhhh
            </Card.Title>
          </div>
          {/* description on hover card */}
          <div className="description-and-price-wrapper d-flex-column justify-content-between  slideIn">
            <div className="wrapper-description-ProductCard-search d-flex flex-column justify-content-between">
              <Card.Title className="title-ProductCard-search">
                {nameProduct}hhhhh
              </Card.Title>
              <Card.Title className="p-ProductCard-search">
                {descriptionProduct}hhhhhhhhhhh
              </Card.Title>
            </div>

            <hr className="solid"></hr>
            <div className="time-wrapper d-flex align-items-center justify-content-between">
              <div className="wrapper-time-delivery d-flex align-items-center justify-content-between w-100">
                <Card.Text className=" time p-product-search">
                  <Icon name="clockFill"></Icon>open
                </Card.Text>

                <Card.Text className=" time p-product-search">
                  <Icon name="place"></Icon>1.1Km
                </Card.Text>

                <Card.Text className=" time p-product-search">
                  <Icon name="review"></Icon>
                  <small className="text-muted ml-1">24 reviews</small>
                </Card.Text>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProductSearchResult;
