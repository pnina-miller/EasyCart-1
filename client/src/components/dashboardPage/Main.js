import { Container, Row, Col, Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import * as cloneDeep from "lodash/cloneDeep";
import {Spinner} from "react-bootstrap";
import { useSelector } from "react-redux";

import BarChart from "./BarChart";
import LineChart from "./LineChart";

import "bootstrap/dist/css/bootstrap.min.css";

import "../../styles/dashboardPage/cardDashboard.css";
import "../../styles/dashboardPage/sideBar.scss";

function Main(props) {

  const { currentBusiness, handleToggleSidebar } = props;
  const currentUserDetails = useSelector(state => state.user.currentUserDetails);
  const [spinnerFlag, setSpinnerFlag] = useState(false);
  const [cardsDetails, setCardsDetails] = useState([
    {
      backColor: "#d39e00",
      subject: "Lead",
      score: 40689,
      icon: "chatSquareColor",
    },
    { backColor: "#ffc107", subject: "Favorite", score: 40689, icon: "flag" },
    {
      backColor: "#f5e1a8",
      subject: "Business",
      score: 40689,
      icon: "headset",
    },
    { backColor: "#fdf6e3", subject: "View", score: 40689, icon: "headset" },
  ]);

  useEffect(() => setSpinnerFlag(true), [currentUserDetails])

  useEffect(() => {
    if (currentUserDetails !== undefined)
      setSpinnerFlag(true);
    setCardsDetailsFun([currentBusiness?.totalClicks, currentBusiness?.totalAddedToFavorites, currentBusiness?.numOfBusiness, 0, 0]);
    // eslint-disable-next-line
  }, [currentBusiness])

  function setCardsDetailsFun(arrDetails) {
    let cardsDetailsArr = cloneDeep(cardsDetails);
    cardsDetailsArr.map((item, i) => (item.score = arrDetails[i]));
    setCardsDetails(cardsDetailsArr);
  }

  return (
    <main className="m-auto">
      {currentBusiness ? <>
        <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        </div>
        <div className="block">
          {spinnerFlag === false ? (
            <Spinner animation="border" variant="secondary" />
          ) : (

            <Container fluid>
              <Row>
                <Col xs={12} className="pt-5">
                  <h3 className="pl-4">{currentBusiness.businessName} Dashboard</h3>
                  <div>
                    {/* <hr className="underlineProfile"></hr> */}
                  </div>
                </Col>
              </Row>

              <Row>
                {cardsDetails.map((item, index) => {
                  return (
                    <Col key={`card${index}`} xs={12} sm={6} lg={3}>
                      <div className="text-left p-5 d-inline">
                        <Card
                          className="cardStyle pl-3 cancelBorder"
                          style={{ backgroundColor: item.backColor }}
                        >
                          <blockquote className="blockquote mb-0 card-body card-body-Main">
                            <header className="blockquote-footer textBlack headerSetStyle">
                              <small>total {item.subject}</small>
                            </header>
                            <b>
                              <p className="m-0">{item.score}</p>
                            </b>
                            <footer className="blockquote-footer textBlack text-left">
                              <small className="">8.5% Up to yesterday</small>
                            </footer>
                          </blockquote>
                        </Card>
                      </div>
                    </Col>
                  );
                })}
              </Row>
              <Row className="marginUp">
                <Col xs={12} md={12} lg={6}>
                  <LineChart />
                </Col>
                <Col xs={12} md={12} lg={6}>
                  <BarChart />
                </Col>
              </Row>
            </Container>
          )}
        </div>
      </> : <h3>no business</h3>
      }
    </main>
  );
};

export default Main;
