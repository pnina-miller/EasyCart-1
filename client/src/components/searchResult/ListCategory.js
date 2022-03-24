import { useParams, useLocation, useHistory } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Container } from "react-bootstrap";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie";
import * as qs from "qs";

import GeolocationService from "../../redux/middleWares/Geolocation";
import ListPlacesCard from "./listPlacesCard";
import FirstPlacesCard from "./FirstPlacesCard";
import { actions } from "../../redux/Action";
import UserLocation from "../UserLocation";
import ListCard from "./listCard";
import FirstCard from "./FirstCard";
import Icon from "../utilities/Icon";

import "bootstrap/dist/css/bootstrap.min.css";

import NotFoundanimationData from "../../styles/animations/notFoundAnimation";
import "../../styles/searchResult/listCategory.css";

const SearchProducts = () => {
  const defaultAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: NotFoundanimationData,
  };
  const { keyword } = useParams();
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  let result = keyword;
  const selectedText = useSelector((state) => state.business.selectedText);
  const resultOfSearch = useSelector((state) => state.search.resultOfSearch);
  const nearPlacesByText = useSelector(
    (state) => state.places.nearPlacesBySearch
  );
  const currentUserLocation = useSelector(
    (state) => state.location.currentUserLocation
  );
  const nextTokenPage = useSelector(
    (state) =>
      state.search.nextTokenPage.length > 0 && state.search.nextTokenPage
  );
  const sortBusinesses = useSelector((state) => state.search.sortBusinesses);
  const sortAllBusinesses = useSelector(
    (state) => state.search.sortAllBusinesses
  );
  const flagWhatToShow = useSelector((state) => state.business.flagWhatToShow);
  // const [/*numResults*/, setNumResults] = useState(1);

  useEffect(() => {
    let reset = [];
    let popularity;
    let open;
    let service;

    dispatch(actions.setSortAllBusinesses(reset));

    if (result && currentUserLocation.latitude !== "") {
      // dispatch(actions.setSortBusinesses(""));

      let text =
        selectedText !== ""
          ? selectedText
          : {
              value: keyword,
              db: location.state?.db ? location.state.db : "search",
              icon: "category",
              id: location.state?.id,
            };
      let query;
      try {
        open = qs.parse(history.location.search, {
          ignoreQueryPrefix: true,
        }).open;
        popularity = qs.parse(history.location.search, {
          ignoreQueryPrefix: true,
        }).popularity;
        service = qs.parse(history.location.search, {
          ignoreQueryPrefix: true,
        }).service;
        query = { open, popularity, service };
        if (popularity) {
          dispatch(actions.getBusinessesByPopularity({ text, query }));
        } else {
          // let num = 0
          // setNumResults(num)
          dispatch(
            actions.getResultsOfSearch({ text, currentUserLocation, query })
          );
          // num = 1
          // setNumResults(num)
        }
      } catch (_) {
        console.error(
          "Please enter valid URL. A valid URL starts with 'http://'."
        );
      }
      dispatch(actions.setNextTokenPage(reset));
      dispatch(actions.setResultPlaces(reset));
      text = result;
      if (open === "now") {
        const placeOpen = "opennow";
        dispatch(
          actions.getPlacesBySearch({ text, currentUserLocation, placeOpen })
        );
      } else {
        dispatch(actions.getPlacesBySearch({ text, currentUserLocation }));
      }
    }
    // eslint-disable-next-line
  }, [location, currentUserLocation]);

  useEffect(() => {
    sortBusinesses?.length && sortbynearlest();
    // eslint-disable-next-line
  }, [sortBusinesses, nearPlacesByText]);

  async function sortbynearlest() {
    let myarr = [];
    let sort = [];
    myarr = await GeolocationService.beginSort(
      currentUserLocation.latitude,
      currentUserLocation.longitude,
      sortBusinesses
    );
    for (let i = 0; i < myarr.length; i++) {
      sort[i] = sortBusinesses[myarr[i].index];
    }
    dispatch(actions.setSortAllBusinesses(sort));
  }

  function searchPlaces(text, currentUserLocation, nextToken, l) {
    dispatch(
      actions.getPlacesBySearch({ text, currentUserLocation, nextToken })
    );
  }

  // function morePlaces(currentUserLocation) {
  //   let query = location.search
  //   let num = numResults + 1
  //   setNumResults(num)
  //   dispatch(actions.getResultsOfSearch({ text: selectedText !== "" ? selectedText : { value: keyword, db: location.state?.db ? location.state.db : "search", icon: "category", id: location.state?.id }, currentUserLocation, query, numResults }))
  // }

  return (
    <>
      <div className="container-fluid marginSide">
        <div className="row d-flex justify-content-end align-items-center">
          <div
            type="button"
            onClick={() => {
              dispatch(actions.setWhatToShow(1));
            }}
            className="mt-3 ml-3 mb-xs-3 d-inline"
          >
            <Icon name="menu"></Icon>
          </div>
          <div
            type="button"
            onClick={() => {
              dispatch(actions.setWhatToShow(0));
            }}
            className="mt-3 mr-4 ml-3 mb-xs-3 d-inline"
          >
            <Icon name="list"></Icon>
          </div>
        </div>
      </div>
      {currentUserLocation.latitude === "" ? <UserLocation /> : ""}

      {resultOfSearch &&
      resultOfSearch.business !== undefined &&
      sortAllBusinesses !== undefined &&
      sortAllBusinesses.length > 0
        ? ""
        : resultOfSearch.error === "error"
        ? ""
        : ""}
      <div className="container cardsPositionFixed scroll">
        <div className="row mt-4 d-flex justify-content-center">
          {
            nearPlacesByText &&
              nearPlacesByText.error === "error" &&
              resultOfSearch &&
              resultOfSearch.error === "error" && (
                <>
                  <Lottie
                    options={defaultAnimationOptions}
                    height={300}
                    width={300}
                  />
                  <p className="text-p">לצערנו לא נמצאו תוצאות לחיפושך</p>
                </>
              )
          }
          <Container>
            <Row>
              {resultOfSearch?.business?.map((option, i) =>
                    flagWhatToShow ? (
                      <Col  xs={12} md={6} lg={4}>
                        <FirstCard key={i} item={option} />
                      </Col>
                    ) : (
                      <ListCard key={i} item={option} />
                    )
                  )
                }
              {sortAllBusinesses?.map((option, i) => 
                    <>
                      {option.business_status ? (
                        flagWhatToShow ? (
                          <FirstPlacesCard key={i} item={option} />
                        ) : (
                          <Col  xs={12} md={6} lg={4}> className="ml-2">
                            <ListPlacesCard key={i} item={option} />
                          </Col>
                        )
                      ) : flagWhatToShow ? (
                        // <Col>
                        <FirstCard key={i} item={option} />
                        // </Col>
                      ) : (
                        <Col lg={12} className="ml-2">
                          <ListCard key={i} item={option} />
                        </Col>
                      )}
                    </>
                  )}
            </Row>
          </Container>
        </div>
      </div>

      {nextTokenPage[nextTokenPage.length - 1] !== undefined &&
      sortAllBusinesses.length > 0 ? (
        <div className="container">
          <div className="row">
            <div className="col-12  d-flex justify-content-center">
              <button
                type="button"
                className="more-Results mt-5 mb-5 font-weight-bold"
                onClick={() => {
                  // nextTokenPage[nextTokenPage.length - 1] !== undefined &&
                  searchPlaces(
                    result,
                    currentUserLocation,
                    nextTokenPage[nextTokenPage.length - 1],
                    nextTokenPage.length
                  );
                  // morePlaces(currentUserLocation)
                }}
              >
                {t(`searchResults.show-more`)}
              </button>
              {/* <Button onClick={()=>{morePlaces()}}></Button> */}
            </div>
          </div>
        </div>
      ) : (
        resultOfSearch.error === undefined && (
          <SkeletonTheme>
            <Skeleton count={6} className="skelaton-size" />
          </SkeletonTheme>
        )
      )}
    </>
  );
};

export default SearchProducts;
