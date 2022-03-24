import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Image } from "react-bootstrap";

import { actions } from "../../redux/Action";
import ProductEditing from "../editCatalog/productEditing";
import add from "../../images/Product-260x260.png";
import Cards from "../editCatalog/cards";

import "../../styles/editCatalog/updateCatalog.css";

function UpdateCatalog(props) {
  const { storeId } = props;

  const dispatch = useDispatch();
  const [showProductEditing, setShowProductediting] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  let [categories, setCategories] = useState([]);
  let productCatalog = useSelector((state) => state.businessStore.store);
  const [index, setIndex] = useState();

  // eslint-disable-next-line
  useEffect(() => dispatch(actions.getBusinessStore(storeId)), [storeId]);
  return (
    <>
      <Container fluid>
        <div>
          {showProductEditing ? (
            <ProductEditing
              setShowProductediting={setShowProductediting}
              currentProduct={currentProduct}
              setCurrentProduct={setCurrentProduct}
              show={showProductEditing}
              categories={categories}
              setCategories={setCategories}
              update={true}
              index={index}
            ></ProductEditing>
          ) : (
            <>
              <Row>
                <Col xs={12} className="pt-3 ">
                  <h4 className="pl-4">Update Catalog</h4>
                  <div>
                    {/* <hr className="underlineProfile"></hr> */}
                  </div>
                </Col>
              </Row>
              <Row className="catalogWidth">
                <Col xs={12} lg={3} sm={6} md={5} className="p-2">
                  <Image
                    className="card update-product img-add-business"
                    fluid
                    src={add}
                    onClick={() => {
                      setCurrentProduct({})
                      setShowProductediting(true);
                      setCurrentProduct("")
                    }}
                  />
                </Col>
                {productCatalog["product"]?.map((product, i) => (
                  <Col xs={12} lg={3} sm={6} md={5} key={i} className="p-2">
                    <Cards
                      index={i}
                      setShowProductediting={setShowProductediting}
                      currentProduct={product}
                      setCurrentProduct={setCurrentProduct}
                      update={true}
                      productCatalog={productCatalog}
                      setIndex={setIndex}
                    ></Cards>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </div>
      </Container>
    </>
  );
}
export default UpdateCatalog;