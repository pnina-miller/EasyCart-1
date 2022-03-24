

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Form, Container, Col, Row, Card, FormLabel,
} from "react-bootstrap";
// import Select from "react-select";
import validator from 'validator';
import AutoCompleteSearch from '../AutoCompleteSearch'
import SelectSection from './SelectSection'
import { actions } from "../../redux/Action";

import "bootstrap/dist/css/bootstrap.min.css";

import "../../styles/addBusinessPage.css";
import "../../styles/AddBusiness2/addbusiness2.css";

function BasicDetailsSection2(props) {

  const { Business, setBusiness, arrSubCategoriesAdded, setArrSubCategoriesAdded } = props;

  const domain = "https://easycart.direct/";
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();
  const editBusiness = useSelector((state) => state.business.editBusiness);
  const currentUserDetails = useSelector(
    (state) => state.user.currentUserDetails);
  const KeyWords = useSelector((state) => state.business.KeyWords);
  const paymentPackageBusiness = useSelector(
    (state) => state.business.paymentPackageBusiness);
  ///Do not delete, for the next version
  // const [showAlert, setShowAlert] = useState(false);
  const [sum, setSum] = useState("");


  useEffect(() => window.scrollTo(0, 0), [location])

  // useEffect(() => {
  //   if (subCategories.length > 0 && flag === false) {
  //     let categoriesarr = cloneDeep(subCategoriesArr);
  //     subCategories.forEach((element) => {
  //       categoriesarr.push({ value: element._id, label: element.categoryName });
  //     });
  //     setSubCategoriesArr((u) => categoriesarr);
  //     setFlag(true);
  //   }
  //   // eslint-disable-next-line
  // }, [subCategories]);

  useEffect(() => {
    const sumCategoriesOptions = { free: 1, promoted: 5, premium: 10 }
    setSum(sumCategoriesOptions[paymentPackageBusiness || editBusiness.paidUp])
    let sumCategories = 0;
    if (
      (paymentPackageBusiness !== "" || editBusiness.paidUp !== "") &&
      sum === ""
    ) {
      switch (paymentPackageBusiness || editBusiness.paidUp) {
        case "free":
          sumCategories = 1;
          break;
        case "promoted":
          sumCategories = 5;
          break;
        case "premium":
          sumCategories = 10;
          break;
        default:
      }
      setSum(sumCategories);
    }
    // eslint-disable-next-line
  }, [
    editBusiness,
    currentUserDetails,
    paymentPackageBusiness,
    KeyWords,
    sum,
  ]);

  useEffect(() => {
    let b = localStorage.getItem('Business')
    b = b && JSON.parse(b)
    b && setBusiness(b)
    localStorage.removeItem("Business")
  })

  // const handleChange = (categoryName) => {
  //   ///Do not delete, for the next version
  //   // if (categoryName.length <= sum) {
  //   // if (!showAlert || categoryName.length <= sum) {
  //   let arrCategories = [];

  //   categoryName.map((item, i) => (
  //     <div key={i}>{arrCategories.push(item.value)}</div>
  //   ));
  //   setArrSubCategoriesAdded((c) => categoryName);
  //   setBusiness({ ...Business, category: arrCategories });

  //   if (arrCategories.length === sum) {
  //     ///Do not delete, for the next version
  //     // setShowAlert(true)
  //   }
  //   // }
  // };

  async function checkKeyWords() {
    if (editBusiness === "") {
      await dispatch(actions.checkKeyWords(Business.keyWords));

    }
  }
  useEffect(() => {
    Business.keyWords &&
      changeUrl(Business.keyWords)
    // eslint-disable-next-line
  }, [Business.keyWords])

  const changeUrl = (e) => {
    let value = e?.target?.value?.split("direct/")[1]
    if (!value)
      value = e;
    if (value)
      value = value.replace(/\s/g, '_');
    setBusiness({ ...Business, keyWords: value })
  }

  return (
    <div >
      <Container className='mt-0 pt-0  pl-md-5 pr-md-5'>
        <Container fluid
        >
          
          <Row>

          </Row>
        </Container>
        <Row>
          <Col className="col-top">
            <Card className="card-add-listing addBusinessCol pb-0">
              <Card.Body className="body-add-listing">
                <Card.Title className="basic-information">
                  {t("basic-details.basic-details")}
                </Card.Title>
                {/* <hr ></hr> */}
                <Row>
                  <Col lg={6} xs={12}>
                    <Form.Group className="w-100">
                      <Form.Label className="listing-lable">
                        {t("basic-details.short-business-name")}
                      </Form.Label>
                      <Form.Control
                        className="listing-control w-100 input-size"
                        defaultValue={
                          Business.businessName
                        }
                        type="text"
                        required={false}
                        placeholder=""
                        // onMouseOut={(e) => checkKeyWords()}
                        onBlur={(e) => checkKeyWords()}
                        onChange={(e) => {
                          setBusiness({ ...Business, keyWords: e.target.value, businessName: e.target.value })
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col lg={6} xs={12}>
                    <Form.Group className="w-100">
                      <Form.Label className="listing-lable">
                        Url*
                      </Form.Label>
                      <Form.Control
                        className="listing-control input-size color-text"
                        value={Business.keyWords ? domain + Business.keyWords : domain}
                        type="text"
                        required={true}
                        onChange={(e) => changeUrl(e)}
                        onBlur={(e) => checkKeyWords()}
                      // onMouseOut={(e) => checkKeyWords()}
                      />
                      {KeyWords === true ? (
                        <FormLabel className="listing-lable">
                          {" "}
                          unique business name exists in the system
                        </FormLabel>
                      ) : (
                        ""
                      )}
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col lg={6} xs={12}>
                    <Form.Group>
                      <Form.Label className="listing-lable">
                        Email*
                      </Form.Label>‏
                      <Form.Control
                        className="listing-control input-size"
                        defaultValue={Business.email}
                        type="email"
                        required={true}
                        onChange={(e) => setBusiness({ ...Business, email: e.target.value })}
                        onBlur={(e) => (validator['isEmail'](e.target.value)) ? "" : alert("Enter email is failed")}

                      />
                    </Form.Group>
                  </Col >

                  <Col lg={6} xs={12}>
                    <Form.Group className="w-100">
                      <Form.Label className="listing-lable">
                        Phone*
                      </Form.Label>
                      <Form.Control
                        className="listing-control input-size"
                        defaultValue={
                          Business.phone
                        }
                        type="text"
                        required={true}
                        onChange={(e) => {
                          setBusiness({ ...Business, phone: e.target.value });
                        }}
                        onBlur={(e) => (validator.isMobilePhone(e.target.value) ? "" : alert("Enter Phone is faild"))}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col lg={12} xs={12}>
                    <Form.Group >
                      <Form.Label className="listing-lable">
                        {t('location.address')}
                      </Form.Label>
                      <AutoCompleteSearch ph={"placeholderConfigurator"} flag={false} cNAuto="input-size" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <SelectSection Business={Business} setBusiness={setBusiness} arrSubCategoriesAdded={arrSubCategoriesAdded} setArrSubCategoriesAdded={setArrSubCategoriesAdded}></SelectSection>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* <Form.Group className="w-100 pr-5 pl-5 group-select-category  position-relative">
          <Form.Label className="listing-lable">
            Category
          </Form.Label> */}

        {/* ///Do not delete, for the next version */}
        {/* {showAlert &&
            <Form.Label className="listing-lable">
              &nbsp; More Categories For Your Business??
              <Link onClick={() => { localStorage.setItem('Business', JSON.stringify(Business)); }} to="/pricing-business">Choose payment package</Link>
            </Form.Label>
            } */}

        {/* <Select
            className="form-control select select-details mb-5 categoryStyle"
            closeMenuOnSelect={true}
            options={subCategoriesArr.length > 0 ? subCategoriesArr : ""}
            value={arrSubCategoriesAdded.length > 0 && arrSubCategoriesAdded}
            isMulti
            onChange={(e) => { handleChange(e) }}
          /> */}
        {/* </Form.Group> */}


        {/* <PlacesAutocomplete></PlacesAutocomplete> */}


      </Container>
    </div>
  );
}
export default BasicDetailsSection2;