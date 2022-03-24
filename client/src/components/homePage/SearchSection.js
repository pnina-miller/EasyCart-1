/*import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Typed from "react-typed";
import React from "react";

import Auto from "./AutoSearch";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/homePage/searchSection.css";

function SearchSection() {

  const { t } = useTranslation();
  
  return (
    <>
      <div className="HeightHeader backColor">
        <Container>
          <Row className="d-flex align-items-center justify-content-center">
            <Col sm={11} className="mtRow">
              <p className="h1 h1Responsive textWhite text-center text-light">
                {t("search-section.typed-text-static")}&nbsp;
                <span className="typed-words">
                  <Typed
                    loop
                    typeSpeed={180}
                    backSpeed={150}
                    strings={[
                      `${t("categories.restaurants")}`,
                      `${t("categories.hotels")}`,
                      `${t("categories.events")}`,
                      `${t("categories.sport")}`,
                    ]}
                    smartBackspace
                    shuffle={false}
                    backDelay={1500}
                    fadeOut={false}
                    fadeOutDelay={100}
                    loopCount={0}
                    showCursor
                    cursorChar="|"
                  />
                </span>
              </p>
              <p className="h3 h3Responsive  textWhite text-center setText text-light">
                {t("search-section.subtitle")}
              </p>
            </Col>
          </Row>
          <Auto />
        </Container>
      </div>
      <div className="color-line" />
    </>
  );
}
export default SearchSection;*/
import React, { useState } from 'react'
import { useTranslation } from "react-i18next"
import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col, Button, InputGroup } from 'react-bootstrap'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import Typed from "react-typed";

import '../../styles/homePage/searchSection.css'
import Icon from '../utilities/Icon'
import { actions } from '../../redux/Action'
import Auto from './AutoSearch'
import AutoCompleteSearch from "../AutoCompleteSearch";
import UserLocation from "../UserLocation";

