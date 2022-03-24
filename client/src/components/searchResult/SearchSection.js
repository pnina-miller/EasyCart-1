import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Container, Row, InputGroup } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import * as qs from "qs";

import "../../styles/searchResult/searchCategory.css";
import "bootstrap/dist/css/bootstrap.min.css";

function SearchArea(){

  const { t } = useTranslation();
  const history = useHistory();
  const { keyword } = useParams();
  const sortAllBusinesses = useSelector(
    (state) => state.search.sortAllBusinesses);
  const resultOfSearch = useSelector((state) => state.search.resultOfSearch);
  const currentUserAddress = useSelector(
    (state) => state.location.currentUserAddress);
  const address = useSelector((state) => state.location.address);
  const selectedText = useSelector((state) => state.business.selectedText);
  const [countBusiness, setCountBusiness] = useState(0);
  const [showNote, setShowNote] = useState(false);

  const _handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchClick();
    }
  };

  useEffect(() => {
    setCountBusiness(0);
    let openQuery = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    }).open;
    let popularQuery = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    }).popularity;

    if (openQuery && ((openQuery !== "now" && !popularQuery) || popularQuery)) {
      setShowNote(true);
    } else {
      setShowNote(false);
    }
    if (
      resultOfSearch.business !== undefined &&
      resultOfSearch.business.length > 0
    ) {
      if (sortAllBusinesses !== undefined && sortAllBusinesses.length > 0) {
        setCountBusiness(
          resultOfSearch.business.length + sortAllBusinesses.length
        );
      } else {
        setCountBusiness(resultOfSearch.business.length);
      }
    } else {
      if (sortAllBusinesses !== undefined && sortAllBusinesses.length > 0) {
        setCountBusiness(sortAllBusinesses.length);
      }
    }
    // eslint-disable-next-line
  }, [countBusiness, sortAllBusinesses, resultOfSearch]);

  function searchClick() {
    const location = {
      pathname: `/${selectedText.value}`,
      state: { db: selectedText.db ,id:selectedText.id }
    }
    if (selectedText !== undefined && selectedText.db === "search") {
      history.push(`/search/${selectedText.value}`);
    }
    if (selectedText !== undefined && selectedText.db !== "search") {
      history.push(location);
    }
  }

  return (
    <>
      <div className="container-fluid   mt-5  ">
        <div className="row d-flex justify-content-center">
          <div className="col-5 mt-5">
            {countBusiness > 0 ? (
              <h5 className="font-weight-bold">
                {" "}
                {t(`searchResults.serach-results-for`)} {keyword}{" "}
              </h5>) : (
              <Skeleton />)}
          </div>
          <div className="col-8 mt-0.5 font-weight-bold">
            {countBusiness > 0 ? (
              <div>
                {countBusiness} {t(`searchResults.serach-results-for`)} {keyword}{" "}
                {t(`searchResults.location`)}{" "}
                {currentUserAddress !== ""
                  ? currentUserAddress
                  : address !== ""
                    ? address
                    : "תל אביב יפו"}
                {showNote && (
                  <div className="col-12 mt-0.5 font-weight-bold">
                    {t(`searchResults.note`)}
                  </div>
                )}
              </div>
            ) : (<Skeleton />
            )}
          </div>
        </div>
      </div>
      <Container className="widthInput d-flex justify-content-between">
        <Row
          className="d-flex align-items-center justify-content-center  mb-5 overFlowSearch serchSectionShadow w-100"
          onKeyPress={_handleKeyDown}
        >
          {countBusiness > 0 ? (
            <InputGroup className="borderRadiuse ">
              <InputGroup.Append className="p-2 d-none d-md-block">
              </InputGroup.Append>
            </InputGroup>) : (
            <SkeletonTheme>
              <Skeleton width={500} height={60} />
            </SkeletonTheme>
          )}
        </Row>
      </Container>
    </>
  );
};

export default SearchArea;
