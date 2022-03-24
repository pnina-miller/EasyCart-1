import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

import { actions } from "../redux/Action";
import HemletComponent from "../components/utilities/hemlet";
import FavoritesCard from "../components/businessesCards/Favorites";

import "../styles/dashboardPage/favorites.css";

import Logo from "../images/logo.png";

function FavoritesPage() {
  const seoTitle = "Dasboard | EasyCart";
  const seoDescription =
    "Dasboard description content. this s going to contain few lines about this page";
  const seoImage = Logo;
  const seoKeywords = ["Business", "EasyCart"];

  const dispatch = useDispatch();
  //chack
  const arrFavoraits = useSelector((state) => state.business.favoraitsArr);
  const currentUserDetails = useSelector(
    (state) => state.user.currentUserDetails
  );
  const [flag2, setFlag2] = useState(true);
  const [spinnerFlag, setSpinnerFlag] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (currentUserDetails && flag2) {
      //check what used flag2
      dispatch(actions.getAllFavoraits(currentUserDetails._id));
      setFlag2(false);
    }
    // eslint-disable-next-line
  }, [currentUserDetails, arrFavoraits]);
  useEffect(() => arrFavoraits && setSpinnerFlag(true), [arrFavoraits]);

  return (
    <>
      <HemletComponent
        seoTitle={seoTitle}
        seoDescription={seoDescription}
        seoKeywords={seoKeywords}
        seoImage={seoImage}
      />

      {!spinnerFlag ? (
        <Container style={{ marginTop: "150px" }}>
          <>
            <Skeleton
              count={6}
              style={{
                margin: "10px",
                width: "200px",
                height: "200px",
              }}
            />
          </>
        </Container>
      ) : (
        <Container fluid className="mt-5 stylePrfile">
          <Row>
            <Col xs={12} className="pt-5">
              <h3 className="pl-4">{t("wish-list.my-favorite")}</h3>
              <div>
                {/* <hr className="underfavorite"></hr> */}
              </div>
            </Col>
          </Row>
          <Container className="kk">
            <Row>
              {arrFavoraits[0] ? (
                arrFavoraits.map((item, i) => (
                  <Col xs={12} sm={6} md={4} lg={3}>
                    {spinnerFlag && (
                      <FavoritesCard key={i} item={item}></FavoritesCard>
                    )}
                  </Col>
                ))
              ) : (
                <h1>no favorites</h1>
              )}
            </Row>
          </Container>
        </Container>
      )}
    </>
  );
}
export default FavoritesPage;
