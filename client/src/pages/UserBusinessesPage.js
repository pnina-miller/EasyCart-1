//V
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import UserBusinessCard from "../components/businessesCards/UserBusinessCard";

import "../styles/searchResult/listCategory.css";
import "../styles/dashboardPage/dashboardPages.css";

import addBusiness from "../images/add-business.png";

function UserBusinessesPage() {
  const { t } = useTranslation();

  const [skeletonFlag, setSkeletonFlag] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const currentUserDetails = useSelector(
    (state) => state.user.currentUserDetails
  );

  useEffect(() => {
    if (currentUserDetails) setSkeletonFlag(false);
  }, [currentUserDetails]);

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  return (
    <Container
      fluid
      className="mt-5 stylePrfile d-flex justify-content-between"
    >
      {skeletonFlag ? (
        <SkeletonTheme>
          <Skeleton
            count={6}
            style={{
              margin: "10px",
              width: "200px",
              height: "200px",
            }}
          />
        </SkeletonTheme>
      ) : (
        <Container fluid className="d-flex justify-content-center">
          <Row className="business-row-wrapper">
            <Col xs={12} className="pt-5">
              <h3 className="pl-4">{t("my-business.my-business")}</h3>
              <div className="pl-4 w-100">
                {/* <hr className="underlineBusiness"></hr> */}
              </div>
            </Col>
            <Col xs={12} lg={3} sm={6} md={5} className="p-2">
              <Link to="/add">
                <Card className=" ProductCard-business">
                <Image
                  fluid
                  src={addBusiness}
                  className="card img-add-business"
                />
                </Card>
              </Link>
            </Col>
            {currentUserDetails?.business?.map((item, i) => (
              <Col xs={12} lg={3} sm={6} md={5} className="p-2">
                <UserBusinessCard
                  toggled={toggled}
                  collapsed={collapsed}
                  handleToggleSidebar={handleToggleSidebar}
                  handleCollapsedChange={handleCollapsedChange}
                  key={i}
                  item={item}
                />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </Container>
  );
}
export default UserBusinessesPage;
