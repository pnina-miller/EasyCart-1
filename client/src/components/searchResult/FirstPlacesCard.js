import { withRouter, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Card, Row, Container } from "react-bootstrap";
import React from "react";

import CHookDistanceCalculation from "../../custom hooks/CHookDistanceCalculation";
import { actions } from "../../redux/Action";
import image from "../../images/image2.png";
import Icon from "../utilities/Icon";

import "../../styles/productSearchResult.css";

function FirstPlacesCard(props) {
  const { item } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <Card className="first-place-card col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <Link
          onClick={() => {
            dispatch(actions.setSelectedBusinessPlacesDetails(item));
            window.open(`/place/${item.place_id}`, "_blank");
          }}
          className="ProductCard-searchA"
        >
          <Card.Img
            className="first-place-card-img"
            variant="top"
            src={
              item.photos
                ? `https://maps.googleapis.com/maps/api/place/photo?photoreference=${item.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&maxwidth=480&maxheight=480`
                : image
            }
          />
          <Card.Body className="first-place-card-body">
            <Container className="description-and-price-wrappefirst-search-name-title d-flex-column justify-content-between  slideIn slidOut">
              <Row>
                <p className="fontsNameSearch font-weight-bold">{item.name}</p>
                <p className="fontsAddressCategoies mb-0">
                  <b> {t(`cards.address`)}</b>: {item.vicinity}
                </p>
                <p className="fontsAddressCategoies">
                  <b>{t(`cards.categories`)}</b>: {item.types[0]},{" "}
                  {item.types[1]}
                </p>
              </Row>
              <hr className="solid"></hr>
              <Row className=" d-flex align-items-center justify-content-between">
                <div className="wrapper-time-delivery d-flex align-items-center justify-content-between w-100">
                  <Card.Text className=" time p-product-search">
                    <Icon name="clockFill"></Icon>
                    <small className="text-muted ml-1">
                      {item.opening_hours !== undefined &&
                      item.opening_hours.open_now === true
                        ? "open now"
                        : "close now"}
                    </small>
                  </Card.Text>
                  <Card.Text className=" time p-product-search">
                    <Icon name="place"></Icon>
                    <small className="text-muted ml-1">
                      <CHookDistanceCalculation
                        lat={item.geometry.location.lat}
                        lng={item.geometry.location.lng}
                      />
                    </small>
                  </Card.Text>
                  {item.user_ratings_total && (
                    <Card.Text className=" time p-product-search">
                      <Icon name="star"></Icon>
                      <small className="text-muted ml-1">{item.rating} </small>
                    </Card.Text>
                  )}
                </div>
              </Row>
            </Container>
          </Card.Body>
        </Link>
      </Card>
    </>
  );
}
export default withRouter(FirstPlacesCard);