export default function SearchSection() {
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const history = useHistory();
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  const [display, setdisplay] = useState('d-none')
  const selectedText = useSelector(state => state.business.selectedText)
  const currentUserLocation = useSelector(state => state.location.currentUserAddress)
  const address = useSelector(state => state.location.address)

  const [flagToAodioSearch, setFlagToAodioSearch] = useState(false);
  const [flagCurrentLocetion, setFlagCurrentLocetion] = useState(false);
  const [flagLocetion, setFlagLocetion] = useState(true);

  const [textContent, setTextContent] = useState('');
  const [showAudio, setShowAudio] = useState(false);
  const [show, setShow] = useState(false);
  const [ChangedUserLocation, setChangedUserLocation] = useState("false");


  function searchClick() {
    {
      let text = "";
      if (localStorage.getItem('changedLocation') === "false") {
        let change = "true"
        setChangedUserLocation("true");
        setChangedUserLocation(change);
      }
      if (selectedText !== "") {
        text = selectedText
        history.push(`/${text}`);
      }
      if (localStorage.getItem('changedLocation') === "true") {
        history.push(`/${text}`);
      }
    }
  }

  recognition.onresult = function (event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    dispatch(actions.setSelectedText(transcript))
    setTextContent(transcript);
  };
  const handleRecord = () => {
    recognition.start();
  }
  const _handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchClick()  
      }
  }
  return (
    <>
      <div className='HeightHeader backColor mt-5' >
        <Container >
          <Row className='d-flex align-items-center justify-content-center'>
            <Col sm={11} className='mtRow' >
              <p className="h1 h1Responsive textWhite text-center text-light">
                {t('search-section.typed-text-static')}&nbsp;
                <span className="typed-words">
                  <Typed
                    loop
                    typeSpeed={180}
                    backSpeed={150}
                    strings={[`${t('categories.restaurants')}`, `${t('categories.hotels')}`, `${t('categories.events')}`, `${t('categories.sport')}`]}
                    smartBackspace
                    shuffle={false}
                    backDelay={1500}
                    fadeOut={false}
                    fadeOutDelay={100}
                    loopCount={0}
                    showCursor
                    cursorChar="|"
                  />
                </span>
              </p>
              <p className="h3 h3Responsive  textWhite text-center setText text-light">{t('search-section.subtitle')}</p>
            </Col>
          </Row>
          <Row className='d-flex align-items-center justify-content-center mt-2 mt-md-5 overFlowSearch' onKeyPress={_handleKeyDown}>
            <Col lg={9} md={11}>
              <InputGroup className="whiteColor borderRadiuse wrapperApp" >
                {showAudio === false ? <Auto /> :

                  <input
                    type="text"
                    placeholder={flagToAodioSearch ? "דבר כעת" : `${t('search-section.search-placeholder')}`}
                    onFocus={e=>e.currentTarget.placeholder=""}
                    onBlur={e=>e.currentTarget.placeholder=flagToAodioSearch ? "דבר כעת" : `${t('search-section.search-placeholder')}`}
                    style={{ border: "none" }}
                    className='focusCancel heightSearch borderNone form-control m-auto font'
                    value={flagToAodioSearch ? textContent : undefined}
                     />}

                <OverlayTrigger placement="bottom"
                  overlay={
                    <Tooltip id="tooltip-bottom">
                      Search With Your Voice
              </Tooltip>
                  }>
                  <button className="icon-btn--click icon-btn:focus icon-btn m-0 w-30" onClick={() => {
                    handleRecord()
                    setFlagToAodioSearch(true)
                    setShowAudio(true)
                    // localStorage.setItem('audioSearch', true)
                  }}>
                    <Icon name="microphone" className="heightSearch"/>
                  </button>
                </OverlayTrigger>

                <InputGroup.Append className='p-2 d-none d-md-block'>
                  <Button className=' btnColor focusCancel borderNone borderRadiuse font pl-md-5 pr-md-5 h-100' variant="outline-secondary" onClick={() => { searchClick() }}>{t('search')}</Button>
                </InputGroup.Append>
              </InputGroup>
              <Button className='d-md-none focusCancel  btnColor borderNone borderRadiuse font pl-md-5 pr-md-5 w-100 mt-3' variant="outline-secondary" onClick={() => { searchClick() }}>{t('search')}</Button>

              <div className='d-flex justify-content-between'>
                <Button onClick={() => { setdisplay('d-block')
                setShow(!show)
                setFlagLocetion(true)
               }} className='TextBtn focusCancel borderNone cancelHover w-lg-25  text-left' variant=""><Icon name='place'></Icon> {t(`search-section.icon-2`)}</Button>
                <Button onClick={() => { setdisplay('d-block') }} className='TextBtn focusCancel borderNone cancelHover w-lg-25 text-right' variant=""><Icon name='circle'></Icon>{currentUserLocation !== "" ? currentUserLocation : address !== "" ? address : t(`search-section.icon-1`)} </Button>
              </div>
            </Col>
          </Row>
          {show?
          <Row className='d-flex align-items-center justify-content-center' >
            <Col lg={9} md={11} className={`${display}`}>
               <InputGroup id='inputGroup2' className="whiteColor borderRadiuse p-2" >
                {/* <AutoCompleteSearch classesStyle='paddingInput' flagLocetionAuto={(flag) => setFlagLocetion(flag)} flagAdditionalFilters={true} /> */}
                <AutoCompleteSearch classesStyle='paddingInput' valueSearch={true} flagLocetionAuto={(flag) => setFlagLocetion(flag)} flagAdditionalFilters={true} />‏
                <InputGroup.Append className='p-1 mt-2 '>
                  <Button onClick={() => { setdisplay('d-none') }} className='focusCancel borderNone borderRadiuse font cancelHover position-absolute ml-ms-3 ml-0 p-0 p-sm-1' variant="outline-secondary"><Icon name='x'></Icon></Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>:""}
          {show?
          <Row className='d-flex align-items-center justify-content-center'>
            <Col lg={9} md={11} className={`${display}`}>
              {flagLocetion === true && <InputGroup id='inputGroup2' className="whiteColor borderRadiuse mt-2" >
                <InputGroup.Append className=' mt-2 '>
                  <Button className='borderNone btn-current borderRadiuse font  h-100' variant="outline-secondary"  onClick={() => { setFlagCurrentLocetion(true)
                  } } ><Icon name="location" className=""></Icon>   Use my current location</Button>
                
                  {flagCurrentLocetion === true ? <UserLocation flagLocetionAuto={(flag) =>{ setFlagCurrentLocetion(flag)   
                    setShow(false)} }/> : ""}
                </InputGroup.Append>
              </InputGroup>}
            </Col>
          </Row>:""}


        </Container>
      </div>
      <div className="color-line" />
    </>

  );
}