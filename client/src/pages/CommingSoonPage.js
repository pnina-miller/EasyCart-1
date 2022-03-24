import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from 'react-bootstrap';
import { FormControl, InputGroup } from 'react-bootstrap'

import HemletComponent from "../components/utilities/hemlet";

import '../styles/commingSoonPage.css'

import Logo from "../images/logo.png";

export default function CommingSoonPage() {
  const { t } = useTranslation();
  const seoTitle = "Comming Soon | EasyCart";
  const seoDescription ="Comming Soon content. this is going to contain few lines about this page";
  const seoImage = Logo;
  const seoKeywords=["Business", "EasyCart"];

  const target = "21 April 2021";
  const targetDate = new Date(target);
  const currentDate = new Date();
  const totalSeconds = (targetDate - currentDate) / 1000;
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(
    function () {
      const interval = setInterval(function () {
        setDays(Math.floor(totalSeconds / 3600 / 24));
        setHours(Math.floor(totalSeconds / 3600) % 24);
        setMins(Math.floor(totalSeconds / 60) % 60);
        setSeconds(Math.floor(totalSeconds) % 60);
      }, 1000);
      return function abort() {
        clearInterval(interval);
      };
    },
    [days, hours, mins, seconds,totalSeconds]
  );
  return (
    <div className="coming-soon-page">
          <HemletComponent seoTitle={seoTitle} seoDescription={seoDescription} seoKeywords={seoKeywords} seoImage={seoImage} />
      <div className="container">
        {/* Search */}
        <div className="row justify-content-center ">
          <div className="col-lg-8 col-lg-offset-2 m-0">
            {/* <img src="images/logo2.png" alt=""/> */}
            <h3>{t("comming-soon.title")}</h3>
            {/* Countdown */}
            <div id="countdown" className="margin-top-10 margin-bottom-35">
              <div>
                <span id="days">{days}</span>
                <i>{t("comming-soon.days")}</i>
              </div>
              <div>
                <span id="hours">{hours}</span>
                <i>{t("comming-soon.hours")}</i>
              </div>{" "}
              <div>
                <span id="mins">{mins}</span>
                <i>{t("comming-soon.minutes")}</i>
              </div>{" "}
              <div>
                <span id="seconds">{seconds}</span>
                <i>{t("comming-soon.seconds")}</i>
              </div>
            </div>
            {/* Countdown / End */}
            <br />
            <div className="main-search-input gray-style margin-top-30 margin-bottom-10">
              <div className="main-search-input-item">
                <InputGroup className="whiteColor borderRadiuse mt-5" size='lg'>
                  <FormControl className='focusNone heightSearch borderNone'
                    placeholder={t("comming-soon.email-placeholder")}
                    onFocus={e=>e.currentTarget.placeholder=''}
                    onBlur={e=>e.currentTarget.placeholder=t("comming-soon.email-placeholder")}
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Append className='p-2'>
                    <Button className='focusNone btnColor borderRadiuse' variant="outline-secondary">{t("comming-soon.notify-me")}</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>

            </div>
          </div>
        </div>
        {/* Search Section / End */}
      </div>
    </div>
  );
}
