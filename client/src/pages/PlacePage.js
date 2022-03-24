import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Modal } from "react-bootstrap";
// import { useTranslation } from 'react-i18next';
import { actions } from "../redux/Action";
import Footer from "../components/Footer";
import "../styles/businessPage/businessPage.css";
import { SRLWrapper } from "simple-react-lightbox";
import "../styles/businessPage/businessPage.css";
import MapModal from "../components/businessPage/MapModal";
import HemletComponent from "../components/utilities/hemlet";
import Icon from "../components/utilities/Icon";
import UserRecommendation from "../components/businessPage/UserRecommendation";
import BusinessPhotos from "../components/businessPage/PhotosSection";
import Share from "../components/Share";

import Logo from "../images/logo.png";

//check merge with businessPage components
const PlaceDetails = (props) => {
  const dispatch = useDispatch();
  const businessPlacesCheckedDetails = useSelector(
    (state) => state.places.BusinessPlacesCheckedDetails
  );
  // const { t } = useTranslation();
  // const [index, setIndex] = useState(0);
  const [modalMapShow, setModaMaplShow] = React.useState(false);
  const seoTitle = `${
    businessPlacesCheckedDetails.name === undefined
      ? "My Business"
      : businessPlacesCheckedDetails.name
  } | EasyCart`;
  const seoDescription =
    "Your Business description content. this s going to contain few lines about this page";
  const seoImage = Logo;
  const seoKeywords = ["Business", "EasyCart"];

  const [modal, setModal] = React.useState(false);
  const linkLat =
    businessPlacesCheckedDetails.geometry !== "" &&
    businessPlacesCheckedDetails.geometry !== undefined
      ? businessPlacesCheckedDetails.geometry.location.lat
      : "";
  const linkLng =
    businessPlacesCheckedDetails.geometry !== "" &&
    businessPlacesCheckedDetails.geometry !== undefined
      ? businessPlacesCheckedDetails.geometry.location.lng
      : "";
  const [flagResult, SetFlagResult] = useState(true);
  let { id } = useParams();
  useEffect(() => {
    if (flagResult === true && id) {
      SetFlagResult(false);
      dispatch(actions.getDetailsByPlaceId(id));
    }
    // eslint-disable-next-line
  }, [businessPlacesCheckedDetails]);
  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // };
  return (
    <>
      <HemletComponent
        seoTitle={seoTitle}
        seoDescription={seoDescription}
        seoKeywords={seoKeywords}
        seoImage={seoImage}
      />

      <div>
        <div id="wrapper">
          <Container fluid>
            <Row className=" mt-5 d-flex justify-content-start h-25 ml-md-5 pl-md-5">
              {businessPlacesCheckedDetails.address_components !== undefined ? (
                <Col xs={7}>
                  <h1 className="text-secondary font-weight-bold h1 pl-3">
                    {businessPlacesCheckedDetails.name} -
                    <span className="listing-tag">
                      <small className="font-weight-bold">
                        {" "}
                        {
                          businessPlacesCheckedDetails.address_components[2]
                            .long_name
                        }
                      </small>
                    </span>
                  </h1>
                </Col>
              ) : (
                ""
              )}
              {/* <Col xs={4}>
              <p className='text-secondary'>This information came from Google </p>
              <Button variant="warning" className="header-btn font-weight-bold" onClick={() => window.open('/add', "_blank")}>
                Take ownership of the business
              </Button>
            </Col> */}
            </Row>
          </Container>
          <Container>
            <Row>
              <Col
                lg={2}
                sm={6}
                xs={12}
                className="svgWrapp borderRight hCol  d-flex align-items-center justify-content-center"
              >
                <Icon name="chatSquare"></Icon>
                <label className="text-center mt-auto mb-auto mr-auto ml-2 text-center">
                  {" "}
                  {businessPlacesCheckedDetails.reviews !== undefined &&
                    businessPlacesCheckedDetails.reviews.length}
                  reviews
                </label>
              </Col>
              <Col
                lg={2}
                sm={6}
                xs={12}
                className="svgWrapp borderRight hCol  d-flex align-items-center justify-content-center"
              >
                <label className="text-center mt-auto mb-auto mr-auto ml-2 text-center">
                  {" "}
                  {businessPlacesCheckedDetails.rating &&(
                    <>
                      {" "}
                      <StarRatings
                        rating={businessPlacesCheckedDetails.rating}
                        starDimension="3vh"
                        starSpacing="0.2px"
                        starRatedColor={`var(--first-color)`}
                        numberOfStars={5}
                        // name='rating'
                      />
                      ( {businessPlacesCheckedDetails.user_ratings_total} )
                    </>
                  )}
                </label>
              </Col>
              <Col
                lg={3}
                sm={6}
                xs={12}
                className="svgWrapp borderRight hCol  d-flex align-items-center justify-content-center"
              >
                <Icon name="clockFill"></Icon>
                <label className="text-center mt-auto mb-auto mr-auto ml-2 text-center">
                  {businessPlacesCheckedDetails.opening_hours?.open_now ? "open now" : "close now"}
                </label>
              </Col>
              <Col
                lg={4}
                sm={6}
                xs={12}
                className="svgWrapp hCol  d-flex align-items-center justify-content-center"
              >
                <Icon name="place"></Icon>{" "}
                <Link
                  className="mt-auto mb-auto mr-auto ml-2 text-center text-secondary "
                  onClick={() => setModaMaplShow(true)}
                >
                  {businessPlacesCheckedDetails?.formatted_address}
                </Link>
              </Col>
            </Row>
          </Container>
          <div>
            <div>
              <hr className="underline"></hr>
            </div>

            <BusinessPhotos />
            <div>
              <hr className="underline"></hr>
            </div>

            <Modal show={modal} size="lg" onHide={() => setModal(false)}>
              <Modal.Body>
                {businessPlacesCheckedDetails?.photos?.length>0 && (
                  <SRLWrapper options={businessPlacesCheckedDetails.photos}>
                    {businessPlacesCheckedDetails.photos.map((item) => (
                      <img
                        alt=""
                        className="image col-lg-4 col-md-6 col-sm-12 col-12 paddingImg"
                        src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${item.photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&maxwidth=480&maxheight=480`}
                      />
                    ))}
                  </SRLWrapper>
                ) }
              </Modal.Body>
            </Modal>

            <div className="container">
              <div className="row d-flex justify-content-start pl-4">
                <div
                  className={
                   (linkLat  &&  linkLng )
                      ? "d-block businessCategories col-lg-2 col-md-4 col-sm-6"
                      : "d-none"
                  }
                >
                  <a
                    href={`https://waze.com/ul?ll=${linkLat},${linkLng}&navigate=yes`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icon name="navigarion"></Icon>
                    <label className="pl-3 text-dark">Navigation</label>
                  </a>
                </div>
                <div
                  className={
                    businessPlacesCheckedDetails.website
                      ? "d-block businessCategories col-lg-2 col-md-4 col-sm-6"
                      : "d-none"
                  }
                  onClick={() =>
                    window.open(
                      `${businessPlacesCheckedDetails.website}`,
                      "_blank"
                    )
                  }
                >
                  <Icon name="homeSite"></Icon>
                  <label className="pl-3">home site</label>
                </div>
                <div
                  className={
                    businessPlacesCheckedDetails.formatted_phone_number
                      ? "d-block businessCategories col-lg-2 col-md-4 col-sm-6"
                      : "d-none"
                  }
                  onClick={() =>
                    window.open(
                      `sms://${businessPlacesCheckedDetails.formatted_phone_number}`,
                      "_blank"
                    )
                  }
                >
                  <Icon name="message"></Icon>
                  <label className="pl-3">Send message</label>
                </div>
                <div
                  className={
                    businessPlacesCheckedDetails.formatted_phone_number
                      ? "d-block businessCategories col-lg-2 col-md-4 col-sm-6"
                      : "d-none"
                  }
                  onClick={() =>
                    window.open(
                      `tel://${businessPlacesCheckedDetails.formatted_phone_number}`,
                      "_blank"
                    )
                  }
                >
                  <Icon name="phone"></Icon>
                  <label className="pl-3">
                    {businessPlacesCheckedDetails.formatted_phone_number}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <MapModal
            textHeader={businessPlacesCheckedDetails?.formatted_address}
            show={modalMapShow}
            onHide={() => setModaMaplShow(false)}
          />
          {/* <Map  textHeader={businessPlacesCheckedDetails ?
            businessPlacesCheckedDetails.formatted_address : ""}
            show={modalMapShow}
            google={""}
            onHide={() => setModaMaplShow(false)} /> */}
          <div className="pt-5 d-flex justify-content-center wComments">
            <div className="subheading">
              <div className="subText font-weight-bold text-secondary pl-5">
                <h5>comments</h5>
              </div>
            </div>
          </div>
          {businessPlacesCheckedDetails?.reviews?.length && (
              <UserRecommendation
                flagSourceRecomendations={false}
                recomedation={businessPlacesCheckedDetails.reviews}
              />
            )}
          <Share url={window.location.href} />
          <Footer />
        </div>
      </div>
    </>
  );
};
export default PlaceDetails;
