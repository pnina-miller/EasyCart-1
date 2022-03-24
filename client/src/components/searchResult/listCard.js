import { withRouter, Link } from "react-router-dom";
import React from "react";
import { useTranslation } from "react-i18next";
import { Card } from "react-bootstrap";

import FavoritesIcon from "../utilities/FavoritesIcon";
import image from "../../images/image2.png";

import "../../styles/searchResult/productSearchResultSecond.css";

function ItemResultSearchSecond(props) {

  const { item } = props;
  const { t } = useTranslation();

  return (
    <>
      <Card className="second-Product mt-1 mb-1 ml-2">
        <Link
        to={`/${item.keyWords}`}
        target="_blank"
          className=" productSearch-db-a link-second-card"
        >
          {item.galery !== undefined && item.galery?.length === 0 ? (
            <Card.Img
              className="img-Second-Product"
              variant="top"
              src={image}
            />
          ) : (
            <Card.Img
              className="img-Second-Product"
              variant="top"
              src={item.galery[0]}
            />
          )}
        </Link>
        <FavoritesIcon business={item} />

        <Card.Body>
          <p className="font-weight-bold title-wrapper-second_product fontsTitle mb-4">
            {item.businessName}
          </p>
          <div className="text-wrapper-second_product d-flex flex-column mb-3 justify-content-between">
            <p className="fontsAddressCategoiesSecond">
              <b>{t(`cards.address`)}</b>:{" "}
              {item.adress !== undefined &&
                item.adress.street + " " + item.adress.city}
            </p>

            <p className="fontsAddressCategoiesSecond mt-2">
              <b>{t(`cards.categories`)}</b>:{" "}
              {item.category[0] !== undefined && item.category[0].categoryName}{" "}
              {item.category[1] !== undefined && (
                <>, {item.category[1].categoryName}</>
              )}
            </p>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
export default withRouter(ItemResultSearchSecond);
