import { Card, Container, Col, Row } from "react-bootstrap";
import React from "react";
import axios from "axios";
import defaultImg from "../../images/food-2.png";
import Icon from "../utilities/Icon";
import { useDispatch } from "react-redux";
import { actions } from "../../redux/Action";

import "../../styles/editCatalog/Card.css";

const Cards = (props) => {
  const {
    //אם את ה בעדכון קטלוג
    update,
    productCatalog,
    currentProduct,
    setCurrentProduct,
    setProducts,
    setIndex,
    index,
    setShowProductediting,
    setEdit,
  } = props;
  const dispatch = useDispatch();

  const deleteProduct = () => {
    axios({
      method: "delete",
      url: "/product/deleteProduct",
      data: {
        product: currentProduct,
      },
    })
      .then(function () {
        alert("delete product");
      })
      .catch((err) => {
        console.error("error on delete product", err);
      });
    let arr = productCatalog["product"]?.filter((x) => x !== currentProduct);
    dispatch(actions.deleteProduct(arr));
  };

  const open = () => {
    setIndex(index);
    setShowProductediting(true);
    setCurrentProduct(currentProduct);
    setEdit !== undefined && setEdit(true);
  };
  //check double code
  const remove = async () => {
    setProducts((oldProducts) =>
      oldProducts.filter((x) => x !== currentProduct)
    );
  };
  return (
    <>
      <Card className="ProductCard-card update-product">
        <Card.Img
          className="ProductCard-img img-update-ProductCard"
          variant="top"
          src={currentProduct.images || defaultImg}
        />
        <Card.Body className="ProductCard-card-body update-product-body p-0">
          <Container className=" d-flex-column justify-content-between pb-1 pt-0 slideIn">
            <Row className="d-flex flex-column justify-content-center">
              <b className="fontsNameSearch  overNameProduct">
                {currentProduct?.name}
              </b>
            </Row>
            <Row>
                          <hr className="underline"></hr>

              <Col className="d-flex justify-content-start" xs={3}>
                <Card.Text
                  className=" icon-over deleveryIcon"
                  onClick={() => (update ? deleteProduct() : remove())}
                >
                  <Icon name="bin" />
                  &nbsp;
                </Card.Text>
              </Col>
              <Col className="d-flex justify-content-end" xs={3}>
                <Card.Text className=" icon-over" onClick={() => open()}>
                  <Icon name="pencil" />
                  &nbsp;
                </Card.Text>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default Cards;
