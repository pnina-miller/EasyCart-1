import { Card, Col, Container, Row, Carousel } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import FavoritesIcon from "../utilities/FavoritesIcon";
import { actions } from '../../redux/Action';
import useOpenHours from "../../custom hooks/CHookOpenHours";
import image from "../../images/image2.png";
import Icon from "../utilities/Icon";

import "bootstrap/dist/css/bootstrap.min.css";

import "../../styles/homePage/topBusinessesSection.css";
import "../../styles/productSearchResult.css";

export default function TopBusinessesSection() {

  const dispatch = useDispatch();
  const AllPromotedBusiness = useSelector(
    (state) => state?.business?.AllPromotedBusiness || []  );

  const [promotedBusinessSmall, setPromotedBusinessSmall] = useState([]);
  const [promotedBusinessBig, setPromotedBusinessBig] = useState([]);
  const [/*isScreenSizeLarge*/, setIsScreenSizeLarge] = useState(
    window.innerWidth > 425 ? "d-none" : "d-block"  );

  useEffect(() => {
    dispatch(actions.getPromotedBusinesses());
  },[dispatch])
  useEffect(() => {
    window.addEventListener("resize", changeIsScreen);
    return () => window.removeEventListener("resize", changeIsScreen);
  }, []);

  useEffect(() => {
    AllPromotedBusiness.forEach((element) => {
      if (element.galery?.length >= 5 && setPromotedBusinessBig.length < 3)
        setPromotedBusinessBig((oldPromotedBusinessBig) => [
          ...oldPromotedBusinessBig,
          element,
        ]);
      else
        setPromotedBusinessSmall(oldPromotedBusinessSmall => [...oldPromotedBusinessSmall, element])
    });
  }, [AllPromotedBusiness]);

  const changeIsScreen = () => {
    setIsScreenSizeLarge(window.innerWidth > 425);
  };
  return (
    <>

      {promotedBusinessSmall?.length > 0 && (
        <section className="wrapper-section-topBusiness">
          <Carousel className="showCarousel">
            {promotedBusinessSmall.map((e, index) => {
              return (
                <Carousel.Item key={`itemCarouserl${index}`}>
                  <BuisnessCard
                    promotedBusiness={promotedBusinessSmall[index]}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <Container className="showComponent">
            <Row className="row-wrapper-topBuisness">
              <Col className="col-right-topBuisness" lg="8" md="10" sm="12">
                <Row className="top-row-topBuisness">
                  <Col lg="7">
                    <BuisnessCard promotedBusiness={promotedBusinessSmall[0]} />
                  </Col>
                  <Col lg="5">
                    <BuisnessCard promotedBusiness={promotedBusinessSmall[1]} />
                  </Col>
                </Row>
                <Row className="bottom-row-topBuisness">
                  <Col lg="5">
                    <BuisnessCard promotedBusiness={promotedBusinessSmall[2]} />
                  </Col>
                  <Col lg="7">
                    <BuisnessCard promotedBusiness={promotedBusinessSmall[3]} />
                  </Col>
                </Row>
              </Col>
              <Col className="col-left-topBuisness" lg="4" md="10" sm="12">
                <BuisnessCard promotedBusiness={promotedBusinessSmall[4]} />
              </Col>
            </Row>
          </Container>
          {promotedBusinessBig[0] && (
            <PromotedBusinessView promotedBusiness={promotedBusinessBig[0]} />
          )}
          {promotedBusinessBig[1] && (
            <PromotedBusinessView promotedBusiness={promotedBusinessBig[1]} />
          )}
          {promotedBusinessBig[2] && (
            <PromotedBusinessView promotedBusiness={promotedBusinessBig[2]} />
          )}
        </section>
      )}
    </>
  );
}

function BuisnessCard({ promotedBusiness }) {
  const openingHours = useOpenHours(promotedBusiness);
  const { t } = useTranslation();

  return (
    <>

      {promotedBusiness && (
        <Card className="topBuisness d-flex">
          <Link
          className="link-top"
            to={`/${promotedBusiness.keyWords}`}
            target="_blank"
            onClick={(e) => {
              if (
                e.target.getAttribute("name") === "icon-heart-container" ||
                e.target.parentElement.parentElement.getAttribute("name") ===
                "icon-heart-container"
              )
                return;
            }}
          >
            <FavoritesIcon business={promotedBusiness} />
            <Card.Img
              className="img-topBuisness"
              variant="top"
              src={
                promotedBusiness.galery !== undefined
                  ? promotedBusiness.galery[0]
                  : image
              }
              alt={image}
            />

            <Card.Body className="card-body-topBuisness">
              <div className="wrapper-description-topBuisness d-flex flex-column justify-content-between">
                <div className="fontsNameSearch  font-weight-bold">
                  {promotedBusiness.businessName}
                  <p className="fontsAddressCategoies mb-0">
                    <b>{t(`cards.address`)}</b>:{" "}
                    {promotedBusiness.adress !== undefined &&
                      promotedBusiness.adress.street +
                      " " +
                      promotedBusiness.adress.city}
                  </p>
                </div>
              </div>
              <div className="description-and-price-wrapper d-flex-column justify-content-between  slideIn">
                <div className="wrapper-description-topBuisness d-flex flex-column justify-content-between">
                  <p className="fontsNameSearch  font-weight-bold">
                    {promotedBusiness.businessName}
                  </p>
                  <p className="fontsAddressCategoies mb-0">
                    <b>{t(`cards.address`)}</b>:{" "}
                    {promotedBusiness.adress !== undefined &&
                      promotedBusiness.adress.street +
                      " " +
                      promotedBusiness.adress.city}
                  </p>
                  <p className="fontsAddressCategoies mb-0">
                    <b>{t(`cards.categories`)}</b>:{" "}
                    {promotedBusiness.category[0] !== undefined &&
                      promotedBusiness.category[0].categoryName}{" "}
                    {promotedBusiness.category[1] !== undefined && (
                      <>, {promotedBusiness.category[1].categoryName}</>
                    )}
                  </p>
                </div>

                <hr className="solid"></hr>
                <div className="time-wrapper d-flex align-items-center justify-content-between">
                  <div className="wrapper-time-delivery d-flex align-items-center justify-content-between w-100">
                    <Card.Text className=" time p-product d-flex align-items-center">
                      <Icon name="clockFill" className="mr-2"></Icon>
                      {openingHours}
                    </Card.Text>

                    <Card.Text className=" time p-product">
                      <Icon name="place"></Icon>1.1Km
                    </Card.Text>

                    <Card.Text className="time p-product-search">
                      <Icon name="review"></Icon>
                      <small className="text-muted ml-1">
                        {promotedBusiness.totalClicks} Reviews
                      </small>
                    </Card.Text>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Link>
        </Card>
      )}
    </>
  );
}

function PromotedBusinessView({ promotedBusiness }) {
  const { t } = useTranslation();
  const openingHours = useOpenHours();

  return (
    <section className="wrapper-section-topBusiness d-flex justify-content-center">
      {promotedBusiness && (
        <Container className="promotedBusinessView-container">
          <Row>
            <h3>{promotedBusiness.businessName}</h3>
          </Row>
          <Row className="rowBuisnessPage">
            <label className="promoted-business-view-label">
              <Icon name="eye"></Icon>
              {promotedBusiness.totalClicks}
            </label>

            <label className="promoted-business-view-label">
              <Icon name="chatSquare"></Icon>
              {promotedBusiness
                ? promotedBusiness.userRecommendation.length
                : ""}{" "}
              {t("business-details.reviews")}
            </label>

            <label className="promoted-business-view-label">
              <Icon name="clockFill"></Icon>
              {openingHours}
            </label>

            <label className="promoted-business-view-label">
              <Icon name="place"></Icon>
              {promotedBusiness.adress
                ? promotedBusiness.adress.street +
                " " +
                promotedBusiness.adress.city +
                " " +
                promotedBusiness.adress.state
                : ""}
            </label>
            <label className="promoted-business-view-label">
              <FavoritesIcon business={promotedBusiness} />
            </label>
          </Row>
          <Link to={`/${promotedBusiness.keyWords}`}>
            <Row>
              <Col lg={6} className="promotedBusinessView-col">
                <Row className="promotedBusinessView-row">
                  <Col lg={6} className="promotedBusinessView-col">
                    <img alt=''
                      className="promotedBusinessView-img"
                      src={
                        promotedBusiness ? promotedBusiness.galery[0] : image
                      }
                    />
                  </Col>
                  <Col lg={6} className="promotedBusinessView-col">
                    <img alt=''
                      className="promotedBusinessView-img"
                      src={
                        promotedBusiness ? promotedBusiness.galery[1] : image
                      }
                    />
                  </Col>
                </Row>
                <Row className="promotedBusinessView-row">
                  <Col lg={6} className="promotedBusinessView-col">
                    <img alt=''
                      className="promotedBusinessView-img"
                      src={
                        promotedBusiness ? promotedBusiness.galery[2] : image
                      }
                    />
                  </Col>
                  <Col lg={6} className="promotedBusinessView-col">
                    <img alt=''
                      className="promotedBusinessView-img"
                      src={
                        promotedBusiness ? promotedBusiness.galery[3] : image
                      }
                    />
                  </Col>
                </Row>
              </Col>
              <Col lg={6} className="promotedBusinessView-col">
                <img alt=''
                  className="promotedBusinessView-img"
                  src={promotedBusiness ? promotedBusiness.galery[4] : image}
                />
              </Col>
            </Row>
          </Link>
        </Container>
      )}
    </section>
  );
}
