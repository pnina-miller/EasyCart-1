import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";
import * as cloneDeep from "lodash/cloneDeep";

import HemletComponent from "../components/utilities/hemlet";
import ImageCompression from "../functions/ImageCompression";

import Logo from "../images/logo.png";
import EdditedBusiness from "../components/addBusinessPage2/EditedBusiness";
import Detail from "../components/addBusinessPage2/Detail";
import { actions } from "../redux/Action";
import Icon from "../components/utilities/Icon";
import UpdateCatalog from "../components/editCatalog/UpdateCatalog";
import AddCatalog from "../components/editCatalog/addCatalog";
import Business from "../models/business";
import "../styles/AddBusiness2/Configurator.css";
//check page too long
function AddBusinessPage2() {
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const seoTitle = "Post Your Business | EasyCart";
  const seoDescription =
    "Post Your Business description content. this s going to contain few lines about this page";
  const seoImage = Logo;
  const seoKeywords = ["Business", "EasyCart"];

  const dispatch = useDispatch();
  const history = useHistory();

  const editBusiness = useSelector((state) => state.business.editBusiness);
  const businessLocation = useSelector(
    (state) => state.location.businessLocation
  );
  const addressBusiness = useSelector((state) => state.location.address);
  const currentUserDetails = useSelector(
    (state) => state.user.currentUserDetails
  );
  const citiesToAdvertise = useSelector(
    (state) => state.business.citiesToAdvertise
  );
  const paymentPackageBusiness = useSelector(
    (state) => state.business.paymentPackageBusiness
  );
  const KeyWords = useSelector((state) => state.business.KeyWords);
  const subCategories = useSelector((state) => state.category.subCategories);
  const businessId = useSelector((state) => state.business.businessId);

  let { keyWord } = useParams();

  const [level, setlevel] = useState(1);
  const [scroll, setScroll] = useState(false);
  //check
  const [flagCategory, setFlagCategory] = useState(true);
  const [createStores, setCreateStore] = useState(false);
  const [sum, setSum] = useState(0);
  const [, /*show*/ SetShow] = useState(false);
  const [arrSubCategoriesAdded, setArrSubCategoriesAdded] = useState([]);
  const [business, setBusiness] = useState(new Business());
  const scrollUp = useRef(null);
  window.onscroll = () => {
    window.pageYOffset > 553 ? SetShow(true) : SetShow(false);
  };

  useEffect(() => window.scrollTo(0, 0), [level]);
  //check too many useEffects
  useEffect(() => {
    function confirmExit() {
      return "show warning";
    }
    window.onbeforeunload = confirmExit;
  });

  useEffect(() => {
    if (location.pathname.includes("/add")) {
      dispatch(actions.editMyBusiness(""));
      setBusiness(
        new Business([
          ["phone", currentUserDetails?.phone],
          ["email", currentUserDetails?.email],
        ])
      );
    }
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    let categoriesarr = cloneDeep(arrSubCategoriesAdded);
    let categoryListArr = [];
    if (editBusiness !== "" && flagCategory) {
      //subCategories.length > 0 &&
      editBusiness.category.forEach((element1, i) => {
        categoriesarr.push({
          label: element1.categoryName,
          value: element1._id,
        });

        categoryListArr.push(element1._id);
      });
      if (!location.pathname.includes("/add")) {
        setArrSubCategoriesAdded((u) => categoriesarr);
        setFlagCategory(false);

        setBusiness({ ...editBusiness, category: categoryListArr });
      }
    }
    // eslint-disable-next-line
  }, [editBusiness, subCategories, business]);

  useEffect(() => {
    if (editBusiness !== "" && currentUserDetails?.business) {
      let flag = false;
      currentUserDetails.business.forEach((element, i) => {
        if (element._id === editBusiness._id && flag === false) {
          flag = true;
        }
      });
      if (flag === false) {
        alert("You do not own the business, you can not edit the business!!");
        history.push("/");
      }
    }
    // eslint-disable-next-line
  }, [editBusiness, currentUserDetails?.business]);

  useEffect(() => {
    if (keyWord) {
      if (!editBusiness) {
        let funcName = "Edit";
        dispatch(actions.getBusinessByKeyWord({ keyWord, funcName }));
      } else {
        setBusiness(editBusiness);
      }
    }
    // eslint-disable-next-line
  }, [editBusiness, keyWord]);

  useEffect(() => {
    dispatch(actions.getAllCategories());
    const price = { free: 1, promoted: 5, premium: 10 };
    if (sum === 0)
      setSum((oldSum) =>
        paymentPackageBusiness
          ? price[paymentPackageBusiness]
          : editBusiness.paidUp
          ? price[editBusiness.paidUp]
          : oldSum
      );

    // eslint-disable-next-line
  }, [currentUserDetails, paymentPackageBusiness, KeyWords, sum]);

  useEffect(() => {
    if (businessLocation.lat !== undefined && business.businessName !== "") {
      let lat = businessLocation.lat;
      let lng = businessLocation.lng;
      let businessName = business.businessName;
      dispatch(actions.getPlaceIdOfBusiness({ businessName, lat, lng }));
    }
  }, [
    businessLocation.lat,
    businessLocation.lng,
    business.businessName,
    dispatch,
  ]);

  //check function too long
  async function create() {
    let i,
      s,
      c,
      st,
      addressObject,
      locationAdress = "";
    if (addressBusiness !== "") {
      addressObject = addressBusiness.split(",");
      i = addressObject.length - 1;
      s = addressObject[0];
      c = addressObject[i - 1];
      st = addressObject[i];
      locationAdress = businessLocation;
    } else {
      if (editBusiness !== "") {
        locationAdress = editBusiness.location;
        s = editBusiness.adress?.street;
        c = editBusiness.adress?.city;
        st = editBusiness.adress?.state;
      }
    }
    if (editBusiness === "") {
      business.owner = currentUserDetails._id;
      business.adress = { state: st, city: c, street: s };
      business.location = locationAdress;
      business.dateAdded = new Date();
      business.paidUp = paymentPackageBusiness;
    }

    let idBusiness = "";
    let newBusiness = business;
    newBusiness.galery = await uploadImage();
    if (businessId === "" && editBusiness === "") {
      if (
        (business.phone !== "" || business.email !== "") &&
        business.keyWords !== "" &&
        KeyWords === false
      ) {
        await dispatch(
          actions.createBusinessPerUser({ business, citiesToAdvertise })
        );
        setlevel(2);
      } else {
        alert(
          `enter the require files  ${
            business.phone ? "" : business.email ? "" : "phone  "
          }${business.email ? "" : business.phone ? "" : "email  "}  ${
            business.keyWords ? "" : "business name | keyWord  "
          }  ${
            !KeyWords &&
            "business name | keyWord : unique business name exists in the system "
          }`
        );
      }
    } else {
      if (businessId === "") {
        idBusiness = editBusiness._id;
      } else {
        idBusiness = businessId;
      }
      setlevel(2);
      await dispatch(actions.updateBusiness({ business, idBusiness }));
    }
  }

  const uploadImage = async () => {
    let imgUrl = "";
    let arrImages = [];
    for (let index = 0; index < business.galery?.length; index++) {
      const element = business.galery[index];

      if (!element?.includes("files.codes")) {
        const r = await fetch(element);
        const blobFile = await r.blob();
        let name = `${element}.png`;
        var fileToUpload = new File([blobFile], name, {
          lastModified: new Date().getTime(),
          type: blobFile.type,
        });
        imgUrl = await ImageCompression(fileToUpload);
        arrImages[index] = imgUrl;
      } else arrImages[index] = business.galery[index];
    }
    return arrImages;
  };

  return (
    <>
      <HemletComponent
        seoTitle={seoTitle}
        seoDescription={seoDescription}
        seoKeywords={seoKeywords}
        seoImage={seoImage}
      />

      <div ref={scrollUp}></div>
      <Container fluid>
        <BusinessSteps
          level={level}
          setlevel={setlevel}
          businessId={businessId}
          editBusiness={editBusiness}
          setScroll={setScroll}
        />
        <Row>
          <Col className="mr-0 ml-0 p-0 details-sizing">
            {level === 1 && (
              <InformationSection
                create={create}
                arrSubCategoriesAdded={arrSubCategoriesAdded}
                setArrSubCategoriesAdded={setArrSubCategoriesAdded}
                business={business}
                setBusiness={setBusiness}
              />
            )}

            {level === 2 && (
              <DesignSection
                create={create}
                business={business}
                setBusiness={setBusiness}
                scroll={scroll}
                setScroll={setScroll}
              />
            )}
            {level === 3 && (
              <CatalogSection
                createStores={createStores}
                setCreateStore={setCreateStore}
                setProducts={setProducts}
                products={products}
                editBusiness={editBusiness}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddBusinessPage2;

//check double code
const BusinessSteps = (props) => {
  const { level, setlevel, businessId, editBusiness, setScroll } = props;

  return (
    <>
      <Row className="d-none d-md-block">
        <Col className="d-flex justify-content-center col-details align-items-center">
          <div className="divWrapper  align-items-center">
            <hr className="hrSteps"></hr>
            <div className="wrapperSteps">
              <Button
                className={
                  level === 1
                    ? "button-details-checked rounded-circle"
                    : "button-details rounded-circle"
                }
                onClick={() => {
                  setlevel(1);
                }}
              >
                <Icon name="details"></Icon>
              </Button>
              <p>
                <small className="">Information</small>
              </p>
            </div>
            <div className="wrapperSteps">
              <Button
                className={
                  level === 2
                    ? "button-details-checked rounded-circle"
                    : "button-details rounded-circle"
                }
                onClick={() => {
                  setlevel(2);
                }}
              >
                <Icon name="business"></Icon>
              </Button>
              <p className="text-center">
                <small>Design</small>
              </p>
            </div>
            <div className="wrapperSteps">
              <Button
                disabled={!businessId.storeId}
                className={
                  level === 3
                    ? "button-details-checked rounded-circle"
                    : "button-details rounded-circle"
                }
                onClick={() => {
                  setlevel(3);
                  setScroll(true);
                }}
              >
                <Icon name="catalog"></Icon>
              </Button>
              <p className="text-center">
                <small>
                  {editBusiness === "" ? "Add Catalog" : "Update Catalog"}
                </small>
              </p>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="d-block d-md-none" style={{ marginTop: "8px" }}>
        <Col className="d-flex justify-content-center col-details align-items-center">
          <div className="divWrapper  align-items-center">
            <hr className="hrSteps"></hr>
            <div className="wrapperSteps">
              <Button
                className={
                  level === 1
                    ? "button-details-checked rounded-circle"
                    : "button-details rounded-circle"
                }
                onClick={() => {
                  setlevel(1);
                }}
              >
                <Icon name="details"></Icon>
              </Button>
              <p>
                <small className="">Information</small>
              </p>
            </div>
            <div className="wrapperSteps">
              <Button
                className={
                  level === 2
                    ? "button-details-checked rounded-circle"
                    : "button-details rounded-circle"
                }
                onClick={() => {
                  setlevel(2);
                }}
              >
                <Icon name="business"></Icon>
              </Button>
              <p className="text-center">
                <small>Design</small>
              </p>
            </div>
            <div className="wrapperSteps">
              <Button
                disabled={!businessId && !editBusiness}
                className={
                  level === 3
                    ? "button-details-checked rounded-circle"
                    : "button-details rounded-circle"
                }
                onClick={() => {
                  setlevel(3);
                  setScroll(true);
                }}
              >
                <Icon name="catalog"></Icon>
              </Button>
              <p className="text-center">
                <small>
                  {editBusiness === "" ? "Add Catalog" : "Update Catalog"}
                </small>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

const InformationSection = (props) => {
  const {
    create,
    arrSubCategoriesAdded,
    setArrSubCategoriesAdded,
    business,
    setBusiness,
  } = props;
  return (
    <>
      <Row className="title-m" xs={12}>
        <h4 className="title-border">Business Information </h4>
      </Row>
      <Col
        style={{
          height: "67vh",
          overflow: "auto",
        }}
        className="mr-0 ml-0 p-0"
      >
        <Detail
          Business={business}
          setBusiness={setBusiness}
          subCategoriesArrEdit={[]}
          setArrSubCategoriesAdded={setArrSubCategoriesAdded}
          arrSubCategoriesAdded={arrSubCategoriesAdded}
        ></Detail>
        <div className="d-flex justify-content-center bg-button">
          <Button
            className="add  saveAddBusiness mb-3 justify-content-center font-weight-bold"
            variant="warning"
            onClick={create}
          >
            Save
          </Button>
        </div>
      </Col>
    </>
  );
};

const DesignSection = (props) => {
  const { create, business, setBusiness, scroll, setScroll } = props;
  return (
    <>
      <EdditedBusiness
        Business={business}
        setBusiness={setBusiness}
        scroll={scroll}
        setScroll={setScroll}
      ></EdditedBusiness>
      <>
        <div className="d-flex justify-content-center bg-button">
          <Button
            className="add  saveAddBusiness mb-3 justify-content-center font-weight-bold"
            variant="warning"
            onClick={create}
          >
            Save
          </Button>
        </div>
      </>
    </>
  );
};

const CatalogSection = (props) => {
  const { editBusiness, createStores, setCreateStore, setProducts, products } =
    props;
  return !editBusiness ? (
    <Row className="row d-flexjustify-content-start mt-0">
      <AddCatalog
        createStores={createStores}
        setCreateStore={setCreateStore}
        setProducts={setProducts}
        products={products}
      ></AddCatalog>
    </Row>
  ) : (
    <UpdateCatalog storeId={editBusiness.storeId} edit={true}></UpdateCatalog>
  );
};
