import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

import { actions } from "../../redux/Action";
import Icon from "./Icon";

import "../../styles/homePage/topBusinessesSection.css";
import "../../styles/productSearchResult.css";

function FavoritesIcon(props) {

  const { business, businessPage ,setBusiness} = props;
  const [flag, setFlag] = useState();
  const dispatch = useDispatch();
  const favorites = useSelector(
    state => state.user.currentUserDetails?.favorites);
  const idUser = useSelector(state => state.user?.currentUserDetails);

  useEffect(() => {
    favorites && setFlag(favorites?.find((fav) => fav === business?._id) ? true : false)
  }, [favorites, business]);



  const onChangeHeart = (e) => {
    if (idUser._id !== business.owner) {
      if (idUser) {
        if (flag === false) {
          e.target.style.fill = "#f2bb27";
          e.target.style.opacity = "1";
          dispatch(
            actions.addFavoritesToBusiness({
              idUser: idUser._id,
              businessId: business._id,
              setBusiness:setBusiness
            })
          );
        } else {
          e.target.style.fill = "#707070";
          dispatch(
            actions.deleteFavoraits({
              userId: idUser._id,
              businessId: business._id,
              setBusiness:setBusiness

            })
          );
        }
      }
    }
    else {
      alert("Your business cannot be prioritized")
    }
  };

  return (
    <>
      <div
        className={businessPage ? "pr-2  heart-icon-style" : "heart-icon-style"}
        name="icon-heart-container"
        onClick={onChangeHeart}
        style={flag ? { fill: "#f2bb27" } : { fill: "#707070" }}
      >
        <div className="fit-content cursor-p"  title="Add to favorite" data-toggle="tooltip">
          <Icon name="Heart"></Icon>
        </div>
      </div>
    </>
  );
}
export default FavoritesIcon;