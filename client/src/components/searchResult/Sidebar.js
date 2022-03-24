import { useLocation, useHistory } from "react-router-dom";
import { ListGroup, Accordion, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as qs from "qs";

import ListCategory from "./ListCategory";
import { actions } from "../../redux/Action";
import UserLocation from "../UserLocation";
import Icon from "../utilities/Icon"

import "bootstrap/dist/css/bootstrap.min.css";

import "../../styles/searchResult/sidebar.css";

//check wrong construct
function SideBar() {

  const history = useHistory();
  const dispatch = useDispatch();
  const currentUserLocation = useSelector((state) => state.location.currentUserLocation);
  const filtersNames = useSelector((state) => state.search.filtersNames);
  const defaultSortNames = useSelector((state) => state.search.defaultSortNames);
  const nearPlacesBySearch = useSelector((state) => state.places.nearPlacesBySearch);
  const namesServices = useSelector((state) => state.search.namesServices);
  const location = useLocation();
  const domainName = "https://easycart.direct";
  const { t } = useTranslation();
  const [flagResult, SetFlagResult] = useState(true);
  const [showHours, setShowHours] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkedPopularity, setCheckedPopularity] = useState(false);
  const [valueQery, setValueQery] = useState("");
  const [query, setQuery] = useState("");
  const [queryPopularity, setQueryPopularity] = useState("");
  const [queryServices, setQueryServices] = useState("");
  const [service, setService] = useState(false);
  const [popularity, setPopularity] = useState(false);
  const [hours, setHour] = useState("24:00");
  const [day, setDay] = useState(t("opening-hours.sunday"));

  let arrDays = [{ key: "choose day", value: "0" },
  { key: t("opening-hours.sunday"), value: "1" },
  { key: t("opening-hours.monday"), value: "2" },
  { key: t("opening-hours.tuesday"), value: "3" },
  { key: t("opening-hours.wednesday"), value: "4" },
  { key: t("opening-hours.thursday"), value: "5" },
  { key: t("opening-hours.friday"), value: "6" },
  { key: "שבת", value: "7" },
  ];
  let arrHourOpen = [
    "choose hour",
    "24:00",
    "23:00",
    "22:00",
    "21:00",
    "20:00",
    "19:00",
    "18:00",
    "17:00",
    "16:00",
    "15:00",
    "14:00",
    "13:00",
    "12:00",
    "11:00",
    "10:00",
    "09:00",
    "08:00",
    "07:00",
    "06:00",
    "05:00",
    "03:00",
    "03:00",
    "02:00",
    "01:00",
    "סגור",
  ];

  useEffect(() => {
    dispatch(actions.namesOfFilters());
    dispatch(actions.getNamesServices())
    dispatch(actions.namesOfPopularFilters());
    if (flagResult === true) {
      SetFlagResult(false);
    }
    // eslint-disable-next-line
  }, [flagResult]);

  useEffect(() => {
    let qValue = qs.parse(history.location.search, { ignoreQueryPrefix: true })
      .open;
    let popularityValue = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    }).popularity;
    let serviceValue = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    }).service;
    if (popularityValue !== undefined) {
      setCheckedPopularity(true);
      setPopularity(popularityValue);
    }
    else {
      setCheckedPopularity(false)
    }
    if (qValue !== undefined) {
      setChecked(true);
      setValueQery(qValue);
    }
    else {
      setChecked(false);
    }
    if (serviceValue !== undefined) {
      setService(true)
      setQueryServices(serviceValue)
    }
    else {
      setService(false)
    }
    // eslint-disable-next-line
  }, [
    nearPlacesBySearch,
    valueQery,
    popularity,
    currentUserLocation,
    dispatch,
  ]);

  function OpenFilters(queryValue, e) {
    try {
      let reset = []
      setQuery(queryValue);
      dispatch(actions.setResultDb({ reset: reset }));
      dispatch(actions.setSortAllBusinesses(reset));
      e.currentTarget.checked = true;
      let newurl = domainName + location.pathname + history.location.search;
      let locationUrl = new URL(newurl);
      locationUrl.searchParams.set("open", queryValue);
      history.push(locationUrl.pathname + locationUrl.search, location.state);
    } catch (_) {
      console.error("Please enter valid URL. A valid URL starts with 'http://'.");
    }
  }

  function popularitySort(queryValue, e) {
    try {
      let reset = []
      dispatch(actions.setResultDb({ reset: reset }));
      setQueryPopularity(queryValue);
      e.currentTarget.checked = true;
      let newurl = domainName + location.pathname + history.location.search;
      let locationUrl = new URL(newurl);
      locationUrl.searchParams.set("popularity", queryValue);
      history.push(locationUrl.pathname + locationUrl.search, location.state);
    } catch (_) {
      console.error("Please enter valid URL. A valid URL starts with 'http://'.");
    }
  }

  function servicesFilters(e, queryValue) {
    try {
      let reset = []
      setQueryServices(queryValue)
      dispatch(actions.setResultDb({ reset: reset }));
      e.currentTarget.checked = true;
      let newurl = domainName + location.pathname + history.location.search;
      let locationUrl = new URL(newurl);
      let qValue = qs.parse(history.location.search, {
        ignoreQueryPrefix: true,
      }).service;
      qValue !== undefined ?
        locationUrl.searchParams.set("service", [queryValue, qValue]) :
        locationUrl.searchParams.set("service", queryValue)
      history.push(locationUrl.pathname + locationUrl.search, location.state);
    } catch (_) {
      console.error("Please enter valid URL. A valid URL starts with 'http://'.");
    }
  }

  function cancelOpenFilters(e) {
    setQuery("");
    let newurl = domainName + location.pathname;
    let locationUrl = new URL(newurl);
    e.currentTarget.checked = false;
    let queryPopularity = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    }).popularity;
    let queryService = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    }).service;
    queryPopularity && locationUrl.searchParams.set("popularity", queryPopularity);
    queryService && locationUrl.searchParams.set("service", queryService);
    history.push(locationUrl.pathname + locationUrl.search, location.state);
  }

  function cancelPopularityFilters(e) {
    setQueryPopularity("");
    let newurl = domainName + location.pathname;
    let locationUrl = new URL(newurl);
    e.currentTarget.checked = false;
    let queryOpen = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    }).open;
    let queryService = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    }).service;
    queryOpen && locationUrl.searchParams.set("open", queryOpen);
    queryService && locationUrl.searchParams.set("service", queryService);
    history.push(locationUrl.pathname + locationUrl.search, location.state);
  }

  function cancelServicesFilters(e) {
    setQueryServices("")
    let newurl = domainName + location.pathname;
    let locationUrl = new URL(newurl);
    e.currentTarget.checked = false;
    let queryOpen = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    }).open;
    let queryPopularity = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    }).popularity;
    queryOpen && locationUrl.searchParams.set("open", queryOpen);
    queryPopularity && locationUrl.searchParams.set("popularity", queryOpen);
    history.push(locationUrl.pathname + locationUrl.search, location.state);
  }

  return (
    <>
      <div>
        {currentUserLocation.latitude === "" ? <UserLocation /> : ""}
        <Accordion>
          <Card>
            <Accordion.Toggle 
              className="d-lg-none text-left mt-md-3"
              as={Card.Header}
              eventKey="4"
            >
              <Icon name='arrowDown'></Icon>
            </Accordion.Toggle>
            <div className="container-fluid fontThin marginSide ">
              <div className="row">
                <div className="sideFixed col-lg-3 col-sm-12 col-md-12 mb-9 sideBarFilter">
                  <Accordion.Collapse
                    className="collapse d-lg-block"
                    eventKey="4"
                  >
                    <div className="paddingGroup ">
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Accordion>
                            <Card className="text-center text-sm-left" aria-expanded="true">
                              <Accordion.Toggle  as={Card.Header} eventKey="0">
                                <Icon name='arrowDown'></Icon>
                                <b className="courser-btn ml-2">
                                  {t("more-filters.open")}
                                </b>
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0" >
                                <ListGroup variant="flush">
                                  <ListGroup.Item>
                                    <Card.Body className="cardBody-sidebar">
                                      {filtersNames?.map((option, i) => (
                                          <div>
                                            {option.value !== "hours" ? (
                                              valueQery !== "" &&
                                                option.value === valueQery ? (
                                                <div
                                                  key={i}
                                                  className="custom-control custom-radio"
                                                >
                                                  <input
                                                    checked={checked}
                                                    type="radio"
                                                    className="custom-control-input"
                                                    id={`customRadio${i}`}
                                                    name="example"
                                                    onClick={(e) => {
                                                      query === option.value
                                                        ? cancelOpenFilters(e)
                                                        : OpenFilters(
                                                          option.value,
                                                          e
                                                        );
                                                    }}
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    htmlFor={`customRadio${i}`}
                                                  >
                                                    {option.key}
                                                  </label>
                                                </div>
                                              ) : (
                                                <div
                                                  key={i}
                                                  className="custom-control custom-radio"
                                                >
                                                  <input
                                                    type="radio"
                                                    className="custom-control-input"
                                                    id={`customRadio${i}`}
                                                    name="example"
                                                    onClick={(e) => {
                                                      query === option.value
                                                        ? cancelOpenFilters(e)
                                                        : OpenFilters(
                                                          option.value,
                                                          e
                                                        );
                                                    }}
                                                  />
                                                  <label
                                                    className="custom-control-label"
                                                    htmlFor={`customRadio${i}`}
                                                  >
                                                    {option.key}
                                                  </label>
                                                </div>
                                              )
                                            ) : (
                                              <div
                                                key={i}
                                                className="custom-control custom-radio"
                                              >
                                                <input
                                                  type="radio"
                                                  className="custom-control-input"
                                                  id={`customRadio${i}`}
                                                  name="example"
                                                />
                                                <label
                                                  className="custom-control-label"
                                                  htmlFor={`customRadio${i}`}
                                                  onClick={() => {
                                                    setShowHours(true);
                                                  }}
                                                >
                                                  {option.key}
                                                </label>
                                              </div>
                                            )}
                                          </div>
                                        ))
                            }
                                    </Card.Body>
                                    {showHours && (
                                      <div className="card border-primary">
                                        <div className="card-body text-primary">
                                          <select
                                            className="selectpicker"
                                            onChange={(e) => {
                                              setDay(e.target.value);
                                            }}
                                          >
                                            {valueQery !== "" &&
                                              valueQery.split(",")[1] &&
                                              arrDays[0].key !== undefined
                                              ? (arrDays[0].key =
                                                arrDays[
                                                  valueQery.split(",")[1]
                                                ].key)
                                              : ""}
                                            {arrDays.map((item) => (
                                              <option>{item.key}</option>
                                            ))}
                                          </select>
                                          <select
                                            className="selectpicker"
                                            onChange={(e) => {
                                              setHour(e.target.value);
                                            }}
                                          >
                                            {valueQery !== "" &&
                                              valueQery.split(",")[1]
                                              ? (arrHourOpen[0] = valueQery.split(
                                                ","
                                              )[0])
                                              : ""}
                                            {arrHourOpen.map(
                                              (option, index) => (
                                                <option key={index}>
                                                  {option}
                                                </option>
                                              )
                                            )}
                                          </select>
                                          <button
                                            type="button"
                                            className="focusCancel btnColor borderNone borderRadiuse font pl-md-5 pr-md-5 h-100"
                                            onClick={(e) => {
                                              OpenFilters(
                                                hours +
                                                "," +
                                                arrDays.findIndex(
                                                  (x) => x.key === day
                                                ),
                                                e
                                              );
                                            }}
                                          >
                                            search
                                          </button>
                                          <button
                                            type="button"
                                            className="focusCancel btnColor borderNone borderRadiuse font pl-md-5 pr-md-5 h-100"
                                            onClick={() => {
                                              setShowHours(false);
                                            }}
                                          >
                                            cancel
                                          </button>
                                        </div>
                                      </div>
                                    ) }
                                  </ListGroup.Item>
                                </ListGroup>
                              </Accordion.Collapse>
                            </Card>
                          </Accordion>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Accordion>
                            <Card>
                              <Accordion.Toggle
                                className="text-center text-sm-left"
                                as={Card.Header}
                                eventKey="3"
                              >
                                <Icon name='arrowDown'></Icon>
                                <b className="courser-btn ml-2">{t("more-filters.popularity")}</b>
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey="3" >
                                <ListGroup variant="flush">
                                  <ListGroup.Item>
                                    <Card.Body className="cardBody-sidebar">
                                      {defaultSortNames?.map(
                                          (option, index) =>
                                            popularity !== "" &&
                                              option.value === popularity ? (
                                              <div
                                                key={index}
                                                className="custom-control custom-radio"
                                              >
                                                <input
                                                  checked={
                                                    checkedPopularity
                                                  }
                                                  type="radio"
                                                  className="custom-control-input"
                                                  id={`customRadio1${index}`}
                                                  name="example1"
                                                  onClick={(e) => {
                                                    queryPopularity ===
                                                      option.value
                                                      ? cancelPopularityFilters(
                                                        e
                                                      )
                                                      : popularitySort(
                                                        option.value,
                                                        e
                                                      );
                                                  }}
                                                />
                                                <label
                                                  className="custom-control-label"
                                                  htmlFor={`customRadio1${index}`}
                                                >
                                                  {" "}
                                                  {option.key}
                                                </label>
                                              </div>
                                            ) : (
                                              <div
                                                key={index}
                                                className="custom-control custom-radio"
                                              >
                                                <input
                                                  type="radio"
                                                  className="custom-control-input"
                                                  id={`customRadio1${index}`}
                                                  name="example1"
                                                  onClick={(e) => {
                                                    queryPopularity ===
                                                      option.value
                                                      ? cancelPopularityFilters(
                                                        e
                                                      )
                                                      : popularitySort(
                                                        option.value,
                                                        e
                                                      );
                                                  }}
                                                />
                                                <label
                                                  className="custom-control-label"
                                                  htmlFor={`customRadio1${index}`}
                                                >
                                                  {" "}
                                                  {option.key}
                                                </label>
                                              </div>
                                            )
                                        )}
                                    </Card.Body>
                                  </ListGroup.Item>
                                </ListGroup>
                              </Accordion.Collapse>
                            </Card>
                          </Accordion>
                        </ListGroup.Item>

                        <ListGroup.Item>
                          <Accordion>
                            <Card>
                              <Accordion.Toggle
                                className="text-center text-sm-left"
                                as={Card.Header}
                                eventKey="3"
                              >
                                <Icon name='arrowDown'></Icon>
                                <b className="courser-btn ml-2">{t("more-filters.services")}</b>
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey="3" >
                                <ListGroup variant="flush">
                                  <ListGroup.Item>
                                    <Card.Body className="cardBody-sidebar">
                                      { namesServices?.map(
                                          (option, index) =>
                                            option.value === queryServices || queryServices.split(',').find(e => option.value === e) ? (
                                              <div key={index} className="custom-control custom-radio" >
                                                <input type="checkbox"
                                                  checked={
                                                    service
                                                  }
                                                  className="custom-control-input"
                                                  id={`customRadio2${index}`}
                                                  name="example1"
                                                  onClick={(e) => {
                                                    queryServices === option.value ?
                                                      cancelServicesFilters(e) :
                                                      servicesFilters(e, option.value)
                                                  }}
                                                />
                                                <label
                                                  className="custom-control-label"
                                                  htmlFor={`customRadio2${index}`}
                                                >
                                                  {" "}
                                                  {option.key}
                                                </label>
                                              </div>) : (
                                              <div key={index} className="custom-control custom-radio" >

                                                <input type="checkbox"
                                                  className="custom-control-input"
                                                  id={`customRadio2${index}`}
                                                  name="example1"
                                                  onClick={(e) => {
                                                    queryServices === option.value ?
                                                      cancelServicesFilters(e) :
                                                      servicesFilters(e, option.value)
                                                  }}
                                                />
                                                <label
                                                  className="custom-control-label"
                                                  htmlFor={`customRadio2${index}`}
                                                >
                                                  {" "}
                                                  {option.key}
                                                </label>
                                              </div>
                                            )
                                        )}
                                    </Card.Body>
                                  </ListGroup.Item>
                                </ListGroup>
                              </Accordion.Collapse>
                            </Card>
                          </Accordion>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </Accordion.Collapse>
                </div>
                 <div className=" col-lg col-sm-12 ">{/*ml-lg-5 */}
                  <ListCategory />
                </div>
              </div>
            </div>
          </Card>
        </Accordion>
      </div>
    </>
  );
}

export default SideBar;
