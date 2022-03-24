import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Col,
  Row,
  Card,
  OverlayTrigger,
  Tooltip,
  FormLabel,
} from "react-bootstrap";
import Select from "react-select";
import * as cloneDeep from "lodash/cloneDeep";

import "../../styles/addBusinessPage.css";
import { actions } from "../../redux/Action";
import Icon from "../utilities/Icon";

export default function BasicDetailsSection(props) {
  const dispatch = useDispatch();
  const editBusiness = useSelector((state) => state.business.editBusiness);
  const currentUserDetails = useSelector(
    (state) => state.user.currentUserDetails
  );
  const KeyWords = useSelector((state) => state.business.KeyWords);
  const subCategories = useSelector((state) => state.category.subCategories);
  const paymentPackageBusiness = useSelector(
    (state) => state.business.paymentPackageBusiness
  );
  const { t } = useTranslation();
  const [subCategoriesArr, setSubCategoriesArr] = useState([]);
  const [businessName, setBusinessName] = useState(
    editBusiness !== "" ? editBusiness.businessName : ""
  );
  const [category, setCategory] = useState(
    editBusiness !== "" ? editBusiness.category : []
  );
  // const [arrtry,setArrtry]=useState([1,2,3,4,5,6,7,8,9,11,12,12,3,4,45,5,566,7,7,7,8,8,8,899]);

  const [sum, setSum] = useState("");
  const [keyWords, setKeyWords] = useState(
    editBusiness !== "" ? editBusiness.keyWords : ""
  );
  const [flag, setFlag] = useState(false);

  const [, /*flagKeyWords*/ setFlagKeyWords] = useState(false);
  // let selected = isSelected;
  let arrCategory = [];
  let domine = "https://easycart.direct/";

  const { BusinessName, Category, MyKeyWords, arrSubCatecoriesOfEdit } = props;
  // useEffect(() => {
  //     Category(arrSubCatecoriesOfEdit)
  // }, [arrSubCatecoriesOfEdit])

  useEffect(() => {
    if (subCategories.length > 0 && flag === false) {
      let categoriesarr = cloneDeep(subCategoriesArr);
      subCategories.forEach((element) => {
        categoriesarr.push({ value: element._id, label: element.categoryName });
      });
      setSubCategoriesArr((u) => categoriesarr);

      setFlag(true);
    }

    // eslint-disable-next-line
  }, [subCategories]);

  useEffect(() => {
    let sumCategories = 0;
    BusinessName(businessName);
    setKeyWords(editBusiness !== "" ? editBusiness.keyWords : keyWords);
    Category(category);
    MyKeyWords(editBusiness !== "" ? editBusiness.keyWords : keyWords);
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
    if (editBusiness !== "") {
      editBusiness.category.map((item, i) => arrCategory.push(item));
      Category(arrCategory);
      setCategory((u) => arrCategory);
    }
    setFlagKeyWords(!KeyWords === false);

    // eslint-disable-next-line
  }, [KeyWords, editBusiness]);

  useEffect(() => { }, [arrSubCatecoriesOfEdit]);
  const handleChange = (categoryName) => {
    let arrCategories = [];
    categoryName.map((item, i) => (
      <div key={i}>{arrCategories.push(item.value)}</div>
    ));
    setCategory((c) => arrCategories);
    Category(arrCategories);
  };
 
  async function checkKeyWords() {
    if (editBusiness === "") {
      await dispatch(actions.checkKeyWords(keyWords));
      setFlagKeyWords(false);
      MyKeyWords(keyWords);
    }
  }

  return (
    <div className="mt-business">
      <Card className="card-add-listing ">
        <Card.Body className="body-add-listing">
          <Card.Title className="basic-information">
            {t("basic-details.basic-details")}
          </Card.Title>
          <hr className="solid"></hr>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label className="listing-lable">
                  {t("basic-details.business-name")}
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">
                        This field is required | enter business name with unique
                        word
                      </Tooltip>
                    }
                  >
                    <button variant="outline-dark" className="icon-btn btnmul">
                      <Icon name="information" />
                    </button>
                  </OverlayTrigger>
                </Form.Label>
                ‏
                <Form.Control
                  className="listing-control input-size"
                  defaultValue={
                    editBusiness !== "" ? editBusiness.keyWords : ""
                  }
                  type="text"
                  required={true}
                  onChange={(e) => {
                    setKeyWords(e.target.value);
                    MyKeyWords(e.target.value);
                  }}
                  onBlur={checkKeyWords}
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
            <Col className="d-flex align-items-end">
              <Form.Group className="w-100">
                <Form.Control
                  className="listing-control input-size"
                  value={domine + keyWords}
                  type="text"
                  disabled={false}
                  placeholder=""
                  onChange={(e) => {
                    setBusinessName(e.target.value);
                    BusinessName(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label className="listing-lable">
                  {t("basic-details.category")} |{" "}
                  <small className="note-size">
                    {" "}
                    לפי חבילת התשלום שבחרת באפשרותך לבחור {sum} קטגוריות
                  </small>
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-top">This field is required</Tooltip>
                    }
                  >
                    <button variant="outline-dark" className="icon-btn btnmul">
                      <Icon name="information" />
                    </button>
                  </OverlayTrigger>
                </Form.Label>
              </Form.Group>
            </Col>
            <Col className="d-flex title-size">
              <Form.Group className="w-100">
                <Form.Label className="listing-lable">
                  {t("basic-details.short-business-name")}
                </Form.Label>
                <Form.Control
                  className="listing-control w-100 input-size"
                  defaultValue={
                    editBusiness !== "" ? editBusiness.businessName : ""
                  }
                  type="text"
                  placeholder=""
                  onChange={(e) => {
                    setBusinessName(e.target.value);
                    BusinessName(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
        <Select
          className="form-control select select-details mb-5"
          closeMenuOnSelect={false}
          options={subCategoriesArr.length > 0 ? subCategoriesArr : ""}
          defaultValue={subCategoriesArr.length > 0 ? subCategoriesArr : ""}
          isMulti
          onChange={handleChange}
          />
      </Card>
    </div>
  );
}