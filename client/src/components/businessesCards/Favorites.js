import React from "react";
import { Container, Card, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import Icon from "../utilities/Icon";
import defaultImage from "../../images/image3.png";
import { actions } from "../../redux/Action";

import "../../styles/dashboardPage/dashboardPages.css";
import "../../styles/favoritesPage.css";

function Favorites(props) {
  const { item } = props;

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.currentUserDetails?._id);

  function deleteFavoraits(businessId) {
    dispatch(actions.deleteFavoraits({ businessId, userId }));
  }

  return (
    // <div>
    /* <Row>
         <Col className="col-4 card-favorites"> */
    <Card className="favorites-card">
      <Card.Img
        className="favorites-card-img"
        variant="top"
        src={item.galery.length > 0 ? item.galery[0] : defaultImage}
      />
      <Card.Body className="favorites-card-body">
        <Container className="favorites-name-title d-flex-column justify-content-between  slideIn">
          <Row>
            <b className="fontsNameSearch">{item.businessName}</b>

            <p className="fontsAddressSearch">
              {item.adress&&item.adress?.street + " " + item.adress?.city}
            </p>
          </Row>
          <Row  className="favorites-detailes d-flex align-items-center justify-content-between">
              {/* <div className="wrapper-time-delivery d-flex align-items-center justify-content-between w-100"> */}
                <Card.Text className=" time p-product-search">
                  <div
                    className="wrapper-remove-icon courser-btn"
                    onClick={() => {
                      deleteFavoraits(item._id);
                    }}
                  >
                    <div className="color-trash">
                      <Icon name="trash"></Icon>{" "}
                    </div>
                  </div>
                </Card.Text>
                <Card.Text className="time p-product-search fillColor">
                  <Icon name="review"> </Icon>
                  <small className="text-muted ml-1">
                    {" "}
                    {item.totalClicks}
                    Reviews{" "}
                  </small>
                </Card.Text>
              {/* </div> */}


          </Row>
        </Container>
      </Card.Body>
    </Card>
    // </Col>
    // </Row>
    // </div>
  );
}

export default Favorites;
