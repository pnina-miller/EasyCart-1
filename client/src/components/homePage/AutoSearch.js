import { Row, Col, Button, InputGroup, OverlayTrigger, Tooltip, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import AutoCompleteSearch from "../AutoCompleteSearch";
import Autocomplete from "./AutoSearchSecond ";
import { actions } from "../../redux/Action";
import UserLocation from "../UserLocation";
import Icon from "../utilities/Icon";
// import TextInput from 'react-autocomplete-input';
// import 'react-autocomplete-input/dist/bundle.css';

import "../../styles/homePage/searchSection.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Auto = () => {

  const { t, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const [display, setdisplay] = useState("d-none");
  const currentUserLocation = useSelector((state) => state.location.currentUserAddress);
  const businessNames = useSelector((state) => state.business.businessNames);
  const subCategories = useSelector((state) => state.category.subCategories);
  const selectedText = useSelector((state) => state.business.selectedText);
  const category = useSelector((state) => state.mainCategories.category);
  const address = useSelector((state) => state.location.address);
  const [flagCurrentLocetion, setFlagCurrentLocetion] = useState(false);
  const [flagToAodioSearch, setFlagToAodioSearch] = useState(false);
  const [showAudio, setShowAudio] = useState(false);
  const [show, setShow] = useState(false);
  const [flagLocetion, setFlagLocetion] = useState(true);
  const [textContent, setTextContent] = useState("");
  const [index, setIndex] = useState(0);
  // eslint-disable-next-line
  const arrToGoOver = [{ value: "", db: "", icon: undefined, id: undefined }];


  useEffect(() => {
    dispatch(actions.getMainCategories());
    dispatch(actions.allNamesOfBusinesses());
    // dispatch(actions.getAllCategories());
  }, [dispatch])

  useEffect(() => {
    if (businessNames !== undefined) {
      for (let i = 0; i < businessNames.length; i++) {
        if (businessNames[i].keyWords !== undefined) {
          arrToGoOver.push({ value: businessNames[i].keyWords, label: businessNames[i].keyWords, db: "business", icon: businessNames[i].galery && businessNames[i].galery[0], id: businessNames[i]._id })
        }
      }
    }
    if (category !== undefined) {
      for (let i = 0; i < category.length; i++) {
        if (category[i].mainCategoryName !== undefined) {
          arrToGoOver.push({ value: category[i].mainCategoryName, label: category[i].mainCategoryName, db: "mainCategory", icon: category[i].icons, id: category[i]._id })
        }
      }
    }
    if (subCategories !== undefined) {
      for (let i = 0; i < subCategories.length; i++) {
        if (subCategories[i].categoryName !== undefined) {
          arrToGoOver.push({ value: subCategories[i].categoryName, label: subCategories[i].categoryName, db: "category", icon: "category", id: subCategories[i]._id })
        }
      }
    }
    arrToGoOver.sort(function (a, b) {
      if (a.value.toLowerCase() < b.value.toLowerCase()) { return -1; }
      if (a.value.toLowerCase() > b.value.toLowerCase()) { return 1; }
      return 0;
    })
    // eslint-disable-next-line 
  }, [subCategories, businessNames, category, dispatch, arrToGoOver])

  function searchClick() {
    let reset = []
    dispatch(actions.setResultDb({ reset: reset }));
    if (selectedText.value === undefined) history.push("/search")
    else {
      const location = {
        pathname: `/${selectedText.value}`,
        state: { db: selectedText.db, id: selectedText.id }
      }

      if (selectedText?.db === "search") {
        history.push(`/search/${selectedText.value}`);
      }
      if (selectedText?.db !== "search") {
        history.push(location);
      }
    }

  }

  recognition.onresult = function (event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    dispatch(actions.setSelectedText(transcript));
    setTextContent(transcript);
  };

  const handleRecord = () => recognition.start();

  const _handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchClick();
    }
    if (event.key === 40) {
      setIndex(index + 1);
    }
  };

  return (
    <>
      <Container>
        <Row
          className="d-flex align-items-center justify-content-center mt-2 ml-0 overFlowSearch"
          onKeyPress={_handleKeyDown}
        >
          <Col xl={9} lg={10} md={11} sm={12}>
            <InputGroup className="whiteColor search-style borderRadiuseSearch wrapperApp justify-content-between flex-nowrap">
              {!showAudio ?
                <Autocomplete options={arrToGoOver} index={index} />
                : <input
                  type="text"
                  placeholder={
                    flagToAodioSearch
                      ? "speak now"
                      : `${t("search-section.search-placeholder")}`
                  }
                  onFocus={(e) => (e.currentTarget.placeholder = "")}
                  onBlur={(e) =>
                  (e.currentTarget.placeholder = flagToAodioSearch
                    ? "speak now"
                    : `${t("search-section.search-placeholder")}`)
                  }
                  className="focusCancel heightSearch  borderNone form-control m-auto font text-dark-input"
                  value={flagToAodioSearch ? textContent : undefined}
                />
              }
              <div className="d-flex">
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltip-bottom">Search With Your Voice</Tooltip>
                  }
                >
                  <button
                    className="icon-btn--click icon-btn:focus icon-btn m-0 w-30"
                    onClick={() => {
                      handleRecord();
                      setFlagToAodioSearch(true);
                      setShowAudio(true);
                    }}
                  >
                    <Icon name="microphone" className="heightSearch" />
                  </button>
                </OverlayTrigger>

                <InputGroup.Append className="p-2 d-none d-md-block">
                  <Button
                    className=" btn  focusCancel  borderRadiuse  pl-md-5 pr-md-5 h-100 btnNewStyle  btn-secondary "
                    variant="outline-secondary"
                    onClick={() => {
                      searchClick();
                    }}
                  >
                    {t("search")}
                  </Button>
                </InputGroup.Append>
              </div>
            </InputGroup>

            <Button
              className="d-md-none focusCancel btnNewStyle  btnColor borderNone borderRadiuse font pl-md-5 pr-md-5 w-100 mt-3"
              variant="outline-secondary"
              onClick={() => {
                searchClick();
              }}
            >
              {t("search")}
            </Button>

            <div className="d-flex justify-content-between">
              <Button
                onClick={() => {
                  setdisplay("d-block");
                  setShow(!show);
                  setFlagLocetion(true);
                }}
                className="TextBtn focusCancel borderNone cancelHover w-lg-25  text-left"
                variant=""
              >
                <Icon name="place"></Icon> {t(`search-section.icon-2`)}
              </Button>
              <Button
                onClick={() => {
                  setdisplay("d-block");
                  setShow(!show);
                  setFlagLocetion(true);
                }}
                className="TextBtn focusCancel borderNone cancelHover w-lg-25 text-right"
                variant=""
              >
                <Icon name="circle"></Icon>
                {currentUserLocation !== ""
                  ? currentUserLocation
                  : address !== ""
                    ? address
                    : t(`search-section.icon-1`)}{" "}
              </Button>
            </div>
          </Col>
        </Row>
        {show && (
          <>
            <Row className="d-flex align-items-center justify-content-center change-location-row m-auto ">
              <Col className={`${display} col-inputGroup2 pr-2 pl-2`}>
                <InputGroup
                  id="inputGroup2"
                  className="whiteColor borderRadiuse p-2 d-flex search-style w-100"
                >
                  {/* <TextInput options={arr} /> */}
                  <AutoCompleteSearch
                    language={i18n.language}
                    classesStyle="paddingInput"
                    cNAuto="borderNone"
                    valueSearch={true}
                    flagLocetionAuto={(flag) => setFlagLocetion(flag)}
                    flagAdditionalFilters={true}
                  />
                  <div className="wrapper-current-location">
                    <Button
                      className="borderNone btn-current borderRadiuse h-100"
                      variant="outline-secondary"
                      onClick={() => {
                        setFlagCurrentLocetion(true);
                      }}
                    >
                      {t("search-section.use-current-location")}
                      <Icon name="location" className="location-icon"></Icon>{" "}
                    </Button>

                    {flagCurrentLocetion === true ? (
                      <UserLocation
                        flagLocetionAuto={(flag) => {
                          setFlagCurrentLocetion(flag);
                          setShow(!show);
                        }}
                      />
                    ) : (
                      ""
                    )}‏
                    <InputGroup.Append className="p-1 pt-0 align-items-center justify-content-center">
                      <Button
                        onClick={() => {
                          setdisplay("d-none");
                          setShow(!show);
                        }}
                        className="btnx focusCancel borderNone borderRadiuse font cancelHover position-absolute ml-ms-3 ml-0"
                        variant="outline-secondary"
                      >
                        x
                      </Button>
                    </InputGroup.Append>
                  </div>

                </InputGroup>
              </Col>
            </Row>

            <Row className="d-flex align-items-center justify-content-center w-100">
              <Col lg={9} md={11} className={`${display}`}>
                {flagLocetion === true && (
                  <InputGroup
                    id="inputGroup2"
                    className="whiteColor borderRadiuse mt-2"
                  >
                  </InputGroup>
                )}
              </Col>
            </Row>

          </>

        )}
      </Container>
    </>
  );
};
export default Auto;
