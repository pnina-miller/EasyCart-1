import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import ProductCard from "../ProductCard";

import "../../styles/businessPage/productCatalog.css";

function ProductCatalog(props) {
  const { onCardClicked, products,setProduct } = props;

  const remove = async (i) => {
    let deleteProduct=products.splice(i, 1);
    let arr=products.filter(x=>x!==deleteProduct)    
    setProduct(arr)
  }
  
  return (
    <>
      <Container className="container-product-catalog d-flex flex-column align-items-center">
        <div className="wrapper-catalog d-flex flex-column justify-content-center">
          <Row>
            {products?.map( (product,i )=> <Col key={product.price}><ProductCard product={product} index={i} edit={true} remove={remove} onCardClicked={onCardClicked} /></Col>)}
          </Row>
        </div>
      </Container>
    </>
  );
}

export default ProductCatalog;
