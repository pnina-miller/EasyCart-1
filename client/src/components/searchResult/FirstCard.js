import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, Container, Row } from "react-bootstrap";
import React from "react";

import CHookDistanceCalculation from "../../custom hooks/CHookDistanceCalculation";
import FavoritesIcon from "../utilities/FavoritesIcon";
import useOpenHours from "../../custom hooks/CHookOpenHours";
import image from "../../images/image2.png";
import Icon from "../utilities/Icon";

import "../../styles/searchResult/firstCard.css";

function ItemResultSearchFirst(props) {
  const { item } = props;
  const { t } = useTranslation();
  const isOpen = useOpenHours(item);

  return (
    <>
      <Card className="first-search-card d-flex col-lg-4 col-sm-6 col-xs-12">
        <Link
          to={`/${item.keyWords}`}
          target="_blank"
          className=" productSearch-db-a link-card"
        >
          <Card.Img
            className="first-search-card-img"
            variant="top"
            src={item.galery?.length > 0 ? item.galery[0] : image}
          />
        </Link>
        <div className="icon-favorite">
          <FavoritesIcon business={item} />
        </div>
        <Link
          to={`/${item.keyWords}`}
          target="_blank"
          className="productSearch-db-title"
        >
          <Card.Body className="first-search-card-body">
            <Container className="first-search-name-title d-flex-column justify-content-center ">
              <Row>
                <b className="fontsNameSearch">{item.businessName}</b>
              </Row>
              <Row>
                <p className="fontsAddressCategoies mb-0">
                  <b>{t(`cards.address`)}</b>:{" "}
                  {item.adress !== undefined &&
                    item.adress.street + " " + item.adress.city}
                </p>
                <p className="fontsAddressCategoies mb-0">
                  {item.category?.length > 1 && (
                    <>
                      <b>{t(`cards.categories`)}</b>:
                      {item.category[0].categoryName}
                      {item.category[1].categoryName}
                    </>
                  )}
                </p>
              </Row>
              {/* <hr className="solid"></hr> */}
              <Row className="first-search-detailes justify-content-between wrapper-padding">
                {/* <div className=" d-flex align-items-center justify-content-between"> */}
                {/* <div className="wrapper-time-delivery d-flex align-items-center justify-content-between w-100"> */}
                <Card.Text>
                  <Icon name="clockFill"></Icon>
                  <small className="text-muted ml-1">{isOpen}</small>
                </Card.Text>

                <Card.Text>
                  <Icon name="place"></Icon>
                  {item.location && (
                    <small className="text-muted ml-1">
                      <CHookDistanceCalculation
                        lat={item.location?.lat}
                        lng={item.location?.lng}
                      />
                    </small>
                  )}
                </Card.Text>

                <Card.Text>
                  <Icon name="review"></Icon>
                  <small className="text-muted ml-1">{item.totalClicks} </small>
                </Card.Text>
                {/* </div> */}
                {/* </div> */}
              </Row>
            </Container>
          </Card.Body>
        </Link>
      </Card>
    </>
  );
}
export default ItemResultSearchFirst;
