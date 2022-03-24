import Helmet from "react-helmet";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

import ContactInfo from "../components/businessPage/ContactInfo";
import Logo from "../images/logo.png";
import FirstCard from "../components/searchResult/FirstCard";
import { useTranslation } from "react-i18next";
import "../styles/updateUserProfilePage.css";
import { getUserByUserName } from "../services/user";

export default function UserProfilePage(props) {
  const seoTitle = "Search Results | EasyCart";
  const seoDescription =
    "Search Results description content. this s going to contain few lines about this page";
  const seoImage = Logo;

  const { t } = useTranslation();
  const history = useHistory();
  const { userName } = useParams();

  const [spinnerFlag, setSpinnerFlag] = useState(true);
  const [user, setUser] = useState(props.user);

  useEffect(() => {
    if (user) setSpinnerFlag(false);
    else if (userName)
      getUserByUserName(userName)
        .then((data) => {
          setUser(data);
          setSpinnerFlag(false);
        })
        .catch((error) => {
          alert("user not found");
          history.goBack();
        });
    else alert("error");
    // eslint-disable-next-line
  }, [userName, user]);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{seoTitle}</title>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        {/* Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:description" content={seoDescription} />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content={seoImage} />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />
      </Helmet>
      {/* //check too many html elements */}
      {spinnerFlag === true ? (
        <div>
          <Container
            className="d-flex justify-content-center"
            style={{ marginTop: "150px" }}
          >
            <>
              <Skeleton
                count={6}
                style={{
                  margin: "10px",
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                }}
              />
            </>
          </Container>
          <Container
            className="d-flex justify-content-center"
            style={{ marginTop: "150px" }}
          >
            <Skeleton
              count={6}
              style={{
                margin: "10px",
                width: "200px",
                height: "200px",
              }}
            />
          </Container>
        </div>
      ) : (
        user && (
          <div>
            <Container fluid className="mt-5 d-flex  justify-content-center">
              <Row>
                <Col>
                  <h3 className="mt-5 title-profile justify-content-center">
                    {user.userName}&nbsp; {user.lastName}
                  </h3>
                </Col>
              </Row>
            </Container>
            <Container fluid className="d-flex  justify-content-center">
              <Row>
                <Col>
                  <img
                    className="img-fluid rounded-circle imgProfile2"
                    alt=""
                    src={`${
                      user.profileImg ||
                      "https://www.w3schools.com/howto/img_avatar2.png"
                    }`}
                  />
                </Col>
              </Row>
            </Container>
            <Container fluid className="mt-5 d-flex  justify-content-center">
              <Row>
                <Col>
                  <ContactInfo user={user} />
                </Col>
              </Row>
            </Container>

            <Container className="d-flex justify-content-center">
              <Row>
                <h3 className="mt-5 title-profile justify-content-center">
                  {t("user-profiles.business-for")}
                </h3>
              </Row>
            </Container>
            <Container>
              <Row>
                <Container className="cardsPositionFixed scroll">
                  <Row className="mt-4 d-flex justify-content-center">
                    {user.business?.map((item, i) => (
                      <FirstCard key={i} item={item} />
                    ))}
                  </Row>
                </Container>
              </Row>
            </Container>
          </div>
        )
      )}
    </>
  );
}
