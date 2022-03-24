import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Form, Col, Row, Button, Container } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import { useDispatch, useSelector } from "react-redux";

import { actions } from "../../redux/Action";
import { StyledDemo } from "../easyCrop/index";
import defaultImg from "../../images/image-upload-concept-illustration_23-2148276162.jpg";
import ImageCompression from "../../functions/ImageCompression";
import Icon from '../utilities/Icon';

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/productEdit.css";

function ProductEditing(props) {
  const {
    currentProduct,
    setCurrentProduct,
    setCategories,
    addUpdate,
    index,
    edit,
    products,
    setShowProductediting,
    setProducts,
    update
  } = props;

  const dispatch = useDispatch();
  const [selectedCategories, setselectedCategories] = useState([]);
  const [imageAfterChange, setImageAfterChange] = useState("");
  const [imageSrc, setImageSrc] = useState(defaultImg);

  const [triggerClick, settriggerClick] = useState(false);
  let [categoriesOptions, setCategoriesOptions] = useState();

  const nameRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const codeRef = useRef();
  const storeId = useSelector((state) => state.businessStore.store._id);
  const store = useSelector((state) => state.businessStore.storeId);


  useEffect(() => {
    // dispatch(actions.getAllProductCategories());
    //check move to middlware
    axios({
      method: "get",
      url: "/productCategory/getProductCategories",
    })
      .then(function (response) {
        let categories = [];
        response.data?.forEach((category) => {
          categories.push({ value: category.name, label: category.name, id: category._id });
        });
        setCategoriesOptions(categories);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);


  useEffect(() => {
    setImageSrc(currentProduct?.images);
    if (currentProduct?.category) {
      let options = [...selectedCategories];

      currentProduct.category.forEach((c) => {
        options.push({ value: c.name, label: c.name });
      });
      setselectedCategories(options);
    }
    // eslint-disable-next-line
  }, [currentProduct]);


  const createProduct = async (e) => {
    if (
      nameRef.current.value === "" ||
      descriptionRef.current.value === "" ||
      priceRef.current.value === "" ||
      codeRef.current.value === "" ||
      selectedCategories.length === 0
    ) {
      alert("You need to fill in all the details about product");
      return;
    } else {
      let imgUrl = "";
      //check double code
      const r = await fetch(imageSrc);
      const blobFile = await r.blob();
      let name = `${imageAfterChange}.png`;
      var fileToUpload = new File([blobFile], name, {
        lastModified: new Date().getTime(),
        type: blobFile.type,
      });
      imgUrl = await ImageCompression(fileToUpload);
      ;
      const product = {
        name: nameRef.current?.value,
        code: codeRef.current?.value,
        description: descriptionRef.current?.value,
        price: priceRef.current?.value,
        images: imgUrl,
        //check
        productCategory: selectedCategories,
        store: store,
        category: selectedCategories
      };
      if (!addUpdate) {
        
        //check
        product.store = storeId || store;

        if (edit) {
          let arr = products
          arr[index] = product
          setProducts(arr)
        }
        else {
          setProducts((oldProducts) => [...oldProducts, product]);
        }
      }
      else {
        product.store = storeId
        setCurrentProduct(product);
        setCategories([]);
      }
      alert("create product");
      setCurrentProduct({})
      setShowProductediting(false);
    }
  };
  //check talya no categories update
  const handleChange = (newValue, actionMeta) => {
    setselectedCategories(newValue);

    // setselectedCategories([selectedCategories, newValue[0].label]);
    //check 
    // if (!product) setCategories((c) => [...newValue]);
  };

  //check move to custom hook
  const imgUpdate = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let imgUrl = "";
        const r = await fetch(imageSrc);
        const blobFile = await r.blob();
        let name = `${imageAfterChange}.png`;
        var fileToUpload = new File([blobFile], name, {
          lastModified: new Date().getTime(),
          type: blobFile.type,
        });
        imgUrl = await ImageCompression(fileToUpload);
        resolve(imgUrl);
      } catch {
        reject("not found!");
      }
    });
  };

  const updateProduct = async (e) => {
    
    try {
      let imgUrl = await imgUpdate();
      if (
        nameRef.current.value === "" ||
        descriptionRef.current.value === "" ||
        priceRef.current.value === "" ||
        codeRef.current.value === "" ||
        selectedCategories?.length === 0
      ) {
        alert("You need to fill in all the details about product");
      } else {
        
        if (currentProduct.name === undefined) {
          
          const updateProduct = {
            name: nameRef.current.value,
            code: codeRef.current.value,
            description: descriptionRef.current.value,
            price: priceRef.current.value,
            image: imgUrl,
            store: storeId,
            productCategory: selectedCategories,
          };
          let arr = []
          arr.push(updateProduct)
          dispatch(actions.createProductsByStore(arr));

          setShowProductediting(false);

          // let arr = [...products];
          // arr[index] = updateProduct;
          // setProducts(arr);
          // setCurrentProduct(arr);
        } else {
          

          const updateProduct = {
            name: nameRef.current.value,
            code: codeRef.current.value,
            description: descriptionRef.current.value,
            price: priceRef.current.value,
            images: imgUrl,
            store: storeId,
            _id: currentProduct._id,
            productCategory: ["food"],
          };
          dispatch(actions.updateProduct(updateProduct));
          axios({
            method: "post",
            url: "/product/updateProduct",
            data: {
              updateProduct: updateProduct,
            },
          });
          alert("update product");
          setCurrentProduct({})
          setShowProductediting(false);
        }
      }
    } catch (error) {
      console.error("error on update product", error);
      alert('update product failed')
    }
  };

  return (
    <Container>
      <Row className="product-margin  pt-4" id="contained-modal-title-vcenter">
        <Col sm={10} >
          <h5> Product Editing</h5>
        </Col>
        <Col className="wrapperArrow"
          onClick={() => {
            setShowProductediting(false);
          }}
        >
          <div className="back-edit d-flex justify-content-between">
            <Icon name="arrowBack" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <hr className="underline-product-editing "></hr>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col xs={12} sm={6} md={5}>
          <Form className="form-product pt-0">
            <Form.Group
              controlId="formBasicEmail"
              className="form-group-product mb-0"
            >
              <Form.Label className="lable-in-form">Product Name</Form.Label>
              <Form.Control
                onBlur={(e) => (e.currentTarget.placeholder = "Product Name")}
                defaultValue={currentProduct?.name}
                onFocus={(e) => (e.currentTarget.placeholder = "")}
                ref={nameRef}
                className="from-enter-details"
                type="text"
                placeholder="portition humburger"
              />
            </Form.Group>
            <Form.Group
              controlId="formBasicEmail"
              className="form-group-product mb-0"
            >
              <Form.Label className="lable-in-form">
                SKU (Code Products)
              </Form.Label>
              <Form.Control
                onBlur={(e) => (e.currentTarget.placeholder = "Code Products")}
                onFocus={(e) => (e.currentTarget.placeholder = "")}
                className="from-enter-details"
                type="text"
                ref={codeRef}
                placeholder="1234"
                defaultValue={currentProduct?.code}
              />
            </Form.Group>
            <Form.Group
              controlId="formBasicEmail"
              className="form-group-product mb-0"
            >
              <Form.Label className="lable-in-form">
                Product Description
              </Form.Label>
              <Form.Control
                as="textarea"
                onBlur={(e) =>
                  (e.currentTarget.placeholder = " Product Description")
                }
                onFocus={(e) => (e.currentTarget.placeholder = "")}
                className="from-enter-details height-area-product"
                type="text"
                ref={descriptionRef}
                placeholder="write stories about your product"
                defaultValue={currentProduct?.description}
              />
            </Form.Group>
            <Container className="p-0" >
              <Row>
                <Col xs={12} lg={6}>
                  <Form.Group
                    controlId="formBasicEmail"
                    className="form-group-product mb-0"
                  >
                    <Form.Label className="lable-in-form">Category</Form.Label>
                    <CreatableSelect
                      isMulti
                      onChange={handleChange}
                      value={selectedCategories}
                      options={categoriesOptions}
                      className="bgColorWhite  "
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} lg={6}>
                  <Form.Group
                    controlId="formBasicEmail"
                    className="form-group-product mb-0"
                  >
                    <Form.Label className="lable-in-form">Product Price</Form.Label>
                    <Form.Control
                      onBlur={(e) => (e.currentTarget.placeholder = "Product Price")}
                      onFocus={(e) => (e.currentTarget.placeholder = "")}
                      ref={priceRef}
                      className="from-enter-details"
                      type="text"
                      placeholder="$ 54"
                      defaultValue={currentProduct?.price}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>

            {/* <div className="d-flex justify-content-between form-group-product"></div> */}


            <div className="w-100 d-flex justify-content-center">
              <Button
                className="btn-product-edit mb-3"
                variant="primary"
                onClick={update ? updateProduct : createProduct}
              >
                Save
              </Button>
            </div>
          </Form>
        </Col>
        <Col className="wrapperCropperProduct">
          <StyledDemo
            disapearSave={true}
            triggerClick={triggerClick}
            settriggerClick={settriggerClick}
            setImageSrc={setImageSrc}
            imageSrc={imageSrc}
            setImageAfterChange={setImageAfterChange}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default ProductEditing;