
import React, { useState } from "react";
import { Button, Alert, Card, Container, Col, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import Icon from "../utilities/Icon";
import defaultImage from "../../images/image3.png";
import { actions } from "../../redux/Action";

import "../../styles/searchResult/listCategory.css";
import "../../styles/userBusinessPage.css";

function UserBusiness(props) {

  const { item } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [show, setShow] = useState(true);
  const [itemTemp, setItemTemp] = useState({});

  function deleteMyBusiness(businessId) {
    dispatch(actions.deleteBusinessById({ businessId }));
    setShow(false);
  }

  function edit(business) {
    dispatch(actions.setEditBusiness(business));
  }

  return (
    <Card
      className="user-business-card cursor-link"
    >
      <Card.Img
      onClick={() => {
        edit(item);
        history.push(`/${item.keyWords}/update`);
      }}
        className="user-business-card-img"
        variant="top"
        src={item.galery?.length > 0 ? item.galery[0] : defaultImage}
      />
      <Card.Body className="user-business-card-body justify-content-between">
        <Container className="user-business-name-title d-flex flex-column justify-content-center">
          <Row>
            <b className="fontsNameSearch">{item.businessName}</b>
          </Row>
          <hr />
          <Row className="user-business-detailes justify-content-between wrapper-padding">
            <Col className="d-flex justify-content-start" xs={6}>
              <Card.Text>
                <div
                  className="wrapper-remove-icon courser-btn"
                  onClick={() => {
                    setShow(true);
                    setItemTemp(item);
                  }}
                >
                  <div className="color-trash size-icons">
                    <Icon name="trash" />
                  </div>
                </div>
              </Card.Text>
            </Col>
            <Col className="d-flex justify-content-end" xs={6}>
              <Card.Text>
                <Link
                  onClick={() => {
                    window.open(`/${item.keyWords}`, "_blank");
                  }}
                  className="button gray  size-icons warpper-icons d-flex align-items-center"
                >
                  <Icon name="eye"></Icon>
                </Link>
              </Card.Text>
              <Card.Text >
                <Link
                  onClick={() => {
                    edit(item);
                  }}
                  to={`/${item.keyWords}/update`}
                  className="button size-icons gray warpper-icons d-flex align-items-center"
                >
                  <Icon name="edit"></Icon>
                </Link>
              </Card.Text>
            </Col>
          </Row>
       
        </Container>
      </Card.Body>
      <div className="buttons-to-right">
        {show && (
          <Alert show={itemTemp === item} variant="success">
            <Alert.Heading>מחיקה!!</Alert.Heading>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={() => setShow(false)} variant="outline-success">
                {t("my-business.cancel")}
              </Button>
              <Button
                onClick={() => {
                  deleteMyBusiness(item._id);
                }}
                variant="outline-success margin-right-0"
              >
                {t("my-business.confirm")}
              </Button>
            </div>
          </Alert>
        )}
      </div>
     
    </Card>
  );
}
export default UserBusiness;
