import React, { useState, useEffect } from 'react'
import * as cloneDeep from 'lodash/cloneDeep';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Col, Row, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Icon from "../utilities/Icon";
import '../../styles/addBusinessPage.css';

export default function OpeningHoursSection(props) {
    const editBusiness = useSelector(state => state.business.editBusiness)
    const [flagOpenHour, setFlagOpenHour] = useState(editBusiness !== "" ? false : true);
    const [cntStart, setCntStart] = useState(0);
    const [cntEnd, setCntEnd] = useState(0);
    const { t } = useTranslation();
    const { openingHours } = props
    let hour = "";
    let hour2 = "";
    let day;
    let hoursarr = [];
    let arrHourOpen = [t('opening-hour.opening-hour'), "24:00", "23:00", "22:00", "21:00", "20:00", "19:00", "18:00", "17:00", "16:00"
        , "15:00", "14:00", "13:00", "12:00", "11:00", "10:00", "09:00", "08:00", "07:00"
        , "06:00", "05:00", "03:00", "03:00", "02:00", "01:00", t('opening-hour.closed')]
    let arrHourClose = [t('opening-hour.closing-hour'), "24:00", "23:00", "22:00", "21:00", "20:00", "19:00", "18:00", "17:00", "16:00"
        , "15:00", "14:00", "13:00", "12:00", "11:00", "10:00", "09:00", "08:00", "07:00"
        , "06:00", "05:00", "03:00", "03:00", "02:00", "01:00", t('opening-hour.closed')]
    let arrDays = [t('opening-hours.sunday'), t('opening-hours.monday'), t('opening-hours.tuesday'), t('opening-hours.wednesday'), t('opening-hours.thursday'), t('opening-hours.friday'), t('opening-hours.saturday')];
    const [list, setList] = useState(editBusiness !== "" ? editBusiness.opening_hours : {
        1: { start: 0, end: 0 },
        2: { start: 0, end: 0 },
        3: { start: 0, end: 0 },
        4: { start: 0, end: 0 },
        5: { start: 0, end: 0 },
        6: { start: 0, end: 0 },
        7: { start: 0, end: 0 }
    })
    if (editBusiness !== "") {
        if (editBusiness.opening_hours !== undefined) {
            Object.keys(editBusiness.opening_hours).forEach((key) =>
                hoursarr.push({ name: key, value: editBusiness.opening_hours[key] })
            );
        }
    }
    useEffect(() => {
        if (editBusiness !== "") {
            setFlagOpenHour(false)
            openingHours(editBusiness.opening_hours, flagOpenHour)
        }
        // eslint-disable-next-line
    }, [editBusiness])

    //set when opening the business in every day 
    function setStartHour(h, d) {
        hour = h;
        day = d;
        setOpenHour();
    }

    //set when closing the business in every day 
    function setEndHour(h, d) {
        hour2 = h;
        day = d;
        setOpenHour();
    }
    
    function setOpenHour() {
        let foo
        if (hour !== "" && day !== "") {
            if (day === 7 && (hour === "סגור!!" || "Closed")) {
                foo = cloneDeep(list);
                foo[day].start = 0;
                setList(foo);
            }
            else {
                foo = cloneDeep(list);
                foo[day].start = hour;
                setList(foo);
            }
            setCntStart(cntStart + 1)
            hour = "";
            day = "";

        }
        if (hour2 !== "" && day !== "") {
            if (day === 7 && (hour2 === "סגור!!" || "Closed")) {
                foo = cloneDeep(list);
                foo[day].end = 0;
                setList(foo);
            }
            else {
                foo = cloneDeep(list);
                foo[day].end = hour2;
                setList(foo);
            }
            setCntEnd(cntEnd + 1)
            hour2 = "";
            day = "";
        }
        if (cntStart >= 6 && cntEnd >= 6) {
            setFlagOpenHour(false);
        }
        openingHours(foo, flagOpenHour)
    }

    return (
        <div>
            <Card className="card-add-listing ">
                <Card.Body className="body-add-listing">
                    <Card.Title className="basic-information">
                        {t('opening-hours.opening-hours')}
                        <OverlayTrigger key="top"
                                            placement="top"
                                            overlay={
                                                <Tooltip id="tooltip-top">
                                                    This fields are required
                                                </Tooltip>
                                            }>
                                            <button variant="outline-dark"
                                                className="icon-btn btnmul">
                                                     <Icon name="information" />

                                            </button>
                                        </OverlayTrigger>
                    </Card.Title>
                    <hr className="solid"></hr>
                    <div className="add-listing-headline">
                        {/* <div>{flagOpenHour === true ? "חובה להזין שעות פתיחה וסגירה בכל  הימים" : ""}</div> */}
                    </div>
                    <Row>

                        <div className="submit-section">
                            <div className="row with-forms">
                                {arrDays.map((days, j) => (
                                    <div key={j}>
                                        <div className="col-md"  >
                                            <h5 >{days}</h5>
                                            {/* <div className="col-md"> */}
                                            <Col>
                                                <Form.Group >
                                                    <select
                                                        className="chosen-select"
                                                        onChange={(e) => { setStartHour(e.target.value, j + 1) }}
                                                    >
                                                        {hoursarr.length > 0 ?
                                                            hoursarr[j].value.start !== "0" ? arrHourOpen[0] = hoursarr[j].value.start : arrHourOpen[0] = "סגור!!" : ""}
                                                        {arrHourOpen.map((open, i) => (
                                                            <option key={i}
                                                            >
                                                                { open === 0 ? 'סגור' : open}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group >
                                                    <select
                                                        className="chosen-select"
                                                        onChange={(e) => { setEndHour(e.target.value, j + 1) }}
                                                    >
                                                        {hoursarr.length > 0 ?
                                                            hoursarr[j].value.end !== "0" ? arrHourClose[0] = hoursarr[j].value.end : arrHourClose[0] = "סגור!!" : ""}
                                                        {arrHourClose.map((close, i) => (
                                                            <option key={i} >
                                                                {close}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </Form.Group>
                                            </Col>
                                        </div><br></br>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Row>
                </Card.Body>

            </Card>

        </div>
    )
}