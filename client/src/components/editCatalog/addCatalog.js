import { Container, Row, Button, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";

import ProductEditing from "../../components/editCatalog/productEditing";
import add from "../../images/Product-260x260.png";
import { actions } from "../../redux/Action";
import Cards from "./cards";
import Icon from "../utilities/Icon";

import "../../styles/addCatalog/addCatalog.css";
// import "../../styles/addCatalog/addstore.css";

function AddCatalog(props) {
  const { setProducts, products, setCreateStore, createStores } = props;

  const history = useHistory();
  const businessId = useSelector((state) => state.business.businessId?state.business.businessId:state.business.editBusiness._id);

  const dispatch = useDispatch();

  const [editProduct, setEditProduct] = useState(false);
  const [showProductediting, setShowProductediting] = useState(false);
  const [create, setCreate] = useState(false);
  let [categories, setCategories] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [index, setIndex] = useState();
  const [edit, setEdit] = useState(false);

  const saveStore = async () => {
    dispatch(actions.createProductsByStore(products));
    history.push("/");
  };
  const craeteStore = async () => {
    //check state create didnt update yet
    setCreate(true);
    !create && alert("create");
    dispatch(
      actions.createBusinessStore({
        businessId: businessId,
      })
    );
    setCreateStore(true);
    setCreate(true);
  };
  console.log("pdpdpdpdpdppd", products)
  return (
    <>
      {create === false && products?.length < 1 && !createStores ? (
        <Container fluid className="backColorStore">
          <Row className="mt-2  mr-0">
            <Col className="d-flex justify-content-center pt-5">
              <Icon name="createStore"></Icon>
            </Col>{" "}
          </Row>
          <Row className="mt-5">
            <Col xs={12}>
              <h5 className="d-flex justify-content-center hFontWeight text-capitalize">
                Do you want to add store to your business?
              </h5>
            </Col>
            <Col>
              <p className="d-flex justify-content-center greyText breakLine text-center text-capitalize">
                You can add a product catalog of your store
                <br />
                if option to cart page
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center mt-3 mb-5">
              <Button
                variant="warning"
                className="header-btn createAnimate"
                onClick={craeteStore}
              >
                Create Store
              </Button>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid>
          <Row>
            <Col xs={12} className="pt-5 ">
              <h4 className="pl-4">Create Store</h4>
              <div>
                {/* <hr className="underlineProfile"></hr> */}
              </div>
            </Col>
          </Row>
          <Row>
            {!showProductediting ? (
              <>
                <Col xs={12} lg={3} sm={6} md={5} className="p-2">
                  <Image
                    fluid
                    src={add}
                    className="card update-product img-add-business"
                    onClick={() => {
                      setShowProductediting(true)
                      setCurrentProduct({})
                      setEditProduct(true);
                    }}
                  />
                </Col>
                {products?.length > 0 &&
                  products.map((product, i) => {
                    return (
                      <Col xs={12} lg={3} sm={6} md={5} className="p-2">
                        <Cards
                          setShowProductediting={setShowProductediting}
                          currentProduct={product}
                          index={i}
                          products={products}
                          setProducts={setProducts}
                          setCurrentProduct={setCurrentProduct}
                          setIndex={setIndex}
                          setEdit={setEdit}
                        />
                      </Col>
                    );
                  })}
              </>
            ) : (
              <ProductEditing
                products={products}
                setProducts={setProducts}
                setShowProductediting={setShowProductediting}
                show={editProduct}
                currentProduct={currentProduct}
                setCurrentProduct={setCurrentProduct}
                setCategories={setCategories}
                categories={categories}
                index={index}
                edit={edit}
              />
            )}
            {/* <ProductEditing product={product} setProduct={setPbroduct} onHide={() => setShowEdit(false)} show={showEdit} addUpdate={true} index={index} products={products} ></ProductEditing> */}
          </Row>
          <Row>
            <Col className="d-flex justify-content-center mt-3 mb-5">
              <Button
                variant="warning"
                className="header-btn "
                onClick={saveStore}
              >
                save store
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default AddCatalog;